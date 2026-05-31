import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/databaseConnection';
import UserModel from '@/models/User.model';
import { OAuth2Client } from 'google-auth-library';
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request) {
    try {
        await connectDB();
        const { credential, access_token } = await request.json();

        if (!credential && !access_token) {
            return NextResponse.json({ success: false, message: "Missing Google credential or access token." }, { status: 400 });
        }

        let email, name, picture;

        if (credential) {
            // Verify the Google ID token
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            
            if (!payload || !payload.email) {
                return NextResponse.json({ success: false, message: "Invalid Google token payload." }, { status: 400 });
            }

            email = payload.email;
            name = payload.name;
            picture = payload.picture;
        } else if (access_token) {
            // Verify access_token
            const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            if (!googleResponse.ok) {
                return NextResponse.json({ success: false, message: "Invalid Google access token." }, { status: 400 });
            }

            const payload = await googleResponse.json();
            email = payload.email;
            name = payload.name;
            picture = payload.picture;
        }

        // Check if user exists
        let user = await UserModel.findOne({ email, deletedAt: null });

        if (!user) {
            // Create a new user
            user = await UserModel.create({
                name: name,
                email: email,
                authProvider: 'google',
                isEmailVerified: true, // Google emails are already verified
                avatar: {
                    url: picture,
                    public_id: 'google_avatar_' + Date.now()
                }
            });
        }

        // Generate custom JWT
        const loggedInUserData = {
            _id: user._id.toString(),
            role: user.role,
            name: user.name,
            avatar: user.avatar,
        };

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT(loggedInUserData)
            .setIssuedAt()
            .setExpirationTime('24h')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret);

        const cookieStore = await cookies();

        cookieStore.set({
            name: 'access_token',
            value: token,
            httpOnly: process.env.NODE_ENV === 'production',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return NextResponse.json({ 
            success: true, 
            message: "Google login successful.",
            data: loggedInUserData 
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        return NextResponse.json({ success: false, message: "Google authentication failed. Ensure Client ID is configured correctly." }, { status: 500 });
    }
}

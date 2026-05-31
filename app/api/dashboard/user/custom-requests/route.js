import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import CustomRequestModel from "@/models/CustomRequest.model";
import UserModel from "@/models/User.model";

export async function GET() {
    try {
        await connectDB()
        const auth = await isAuthenticated('user')
        if (!auth.isAuth) {
            return response(false, 401, 'Unauthorized')
        }

        const user = await UserModel.findById(auth.userId)
        if (!user) {
            return response(false, 404, 'User not found')
        }

        const requests = await CustomRequestModel.find({ email: user.email.toLowerCase() }).sort({ createdAt: -1 })

        return response(true, 200, 'Custom requests fetched successfully', requests)

    } catch (error) {
        return catchError(error)
    }
}

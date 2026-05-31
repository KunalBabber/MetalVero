import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import adminLogo from '@/public/assets/images/admin-logo.png'
import { useSelector } from "react-redux"

import { LuFactory, LuPackageCheck, LuUserCog } from "react-icons/lu";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { ADMIN_ORDER_SHOW, ADMIN_PRODUCT_ADD } from "@/routes/AdminPanelRoute";

const UserDropdown = () => {
    const auth = useSelector((store) => store.authStore.auth)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer shadow-md hover:scale-105 transition-transform">
                    <LuUserCog size={20} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="me-5 w-44">
                <DropdownMenuLabel>
                    <p className="font-semibold">{auth?.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={ADMIN_PRODUCT_ADD} className="cursor-pointer">
                        <LuFactory />
                        New Product
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={ADMIN_ORDER_SHOW} className="cursor-pointer">
                        <LuPackageCheck />
                        Orders
                    </Link>
                </DropdownMenuItem>

                <LogoutButton />

            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropdown

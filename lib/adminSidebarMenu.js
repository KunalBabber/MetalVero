import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { LuUserRound, LuMail, LuPackageCheck } from "react-icons/lu";
import { BsTools } from "react-icons/bs";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_COUPON_ADD, ADMIN_COUPON_SHOW, ADMIN_CUSTOMERS_SHOW, ADMIN_DASHBOARD, ADMIN_ENQUIRY_SHOW, ADMIN_MEDIA_SHOW, ADMIN_ORDER_SHOW, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW, ADMIN_PRODUCT_VARIANT_ADD, ADMIN_PRODUCT_VARIANT_SHOW, ADMIN_REVIEW_SHOW } from "@/routes/AdminPanelRoute";


export const adminAppSidebarMenu = [
    {
        title: "Dashboard",
        url: ADMIN_DASHBOARD,
        icon: AiOutlineDashboard
    },
    {
        title: "Category",
        url: "#",
        icon: BiCategory,
        submenu: [
            {
                title: "Add Category",
                url: ADMIN_CATEGORY_ADD
            },
            {
                title: "All Category",
                url: ADMIN_CATEGORY_SHOW
            }
        ]
    },
    {
        title: "Products",
        url: "#",
        icon: MdOutlinePrecisionManufacturing,
        submenu: [
            {
                title: "Add Product",
                url: ADMIN_PRODUCT_ADD
            },
            {
                title: "All Products",
                url: ADMIN_PRODUCT_SHOW
            }
        ]
    },
    {
        title: "Product Variant",
        url: "#",
        icon: BsTools,
        submenu: [
            {
                title: "Add Variant",
                url: ADMIN_PRODUCT_VARIANT_ADD
            },
            {
                title: "All Variants",
                url: ADMIN_PRODUCT_VARIANT_SHOW
            }
        ]
    },
    {
        title: "Coupons",
        url: "#",
        icon: RiCoupon2Line,
        submenu: [
            {
                title: "Add Coupon",
                url: ADMIN_COUPON_ADD
            },
            {
                title: "All Coupons",
                url: ADMIN_COUPON_SHOW
            },

        ]
    },
    {
        title: "Orders",
        url: ADMIN_ORDER_SHOW,
        icon: LuPackageCheck,
    },
    {
        title: "Customers",
        url: ADMIN_CUSTOMERS_SHOW,
        icon: LuUserRound,
    },
    {
        title: "Rating & Review",
        url: ADMIN_REVIEW_SHOW,
        icon: IoMdStarOutline,
    },
    {
        title: "Media",
        url: ADMIN_MEDIA_SHOW,
        icon: MdOutlinePermMedia,
    },
    {
        title: "Contact Messages",
        url: "/admin/contact-messages",
        icon: LuMail,
    },
    {
        title: "Enquiries",
        url: ADMIN_ENQUIRY_SHOW,
        icon: LuMail,
    },
    {
        title: "Custom Requests",
        url: '/admin/custom-requests',
        icon: BsTools,
    },
]

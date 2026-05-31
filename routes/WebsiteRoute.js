export const WEBSITE_HOME = "/"
export const WEBSITE_LOGIN = "/auth/login"
export const WEBSITE_REGISTER = "/auth/register"
export const WEBSITE_RESETPASSWORD = "/auth/reset-password"

export const WEBSITE_SHOP = "/shop"
// Factory Routes
export const WEBSITE_ABOUT = "/about-factory"
export const WEBSITE_PRODUCTS = "/products"
export const WEBSITE_CUSTOM_ORDERS = "/custom-orders"
export const WEBSITE_PROCESS = "/manufacturing-process"
export const WEBSITE_B2B = "/b2b-solutions"
export const WEBSITE_CONTACT = "/contact-us"
export const WEBSITE_RFQ = "/request-quote"


export const WEBSITE_PRODUCT_DETAILS = (slug) => slug ? `/product/${slug}` : '/product'

export const WEBSITE_CART = "/cart"
export const WEBSITE_CHECKOUT = "/checkout"

export const WEBSITE_ORDER_DETAILS = (order_id) => `/order-details/${order_id}`


// User routes 
export const USER_DASHBOARD = "/my-account"
export const USER_PROFILE = "/profile"
export const USER_ORDERS = "/orders"
export const USER_CUSTOM_REQUESTS = "/my-account/custom-requests"
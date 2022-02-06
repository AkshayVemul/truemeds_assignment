const ENV = {
    DEV: "/dummy",
    STAGE: "https://stage-services.truemeds.in",
    PROD: "",
}

const SERVICE = {
    customerService: "/CustomerService",
    articleService: "/ArticleService",
}

const SELECTORS = {
    sendOtp: "/sendOtp",
    verifyOtp: "/verifyOtp",
    getArticleListing: "/getArticleListing"
}

export { ENV, SERVICE, SELECTORS }
const routes = {
    landing: "/landing",
    checkoutResult: "/landing/checkout-result",
    home: "/admin/dashboard",
    admin: {
        dashboard: "/admin/dashboard",
        chat: "/admin/chat",
        statistics: "/admin/statistics",
        configuration: "/admin/configuration",
        customization: "/admin/customization",
        integration: "/admin/integration",
        account: "/admin/account",
    },
    dashboard: "/admin/dashboard",
    docs: "/docs/introduction",
    contact: "/landing/contact",
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
    },
    dashboards: {
        ecommerce: "/dashboards/ecommerce",
    },
    pages: {},
    externalLinks: {
        discord: "https://discord.com/invite/S6TZxycVHs",
        purchase: "https://daisyui.com/store/",
        daisyui: "https://daisyui.com",
    },
};

export default routes;

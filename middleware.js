export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/properties/add",
        "/properties/search-results",
        "/profile",
        "/properties/saved",
        "/messages",
    ],
};

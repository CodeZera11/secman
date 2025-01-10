export const PageRoutes = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
};

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication 
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * The array of routes that are used for authentication.
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/** 
 * Default route on which the user will be redirected to after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
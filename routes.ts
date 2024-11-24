/**
 * An array of routes that are public and can be accessed without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/auth/new-verification",
  "/auth/login",
  "/auth/register",
  "/auth/error",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API routes that are used for authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route for authenticated users.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

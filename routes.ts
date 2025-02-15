/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/new-verification",
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/success",
];

/**
 * An array of routes that are public and can be accessed without authentication.
 * @type {string[]}
 */
export const publicRoutes = [...authRoutes, "/"];

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

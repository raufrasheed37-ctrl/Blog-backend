export const AUTH_TOKEN_COOKIE = "auth-token";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function setAuthTokenCookie(token) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function clearAuthTokenCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function readAuthTokenCookie() {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${AUTH_TOKEN_COOKIE}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(AUTH_TOKEN_COOKIE.length + 1));
}
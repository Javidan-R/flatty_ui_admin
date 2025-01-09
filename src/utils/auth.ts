import { LoginResponse } from "@/types/auth/LoginResponse.ts";
import { logout } from "./logout.ts";
import { useRefreshToken } from "@/hooks/useRefreshToken.ts";
import Cookies from "js-cookie";

export const getToken = () => {
  const tokenCookie: string | undefined = Cookies.get("token");
  const refreshTokenCookie: string | undefined = Cookies.get("refreshToken");
  let token: string | null;
  let refreshTokenValue: string | null;
  const { refreshToken } = useRefreshToken();

  tokenCookie ? (token = JSON.parse(tokenCookie)) : (token = null);

  refreshTokenCookie
    ? (refreshTokenValue = JSON.parse(refreshTokenCookie))
    : (refreshTokenValue = null);

  if (!token && refreshTokenValue) {
    refreshToken();
  }

  return token;
};

export const getRefreshToken = () => {
  const refreshTokenCookie: string | undefined = Cookies.get("refreshToken");
  let refreshToken: string | null;

  refreshTokenCookie
    ? (refreshToken = JSON.parse(refreshTokenCookie))
    : (refreshToken = null);

  return refreshToken;
};

export const getUser = () => {
  const userCookie: string | undefined = Cookies.get("user");
  let user: LoginResponse | null;

  userCookie ? (user = JSON.parse(userCookie)) : (user = null);

  return user;
};

export const removeToken = () => {
  Cookies.remove("user");
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};

export const checkAuth = () => {
  const tokenCookie: string | undefined = Cookies.get("token");
  let tokenValue: string | null;

  const refreshTokenCookie: string | undefined = Cookies.get("refreshToken");
  let refreshTokenValue: string | null;

  tokenCookie ? (tokenValue = JSON.parse(tokenCookie)) : (tokenValue = null);

  refreshTokenCookie
    ? (refreshTokenValue = JSON.parse(refreshTokenCookie))
    : (refreshTokenValue = null);

  if (tokenValue && tokenValue !== null) {
    return true;
  } else if (
    refreshTokenValue &&
    refreshTokenValue !== null &&
    tokenValue === null
  ) {
    return true;
  } else {
    logout();
    return false;
  }
};

export const setToken = (val: LoginResponse) => {
  const jwtExpiredAt = new Date(Number(JSON.stringify(val.jwtExpiredAt)));
  const refreshExpiredAt = new Date(
    Number(JSON.stringify(val.refreshExpiredAt))
  );
  const refreshTokenValue = getRefreshToken();

  if (refreshTokenValue) {
    Cookies.set("token", JSON.stringify(val.accessToken), {
      expires: jwtExpiredAt,
    });
  } else {
    Cookies.set("token", JSON.stringify(val.accessToken), {
      expires: jwtExpiredAt,
    });

    Cookies.set("refreshToken", JSON.stringify(val.refreshToken), {
      expires: refreshExpiredAt,
    });
  }
};

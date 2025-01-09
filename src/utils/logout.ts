import { getRefreshToken } from "./auth.ts";

export const logout = () => {
    const refreshTokenValue = getRefreshToken();

    if (!refreshTokenValue) {
        window.location.replace("/auth/login");
    }
};

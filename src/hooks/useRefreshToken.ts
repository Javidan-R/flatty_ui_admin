import { authService } from "@/services/auth.service.ts";
import { LoginResponse } from "@/types/auth/LoginResponse";
import { setToken } from "@/utils/auth";

export const useRefreshToken = () => {
    const refreshToken = async () => {
        const user = await authService.refreshToken();

        if (user) {
            setToken(user);
        }

        return user as LoginResponse;
    };

    return { refreshToken };
};

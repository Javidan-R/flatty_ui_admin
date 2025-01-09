import { authService } from "@services/auth.service.ts";
import { LoginResponse } from "@/types/auth/LoginResponse.ts";
import { setToken } from "@/utils/auth";

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const user = await authService.login(username, password);

        if (user) {
            setToken(user);
        }

        return user as LoginResponse;
    };

    return { login };
};

import { removeToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const logout = () => {
        removeToken();
        navigate("/auth/login");
    };

    return { logout };
};

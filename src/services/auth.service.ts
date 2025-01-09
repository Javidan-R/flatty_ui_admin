import axios, { AxiosInstance } from "axios";

// AuthService sinifi
export class AuthService {
    protected readonly instance: AxiosInstance;

    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            withCredentials: true,
            timeout: 30000,
            timeoutErrorMessage: "Time out!",
        });
    }

    // Login funksiyasını simulyasiya
    login = (username: string, password: string) => {
        // Müvəqqəti olaraq "testuser" və "testpassword" ilə girişə icazə veririk
        if (username === "user" && password === "password") {
            // Əgər login uğurludursa, saxta cavab qaytarırıq
            return Promise.resolve({
                username: "testuser",
                role: "admin",
                accessToken: "fakeAccessToken",
                refreshToken: "fakeRefreshToken",
                jwtExpiredAt: Date.now() + 60 * 60 * 1000, // 1 saat
                refreshExpiredAt: Date.now() + 24 * 60 * 60 * 1000, // 1 gün
            });
        } else {
            // Əgər login məlumatları doğru deyilsə, səhv mesajı qaytarırıq
            return Promise.reject(new Error("Invalid credentials"));
        }
    };

    // Refresh Token funksiyasını simulyasiya
    refreshToken = () => {
        const refreshTokenValue = "fakeRefreshToken"; // Manual refresh token

        return Promise.resolve({
            username: "testuser",
            role: "admin",
            accessToken: "newFakeAccessToken",
            refreshToken: refreshTokenValue,
            jwtExpiredAt: Date.now() + 60 * 60 * 1000, // Yeni 1 saat
            refreshExpiredAt: Date.now() + 24 * 60 * 60 * 1000, // Yeni 1 gün
        });
    };
}

// AuthService instansı yaradılır və URL təyin edilir
export const authService = new AuthService("http://localhost:8080/api/v1/auth");

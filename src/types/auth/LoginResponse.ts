export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    jwtExpiredAt: number;
    refreshExpiredAt: number;
    role: string;
    username: string;
}

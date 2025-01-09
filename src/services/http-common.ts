import { checkAuth, getToken } from "@/utils/auth.ts";
import { getAuthorizationHeader } from "@/utils/getAuthorizationHeader.ts";
import axios, { AxiosInstance } from "axios";

interface Params {
    baseURL: string;
    headers: any;
    timeout: number;
    withCredentials: boolean;
}

// Create an Axios instance
const ax: AxiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // Correct base URL
    headers: getAuthorizationHeader(),
    timeout: 30000,
    withCredentials: false,
});

// Request interceptor for attaching Authorization token
ax.interceptors.request.use(
    (req) => {
        if (checkAuth()) {
            const token = getToken();
            if (token) {
                // Add Authorization header only if token exists
                req.headers.Authorization = `Bearer ${token}`;
            } else {
                // Ensure Authorization header is undefined if token doesn't exist
                delete req.headers.Authorization;
            }
        }
        return req;
    },
    (error) => {
        const status = error.response?.status;
        if ([401, 403].includes(status)) {
            // Add any retry logic if needed here
        }
        return Promise.reject(error);
    }
);

// Fetch products (simulated products from JSONPlaceholder)
const getProducts = async () => {
    try {
        const response = await ax.get("/posts"); // Posts are used as products here
        console.log(response.data); // This will contain post data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

export default ax;
export { getProducts };

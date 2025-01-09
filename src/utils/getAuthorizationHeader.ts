import { getToken } from "./auth";

// Modify the getAuthorizationHeader function to never return null
export const getAuthorizationHeader = (): Record<string, string> | {} => {
    const token = getToken(); // assuming getToken() retrieves the token
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {}; // Return an empty object if no token is found
};

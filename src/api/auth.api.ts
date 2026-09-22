import apiClient from "@/lib/apiClient";
import { IUserRegistrationPayload } from "@/types";

// A Function to fetch login api
export function userLogin(payload: { email: string; password: string }) {
    return apiClient("/auth/login", { method: "POST", body: payload });
}

// A Function to fetch register api
export function userRegistration(payload: IUserRegistrationPayload) {
    return apiClient("/auth/register", { method: "POST", body: payload });
}

// A Function to fetch logout api
export function userLogout() {
    return apiClient("/auth/logout", { method: "POST" });
}

// A function to fetch getMe api
export function getMe() {
    return apiClient("/auth/me");
}

export function googleOAuth(payload: { idToken: string }) {
    return apiClient("/auth/google", {
        method: "POST",
        body: payload,
    });
}

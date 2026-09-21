import { getMe, googleOAuth, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
    return useMutation({
        mutationFn: userLogin,
    });
}
export function useLogout() {
    return useMutation({
        mutationFn: userLogout, // Mutates userLogout function
    });
}

// A special tanstack feature: if any query falls, it will try three times more to make right
// This makes the login button to appear after four try to the query
export function useGetMe() {
    return useQuery({
        // To fetch with get method as per query
        queryKey: ["user"], // store the result in cache memory under this tag line, can be used to track the cache
        // queryKey has to be refreshed after each operation by queryInvalidation
        queryFn: getMe,
        retry: false, // Tanstack will not retry to fetch the query again
    });
}

export function useGoogleOAuth() {
    return useMutation({
        mutationFn: googleOAuth,
    });
}

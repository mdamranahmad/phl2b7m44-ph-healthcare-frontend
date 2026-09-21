import { getMe, userLogin, userLogout } from "@/api";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

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

export function useGetMe() {
    return useQuery({
        // To fetch with get method as per query
        queryKey: ["user"], // store the result in cache memory under this tag line, can be used to track the cache
        queryFn: getMe,
    });
}

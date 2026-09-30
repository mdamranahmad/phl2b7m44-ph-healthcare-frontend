import {
    applyAsDoctor,
    approveDoctor,
    getAllDoctors,
    verifyDoctorAccount,
} from "@/api";
import { IDoctorParams } from "@/types";
import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from "@tanstack/react-query";

export function useApplyAsDoctor() {
    return useMutation({
        mutationFn: applyAsDoctor,
    });
}

export function useVerifyDoctorAccount() {
    return useMutation({
        mutationFn: verifyDoctorAccount,
    });
}

export function useGetAllDoctors(params: IDoctorParams) {
    return useQuery({
        queryKey: ["doctors", params],
        queryFn: () => getAllDoctors(params),
    });
}

export function useSuspenseGetAllDoctors(params: IDoctorParams) {
    return useSuspenseQuery({
        queryKey: ["doctors", params], // cache tag for fetched data
        queryFn: () => getAllDoctors(params), // for queryFn, there should only be function reference, no function call
    });
}

export function useApproveDoctor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });  // To revalidate / update cached data
        },
    });
}

import { applyAsDoctor, getAllDoctors, verifyDoctorAccount } from "@/api";
import { IDoctorParams } from "@/types";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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
        queryKey: ["doctor"],
        queryFn: () => getAllDoctors(params),
    });
}

export function useSuspenseGetAllDoctors(params: IDoctorParams) {
    return useSuspenseQuery({
        queryKey: ["doctor"],
        queryFn: () => getAllDoctors(params), // for queryFn, there should only be function reference, no function call
    });
}

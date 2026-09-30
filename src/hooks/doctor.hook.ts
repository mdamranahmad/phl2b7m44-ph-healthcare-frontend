import { applyAsDoctor, approveDoctor, getAllDoctors, verifyDoctorAccount } from "@/api";
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
        queryKey: ["doctor", params],
        queryFn: () => getAllDoctors(params),
    });
}

export function useSuspenseGetAllDoctors(params: IDoctorParams) {
    return useSuspenseQuery({
        queryKey: ["doctor", params], // cache tag for fetched data
        queryFn: () => getAllDoctors(params), // for queryFn, there should only be function reference, no function call
    });
}

export function useApproveDoctor() {
    return useMutation({
        mutationFn: approveDoctor,     
    });
}

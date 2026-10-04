import {
    applyAsDoctor,
    approveDoctor,
    getAllDoctors,
    getAllPublicDoctors,
    getPublicDoctorProfile,
    verifyDoctorAccount,
} from "@/api";
import { IDoctorParams, IPublicDoctorParams } from "@/types";
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

export function useGetAllPublicDoctors(params: IPublicDoctorParams) {
    return useQuery({
        queryKey: ["doctor", "public", params],
        queryFn: () => getAllPublicDoctors(params),
    });
}

export function usePublicDoctorProfile(doctorId: string) {
    return useQuery({
        queryKey: ["doctor", "public", doctorId],
        queryFn: () => getPublicDoctorProfile(doctorId),
        enabled: !!doctorId,
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
            queryClient.invalidateQueries({ queryKey: ["doctors"] }); // To revalidate / update cached data
        },
    });
}

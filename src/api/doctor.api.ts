import apiClient from "@/lib/apiClient";
import { IApiResponse, IUserVerifyAccountPayload } from "@/types";
import {
    IApproveDoctorPayload,
    IDoctor,
    IDoctorApplicationPayload,
    IDoctorParams,
} from "@/types/doctor.type";

// A function fetch apply as doctor api
export function applyAsDoctor(payload: IDoctorApplicationPayload) {
    const formData = new FormData();

    formData.append("data", JSON.stringify(payload.data));
    formData.append("resume", payload.resume);

    for (const file of payload.additionalFiles) {
        formData.append("additionalFiles", file);
    }

    return apiClient("/doctor/apply-as-doctor", {
        method: "POST",
        body: formData,
    });
}

// A Function to fetch verify email api for doctor application
export function verifyDoctorAccount(payload: IUserVerifyAccountPayload) {
    return apiClient("/doctor/apply-as-doctor/verify-email", {
        method: "POST",
        body: payload,
    });
}

// A function to fetch get all doctors api for admin and super admin
export function getAllDoctors(params: IDoctorParams) {
    return apiClient<IApiResponse<IDoctor[]>>("/doctor/all-doctors", {
        params,
    }); // implement type safety at api fetch level
}

// A function to fetch get all doctors api for admin and super admin
export function approveDoctor(payload: IApproveDoctorPayload) {
    return apiClient("/doctor/approved-doctor", {
        method: "POST",
        body: payload,
    }); // implement type safety at api fetch level
}

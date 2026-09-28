import apiClient from "@/lib/apiClient";
import { IUserVerifyAccountPayload } from "@/types";
import { IDoctorApplicationPayload } from "@/types/doctor.type";

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

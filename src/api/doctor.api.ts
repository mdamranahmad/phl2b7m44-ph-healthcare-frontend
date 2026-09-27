import apiClient from "@/lib/apiClient";
import { IDoctorApplicationPayload } from "@/types/doctor.type";

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

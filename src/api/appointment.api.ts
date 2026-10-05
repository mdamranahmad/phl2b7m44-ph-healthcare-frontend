import apiClient from "@/lib/apiClient";
import {
    IApiResponse,
    IBookAppointmentPayload,
    IBookAppointmentResponse,
} from "@/types";

export function bookAppointment(payload: IBookAppointmentPayload) {
    return apiClient<IApiResponse<IBookAppointmentResponse>>(
        "/appointment/book-appointment",
        {
            method: "POST",
            body: payload,
        },
    );
}

export function getMyAppointments(params: { page?: number; limit?: number }) {
    return apiClient("/appointment/my-appointments", { params });
}

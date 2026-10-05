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

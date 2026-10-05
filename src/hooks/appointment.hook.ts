import { bookAppointment } from "@/api/appointment.api";
import { useMutation } from "@tanstack/react-query";

export function useBookAppointment() {
    return useMutation({mutationFn: bookAppointment})
}
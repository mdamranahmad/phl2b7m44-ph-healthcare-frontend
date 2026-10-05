import { ISchedule } from "./schedule.type";

export type TAppointmentStatus =
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "ONGOING"
    | "COMPLETED";

export type TPaymentStatus =
    | "UNPAID"
    | "PAID"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED";

export interface IPayment {
    id: string;
    status: TPaymentStatus;
    amount: number | string;
    currency: string;
    bkashPaymentId?: string | null;
    bkashTrxId?: string | null;
    payerReference?: string | null;
    paidAt?: string | null;
    refundTrxId?: string | null;
    refundAmount?: number | string | null;
    refundReason?: string | null;
    refundAt?: string | null;
    appopintmentId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAppointmentDoctor {
    id: string;
    name: string;
    specialization: string;
    email?: string;
    userId?: string;
}

export interface IAppointmentPatient {
    id: string;
    name: string;
    email: string;
    contactNumber?: number | string;
    userId?: string;
}

export interface Appointment {
    id: string;
    status: TAppointmentStatus;
    joiningTime?: string | null;
    serialNumber?: number | null;
    recordUrl?: string | null;
    prescriptionUrl?: string | null;
    patientId: string;
    doctorId: string;
    scheduleId: string;
    createdAt: string;
    updatedAt: string;
    patient?: IAppointmentPatient;
    doctor?: IAppointmentDoctor;
    schedule?: ISchedule;
    payment: IPayment | null;
}

export interface IAppointmentParams {
    status?: TAppointmentStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "desc" | "asc";
}

export interface IBookAppointmentPayload {
    scheduleId: string;
}

export interface IPayAppointmentPayload {
    appointmentId: string;
}

export interface ICancelAppointmentPayload {
    appointmentId: string;
}

export interface IBookAppointmentResponse {
    paymentUrl: string;
}

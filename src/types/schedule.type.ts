export type TScheduleStatus = "DRAFT" | "PUBLISHED";

export interface ISchedule {
    id: string;
    startDateTime: string;
    endDateTime: string;
    totalSlots: number;
    availableSlots: number;
    meetingLink: string;
    status: TScheduleStatus;
    createdAt: string;
    updatedAt: string;
    doctorId: string;
}

export interface ICreateSchedulePayload {
    startDateTime: string;
    endDateTime: string;
    meetingLink: string;
}

export interface IScheduleParams {
    scheduleStatus?: TScheduleStatus;
    page?: number;
    limit?: number;
    // searchTerm?: string;
    sortBy?: string;
    sortOrder?: "desc" | "asc";
}

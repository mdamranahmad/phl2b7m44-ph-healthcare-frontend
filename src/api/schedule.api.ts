import apiClient from "@/lib/apiClient";
import { IApiResponse } from "@/types";
import {
    ICreateSchedulePayload,
    ISchedule,
    IScheduleParams,
} from "@/types/schedule.type";

export function createSchedule(payload: ICreateSchedulePayload) {
    return apiClient<IApiResponse<ISchedule>>("/schedule/create-schedule", {
        method: "POST",
        body: payload,
    });
}

export function getMySchedules(params: IScheduleParams) {
    return apiClient<IApiResponse<ISchedule[]>>("/schedule/my-schedules", {
        params,
    });
}

export function publishSchedule(scheduleId: string) {
    return apiClient<IApiResponse<ISchedule>>(
        `/schedule/publish-schedule/${scheduleId}`,
        {
            method: "PATCH",
        },
    );
}

export function deleteSchedule(scheduleId: string) {
    return apiClient<IApiResponse<ISchedule>>(`/schedule/${scheduleId}`, {
        method: "DELETE",
    });
}

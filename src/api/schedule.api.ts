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
    return apiClient<IApiResponse<ISchedule[]>>("/schedule/create-schedule", {
        params,
    });
}

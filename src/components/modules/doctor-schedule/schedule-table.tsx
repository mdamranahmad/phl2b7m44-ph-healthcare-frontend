import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useMySchedules,
    useSuspenseGetAllDoctors,
    useSuspenseMySchedules,
} from "@/hooks";
import { IDoctorParams, TDoctorVerificationStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";
import { ISchedule, IScheduleParams } from "@/types/schedule.type";
import ScheduleActions from "./schedule-action";

interface IProps extends IScheduleParams {
    // handleReview: Dispatch<SetStateAction<string>>;
    // handlePageChange: Dispatch<SetStateAction<number>>;
}

const formateDateTime = (value: string) => {
    return new Date(value).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const ScheduleTable = ({
    // handleReview,
    // handlePageChange,
    ...params
}: IProps) => {
    // const schedules: ISchedule[] = [];
    // const { data } = useMySchedules(params);
    // console.log(data)

    const { data } = useSuspenseMySchedules(params);

    const schedules: ISchedule[] = data?.data || [];

    // console.log({ schedules });

    if (schedules.length === 0) {
        return (
            <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
                No schedules found. Create your first schedule to start
                accepting appointments.
            </div>
        );
    }
    // const { data, isPending } = useGetAllDoctors();

    // Implement useSuspenseQuery for smart handling data with loading
    // const { data } = useSuspenseGetAllDoctors(params);

    // console.log(data);

    // const doctors = data?.data || [];
    // const doctors = data?.data;

    // console.log(doctors);

    // if (isPending) {
    //     return <p>Loading...</p>;
    // }

    return (
        <>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Slots</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schedules.map((schedule) => (
                            <TableRow key={schedule.id}>
                                <TableCell className="font-medium">
                                    <div className="font-medium">
                                        {formateDateTime(
                                            schedule.startDateTime,
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {formateDateTime(schedule.endDateTime)}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {schedule.totalSlots -
                                        schedule.availableSlots}
                                    /{schedule.totalSlots} booked
                                </TableCell>
                                <TableCell className="font-medium">
                                    <span
                                        className={
                                            schedule.status === "PUBLISHED"
                                                ? "text-green-600"
                                                : "text-amber-600"
                                        }
                                    >
                                        {schedule.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <ScheduleActions schedule={schedule} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* <div className="my-5">
                <TablePagination
                    totalPages={data.meta.totalPages ?? 0}
                    handlePageChange={handlePageChange}
                    page={params.page ?? 0}
                />
            </div> */}
        </>
    );
};

export default ScheduleTable;

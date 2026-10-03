import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { IDoctorParams, TDoctorVerificationStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";
import { ISchedule, IScheduleParams } from "@/types/schedule.type";

interface IProps extends IScheduleParams {
    // handleReview: Dispatch<SetStateAction<string>>;
    // handlePageChange: Dispatch<SetStateAction<number>>;
}

const formateDateTime = (value: string) => {
    return new Date(value).toLocaleDateString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const ScheduleTable = ({
    // handleReview,
    // handlePageChange,
    ...params
}: IProps) => {
    const schedules: ISchedule[] = [];

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
                                    {formateDateTime(schedule.startDateTime)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formateDateTime(schedule.endDateTime)}
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
                                {/* <TableCell className="font-medium">
                                    {doctor.specialization}
                                </TableCell> */}
                                <TableCell className="text-right">
                                    {/* <DoctorReviewSheet /> */}
                                    {/* {doctor.user.emailVerified ? (
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleReview(doctor.id)
                                            }
                                            disabled={
                                                doctor.verificationStatus !==
                                                "PENDING"
                                            }
                                        >
                                            Review
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled
                                            variant="outline"
                                            // onClick={() => handleReview(doctor.id)}
                                        >
                                            Not Verified
                                        </Button>
                                    )} */}
                                    <Button>View</Button>
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

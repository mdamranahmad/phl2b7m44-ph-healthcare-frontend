"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
    useBookAppointment,
    useGetMe,
    useGetTodayScheduleByDoctor,
} from "@/hooks";
import { ApiError } from "@/types";
import { ISchedule } from "@/types/schedule.type";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DoctorBooking = ({ doctorId }: { doctorId: string }) => {
    const router = useRouter();
    const { data: me, isPending: mePending } = useGetMe();
    const { data, isPending, error } = useGetTodayScheduleByDoctor({
        doctorId,
    });
    const { mutate: book, isPending: bookingPending } = useBookAppointment();
    const [confirmation, setConfirmation] = useState({});

    const schedules: ISchedule[] = data?.data || [];

    // if(!sche)

    // console.log(schedules);

    const handleBooking = (schedule: ISchedule) => {
        if (!mePending && !me?.data) {
            router.push("/login");
            return;
        }

        book(
            { scheduleId: schedule.id },
            {
                onSuccess: (res) => {
                    // console.log(res);
                    setConfirmation({
                        paymentUrl: res.data.paymentUrl,
                        schedule,
                    });
                },

                onError: (err: ApiError) => {
                    // console.log(err.data?.message);
                },
            },
        );
    };

    if (!schedules.length) {
        return (
            <p className="py-10 text-center text-muted-foreground">
                No booking slots today for this doctor. Try another day or
                doctor
            </p>
        );
    }

    return (
        <div>
            {schedules.map((schedule) => (
                <div
                    key={schedule.id}
                    className="border rounded-md p-3 flex gap-3 items-center"
                >
                    <span>{format(schedule.startDateTime, "eeee")}</span>
                    <span>{format(schedule.startDateTime, "PP")}</span>
                    <span className="text-sm to-muted-foreground">
                        Starts at {format(schedule.startDateTime, "p")}
                    </span>
                    <span className="text-sm to-muted-foreground">
                        Ends at {format(schedule.endDateTime, "p")}
                    </span>
                    <Button
                        onClick={() => handleBooking(schedule)}
                        className="ml-auto"
                    >
                        {bookingPending ? (
                            <Spinner>"Booking.."</Spinner>
                        ) : (
                            "Book Now"
                        )}
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default DoctorBooking;

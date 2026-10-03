import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import { IApproveDoctorPayload, IDoctorParams } from "@/types";
import { ISchedule, IScheduleParams } from "@/types/schedule.type";
import { useState } from "react";

interface IProps extends IScheduleParams {
    schedule: ISchedule;
    open: boolean;
    onClose: () => void;
}

const DoctorReviewSheet = ({
    schedule,
    open,
    onClose,
    //  ...params
}: IProps) => {
    // const [confirmRejection, setConfirmRejection] = useState(false);
    // const [rejectionReason, setRejectionReason] = useState("");

    // // console.log(rejectionReason);

    // const { data } = useGetAllDoctors(params);
    // const { mutate: verify, isPending } = useApproveDoctor();

    // // console.log("From inside sheet component: ", data)

    // const selectedDoctor = data?.data?.find(
    //     (doctor) => doctor.id === selectedId,
    // );

    // const handleClose = () => {
    //     setConfirmRejection(false);
    //     setRejectionReason("");
    //     onClose();
    // };

    // const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    //     const reviewData: IApproveDoctorPayload = {
    //         doctorId: selectedId,
    //         verificationStatus: status,
    //         rejectionReason,
    //     };
    //     // setConfirmRejection(false);
    //     // onClose();
    //     // handleClose();

    //     // console.log(reviewData);

    //     verify(reviewData, {
    //         onSuccess: () => {
    //             // console.log("Success");
    //             toast.add({
    //                 title: "Approved",
    //                 description: "Doctor Application Accepted!",
    //                 type: "success",
    //             });
    //             handleClose();
    //         },
    //         onError: () => {
    //             console.log("Error");
    //         },
    //     });
    // };

    // if (!selectedDoctor) {
    //     return null;
    // }

    // // console.log("selectedDoctor: ", selectedDoctor);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            {/* <SheetTrigger>Review</SheetTrigger> */}
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Schedule Details</SheetTitle>
                    <SheetDescription>
                        {new Date(schedule.startDateTime).toLocaleString(
                            undefined,
                            {
                                dateStyle: "full",
                            },
                        )}
                    </SheetDescription>
                </SheetHeader>
                <dl className="mt-4 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <dt>Start</dt>
                        <dd>
                            {new Date(schedule.startDateTime).toLocaleString(
                                undefined,
                                {
                                    timeStyle: "short",
                                },
                            )}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt>End</dt>
                        <dd>
                            {new Date(schedule.endDateTime).toLocaleString(
                                undefined,
                                {
                                    timeStyle: "short",
                                },
                            )}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Status</dt>
                        <dd>
                            {schedule.totalSlots - schedule.availableSlots} /{" "}
                            {schedule.totalSlots} booked
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Meeting Link</dt>
                        <dd className="truncate">
                            <a
                                href={schedule.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Join
                            </a>
                        </dd>
                    </div>
                </dl>
                {/* <SheetFooter>
                    {confirmRejection ? (
                        <div className="flex flex-col gap-3">
                            <Textarea
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(e.target.value)
                                }
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleClose}
                                    variant="outline"
                                    className="flex-1"
                                    size="lg"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleReviewAction("REJECTED")
                                    }
                                    variant="destructive"
                                    className="flex-1"
                                    size="lg"
                                    disabled={!rejectionReason}
                                >
                                    Confirm Rejection
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setConfirmRejection(true)}
                                variant="destructive"
                                size="lg"
                                className="flex-1"
                            >
                                Reject
                            </Button>
                            <Button
                                onClick={() => handleReviewAction("APPROVED")}
                                variant="default"
                                size="lg"
                                className="flex-1"
                            >
                                Approve
                            </Button>
                        </div>
                    )}
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    );
};

export default DoctorReviewSheet;

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { ApiError } from "@/types";
import { ISchedule } from "@/types/schedule.type";
import { useState } from "react";
import ScheduleDetailSheet from "./schedule-detail-sheet";
import { useDeleteSchedule, usePublishSchedule } from "@/hooks";

const ScheduleActions = ({ schedule }: { schedule: ISchedule }) => {
    const [detailOpen, setDetailOpen] = useState(false);
    const [confirmDetele, setConfirmDelete] = useState(false);

    const {
        // data: publishResult,
        mutate: publish,
        isPending: publishPending,
    } = usePublishSchedule();
    const { mutate: remove, isPending: deletePending } = useDeleteSchedule();

    const locked = schedule.status === "PUBLISHED";

    const handlePublish = () => {
        publish(schedule.id, {
            onSuccess: (res: { success: any; message: any; }) => {
                // console.log("res", res);

                if (!res.success) {
                    toast.add({
                        title: "Schedule Publish Failure",
                        description:
                            res.message ||
                            "Something Went Wrong! Please Try Again.",
                        type: "error",
                    });
                    return;
                }

                toast.add({
                    title: "Schedule Published",
                    description: "Patient can now book slots",
                    type: "success",
                });

                // For test purpose
                // const params = new URLSearchParams({
                //     email: doctorData.user.email, // Data share among routes using url
                // });
                // router.push(`/apply/verify-account?${params.toString()}`);
            },
            onError: (err: ApiError) => {
                // console.log("Full error object:", err);
                // console.log("err.data:", err.data);
                // console.log("err.response:", err.response);
                // console.log("err.body:", err.body);
                toast.add({
                    title: "Publish Failure",
                    description:
                        err.data?.message ||
                        err.message ||
                        "Something Went Wrong! Please Try Again.",
                    type: "error",
                });
            },
        });
    };

    const handleDelete = () => {
        remove(schedule.id, {
            onSuccess: (res: { success: any; message: any; }) => {
                // console.log("res", res);

                if (!res.success) {
                    toast.add({
                        title: "Schedule Delete Failure",
                        description:
                            res.message ||
                            "Something Went Wrong! Please Try Again.",
                        type: "error",
                    });
                    return;
                }

                toast.add({
                    title: "Schedule Deleted",
                    description: "Schedule removed successfully",
                    type: "success",
                });
            },
            onError: (err: ApiError) => {
                toast.add({
                    title: "Delete Failure",
                    description:
                        err.data?.message ||
                        err.message ||
                        "Something Went Wrong! Please Try Again.",
                    type: "error",
                });
            },
        });
    };

    if (confirmDetele) {
        return (
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDelete(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deletePending}
                >
                    Confirm
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDetailOpen(true)}
                >
                    View
                </Button>
                {schedule.status === "DRAFT" && (
                    <Button
                        size="sm"
                        onClick={handlePublish}
                        disabled={publishPending}
                    >
                        Publish
                    </Button>
                )}
                {!locked && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setConfirmDelete(true)}
                    >
                        Delete
                    </Button>
                )}
            </div>
            <ScheduleDetailSheet
                schedule={schedule}
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
            />
        </>
    );
};

export default ScheduleActions;

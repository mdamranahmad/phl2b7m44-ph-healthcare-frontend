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
import { useState } from "react";

interface IProps extends IDoctorParams {
    selectedId: string;
    onClose: () => void;
}

const DoctorReviewSheet = ({ selectedId, onClose, ...params }: IProps) => {
    const [confirmRejection, setConfirmRejection] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    // console.log(rejectionReason);

    const { data } = useGetAllDoctors(params);
    const { mutate: verify, isPending } = useApproveDoctor();

    // console.log("From inside sheet component: ", data)

    const selectedDoctor = data?.data?.find(
        (doctor) => doctor.id === selectedId,
    );

    const handleClose = () => {
        setConfirmRejection(false);
        setRejectionReason("");
        onClose();
    };

    const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
        const reviewData: IApproveDoctorPayload = {
            doctorId: selectedId,
            verificationStatus: status,
            rejectionReason,
        };
        // setConfirmRejection(false);
        // onClose();
        // handleClose();

        // console.log(reviewData);

        verify(reviewData, {
            onSuccess: () => {
                // console.log("Success");
                toast.add({
                    title: "Approved",
                    description: "Doctor Application Accepted!",
                    type: "success",
                });
                handleClose();
            },
            onError: () => {
                console.log("Error");
            },
        });
    };

    if (!selectedDoctor) {
        return null;
    }

    // console.log("selectedDoctor: ", selectedDoctor);

    return (
        <Sheet open={!!selectedId} onOpenChange={handleClose}>
            {/* <SheetTrigger>Review</SheetTrigger> */}
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Review and Take Action</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone.
                    </SheetDescription>
                </SheetHeader>
                Doctor Name: {selectedDoctor?.name}
                <SheetFooter>
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
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default DoctorReviewSheet;

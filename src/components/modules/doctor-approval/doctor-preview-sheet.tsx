import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllDoctors } from "@/hooks";
import { IDoctorParams } from "@/types";
import { useState } from "react";

interface IProps extends IDoctorParams {
    selectedId: string;
    onClose: () => void;
}

const DoctorReviewSheet = ({ selectedId, onClose, ...params }: IProps) => {
    const [confirmRejection, setConfirmRejection] = useState(false);

    const { data } = useGetAllDoctors(params);

    // console.log("From inside sheet component: ", data)

    const selectedDoctor = data?.data?.find(
        (doctor) => doctor.id === selectedId,
    );

    const handleReviewAction = () => {
        setConfirmRejection(false);
        onClose();
    };

    if (!selectedDoctor) {
        return null;
    }

    // console.log("selectedDoctor: ", selectedDoctor);

    return (
        <Sheet open={!!selectedId} onOpenChange={onClose}>
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
                            <Textarea />
                            <Button
                                onClick={handleReviewAction}
                                variant="outline"
                            >
                                Confirm
                            </Button>
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
                                onClick={handleReviewAction}
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

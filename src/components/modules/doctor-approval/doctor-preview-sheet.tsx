import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface IProps {
    selectedId: string;
    onClose: () => void;
}

const DoctorReviewSheet = ({ selectedId, onClose }: IProps) => {
    return (
        <Sheet open={!!selectedId} onOpenChange={onClose}>
            {/* <SheetTrigger>Review</SheetTrigger> */}
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone.
                    </SheetDescription>
                </SheetHeader>
                Doctor Id {selectedId}
            </SheetContent>
        </Sheet>
    );
};

export default DoctorReviewSheet;

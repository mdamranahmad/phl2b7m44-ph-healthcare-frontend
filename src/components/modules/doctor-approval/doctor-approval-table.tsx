import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-preview-sheet";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { IDoctorParams, TDoctorVerificationStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";

interface IProps extends IDoctorParams {
    handleReview: Dispatch<SetStateAction<string>>;
    handlePageChange: Dispatch<SetStateAction<number>>;
}

const DoctorApprovalTable = ({
    handleReview,
    handlePageChange,
    ...params
}: IProps) => {
    // const { data, isPending } = useGetAllDoctors();

    // Implement useSuspenseQuery for smart handling data with loading
    const { data } = useSuspenseGetAllDoctors(params);

    // console.log(data);

    // const doctors = data?.data || [];
    const doctors = data?.data;

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
                            <TableHead>Name</TableHead>
                            <TableHead>License Number</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact No.</TableHead>
                            <TableHead>Specialization</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell className="font-medium">
                                    {doctor.name}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {doctor.licenseNumber}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {doctor.email}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {doctor.contactNumber
                                        ? doctor.contactNumber
                                        : "-"}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {doctor.specialization}
                                </TableCell>
                                <TableCell className="text-right">
                                    {/* <DoctorReviewSheet /> */}
                                    {doctor.user.emailVerified ? (
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
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="my-5">
                <TablePagination
                    totalPages={data.meta.totalPages ?? 0}
                    handlePageChange={handlePageChange}
                    page={params.page ?? 0}
                />
            </div>
        </>
    );
};

export default DoctorApprovalTable;

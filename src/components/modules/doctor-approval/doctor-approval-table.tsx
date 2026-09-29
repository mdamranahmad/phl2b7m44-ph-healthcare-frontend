import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-preview-sheet";
import { useGetAllDoctors } from "@/hooks";

const DoctorApprovalTable = () => {
    const { data, isPending } = useGetAllDoctors();

    // console.log(data);

    const doctors = data?.data || [];

    // console.log(doctors);

    if (isPending) {
        return <p>Loading...</p>;
    }

    return (
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
                                <DoctorReviewSheet />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DoctorApprovalTable;

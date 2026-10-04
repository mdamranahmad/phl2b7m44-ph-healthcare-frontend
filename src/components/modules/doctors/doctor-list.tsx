"use client";

import { useGetAllPublicDoctors } from "@/hooks";
import Link from "next/link";

const DoctorList = () => {
    const { data } = useGetAllPublicDoctors({});

    // console.log("data: ", data);

    const doctorList = data?.data || [];

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex gap-3">
                {doctorList.map((doctor) => {
                    const params = new URLSearchParams({ id: doctor.id });
                    return (
                        <Link
                            key={doctor.id}
                            href={`doctors/details?${params.toString()}`}
                        >
                            {doctor.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default DoctorList;

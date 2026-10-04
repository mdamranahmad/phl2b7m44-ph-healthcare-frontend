import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api";

export async function generateStaticParams() {
    const limit = 100;

    const first = await getAllPublicDoctors({ page: 1, limit });

    const totalPages = first.meta.totalPages ?? 1;

    const all = [...first.data];

    for (let page = 2; page <= totalPages; page++) {
        const data = await getAllPublicDoctors({ page, limit });
        all.push(...data.data);
    }

    return all.map((doctor) => ({ id: doctor.id }));
}

// ALTERNATE APPROCE: PASS DOCTOR ID AS PARAMS RATHER THAN SLUG
const DoctorDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const data = (await getPublicDoctorProfile(id)) || undefined;

    const doctor = data?.data;

    if (!doctor) {
        return <p>No Doctor Found With This Id!</p>;
    }

    return (
        <div>
            <p>Name: {doctor.name}</p>
            <p>Specialization: {doctor.specialization}</p>
            <p>
                Fee:{" "}
                {doctor.consultationFee ? `${doctor.consultationFee} BDT` : "-"}
            </p>
        </div>
    );
};

export default DoctorDetailsPage;

// // export async function generateStaticParams() {
// //     /**
// //    * ## Error Type
// // Runtime Error

// // ## Error Message
// // Invalid value returned from generateStaticParams for "/doctors/[id]". Expected an array, but received type undefined. See more info here: https://nextjs.org/docs/messages/generate-static-params

// // Next.js version: 16.3.5 (Turbopack)

// //    */

// //     // const limit = 100;

// //     // const data = await getAllPublicDoctors({ page: 1, limit });

// //     // const doctorList = data?.data || [];

// //     // console.log("data", data);
// //     // return [{ id: "744c9133-5915-4d61-9153-c73fd9d0b079" }];

// //     // console.log(doctorList);

// //     // return doctorList.map((doctor) => ({ id: doctor.id }));

// //     const limit = 100;
// //     // const limit = 1;
// //     const first = await getAllPublicDoctors({ page: 1, limit });

// //     const totalPages = first.meta.totalPages ?? 1;

// //     const all = [...first.data];

// //     for (let page = 2; page <= totalPages; page++) {
// //         const data = await getAllPublicDoctors({ page, limit });
// //         all.push(...data.data);
// //     }

// //     return all.map((doctor) => ({ id: doctor.id }));
// // }

// /**
//  generateStaticParams helps in building static site like
//  ├ ○ /doctors
// ├   /doctors/[id]
// │ ├ ● /doctors/744c9133-5915-4d61-9153-c73fd9d0b079
// │ ├ ● /doctors/1051913e-3af6-4aef-9972-127126a20555
// │ └ ● /doctors/a9d1271b-7805-4322-94bb-cd67c02364d3

// but the problem here is scalability
// what if there is thousands of id, and we set the limit 100!!

//  */

// /**
//  *
//  * ## Error Type
// Runtime Error

// ## Error Message
// Page "/(public)/(marketing)/doctors/[id]/page" is missing exported function "generateStaticParams()", which is required with "output: export" config. See more info here: https://nextjs.org/docs/messages/generate-static-params

// Next.js version: 16.3.5 (Turbopack)

//  */

// // ALTERNATE APPROCE: PASS DOCTOR ID AS PARAMS RATHER THAN SLUG
// const DoctorDetailsPage = () => {
//     return <div>DoctorDetailsPage</div>;
// };

// export default DoctorDetailsPage;

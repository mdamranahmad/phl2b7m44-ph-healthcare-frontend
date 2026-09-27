export interface IDoctorApplicationData {
    user: {
        name: string;
        email: string;
    };
    doctor: {
        specialization: string;
        licenseNumber: string;
        qualifications: string;
        experienceYears: number | string;
        contactNumber: string;
        address: string;
        consultationFee: number | undefined;
        bio: string;
    };
}

export interface IDoctorApplicationPayload {
    resume: File;
    additionalFiles: File[];
    data: IDoctorApplicationData;
}

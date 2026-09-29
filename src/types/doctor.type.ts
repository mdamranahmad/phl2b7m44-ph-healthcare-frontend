import { IUser } from "./user.type";

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

export type TDoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IDoctor {
    id: string;
    name: string;
    email: string;
    address?: string | null;
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    bio?: string | null;
    consultationFee?: number | string | null;
    contactNumber?: string | null;
    verificationStatus: TDoctorVerificationStatus;
    rejectionReason?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: string | null;
    resume?: string | null;
    additionalFiles?: { url: string; publicId: string }[] | null;
    isDeleted: boolean;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: IUser;
}

export interface IDoctorParams {
    verificationStatus?: TDoctorVerificationStatus;
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortOrder?: "desc" | "ssc";
}

export interface IUserRegistrationPayload {
    name: string;
    email: string;
    password: string;
    patient: {
        contactNumber?: string;
    };
}

export interface IUserLoginPayload {
    email: string;
    password: string;
}

export interface IUserVerifyAccountPayload {
    email: string;
    otp: string;
}

export interface IDoctorApplicationPayload {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: string;
    consultationFee: string;
    bio: string;
}

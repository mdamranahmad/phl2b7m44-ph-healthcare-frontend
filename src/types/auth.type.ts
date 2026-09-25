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

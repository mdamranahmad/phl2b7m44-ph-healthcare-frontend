export interface IUserRegistrationPayload {
    name: string;
    email: string;
    password: string;
    patient: {
        contactNumber?: string;
    };
}

import z from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_FILES = 5;

export const MAX_BIO_LENGTH = 300;

export const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
    return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
    return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const DoctorApplicationZSchema = z.object({
    name: z
        .string({
            message: "Name is required",
        })
        .trim()
        .min(2, "Name must be at least 2 characters"),

    email: z.email({
        message: "Invalid email address",
    }),
    phone: z.string().trim(),
    address: z.string().trim(),
    specialization: z
        .string({
            message: "Specialization is required",
        })
        .trim()
        .min(1, "Specialization cannot be empty"),

    licenseNumber: z
        .string({
            message: "License number is required",
        })
        .trim()
        .min(1, "License number cannot be empty"),

    qualifications: z
        .string({
            message: "Qualifications are required",
        })
        .trim()
        .min(1, "Qualifications cannot be empty"),

    // Coerce string to number for FormData inputs
    experienceYears: z.coerce
        .number({
            message: "Experience years must be a valid number",
        })
        .int("Experience must be an integer")
        .nonnegative("Experience cannot be negative"),

    // Coerce string to number for FormData inputs
    consultationFee: z.coerce
        .number({
            message: "Consultation fee must be a valid number",
        })
        .positive("Consultation fee must be a positive number"),
    bio: z
        .string()
        .trim()
        .max(MAX_BIO_LENGTH, `Bio cannot exceed ${MAX_BIO_LENGTH} characters`),
});

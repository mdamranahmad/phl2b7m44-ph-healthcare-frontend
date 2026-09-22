import z from "zod";

export const loginZSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Add at least one uppercase letter")
        .regex(/[a-z]/, "Add at least one lowercase letter")
        .regex(/[0-9]/, "Add at least one number"),
});

export const patientRegistrationZSchema = z
    .object({
        name: z
            .string("Not A String!!")
            .min(3, "Name must contain atleast 3 Characters!")
            .max(20),
        email: z.email(),
        contactNumber: z
            .string()
            .refine(
                (val) => val === "" || /^(?:\+?880|0)1[3-9]\d(8)$/.test(val),
                {
                    message: "Please provide valid Bangladeshi number.",
                },
            ),
        // Regex is not a suitable option, as default value for Phone number triggers the regex
        // Refine is a better option
        // .regex(
        //     /^(?:\+?880|0)1[3-9]\d(8)$/,
        //     "Please provide valid Bangladeshi number.",
        // ), //.optional(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Add at least one uppercase letter")
            .regex(/[a-z]/, "Add at least one lowercase letter")
            .regex(/[0-9]/, "Add at least one number"),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Add at least one uppercase letter")
            .regex(/[a-z]/, "Add at least one lowercase letter")
            .regex(/[0-9]/, "Add at least one number"),

        // patient: z
        //     .object({

        //     })
        //     .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

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
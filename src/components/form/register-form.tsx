"use client";

import { Button } from "../ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useGoogleOAuth, useLogin, useRegistration } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { patientRegistrationZSchema } from "@/validation";
import z from "zod";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const { mutate: registration, isPending: registrationPending } =
        useRegistration();

    // Type Infer to handle contactNumber type mismatch
    type PatientDefaultValues = z.infer<typeof patientRegistrationZSchema>;

    const defaultValues: PatientDefaultValues = {
        // name: "",
        // email: "",
        // contactNumber: "",
        // password: "",
        // confirmPassword: "",
        name: "Patient 01",
        email: "patient01@email.com",
        contactNumber: "01912121212",
        password: "123456Aa",
        confirmPassword: "123456Aa",
    };

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: patientRegistrationZSchema,
        },
        onSubmit: async ({ value }) => {
            // console.log("value", value);
            const registrationData = {
                name: value.name,
                email: value.email,
                password: value.password,
                patient: {
                    contactNumber: value.contactNumber,
                },
            };
            registration(registrationData, {
                onSuccess: (res) => {
                    // console.log("res", res);

                    if (!res.success) {
                        toast.add({
                            title: "Server Failure",
                            description:
                                "Something Went Wrong! Please Try Again.",
                            type: "error",
                        });
                    }

                    toast.add({
                        title: "Regsitration Successful",
                        description: "Please verify your email",
                        type: "success",
                    });

                    // For test purpose
                    const params = new URLSearchParams({
                        email: registrationData.email,
                    });
                    router.push(
                        `/register/verify-account?${params.toString()}`,
                    );
                },
                onError: (err) => {
                    // console.log("error", err);
                    toast.add({
                        title: "Registration Failure",
                        description:
                            err.message ||
                            "Something Went Wrong! Please Try Again.",
                        type: "error",
                    });
                },
            });
        },
    });
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Create an Account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    <form.Field name="name">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Full Name
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            placeholder="John Doe"
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value,
                                                );
                                            }}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            autoComplete="name"
                                            aria-invalid={isInvalid}
                                        />
                                    </div>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="email">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="email"
                                            placeholder="m@example.com"
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value,
                                                );
                                            }}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                        />
                                    </div>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="contactNumber">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Phone Number
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="tel"
                                            placeholder="+880 1234 567890"
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value,
                                                );
                                            }}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                        />
                                    </div>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="********"
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value,
                                                );
                                            }}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                            aria-label={
                                                showPassword
                                                    ? "Hide Password"
                                                    : "Show Password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="confirmPassword">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Confirm Password
                                    </FieldLabel>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="********"
                                            onChange={(e) => {
                                                field.handleChange(
                                                    e.target.value,
                                                );
                                            }}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            autoComplete="off"
                                            aria-invalid={isInvalid}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                );
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide Password"
                                                    : "Show Password"
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <Button disabled={registrationPending} type="submit">
                        {/**button will be grayed out if disabled is true, prevent user from multiple submit */}
                        {registrationPending ? (
                            <Spinner>"Submitting" </Spinner>
                        ) : (
                            "Submit"
                        )}{" "}
                        {/* dynamin text inside submit box */}
                    </Button>
                </FieldGroup>
            </form>
            <FieldSeparator>Or Continue With</FieldSeparator>
            <GoogleLoginComponent />
            <div className="text-center text-sm text-muted-foreground">
                Already have an account ?{" "}
                <Link
                    href="/"
                    className="font-medium underline-offset-4 hover:text-primary"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

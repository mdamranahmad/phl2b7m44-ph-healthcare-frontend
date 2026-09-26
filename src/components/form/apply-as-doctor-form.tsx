"use client";

import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Eye, EyeOff, FileUp, X } from "lucide-react";
import { useRegistration } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import {
    isAcceptedFileSize,
    isAcceptedFileType,
    MAX_FILE_SIZE,
    MAX_FILE_SIZE_BYTES,
    patientRegistrationZSchema,
} from "@/validation";
import z from "zod";
import { Textarea } from "../ui/textarea";

export default function ApplyAsDoctorForm() {
    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    // const { mutate: registration, isPending: registrationPending } =
    //     useRegistration();

    // Type Infer to handle contactNumber type mismatch
    // type PatientDefaultValues = z.infer<typeof patientRegistrationZSchema>;

    // Data Signature
    // {
    //     user: {
    //         name: "Dr. Sarah Jenkins",
    //         email: "{{doctorEmail}}",
    //     },
    //     doctor: {
    //         address: "123 Medical Plaza, Suite 400, New York, NY",
    //         specialization: "Cardiology",
    //         licenseNumber: "MED-2026-98765",
    //         qualifications: "MD, FACC - Harvard Medical School",
    //         experienceYears: 12,
    //         bio: "Dedicated cardiologist with over a decade of experience specializing in non-invasive cardiovascular imaging and preventative heart care.",
    //         consultationFee: 150,
    //         contactNumber: "+1-555-0199",
    //     },
    // };

    const defaultValues = {
        name: "",
        email: "",
        contactNumber: "",
        address: "",
        specialization: "",
        licenseNumber: "",
        qualifications: "",
        experienceYears: "",
        consultationFee: "",
        bio: "",
        resume: null as File | null,
    };

    const form = useForm({
        defaultValues,
        // validators: {
        //     onSubmit: patientRegistrationZSchema,
        // },
        onSubmit: async ({ value }) => {
            console.log("value", value);
            // const registrationData = {
            //     name: value.name,
            //     email: value.email,
            //     password: value.password,
            //     patient: {
            //         contactNumber: value.contactNumber,
            //     },
            // };
            // registration(registrationData, {
            //     onSuccess: (res) => {
            //         // console.log("res", res);

            //         if (!res.success) {
            //             toast.add({
            //                 title: "Server Failure",
            //                 description:
            //                     "Something Went Wrong! Please Try Again.",
            //                 type: "error",
            //             });
            //         }

            //         toast.add({
            //             title: "Regsitration Successful",
            //             description: "Please verify your email",
            //             type: "success",
            //         });

            //         // For test purpose
            //         const params = new URLSearchParams({
            //             email: registrationData.email, // Data share among routes using url
            //         });
            //         router.push(
            //             `/register/verify-account?${params.toString()}`,
            //         );
            //     },
            //     onError: (err) => {
            //         // console.log("error", err);
            //         toast.add({
            //             title: "Registration Failure",
            //             description:
            //                 err.message ||
            //                 "Something Went Wrong! Please Try Again.",
            //             type: "error",
            //         });
            //     },
            // });
        },
    });
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Apply to join PH Healthcare
                </h1>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                noValidate
            >
                <FieldGroup>
                    <div className="grid gap-5 sm:grid-cols-2">
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
                                                placeholder="Dr. Sarah Jenkins"
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
                                            Email Address
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
                        <form.Field name="address">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Practice Address
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="123 Medical Plaza, Suite 400, New York, NY"
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
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <form.Field name="specialization">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Specialization
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="Cardiology"
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
                        <form.Field name="licenseNumber">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            BMDC RRegistration Number
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="MED-2026-98765"
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
                        <form.Field name="qualifications">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Qualifications
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="MD, FACC - Harvard Medical School"
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
                        <form.Field name="experienceYears">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Years of Experience
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                placeholder="12"
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
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <form.Field name="consultationFee">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Consultation Fee (BDT)
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                placeholder="1000"
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
                    </div>

                    <form.Field name="bio">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Professional bio{" "}
                                        <span className="font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        rows={4}
                                        placeholder="Share your background, areas of interest and patient care philosophy..."
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        aria-invalid={isInvalid}
                                    />
                                    <div className="flex items-center justify-between gap-2">
                                        <FieldDescription>
                                            Shown on your public profile after
                                            approval.
                                        </FieldDescription>
                                        <span className="text-xs text-muted-foreground">
                                            {field.state.value.length}/1000
                                        </span>
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
                    <form.Field name="resume">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            const file = field.state.value;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="resume-field">
                                        Resume
                                    </FieldLabel>
                                    <div>
                                        <Button
                                            render={
                                                <label htmlFor="resume-field" />
                                            }
                                            nativeButton={false}
                                            variant="outline"
                                        >
                                            <FileUp size="4" />
                                            <label htmlFor="resume-field">
                                                Upload Resume
                                            </label>
                                        </Button>

                                        <Input
                                            id="resume-field"
                                            type="file"
                                            className="sr-only"
                                            name={field.name}
                                            onChange={(e) => {
                                                const selected =
                                                    e.target.files?.[0] ?? null;

                                                if (
                                                    (selected &&
                                                        !isAcceptedFileSize(
                                                            selected?.size,
                                                        )) ||
                                                    !isAcceptedFileType(
                                                        selected?.type as string,
                                                    )
                                                ) {
                                                    field.handleBlur();
                                                    return;
                                                }
                                                field.handleChange(selected);
                                                e.target.value = "";
                                            }}
                                        />
                                        {file ? (
                                            <div className="inline-flex">
                                                <span>{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        field.handleChange(null)
                                                    }
                                                >
                                                    <X />
                                                </button>
                                            </div>
                                        ) : (
                                            <span>
                                                {" "}
                                                Supported File: .pdf, .doc,
                                                .dox, .png, .jpg ans size{" "}
                                                {MAX_FILE_SIZE}MB
                                            </span>
                                        )}
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
                </FieldGroup>
                <div className="flex justify-end w-full mt-5">
                    <Button type="submit" size="lg">
                        {/**button will be grayed out if disabled is true, prevent user from multiple submit */}
                        {/* {registrationPending ? (
                            <Spinner>"Submitting" </Spinner>
                        ) : ( */}
                        "Submit"
                        {/* )}{" "} */}
                        {/* dynamin text inside submit box */}
                    </Button>
                </div>
            </form>
            {/* <FieldSeparator>Or Continue With</FieldSeparator>
            <GoogleLoginComponent /> */}
            <p className="text-xs leading-relaxed text-muted-foreground">
                Already an approved doctor?{" "}
                <Link
                    href="/login"
                    className="font-medium underline-offset-4 hover:text-primary"
                >
                    Sign in to the Doctor Portal
                </Link>
                . Patient applications should use the{" "}
                <Link
                    href="/login"
                    className="font-medium underline-offset-4 hover:text-primary"
                >
                    patient registration
                </Link>{" "}
                form instead.
            </p>
        </div>
    );
}

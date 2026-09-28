"use client";

import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Eye, EyeOff, FileText, FileUp, Plus, X } from "lucide-react";
import { useApplyAsDoctor, useRegistration } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import {
    DoctorApplicationZSchema,
    isAcceptedFileSize,
    isAcceptedFileType,
    MAX_ADDITIONAL_FILES,
    MAX_FILE_SIZE,
    MAX_FILE_SIZE_BYTES,
    patientRegistrationZSchema,
} from "@/validation";
import { Textarea } from "../ui/textarea";
import { formatFileSize } from "@/utils";
import { IDoctorApplicationData } from "@/types/doctor.type";

export default function ApplyAsDoctorForm() {
    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const { mutate: apply, isPending: applyPending } = useApplyAsDoctor();

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
        // name: "Doctor Strange",
        // email: "strange@email.com",
        // contactNumber: "123456789",
        // address: "222B, Backer Street",
        // specialization: "Neuro Sergion",
        // licenseNumber: "SH654987013",
        // qualifications: "KhazadDhum",
        // experienceYears: "4",
        // consultationFee: "1000",
        // bio: "Expertised in KamarTaj",
        // resume: null as File | null,
        // additionalFiles: [] as File[],
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
        additionalFiles: [] as File[],
    };

    const form = useForm({
        defaultValues,
        // validators: {
        //     onSubmit: patientRegistrationZSchema,
        // },

        validators: {
            onSubmit: DoctorApplicationZSchema,
        },
        onSubmit: async ({ value }) => {
            const doctorData: IDoctorApplicationData = {
                user: {
                    name: value.name.trim(),
                    email: value.email.trim(),
                },
                doctor: {
                    specialization: value.specialization.trim(),
                    licenseNumber: value.licenseNumber.trim(),
                    qualifications: value.qualifications.trim(),
                    experienceYears: value.experienceYears.trim(),
                    contactNumber: value.contactNumber.trim(),
                    address: value.address.trim(),
                    consultationFee: value.consultationFee.trim()
                        ? Number(value.consultationFee)
                        : undefined,
                    bio: value.bio.trim(),
                },
            };

            apply(
                {
                    data: doctorData,
                    resume: value.resume as File,
                    additionalFiles: value.additionalFiles,
                },
                {
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
                            title: "Application Submitted",
                            description: "Please verify your account",
                            type: "success",
                        });

                        // For test purpose
                        const params = new URLSearchParams({
                            email: doctorData.user.email, // Data share among routes using url
                        });
                        router.push(
                            `/apply/verify-account?${params.toString()}`,
                        );
                    },
                    onError: (err) => {
                        // console.log("error", err);
                        toast.add({
                            title: "Application Failure",
                            description:
                                err.message ||
                                "Something Went Wrong! Please Try Again.",
                            type: "error",
                        });
                    },
                },
            );
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
                                            Practice Address{" "}
                                            <span className="font-normal text-muted-foreground">
                                                (optional)
                                            </span>
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
                                            Consultation Fee (BDT){" "}
                                            <span className="font-normal text-muted-foreground">
                                                (optional)
                                            </span>
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
                                    <div className="flex flex-wrap items-center gap-3">
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

                                                // if (
                                                //     (selected &&
                                                //         !isAcceptedFileSize(
                                                //             selected?.size,
                                                //         )) ||
                                                //     !isAcceptedFileType(
                                                //         selected?.type as string,
                                                //     )
                                                // ) {
                                                //     field.handleBlur();
                                                //     return;
                                                // }
                                                field.handleChange(selected);
                                                e.target.value = "";
                                            }}
                                        />
                                        {file ? (
                                            <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                                <span className="flex min-w-0 items-center gap-2">
                                                    <FileText className="size-4 shrink-0 text-primary" />
                                                    <span className="truncate">
                                                        {file.name}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatFileSize(
                                                            file.size,
                                                        )}
                                                    </span>
                                                </span>
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${file.name}`}
                                                    onClick={() => {
                                                        field.handleChange(
                                                            null,
                                                        );
                                                        field.handleBlur();
                                                    }}
                                                    className="text-muted-foreground transition-colors hover:text-destructive  focus:outline-none"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-center text-muted-foreground">
                                                {" "}
                                                PDF, DOC, DOCZ, or Image up to{" "}
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
                    <form.Field name="additionalFiles">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            const files = field.state.value;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="additional-file-field">
                                        Additional Files{" "}
                                        <span className="font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </FieldLabel>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            render={
                                                // biome-ignore lint/a11y/noLabelWithoutControl: explanation>
                                                <label htmlFor="additional-file-field" />
                                            }
                                            nativeButton={false}
                                            variant="outline"
                                        >
                                            <Plus size="4" />
                                            <label htmlFor="additional-file-field">
                                                Add Files
                                            </label>
                                        </Button>

                                        <Input
                                            id="additional-file-field"
                                            type="file"
                                            multiple
                                            className="sr-only"
                                            name={field.name}
                                            onChange={(e) => {
                                                const incoming = Array.from(
                                                    e.target.files ?? [],
                                                );
                                                if (incoming.length === 0) {
                                                    return;
                                                }

                                                // const invalid = incoming.some(
                                                //     (file) => {
                                                //         !isAcceptedFileSize(
                                                //             file.size,
                                                //         ) ||
                                                //             !isAcceptedFileType(
                                                //                 file.type,
                                                //             );
                                                //     },
                                                // );

                                                // if (invalid) {
                                                //     field.handleBlur();
                                                //     e.target.value = "";
                                                //     return;
                                                // }
                                                // console.log([
                                                //     ...files,
                                                //     ...incoming,
                                                // ]);

                                                field.handleChange([
                                                    ...files,
                                                    ...incoming,
                                                ]);
                                                e.target.value = "";
                                            }}
                                        />
                                        {files.length > 0 && (
                                            <span className="text-xs text-muted-foreground">
                                                {files.length} of{" "}
                                                {MAX_ADDITIONAL_FILES} added
                                            </span>
                                        )}
                                        {/* {file ? (
                                            
                                        ) : (
                                            <span>
                                                {" "}
                                                Supported File: .pdf, .doc,
                                                .dox, .png, .jpg ans size{" "}
                                                {MAX_FILE_SIZE}MB
                                            </span>
                                        )} */}
                                    </div>
                                    {files.length > 0 && (
                                        <ul className="flex flex-col gap-2">
                                            {files.map((file, index) => (
                                                <li
                                                    key={`${file.name}-${index}`}
                                                    className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                                                >
                                                    <span className="flex min-w-0 items-center gap-2">
                                                        <FileText className="size-4 shrink-0 text-primary" />
                                                        <span className="truncate">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatFileSize(
                                                                file.size,
                                                            )}
                                                        </span>
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${file.name}`}
                                                        onClick={() => {
                                                            field.handleChange(
                                                                files.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                ),
                                                            );
                                                            field.handleBlur();
                                                        }}
                                                        className="text-muted-foreground transition-colors hover:text-destructive  focus:outline-none"
                                                    >
                                                        <X className="size-4" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

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
                    <Button type="submit" size="lg" disabled={applyPending}>
                        {/**button will be grayed out if disabled is true, prevent user from multiple submit */}
                        {applyPending ? (
                            <>
                                <Spinner /> Submitting
                            </>
                        ) : (
                            "Submit"
                        )}{" "}
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

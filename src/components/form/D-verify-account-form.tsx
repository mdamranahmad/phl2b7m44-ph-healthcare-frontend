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
import { loginZSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useLogin } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";

export default function VerifyAccountForm() {
    const searchParams = useSearchParams(); // a hook to catch data from url
    console.log(searchParams);


    return (
        <div>
            Verify Account Page
        </div>
    )

    // const [showPassword, setShowPassword] = useState(false);
    // const router = useRouter();

    // const { mutate: login, isPending: loginPending } = useLogin();

    // const form = useForm({
    //     defaultValues: {
    //         // email: "",
    //         // password: "",
    //         email: "superadmin01@email.com", // For Test Purpose only
    //         password: "Super@admin12345",
    //     },
    //     validators: {
    //         onSubmit: loginZSchema,
    //     },
    //     onSubmit: ({ value }) => {
    //         // console.log("value", value);
    //         const loginData = {
    //             email: value.email,
    //             password: value.password,
    //         };

    //         login(loginData, {
    //             onSuccess: (res) => {
    //                 // console.log("res", res);
    //                 toast.add({
    //                     title: "Login Success",
    //                     description: "Welcome Back",
    //                     type: "success",
    //                 });
    //                 router.push("/");
    //             },
    //             onError: (err) => {
    //                 // console.log("error", err);
    //                 toast.add({
    //                     title: "Authorization Failure",
    //                     description:
    //                         err.message ||
    //                         "Something Went Wrong! Please Try Again.",
    //                     type: "error",
    //                 });
    //             },
    //         });
    //     },
    // });

    // const handleGoogleSuccess = (credentialResponse: {
    //     credential?: string;
    // }) => {
    //     const idToken = credentialResponse.credential;
    //     if (!idToken) {
    //         toast.add({
    //             title: "Google OAuth Failed!",
    //             description: "Something Went Wrong. Please Try Again.",
    //             type: "error",
    //         });
    //         return;
    //     }

    //     googleLogin(
    //         { idToken },
    //         {
    //             onSuccess: () => {
    //                 toast.add({
    //                     title: "Google Login Success",
    //                     description: "Welcome Back",
    //                     type: "success",
    //                 });
    //                 router.push("/");
    //             },
    //             onError: (err) => {
    //                 toast.add({
    //                     title: "Google OAuth Failed!",
    //                     description:
    //                         err.message ||
    //                         "Something Went Wrong. Please Try Again.",
    //                     type: "error",
    //                 });
    //             },
    //         },
    //     );
    // };
    // const handleGoogleError = () => {
    //     toast.add({
    //         title: "Google OAuth Failed!",
    //         description: "Something Went Wrong. Please Try Again.",
    //         type: "error",
    //     });
    // };



    // return (
    //     <div className="flex flex-col gap-5">
    //         <div className="flex flex-col items-center gap-2 text-center">
    //             <h1 className="text-2xl font-bold tracking-tight">
    //                 Login to your account
    //             </h1>
    //             <p className="text-balance text-sm text-muted-foreground">
    //                 Enter your email below to login to your account
    //             </p>
    //         </div>

    //         <form
    //             onSubmit={(e) => {
    //                 e.preventDefault();
    //                 form.handleSubmit();
    //             }}
    //         >
    //             <FieldGroup>
    //                 <form.Field name="email">
    //                     {(field) => {
    //                         const isInvalid =
    //                             field.state.meta.isTouched &&
    //                             !field.state.meta.isValid;

    //                         return (
    //                             <Field data-invalid={isInvalid}>
    //                                 <FieldLabel htmlFor={field.name}>
    //                                     Email
    //                                 </FieldLabel>
    //                                 <Input
    //                                     id={field.name}
    //                                     name={field.name}
    //                                     onChange={(e) => {
    //                                         field.handleChange(e.target.value);
    //                                     }}
    //                                     value={field.state.value}
    //                                     onBlur={field.handleBlur}
    //                                     autoComplete="off"
    //                                     aria-invalid={isInvalid}
    //                                 />
    //                                 {isInvalid && (
    //                                     <FieldError
    //                                         errors={field.state.meta.errors}
    //                                     />
    //                                 )}
    //                             </Field>
    //                         );
    //                     }}
    //                 </form.Field>
    //                 <form.Field name="password">
    //                     {(field) => {
    //                         const isInvalid =
    //                             field.state.meta.isTouched &&
    //                             !field.state.meta.isValid;

    //                         return (
    //                             <Field data-invalid={isInvalid}>
    //                                 <FieldLabel htmlFor={field.name}>
    //                                     Password
    //                                 </FieldLabel>
    //                                 <div className="relative">
    //                                     <Input
    //                                         id={field.name}
    //                                         name={field.name}
    //                                         // type="password"
    //                                         type={
    //                                             showPassword
    //                                                 ? "text"
    //                                                 : "password"
    //                                         }
    //                                         onChange={(e) => {
    //                                             field.handleChange(
    //                                                 e.target.value,
    //                                             );
    //                                         }}
    //                                         value={field.state.value}
    //                                         onBlur={field.handleBlur}
    //                                         autoComplete="off"
    //                                         aria-invalid={isInvalid}
    //                                     />
    //                                     <button
    //                                         className="absolute right-3 top-1/2 -translate-y-1/2"
    //                                         type="button"
    //                                         onClick={() =>
    //                                             setShowPassword((prev) => !prev)
    //                                         }
    //                                     >
    //                                         {showPassword ? (
    //                                             <EyeClosed className="size-4" />
    //                                         ) : (
    //                                             <Eye className="size-4" />
    //                                         )}
    //                                     </button>
    //                                 </div>
    //                                 {isInvalid && (
    //                                     <FieldError
    //                                         errors={field.state.meta.errors}
    //                                     />
    //                                 )}
    //                             </Field>
    //                         );
    //                     }}
    //                 </form.Field>
    //                 <Button disabled={loginPending} type="submit">
    //                     {/**button will be grayed out if disabled is true, prevent user from multiple submit */}
    //                     {loginPending ? (
    //                         <Spinner>"Submitting" </Spinner>
    //                     ) : (
    //                         "Submit"
    //                     )}{" "}
    //                     {/* dynamin text inside submit box */}
    //                 </Button>
    //             </FieldGroup>
    //         </form>
    //         <FieldSeparator>Or Continue With</FieldSeparator>
    //         {/* <GoogleLogin
    //             theme="outline"
    //             shape="pill"
    //             text="continue_with"
    //             onSuccess={handleGoogleSuccess}
    //             onError={handleGoogleError}
    //         /> */}
    //         <GoogleLoginComponent />
    //     </div>
    // );
}

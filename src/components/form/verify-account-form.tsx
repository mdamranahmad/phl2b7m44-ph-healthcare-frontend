"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "../ui/toast";

export default function VerifyAccountForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [otp, setOtp] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);

    const { mutate: verifyAccount, isPending: verifyAccountPending } =
        useVerifyAccount();

    const email = searchParams.get("email");

    const handleOTP = () => {
        if (otp.length !== 6) {
            setIsInvalid(true);
            return;
        }

        const verifyData = {
            email,
            otp,
        };

        verifyAccount(verifyData, {
            onSuccess: (res) => {
                // console.log("res", res);

                if (!res.success) {
                    toast.add({
                        title: "Server Failure",
                        description: "Something Went Wrong! Please Try Again.",
                        type: "error",
                    });
                }

                toast.add({
                    title: "Regsitration Successful",
                    description: "Please verify your email",
                    type: "success",
                });

                router.push("/");
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
    };

    if (!email) {
        router.push("/");
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Verify Account</CardTitle>
                <CardDescription>
                    Please proivde the OTP sent to your email
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="otp-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleOTP();
                    }}
                >
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor="otp">OTP</FieldLabel>{" "}
                        {/*htmlFor focuses the target after click */}
                        <InputOTP
                            maxLength={6}
                            onChange={(value) => {
                                setOtp(value);
                                if (isInvalid) {
                                    setIsInvalid(false);
                                }
                            }}
                            value={otp}
                            autoComplete="off"
                            name="otp"
                            id="otp"
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            {/**pattern  rejects everything except what is defined */}
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {isInvalid && (
                            <FieldError
                                errors={[
                                    {
                                        message:
                                            "Invalid Code. Please try again.",
                                    },
                                ]}
                            ></FieldError>
                        )}
                    </Field>
                </form>
            </CardContent>
            <CardFooter>
                <Button>Resend</Button>
                <Button type="submit" form="otp-form">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
}

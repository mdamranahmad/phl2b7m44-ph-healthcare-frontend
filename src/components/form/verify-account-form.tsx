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
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

// const RESEND_COOLDOWN = 120;
const RESEND_COOLDOWN = 10;   // for test purpose

export default function VerifyAccountForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [otp, setOtp] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

    const { mutate: verifyAccount, isPending: verifyAccountPending } =
        useVerifyAccount();

    const email = searchParams.get("email") || "";

    useEffect(() => {
        if (!email) {
            router.push("/");
        }
    }, [email]);

    useEffect(() => {
        if (resendTimer <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

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
                    title: "Verification Successful",
                    description: "Welcome onboard",
                    type: "success",
                });

                router.push("/");
            },
            onError: (err) => {
                // console.log("error", err);
                toast.add({
                    title: "Verification Failure",
                    description:
                        err.message ||
                        "Something Went Wrong! Please Try Again.",
                    type: "error",
                });
            },
        });
    };

    // if (!email) {
    //     // router.push("/");
    //     return null;
    // }

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
                        <FieldDescription>
                            Resend in {resendTimer}
                        </FieldDescription>
                    </Field>
                </form>
            </CardContent>
            <CardFooter>
                <Button disabled={resendTimer > 0}>Resend</Button>
                <Button disabled={verifyAccountPending} type="submit">
                    {/**button will be grayed out if disabled is true, prevent user from multiple submit */}
                    {verifyAccountPending ? (
                        <Spinner>"Submitting" </Spinner>
                    ) : (
                        "Submit"
                    )}{" "}
                    {/* dynamin text inside submit box */}
                </Button>
            </CardFooter>
        </Card>
    );
}

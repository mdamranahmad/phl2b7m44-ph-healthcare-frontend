"use client";

import { useSearchParams } from "next/navigation";
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
import { Field, FieldLabel } from "../ui/field";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerifyAccountForm() {
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState("");

    const email = searchParams.get("email");

    const handleOTP = () => {
        console.log(otp);
    };

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
                    <Field>
                        <FieldLabel htmlFor="otp">OTP</FieldLabel>{" "}
                        {/*htmlFor focuses the target after click */}
                        <InputOTP
                            maxLength={6}
                            onChange={(value) => {
                                setOtp(value);
                            }}
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

// import VerifyAccountForm from "@/components/form/D-verify-account-form";
import VerifyAccountForm from "@/components/form/verify-account-form";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyAccountPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium"
                    >
                        PH HealthCare
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {/* <VerifyAccountForm /> */}
                        {/**
                         * ERROR FROM BUILD
                         * ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/register/verify-account".
                         */}
                        {/**SLOVED IN THE NEXT LINE */}
                        <Suspense fallback={<p>Loading...</p>}>
                            {/**
                             * Suspense make nextjs to render a fall backup for this part
                             */}
                            <VerifyAccountForm />
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/login.jpg"
                    alt="Login Cover Img"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}

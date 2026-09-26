import ApplyAsDoctorForm from "@/components/form/apply-as-doctor-form";
import Link from "next/link";

export default function ApplyAsDoctorPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-3">
            <div className="flex flex-col gap-4 p-6 md:p-10 col-span-2">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium"
                    >
                        PH HealthCare
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xl">
                        <ApplyAsDoctorForm />
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

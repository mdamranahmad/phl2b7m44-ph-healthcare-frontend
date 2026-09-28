import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccessDenied = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex gap-3 items-center">
                <div className="bg-red-200 rounded-full p-4">
                    <ShieldAlert className="text-red-500 size-8" />
                </div>
                <div>
                    <h1 className="txtlg font-semibold">
                        You Do Not Have Access To This Page!
                    </h1>
                    <p>
                        Go back to{" "}
                        <Link href="/" className="underline">
                            home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;

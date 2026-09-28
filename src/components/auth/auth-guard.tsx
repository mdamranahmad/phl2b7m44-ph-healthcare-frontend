"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { data, isPending, isError } = useGetMe();

    const user = data?.data;

    console.log(data);

    // Check if user is logged in, redirect user to login page if not
    useEffect(() => {
        if (isPending) {
            // for isPending not checked, even logged in user will be redirected
            return;
        }
        if (isError || !user) {
            router.replace("/login");
        }
    }, [isError, isPending, user, router]);

    return <>{children}</>;
};

export default AuthGuard;

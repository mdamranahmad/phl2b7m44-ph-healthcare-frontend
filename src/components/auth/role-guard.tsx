"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface IProps {
    children: ReactNode;
    roles: UserRole[];
}

const RoleGuard = ({ children, roles }: IProps) => {
    const router = useRouter();
    const { data, isPending, isError } = useGetMe();

    const user = data?.data;

    const isAuthorized = !!user && roles.includes(user.role); // !! converts variable into a boolean

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

    if (isPending) {
        return <AuthLoading />;
    }

    if (isError || !user) {
        return <AuthLoading label="Redirecting..." />;
    }

    if (isAuthorized) {
        return <>{children}</>;
    }

    return <AccessDenied />;
};

export default RoleGuard;

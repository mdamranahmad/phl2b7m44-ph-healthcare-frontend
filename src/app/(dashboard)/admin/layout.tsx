import RoleGuard from "@/components/auth/role-guard";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <RoleGuard roles={["ADMIN"]}>Admin Layout{children}</RoleGuard>;
}

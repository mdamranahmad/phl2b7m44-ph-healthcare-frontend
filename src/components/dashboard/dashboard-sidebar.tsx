"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import PhHealthcareLogo from "@/assets/svg/Logo";
import { UserRole } from "@/types";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import { TSidebarItems } from "@/types/sidebar.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarRoutes: Partial<Record<UserRole, TSidebarItems>> = {
    SUPER_ADMIN: adminRoutes,
    ADMIN: adminRoutes,
    DOCTOR: doctorRoutes,
    PATIENT: patientRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
    const pathname = usePathname();

    // const routes = sidebarRoutes[role] as TSidebarItems;
    const routes = sidebarRoutes[role] || [];

    console.log("pathname: ", pathname);

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <PhHealthcareLogo />
                        <span>PH Healthcare</span>
                    </div>
                </Link>
                {/* <VersionSwitcher
                    versions={data.versions}
                    defaultVersion={data.versions[0]}
                />
                <SearchForm /> */}
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={pathname === item.url}
                                        >
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";

const DoctorApprovalTabs = () => {
    return (
        <>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                {/* <TabsContent value="pending">
                    <DoctorApprovalTable />
                </TabsContent>
                <TabsContent value="approved">
                    <DoctorApprovalTable />
                </TabsContent>
                <TabsContent value="rejected">
                    <DoctorApprovalTable />
                </TabsContent>
                <TabsContent value="all">
                    <DoctorApprovalTable />
                </TabsContent> */}
            </Tabs>
            <Suspense fallback={<DoctorApprovalTableLoading />}>
                <DoctorApprovalTable />
            </Suspense>
        </>
    );
};

export default DoctorApprovalTabs;

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { IDoctorParams, TDoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";

const verificationStatus: ["ALL" | TDoctorVerificationStatus, string][] = [
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["ALL", "All"],
];

const DoctorApprovalTabs = () => {
    const [tab, setTab] = useState<"ALL" | TDoctorVerificationStatus>("ALL");

    const queryParams: IDoctorParams = {
        page: 1,
        limit: 10,
        verificationStatus: "PENDING",
    };

    return (
        <>
            <div className="flex justify-between my-5">
                <div>
                    <Input type="search" />
                </div>
                <Tabs value={tab} onValueChange={(value) => setTab(value)}>
                    <TabsList>
                        {verificationStatus.map(([value, label]) => (
                            <TabsTrigger key={value} value={value}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
            <Suspense fallback={<DoctorApprovalTableLoading />}>
                <DoctorApprovalTable {...queryParams} />
            </Suspense>
        </>
    );
};

export default DoctorApprovalTabs;

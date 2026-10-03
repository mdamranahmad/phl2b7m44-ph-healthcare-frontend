"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { ChangeEvent, Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { IDoctorParams, TDoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DoctorReviewSheet from "./doctor-preview-sheet";
import useDebounce from "@/hooks/debounce.hook";
import TablePagination from "@/components/ui/table-pagination";

const verificationStatus: ["ALL" | TDoctorVerificationStatus, string][] = [
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["ALL", "All"],
];

const DoctorApprovalTabs = () => {
    const [tab, setTab] = useState<"ALL" | TDoctorVerificationStatus>("ALL");
    const [selectedId, setSelectedId] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(searchInput);

    const handleSearch = (
        e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ) => {
        setSearchInput(e.target.value);
        setPage(1);
    };

    // console.log(debouncedSearch);

    const queryParams: IDoctorParams = {
        page,
        limit: 10,
        ...(tab === "ALL" ? {} : { verificationStatus: tab }),
        // searchTerm: searchInput, // Bad implementation, calls network on each keyStroke , sol: use debounce hook
        // searchTerm: debouncedSearch, // set the empty string on searchTearm
        ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    };

    return (
        <>
            <div className="flex justify-between my-5">
                <div>
                    <Input
                        // onChange={(e) => setSearchInput(e.target.value)} // Bad implementation, calls network on each keyStroke
                        onChange={(e) => handleSearch(e)} // Bad implementation, calls network on each keyStroke
                        type="search"
                        placeholder="Search by name or email"
                    />
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
                <DoctorApprovalTable
                    {...queryParams}
                    handleReview={setSelectedId}
                    handlePageChange={setPage}
                />
            </Suspense>
            {/* <TablePagination /> */}
            <DoctorReviewSheet
                selectedId={selectedId}
                onClose={() => setSelectedId("")}
                {...queryParams}
            />
        </>
    );
};

export default DoctorApprovalTabs;

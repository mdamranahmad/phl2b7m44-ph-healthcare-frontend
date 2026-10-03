"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "../doctor-approval/doctor-approval-table";
import { ChangeEvent, Suspense, useState } from "react";
import DoctorApprovalTableLoading from "../doctor-approval/doctor-approval-table-loading";

import { Input } from "@/components/ui/input";
import DoctorReviewSheet from "../doctor-approval/doctor-preview-sheet";
import useDebounce from "@/hooks/debounce.hook";
import TablePagination from "@/components/ui/table-pagination";
import { Button } from "@/components/ui/button";
import { IScheduleParams, TScheduleStatus } from "@/types/schedule.type";
import ScheduleTableLoading from "./shcedule-table-loading";
import ScheduleTable from "./schedule-table";
import ScheduleCreateDialogue from "./schedule-create-dialogue";

const scheduleStatus: ["ALL" | TScheduleStatus, string][] = [
    ["ALL", "All"],
    ["DRAFT", "Draft"],
    ["PUBLISHED", "Published"],
];

const ScheduleList = () => {
    const [tab, setTab] = useState<"ALL" | TScheduleStatus>("ALL");
    // const [selectedId, setSelectedId] = useState("");
    // const [searchInput, setSearchInput] = useState("");
    // const [page, setPage] = useState(1);

    // const debouncedSearch = useDebounce(searchInput);

    // const handleSearch = (
    //     e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    // ) => {
    //     setSearchInput(e.target.value);
    //     setPage(1);
    // };

    // console.log(debouncedSearch);

    const queryParams: IScheduleParams = {
        // page,
        page: 1,
        limit: 10,
        sortBy: "startDateTime",
        sortOrder: "asc",
        ...(tab === "ALL" ? {} : { scheduleStatus: tab }),
        // searchTerm: searchInput, // Bad implementation, calls network on each keyStroke , sol: use debounce hook
        // searchTerm: debouncedSearch, // set the empty string on searchTearm
        // ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    };

    return (
        <>
            <div className="flex justify-between my-5">
                {/* <div>
                    <Input
                        // onChange={(e) => setSearchInput(e.target.value)} // Bad implementation, calls network on each keyStroke
                        onChange={(e) => handleSearch(e)} // Bad implementation, calls network on each keyStroke
                        type="search"
                        placeholder="Search by name or email"
                    />
                </div> */}
                <Tabs value={tab} onValueChange={(value) => setTab(value)}>
                    <TabsList>
                        {scheduleStatus.map(([value, label]) => (
                            <TabsTrigger key={value} value={value}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                {/* <Button size="lg">Create Schedule</Button> */}
                <ScheduleCreateDialogue />
            </div>
            <Suspense fallback={<ScheduleTableLoading />}>
                {/* <DoctorApprovalTable
                    {...queryParams}
                    handleReview={setSelectedId}
                    handlePageChange={setPage}
                /> */}
                <ScheduleTable {...queryParams} />
            </Suspense>
            {/* <TablePagination /> */}
            {/* <DoctorReviewSheet
                selectedId={selectedId}
                onClose={() => setSelectedId("")}
                {...queryParams}
            /> */}
        </>
    );
};

export default ScheduleList;

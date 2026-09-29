import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";
import React from "react";

export default function ApproveDoctorPage() {
    return (
        <section className="p-5">
            <div>
                <h1>ApproveDoctorPage</h1>
                <p>Please review and make sure the given data is real</p>
            </div>
            <DoctorApprovalTabs />
        </section>
    );
}

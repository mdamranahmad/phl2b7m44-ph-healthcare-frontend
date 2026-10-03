import ScheduleList from "@/components/modules/doctor-schedule/schedule-list";

const CreateShcedulePage = () => {
    return (
        <section className="p-5">
            <div>
                <h1 className="text-2xl">My Schedules</h1>
                <p>
                    Create schedules, publish them for booking, or delete darfts
                </p>
            </div>
            <ScheduleList />
        </section>
    );
};

export default CreateShcedulePage;

const prefix = "/doctor";

export const doctorRoutes = [
    {
        title: "Schedules",
        items: [
            {
                title: "Overview",
                url: `${prefix}`,
            },
            {
                title: "Create Schedule",
                url: `${prefix}/approve-doctor`,
            },
        ],
    },
    {
        title: "App Settings",
        items: [
            {
                title: "Routing",
                url: "#",
            },
            {
                title: "Data Fetching",
                url: "#",
                isActive: true,
            },
        ],
    },
];

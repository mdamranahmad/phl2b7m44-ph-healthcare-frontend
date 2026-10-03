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
                url: `${prefix}/schedules`,
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

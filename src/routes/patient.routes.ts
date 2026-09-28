const prefix = "/patient";

export const patientRoutes = [
    {
        title: "Appointments",
        items: [
            {
                title: "Overview",
                url: `${prefix}`,
            },
            {
                title: "Payment",
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

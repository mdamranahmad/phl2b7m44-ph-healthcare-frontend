const prefix = "/dashboard";

export const patientRoutes = [
    {
        title: "Appointments",
        items: [
            {
                title: "Overview",
                url: `${prefix}`,
            },
            {
                title: "My Appointment",
                url: `${prefix}/my-appointment`,
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

// {
//         title: "Management",
//         items: [
//             {
//                 title: "Overview",
//                 url: `${prefix}`,
//             },
//             {
//                 title: "Doctor Approval",
//                 url: `${prefix}/approve-doctor`,
//             },
//         ],
//     },

export interface ISidebarItem {
    title: string;
    url: string;
}

export interface ISidebarGroup {
    title: string;
    items: ISidebarItem[];
}

export type TSidebarItems = ISidebarGroup[];

import {
    environmentManager,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // By staleTime is 0 for react query, meaning the data fresh for all time
            },
        },
    });
}

// If staleTime is 0, query will refetch the data every time it changes
// Here, when a Client Components mounts, query will refetch the data once on server side, and immediately refetch for second time while mounted on client site
// for the given value, query will wait for a minute to check if the data is stale

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (environmentManager.isServer()) {
        // Checks if the app is running on server environment
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient(); // Prevents generation a new client each time app remounts on browser
        }

        return browserQueryClient;
    }
}

// Handle QueryProvider in single tone pattern to make sure no new client generates while mount-remount
export default function QueryProvider({ children }: { children: ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 600) {
    const [debouncedValue, setDebouncesValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncesValue(value), delay); // set the time
        return () => clearTimeout(timer);   // clear timer
    }, [delay, value]);

    return debouncedValue;
}

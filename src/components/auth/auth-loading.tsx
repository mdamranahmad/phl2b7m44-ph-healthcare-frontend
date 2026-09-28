import { Loader } from "lucide-react";

const AuthLoading = ({ label = "Verifyinng Account" }: { label?: string }) => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex gap-3">
                <Loader className="size-6 animate-spin" />
                {label}
            </div>
        </div>
    );
};

export default AuthLoading;

import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginComponent() {
    const router = useRouter();
    const { mutate: googleLogin } = useGoogleOAuth();

    const handleGoogleSuccess = (credentialResponse: {
        credential?: string;
    }) => {
        const idToken = credentialResponse.credential;

        if (!idToken) {
            toast.add({
                title: "Google OAuth Failed!",
                description: "Something Went Wrong. Please Try Again.",
                type: "error",
            });
            return;
        }

        googleLogin(
            { idToken },
            {
                onSuccess: () => {
                    toast.add({
                        title: "Google Login Success",
                        description: "Welcome Back",
                        type: "success",
                    });
                    router.push("/");
                },
                onError: (err) => {
                    toast.add({
                        title: "Google OAuth Failed!",
                        description:
                            err.message ||
                            "Something Went Wrong. Please Try Again.",
                        type: "error",
                    });
                },
            },
        );
    };

    const handleGoogleError = () => {
        toast.add({
            title: "Google OAuth Failed!",
            description: "Something Went Wrong. Please Try Again.",
            type: "error",
        });
    };

    return (
        <GoogleLogin
            theme="outline"
            shape="pill"
            text="continue_with"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
        />
    );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
    return (
        <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <Link
                href="/"
                className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex justify-center">
                        <SignUp routing="path" path="/register" />
                    </div>
                </div>
            </div>
        </div>
    );
}

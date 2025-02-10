import { LoginForm } from "@/components/login-form";
import React from "react";

const SignInPage = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <span className=" text-center text-3xl truncate font-['BC_Alphapipe_TSB_Bold']">
                  Maxint
                </span>
                <LoginForm />
            </div>
        </div>
    );
};
export default SignInPage;

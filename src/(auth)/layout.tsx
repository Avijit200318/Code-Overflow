"use client"
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/router";
import React, {useEffect} from "react";

const Layout = ({children}: {children: React.ReactNode}) => {
    // we are going to check whether there is any session or not
    const {session} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if(session){
            router.push("/");
        }
    }, [session, router]);

    if(session){
        return null;
    }

    return (
        <div className="">
            <div className="">{children}</div>
        </div>
    )
}

export default Layout;
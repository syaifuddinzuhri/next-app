"use client"
import LoginForm from "@/components/auth/LoginForm";
import storeUser from "@/store/storeUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeadPage from "../head";

const Blank = () => {
    const router = useRouter();

    if (storeUser.get('token')) {
        router.push('/my-drive')
    }

    return (
        <>
            <HeadPage title="Login" />

            <div className="loginwrapper">
                <div className="lg-inner-column">
                    <div className="left-column relative z-[1]">
                        <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
                            <Link href="/">
                                <img
                                    src="/assets/images/logo/logo-ma.png"
                                    width={50}
                                    alt=""
                                    className="mb-10"
                                />
                            </Link>
                            <h4>
                                Digital File Manager
                            </h4>
                            <h4>
                                <span className="text-slate-800 text-3xl dark:text-slate-400 font-bold">
                                    MA NU Sunan Giri Prigen
                                </span>
                            </h4>
                        </div>
                        <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
                            <img
                                src="/assets/images/auth/ils1.svg"
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="right-column relative">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div className="auth-box h-full flex flex-col justify-center">
                                <div className="mobile-logo text-center mb-6 lg:hidden block">
                                    <Link href="/">
                                        <img
                                            src="/assets/images/logo/logo-ma.png"
                                            width={50}
                                            alt=""
                                            className="mx-auto"
                                        />
                                    </Link>
                                </div>
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <h4 className="font-medium">Sign in</h4>
                                    <LoginForm />
                                </div>
                            </div>
                            <div className="auth-footer text-center">
                                Copyright 2023, Digital File Manager. Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Blank
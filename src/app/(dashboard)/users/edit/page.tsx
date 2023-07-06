'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Blank = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/users");
    }, []);
    return <p></p>;
};

export default Blank;
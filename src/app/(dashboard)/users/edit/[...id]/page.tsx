'use client';

import HeadPage from "@/app/head";
import FormUser from "@/components/users/FormUser";
import { PositionProvider } from "@/contexts/PositionContext";
import { UserProvider } from "@/contexts/UserContext";


const Blank = () => {

    return (
        <UserProvider>
            <PositionProvider>
                <HeadPage title="Edit User" />
                <FormUser />
            </PositionProvider>
        </UserProvider>
    );
};

export default Blank;
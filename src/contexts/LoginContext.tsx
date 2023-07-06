import { useLoginUserMutation, useLogoutUserMutation, useMeUserMutation } from "@/api";
import api from "@/api/api";
import storeUser from "@/store/storeUser";
import { errorManagemet } from "@/utils/GlobalFunction";
import { closeToast, showToast } from "@/utils/ToastFunction";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { FC, ReactNode, createContext, useState } from "react";

type ProviderProps = {
    children?: ReactNode;
};
type Props = {
    setState: React.Dispatch<React.SetStateAction<Props["state"]>>;
    state: {
        me: any
    };
    data: {
        isLoading: boolean;
    };
    action: {
        loginUser: (body: Auth.Login) => void;
        logoutUser: () => void;
        getMe: () => any;
    };
};
const initialValues: Props = {
    setState: () => { },
    state: {
        me: {}
    },
    data: {
        isLoading: false,
    },
    action: {
        loginUser: (body: Auth.Login) => { },
        logoutUser: () => { },
        getMe: () => { },
    },
};

const LoginContext = createContext<Props>(initialValues);

const useLoginContext = () => {
    const router = useRouter();
    const [state, setState] = useState<Props["state"]>(initialValues.state);
    const {
        mutateAsync: loginUserMutation,
        isLoading: loginUserLoading,
    } = useLoginUserMutation();

    const {
        mutateAsync: meUserMutation,
        isLoading: meUserLoading,
    } = useMeUserMutation();

    const {
        mutateAsync: logoutUserMutation,
        isLoading: logoutLoading
    } = useLogoutUserMutation();

    const loginUser = async (body: Auth.Login) => {
        showToast('loading');
        try {
            const result = await loginUserMutation(body);
            setTimeout(() => {
                closeToast();
                showToast('success', result.data.message)
                const data = result.data;
                storeUser.set("me", data.data);
                storeUser.set("token", data.data.token);
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.data.token}`;
                router.push("/my-drive");
            }, 1000);
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const getMe = async () => {
        try {
            const result = await meUserMutation();
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
        }
    }

    const logoutUser = async () => {
        showToast('loading');
        try {
            const result = await logoutUserMutation();
            setTimeout(() => {
                closeToast();
                storeUser.set("token", '');
                storeUser.set("me", '');
                setState((prev) =>
                    produce(prev, (draft) => {
                        draft.me = {}
                    })
                );
                showToast('success', result.data.message)
                router.push("/");
            }, 1000);
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    return {
        state,
        setState,
        data: {
            isLoading: loginUserLoading,
        },
        action: {
            loginUser,
            getMe,
            logoutUser
        },
    };
}

const LoginProvider: FC<ProviderProps> = (props) => {
    const { Provider } = LoginContext;
    return <Provider value={useLoginContext()}>{props.children}</Provider>;
};
export { LoginContext, LoginProvider };

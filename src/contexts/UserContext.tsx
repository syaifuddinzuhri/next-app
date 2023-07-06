import { useCreateUser, useDeleteUser, useDetailUser, useGetAllUser, useGetUsersAll, useUpdateUser } from "@/api/modules/user";
import { errorManagemet } from "@/utils/GlobalFunction";
import { closeToast, showToast } from "@/utils/ToastFunction";
import { produce } from "immer";
import { FC, ReactNode, createContext, useEffect, useState } from "react";


type Provider = {
    children?: ReactNode;
};
type Props = {
    setState: React.Dispatch<React.SetStateAction<Props["state"]>>;
    state: {
        filterUser: {
            params: DatatableDefault.params
        },
        detailData: any

    };
    data: {
        users: any,
        isLoading: boolean,
        isFetching: boolean
    };
    action: {
        addNewUser: (body: any) => void
        updateUser: (body: any) => void
        allUsers: () => any
        deleteUser: (id: number) => void
        detailUser: (id: number) => any
    };
};
const initialValues: Props = {
    setState: () => { },
    state: {
        filterUser: {
            params: {},
        },
        detailData: {}
    },
    data: {
        users: [],
        isLoading: false,
        isFetching: false
    },
    action: {
        addNewUser: (body: any) => { },
        allUsers: () => { },
        updateUser: (body: any) => { },
        deleteUser: (id: number) => { },
        detailUser: (id: number) => { },
    },
};

const UserContext = createContext<Props>(initialValues);

const useUserContext = () => {
    const [state, setState] = useState<Props["state"]>(initialValues.state);

    const getUsers = useGetUsersAll(state.filterUser);

    useEffect(() => {
        return () => {
            getUsers.refetch()
        }
    }, [state.filterUser])

    const {
        mutateAsync: createUserMutation,
        isLoading: loadingCreateUser,
        isSuccess: successCreateUser
    } = useCreateUser();

    const {
        mutateAsync: deleteUserMutation,
        isLoading: loadingDeleteUser,
        isSuccess: successDeleteUser
    } = useDeleteUser();

    const {
        mutateAsync: detailUserMutation,
        isLoading: loadingDetailUser,
        isSuccess: successDetailUser
    } = useDetailUser();

    const {
        mutateAsync: updateUserMutation,
        isLoading: loadingUpdateUser,
        isSuccess: successUpdateUser
    } = useUpdateUser(state.detailData.id);

    const {
        mutateAsync: getAllUsersMutation,
        isLoading: loadingGetAllUsers,
        isSuccess: successGetAllUsers
    } = useGetAllUser();


    const addNewUser = async (body: any) => {
        showToast('loading');
        try {
            const result = await createUserMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const deleteUser = async (id: number) => {
        showToast('loading');
        try {
            const result = await deleteUserMutation(id);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const detailUser = async (id: number) => {
        try {
            const result = await detailUserMutation(id);
            setState((prev) =>
                produce(prev, (draft) => {
                    draft.detailData = result.data.data
                })
            );
            closeToast();
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }


    const updateUser = async (body: any) => {
        showToast('loading');
        try {
            const result = await updateUserMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const allUsers = async () => {
        try {
            const result = await getAllUsersMutation();
            return result.data.data
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
            users: getUsers.data?.data.data,
            isLoading: getUsers.isLoading,
            isFetching: getUsers.isFetching,
        },
        action: {
            deleteUser,
            updateUser,
            detailUser,
            allUsers,
            addNewUser,
        },
    };
}

const UserProvider: FC<Provider> = (props) => {
    const { Provider } = UserContext;
    return (
        <Provider value={useUserContext()}>
            {props.children}
        </Provider>
    );
};
export { UserContext, UserProvider };

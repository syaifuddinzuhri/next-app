import { useCreateGroup, useDeleteGroup, useDetailGroup, useGetAllGroup, useGetGroupAll, useUpdateGroup } from "@/api/modules/group";
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
        filterGroup: {
            params: DatatableDefault.params
        },
        detailData: any
    };
    data: {
        groups: any,
        isLoading: boolean,
        isSuccess: boolean,
        isFetching: boolean
    };
    action: {
        addNewGroup: (body: any) => void
        deleteGroup: (id: number) => void
        updateGroup: (body: any) => void
        detailGroup: (id: number) => any
        allGroups: () => any
    };
};
const initialValues: Props = {
    setState: () => { },
    state: {
        filterGroup: {
            params: {},
        },
        detailData: {}
    },
    data: {
        groups: [],
        isLoading: false,
        isSuccess: false,
        isFetching: false
    },
    action: {
        addNewGroup: (body: any) => { },
        updateGroup: (body: any) => { },
        deleteGroup: (id: number) => { },
        detailGroup: (id: number) => { },
        allGroups: () => { },
    },
};

const GroupContext = createContext<Props>(initialValues);

const useGroupContext = () => {
    const [state, setState] = useState<Props["state"]>(initialValues.state);

    const getGroups = useGetGroupAll(state.filterGroup);

    useEffect(() => {
        getGroups.refetch()
    }, [state.filterGroup])

    const {
        mutateAsync: createGroupMutation,
        isLoading: loadingCreateGroup,
        isSuccess: successCreateGroup
    } = useCreateGroup();

    const {
        mutateAsync: getAllGroupMutation,
        isLoading: loadingGetAllGroup,
        isSuccess: successGetAllGroup
    } = useGetAllGroup();

    const {
        mutateAsync: deleteGroupMutation,
        isLoading: loadingDeleteGroup,
        isSuccess: successDeleteGroup
    } = useDeleteGroup();

    const {
        mutateAsync: updateGroupMutation,
        isLoading: loadingUpdateGroup,
        isSuccess: successUpdateGroup
    } = useUpdateGroup(state.detailData.id);

    const {
        mutateAsync: detailGroupMutation,
        isLoading: loadingDetailGroup,
        isSuccess: successDetailGroup
    } = useDetailGroup();

    const addNewGroup = async (body: any) => {
        showToast('loading');
        try {
            const result = await createGroupMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const deleteGroup = async (id: number) => {
        showToast('loading');
        try {
            const result = await deleteGroupMutation(id);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const detailGroup = async (id: number) => {
        try {
            const result = await detailGroupMutation(id);
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

    const allGroups = async () => {
        try {
            const result = await getAllGroupMutation();
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const updateGroup = async (body: any) => {
        showToast('loading');
        try {
            const result = await updateGroupMutation(body);
            closeToast();
            showToast('success', result.data.message)
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
            groups: getGroups.data?.data.data,
            isLoading: getGroups.isLoading || loadingCreateGroup || loadingDeleteGroup || loadingDetailGroup,
            isFetching: getGroups.isFetching,
            isSuccess: successCreateGroup || successUpdateGroup,
        },
        action: {
            updateGroup,
            addNewGroup,
            deleteGroup,
            allGroups,
            detailGroup
        },
    };
}

const GroupProvider: FC<Provider> = (props) => {
    const { Provider } = GroupContext;
    return (
        <Provider value={useGroupContext()}>
            {props.children}
        </Provider>
    );
};
export { GroupContext, GroupProvider };

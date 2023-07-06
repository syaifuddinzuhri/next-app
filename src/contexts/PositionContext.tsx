import { useCreatePosition, useDeletePosition, useDetailPosition, useGetAllPosition, useGetPositionAll, useUpdatePosition } from "@/api";
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
        filterPosition: {
            params: DatatableDefault.params
        },
        detailData: any
    };
    data: {
        positions: any,
        isLoading: boolean,
        isSuccess: boolean,
        isError: boolean,
        isFetching: boolean
    };
    action: {
        addNewPosition: (body: any) => void
        deletePosition: (id: number) => void
        updatePosition: (body: any) => void
        detailPosition: (id: number) => any
        allPositions: () => any
        refetchPosition: () => any
    };
};
const initialValues: Props = {
    setState: () => { },
    state: {
        filterPosition: {
            params: {},
        },
        detailData: {}
    },
    data: {
        positions: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        isFetching: false
    },
    action: {
        addNewPosition: (body: any) => { },
        updatePosition: (body: any) => { },
        deletePosition: (id: number) => { },
        detailPosition: (id: number) => { },
        allPositions: () => { },
        refetchPosition: () => { }
    },
};

const PositionContext = createContext<Props>(initialValues);

const usePositionContext = () => {
    const [state, setState] = useState<Props["state"]>(initialValues.state);

    const getPositions = useGetPositionAll(state.filterPosition);

    useEffect(() => {
        getPositions.refetch()
    }, [state.filterPosition])

    const {
        mutateAsync: createPositionMutation,
        isLoading: loadingCreatePosition,
        isError: errorCreatePosition,
        isSuccess: successCreatePosition
    } = useCreatePosition();

    const {
        mutateAsync: getAllPositionMutation,
        isLoading: loadingGetAllPosition,
        isSuccess: successGetAllPosition
    } = useGetAllPosition();

    const {
        mutateAsync: deletePositionMutation,
        isLoading: loadingDeletePosition,
        isSuccess: successDeletePosition
    } = useDeletePosition();

    const {
        mutateAsync: updatePositionMutation,
        isLoading: loadingUpdatePosition,
        isSuccess: successUpdatePosition
    } = useUpdatePosition(state.detailData.id);

    const {
        mutateAsync: detailPositionMutation,
        isLoading: loadingDetailPosition,
        isSuccess: successDetailPosition
    } = useDetailPosition();

    const refetchPosition = () => {
        // setState((prev) =>
        //     produce(prev, (draft) => {
        //         draft.filterPosition.params.page = 1
        //     })
        // );
        // getPositions.refetch();
    }

    const addNewPosition = async (body: any) => {
        showToast('loading');
        try {
            const result = await createPositionMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const deletePosition = async (id: number) => {
        showToast('loading');
        try {
            const result = await deletePositionMutation(id);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const detailPosition = async (id: number) => {
        try {
            const result = await detailPositionMutation(id);
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

    const allPositions = async () => {
        try {
            const result = await getAllPositionMutation();
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const updatePosition = async (body: any) => {
        showToast('loading');
        try {
            const result = await updatePositionMutation(body);
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
            positions: getPositions.data?.data.data,
            isLoading: getPositions.isLoading || loadingCreatePosition || loadingDeletePosition || loadingDetailPosition,
            isFetching: getPositions.isFetching,
            isSuccess: successCreatePosition || successUpdatePosition,
            isError: errorCreatePosition,
        },
        action: {
            updatePosition,
            addNewPosition,
            deletePosition,
            allPositions,
            refetchPosition,
            detailPosition
        },
    };
}

const PositionProvider: FC<Provider> = (props) => {
    const { Provider } = PositionContext;
    return (
        <Provider value={usePositionContext()}>
            {props.children}
        </Provider>
    );
};
export { PositionContext, PositionProvider };

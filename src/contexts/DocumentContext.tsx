import { useCreateFolder, useDeleteDocument, useDetailFolder, useDownload, useEmptyTrash, useForceDeleteDocument, useGetAllDocuments, useGetFolders, useMoveDocument, useMultipleDeleteDocument, useRenameDocument, useRestoreDocument, useSearchDocuments, useUploadDocument } from "@/api";
import useSubmitLoading from "@/hooks/useSubmitLoading";
import { errorManagemet } from "@/utils/GlobalFunction";
import { closeToast, showToast } from "@/utils/ToastFunction";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, createContext, useEffect, useMemo, useState } from "react";

type ProviderProps = {
    children?: ReactNode;
};
type Props = {
    setState: React.Dispatch<React.SetStateAction<Props["state"]>>;
    state: {
        detailUid: string,
        error?: {
            status: boolean;
            message?: string;
        },
        filterDocuments: {
            data: DocumentRequest.params;
        };
    };
    data: {
        isLoading: boolean;
        isSuccess: boolean;
        isFetching: boolean;
        isError: any;
        documents?: unknown[];
        hasNextDocument?: boolean;
    };
    action: {
        addNewFolder: (body: any) => void,
        refetchData: () => void,
        renameDocument: (body: any) => void,
        restoreDocument: (body: any) => void,
        searchDocuments: (body: any) => any,
        getFolders: (body: any) => any,
        uploadDocument: (body: any) => void,
        multipleDelete: (body: any) => void,
        moveDocuments: (body: any) => void,
        emptyTrash: (body: any) => void,
        deleteDocument: (id: number) => void,
        forceDeleteDocument: (id: number) => void,
        downloadDocument: (body: any) => any,
        detailFolder: (uid: any) => any,
        // nextPageDocument: () => void;
    };
};

let initialValues: Props = {
    setState: () => { },
    state: {
        detailUid: "",
        error: {
            status: false,
            message: "",
        },
        filterDocuments: {
            data: {},
        },
    },
    data: {
        isLoading: false,
        isSuccess: false,
        isFetching: false,
        isError: "",
        documents: [],
    },
    action: {
        uploadDocument: (body: any) => {},
        downloadDocument: (body: any) => {},
        searchDocuments: (body: any) => {},
        getFolders: (body: any) => {},
        refetchData: () => {},
        addNewFolder: (body: any) => { },
        emptyTrash: (body: any) => { },
        multipleDelete: (body: any) => { },
        moveDocuments: (body: any) => { },
        deleteDocument: (id: number) => { },
        renameDocument: (body: any) => { },
        restoreDocument: (body: any) => { },
        forceDeleteDocument: (id: number) => { },
        detailFolder: (uid: any) => { },
        // nextPageDocument: () => { },
    },
};
const DocumentContext = createContext<Props>(initialValues);

const useDocumentContext = () => {
    const router = useRouter();
    const [submitLoading, setSubmitLoading] = useSubmitLoading();

    const [state, setState] = useState<Props["state"]>(initialValues.state);

    const filterData = useMemo(() => {
        return {
            ...state.filterDocuments.data,
        };
    }, [state.filterDocuments.data]);

    const getDocument = useGetAllDocuments(state.filterDocuments);

    useEffect(() => {
        return () => {
            getDocument.refetch()
        }
    }, [state.filterDocuments])

    const refetchData = () => {
        getDocument.refetch()
    }


    // const getDocument = useGetDocuments(filterData);

    // useEffect(() => {
    //     getDocument.refetch();
    // }, [filterData]);

    // const nextPageDocument = async () => {
    //     getDocument.fetchNextPage();
    // };

    const {
        mutateAsync: createFolderMutation,
    } = useCreateFolder();
    
    const {
        mutateAsync: searchDocumentMutation,
    } = useSearchDocuments();
    
    const {
        mutateAsync: getFoldersMutation,
    } = useGetFolders();

    const {
        mutateAsync: deleteDocumentMutation,
    } = useDeleteDocument();

    const {
        mutateAsync: forceDeleteDocumentMutation,
    } = useForceDeleteDocument();

    const {
        mutateAsync: uploadDocumentMutation,
        isLoading: loadingUploadDocument,
    } = useUploadDocument();

    const {
        mutateAsync: downloadDocumentMutation,
    } = useDownload();

    const {
        mutateAsync: renameDocumentMutation,
    } = useRenameDocument();

    const {
        mutateAsync: restoreDocumentMutation,
    } = useRestoreDocument();

    const {
        mutateAsync: mulipleDeleteDocumentMutation,
    } = useMultipleDeleteDocument();

    const {
        mutateAsync: moveDocumentMutation,
    } = useMoveDocument();

    const {
        mutateAsync: emptyTrashMutation,
    } = useEmptyTrash();

    const {
        mutateAsync: detailFolderMutation,
    } = useDetailFolder();

    const uploadDocument = async (body: any) => {
        showToast('loading');
        try {
            const result = await uploadDocumentMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const addNewFolder = async (body: any) => {
        showToast('loading');
        setSubmitLoading(true)
        try {
            const result = await createFolderMutation(body);
            closeToast();
            showToast('success', result.data.message)
            setSubmitLoading(false)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
            setSubmitLoading(false)
        }
    }

    const deleteDocument = async (id: number) => {
        showToast('loading');
        try {
            const result = await deleteDocumentMutation(id);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const forceDeleteDocument = async (id: number) => {
        showToast('loading');
        try {
            const result = await forceDeleteDocumentMutation(id);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const renameDocument = async (body: any) => {
        showToast('loading');
        try {
            const result = await renameDocumentMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const restoreDocument = async (body: any) => {
        showToast('loading');
        try {
            const result = await restoreDocumentMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const multipleDelete = async (body: any) => {
        showToast('loading');
        try {
            const result = await mulipleDeleteDocumentMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const moveDocuments = async (body: any) => {
        showToast('loading');
        try {
            const result = await moveDocumentMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const emptyTrash = async (body: any) => {
        showToast('loading');
        try {
            const result = await emptyTrashMutation(body);
            closeToast();
            showToast('success', result.data.message)
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const downloadDocument = async (body: any) => {
        showToast('loading');
        try {
            const result = await downloadDocumentMutation(body);
            closeToast();
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
            closeToast();
            showToast('error', message.toString())
        }
    }

    const detailFolder = async (uid: any) => {
        try {
            const result = await detailFolderMutation(uid);
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
        }
    }

    const searchDocuments = async (body: any) => {
        try {
            const result = await searchDocumentMutation(body);
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
        }
    }

    const getFolders = async (body: any) => {
        try {
            const result = await getFoldersMutation(body);
            return result.data.data
        } catch (errorx: any) {
            const message = await errorManagemet(errorx);
        }
    }

    return {
        state,
        setState,
        data: {
            isLoading: getDocument.isLoading || loadingUploadDocument,
            isSuccess: getDocument.isSuccess,
            isError: getDocument.isError,
            documents: getDocument.data?.data.data,
            isFetching: getDocument.isFetching,
            // hasNextDocument: getDocument.hasNextPage,
        },
        action: {
            addNewFolder,
            deleteDocument,
            renameDocument,
            uploadDocument,
            refetchData,
            downloadDocument,
            multipleDelete,
            searchDocuments,
            emptyTrash,
            forceDeleteDocument,
            restoreDocument,
            moveDocuments,
            getFolders,
            detailFolder
            // nextPageDocument,
        },
    };
};
const DocumentProvider: FC<ProviderProps> = (props) => {
    const { Provider } = DocumentContext;
    return (
        <Provider value={useDocumentContext()}>
            {props.children}
        </Provider>
    );
};
export { DocumentContext, DocumentProvider };

import { url } from "@/constant/url";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import api from "../api";
const querystring = require('querystring');

type useDocumentParams = {
    data?: DocumentRequest.params,
}

const useGetAllDocuments = (props?: useDocumentParams) => useQuery(['GetAllDocuments', props], () => {
    const data = querystring.stringify(props?.data);
    return api.get(url.document.datatables + '?' + data)
})

const useSearchDocuments = () => useMutation((body) => {
    const data = querystring.stringify(body);
    return api.get(url.document.datatables + '?' + data)
})

const useGetFolders = () => useMutation((body) => {
    return api.post(url.document.get_folders, body)
})

const useGetDocuments = (props: DocumentRequest.params) => useInfiniteQuery(['GetDocuments'], async ({ pageParam = "1" }) => {
    if (pageParam == "1") {
        const data = querystring.stringify(props);
        return api.get(url.document.datatables + '?' + data)
    } else {
        return api.get(pageParam)
    }

}, {
    getNextPageParam: (lastPage: any) => {
        if (lastPage.data.status) {
            return lastPage.data.data?.next_page_url ?? undefined
        }
    },
    cacheTime: 0,
});

const useDeleteDocument = () => useMutation((id: number) => {
    return api.delete(`${url.document.delete}/${id}`)
})

const useForceDeleteDocument = () => useMutation((id: number) => {
    return api.delete(`${url.document.force_delete}/${id}`)
})

const useCreateFolder = () => useMutation((body) => {
    return api.post(url.document.create_folder, body)
})

const useRestoreDocument = () => useMutation((body) => {
    return api.post(url.document.restore, body)
})

const useDownload = () => useMutation((body) => {
    return api.post(url.document.download, body)
})

const useUploadDocument = () => useMutation((body) => {
    return api.post(url.document.upload, body, { headers: { 'content-type': 'multipart/form-data' } })
})

const useRenameDocument = () => useMutation((body) => {
    return api.put(url.document.rename, body)
})

const useEmptyTrash = () => useMutation((body) => {
    return api.post(url.document.empty_trash, body)
})

const useMultipleDeleteDocument = () => useMutation((body) => {
    return api.post(url.document.multiple_delete, body)
})

const useMoveDocument = () => useMutation((body) => {
    return api.post(url.document.move, body)
})

const useDetailFolder = () => useMutation((uid: string) => {
    return api.get(`${url.document.detail_folder}${uid}`)
})

export {
    useCreateFolder, useDeleteDocument, useDetailFolder, useDownload, useEmptyTrash, useForceDeleteDocument, useGetAllDocuments, useGetDocuments, useGetFolders, useMoveDocument, useMultipleDeleteDocument,
    useRenameDocument, useRestoreDocument,
    useSearchDocuments, useUploadDocument
};


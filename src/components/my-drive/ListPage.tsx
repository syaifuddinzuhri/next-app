"use client"
import HeadPage from "@/app/head";
import ListComponent from "@/components/lists/ListComponent";
import ListFilter from "@/components/lists/ListFilter";
import HeaderPage from "@/components/my-drive/HeaderPage";
import ModalMove from "@/components/my-drive/ModalMove";
import ModalRename from "@/components/my-drive/ModalRename";
import { MAIN_PATH } from "@/constant/global";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { withProviders } from "@/utils/withProviders";
import { produce } from "immer";
import { useContext, useEffect, useState } from "react";

const ListPage = ({ uid }: any) => {
    const [showModal, setShowModal] = useState(false)
    const [isMultiple, setIsMultiple] = useState(false)
    const [showModalMove, setShowModalMove] = useState(false)
    const [detail, setDetail] = useState<any>()
    const [folderDetail, setFolderDetail] = useState(null)
    const {
        state: { filterDocuments },
        data: { isLoading, isFetching, documents },
        setState,
        action: { deleteDocument, detailFolder, downloadDocument, multipleDelete }
    } = useContext(DocumentContext)

    useEffect(() => {
        getDetailFolder()
        setState((prev) =>
            produce(prev, (draft) => {
                draft.filterDocuments.data.path = uid
            })
        );
    }, [uid])

    const getDetailFolder = async () => {
        if (uid && uid != MAIN_PATH) {
            const detailData = await detailFolder(uid)
            setFolderDetail(detailData)
        }
    }

    const handleRowAction = async (type: string, row: any) => {
        if (type == 'delete') {
            deleteDocument(row.uid)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else if (type == 'rename') {
            setState((prev) =>
                produce(prev, (draft) => {
                    draft.detailUid = row.uid
                })
            );
            setDetail(row)
            setShowModal(true)
        } else if (type == 'share') {
        } else if (type == 'move') {
            setDetail(row)
            setShowModalMove(true)
        } else if (type == 'download') {
            const res = await downloadDocument({
                uids: [row.uid]
            })
            window.open(res, '_blank')
        }
    }

    const handleHeaderAction = async (type: string, arrIds: any) => {
        if (type == 'delete') {
            multipleDelete({
                data: arrIds
            })
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else if (type == 'share') {
        } else if (type == 'move') {
            setIsMultiple(true)
            setDetail(arrIds)
            setShowModalMove(true)
        } else if (type == 'download') {
            const res = await downloadDocument({
                uids: arrIds
            })
            window.open(res, '_blank')
        }
    }

    const handleFilter = (type: string, people: string, date: string) => {
        setState((prev) =>
            produce(prev, (draft) => {
                draft.filterDocuments.data.type = type
                draft.filterDocuments.data.people = people
                draft.filterDocuments.data.date = date
            })
        );
    }

    return (
        <>
            <HeadPage title="My Drive" />
            <HeaderPage isMain={uid != MAIN_PATH ? false : true} />
            <div className="space-y-5 mt-4">
                <ListFilter handleFilter={handleFilter} />
                {isFetching || isLoading ? '' : (
                    <ListComponent folderDetail={folderDetail} type='drive' data={documents} title='My Drive' handleRowAction={handleRowAction} handleHeaderAction={handleHeaderAction} />
                )}
            </div>
            {
                showModal && <ModalRename showModal={showModal} data={detail} setShowModal={setShowModal} />
            }
            {
                showModalMove && <ModalMove showModalMove={showModalMove} data={detail} setShowModalMove={setShowModalMove} isMultiple={isMultiple} />
            }
        </>
    )
}
export default withProviders(DocumentProvider)(ListPage);

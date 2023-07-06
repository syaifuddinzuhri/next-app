"use client"
import HeadPage from "@/app/head";
import TableViewTrash from "@/components/lists/TableViewTrash";
import Card from "@/components/ui/Card";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { produce } from "immer";
import { useContext, useEffect, useState } from "react";

const Blank = () => {
    const [showModal, setShowModal] = useState(false)
    const [detail, setDetail] = useState({})
    const {
        state: { filterDocuments },
        data: { isLoading, isFetching, documents },
        setState,
        action: { forceDeleteDocument, restoreDocument, emptyTrash }
    } = useContext(DocumentContext)

    useEffect(() => {
        setState((prev) =>
            produce(prev, (draft) => {
                draft.filterDocuments.data.trash = 1
            })
        );
    }, [])


    const handleRowAction = async (type: string, row: any) => {
        if (type == 'permanent delete') {
            forceDeleteDocument(row.uid)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else if (type == 'restore') {
            restoreDocument({
                uid: row.uid
            })
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }


    const handleEmptyTrash = () => {
        emptyTrash({})
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <DocumentProvider>
            <HeadPage title="Trash" />
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">Items in trash are deleted forever after 30 days</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={handleEmptyTrash}>
                    Empty Trash
                </span>
            </div>
            <div className="space-y-5 mt-4">
                {isFetching || isLoading ? '' : (
                    <Card noborder>
                        <TableViewTrash data={documents} title='Trash' handleRowAction={handleRowAction} />
                    </Card>
                )}
            </div>
        </DocumentProvider>
    )
}
export default Blank;

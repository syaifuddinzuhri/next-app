"use client"
import HeadPage from "@/app/head";
import FormModal from "@/components/position/FormModal";
import PositionTable from "@/components/position/PositionTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { PositionContext, PositionProvider } from "@/contexts/PositionContext";
import { withProviders } from "@/utils/withProviders";
import { produce } from "immer";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';

const Blank = () => {
    const router = useRouter();
    const location = usePathname();

    const [isOpen, setIsOpen] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [modalTitle, setModalTitle] = useState('')
    const [modalType, setModalType] = useState('')

    useEffect(() => {
        router.refresh()
    }, [router])

    const {
        setState,
        state: { filterPosition },
        data: { isLoading, isFetching, positions },
        action: { deletePosition, refetchPosition }
    } = useContext(PositionContext)

    const fetchPosition = (page: number) => {
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    const handleSearch = (e: any) => {
        setState((prev) =>
            produce(prev, (draft) => {
                draft.filterPosition.params.page = 1
                draft.filterPosition.params.keyword = e.target.value
            })
        );
    }

    const handleNewPositon = () => {
        setIsOpen(true)
        setModalTitle('Add New Position')
        setModalType('add')
    }

    const closeModal = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const handleRowAction = (type: string, row: any) => {
        if (type == 'delete') {
            deletePosition(row.id)
            fetchPosition(1)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else if (type == 'edit') {
            setIsOpen(true)
            setModalTitle('Edit Position')
            setModalType('edit')
            setModalId(row.id)
        }
    }

    return (
        <>
            <HeadPage title="Positions" />
            <Button text="New Position" icon="heroicons-outline:plus" className="btn-primary btn-sm mb-3" onClick={() => handleNewPositon()} />
            <Card noborder>
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">Position</h4>
                    <Textinput
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                        value={filterPosition.params.keyword}
                    />
                </div>
                {isLoading || isFetching ? '' : (
                    <PositionTable listPositions={positions} fetchPosition={fetchPosition} rowAction={handleRowAction} />
                )}
            </Card>
            {isOpen && <FormModal id={modalId} type={modalType} title={modalTitle} isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} fetchPosition={fetchPosition} />}

        </>
    )
}

export default withProviders(PositionProvider)(Blank);

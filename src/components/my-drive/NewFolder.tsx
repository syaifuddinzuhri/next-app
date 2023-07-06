"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { getUidUrl } from "@/utils/GlobalFunction";
import { withProviders } from "@/utils/withProviders";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

interface INewFolder {
    name: string;
    path: any
}

const NewFolder = ({ isMain }: any) => {
    const router = useRouter();

    const [form, setForm] = useState<INewFolder>({
        name: '',
        path: ''
    });

    const {
        action: { addNewFolder }
    } = useContext(DocumentContext)

    useEffect(() => {
        if (!isMain) {
            setForm({
                ...form,
                path: getUidUrl()
            })
        }
    }, [isMain])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        addNewFolder(form)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    return (
        <>
            <Modal
                title="New Folder"
                label="New Folder"
                icon="heroicons:plus-circle"
                labelClass="btn-outline-dark btn-sm"
                uncontrol
                footerContent={
                    <>
                        <Button
                            text="Create"
                            className="btn-dark btn-sm"
                            onClick={handleSubmit}
                        />
                    </>
                }
            >
                <div className="text-base text-slate-600 dark:text-slate-300">
                    <Textinput
                        type="text"
                        placeholder="Untitled folder"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setForm({
                                ...form,
                                name: e.currentTarget.value
                            })
                        }}
                        defaultValue={form.name}
                    />
                </div>
            </Modal>
        </>
    )
}

export default withProviders(DocumentProvider)(NewFolder);
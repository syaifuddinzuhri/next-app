"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { getUidUrl } from "@/utils/GlobalFunction";
import { withProviders } from "@/utils/withProviders";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import Fileinput from "../ui/Fileinput";

interface INewFolder {
    name: string;
    path: any
}

const UploadBack = ({ isMain }: any) => {
    const router = useRouter();
    const [selectedFiles2, setSelectedFiles2] = useState<any>([]);
    
    const handleFileChangeMultiple2 = (e: any) => {
        const files = e.target.files;
        const filesArray = Array.from(files).map((file) => file);
        setSelectedFiles2(filesArray);
    };

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
    }, [])
    

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
                title="Upload"
                label="Upload"
                icon="heroicons:cloud-arrow-down"
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
                    <Fileinput
                        name="basic"
                        selectedFiles={selectedFiles2}
                        onChange={handleFileChangeMultiple2}
                        multiple
                    />
                </div>
            </Modal>
        </>
    )
}

export default withProviders(DocumentProvider)(UploadBack);
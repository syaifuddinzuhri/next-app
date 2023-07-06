import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import useSubmitLoading from "@/hooks/useSubmitLoading";
import { getUidUrl } from "@/utils/GlobalFunction";
import { showToast } from "@/utils/ToastFunction";
import { withProviders } from "@/utils/withProviders";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
interface IUpload {
    path: string | undefined;
    files: any[]
}

const Upload = ({ isMain }: any) => {
    const [form, setForm] = useState<IUpload>({
        path: '',
        files: []
    });

    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [submitLoading, setSubmitLoading] = useSubmitLoading();

    const {
        data: { isLoading },
        action: { uploadDocument }
    } = useContext(DocumentContext)

    useEffect(() => {
        if (!isMain) {
            setForm({
                ...form,
                path: getUidUrl()
            })
        }
    }, [])

    const inputFile = useRef<any>(null)

    const onButtonUploadClick = () => {
        inputFile.current.click();
    };

    const handleChangeSubmitFile = (e: any) => {
        const files = e.target.files;
        const filesArray = Array.from(files).map((file) => file);
        setForm({
            ...form,
            files: filesArray
        })
        setTimeout(() => {
            handleSubmit()
        }, 2000);
    };

    const closeModal = () => {
        setForm({
            path: '',
            files: []
        })
    }

    const handleSubmit = async () => {
        showToast('loading');
        console.log(form)
        // try {
        //     const result = api.post(url.document.upload, form, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //         onUploadProgress: (progressEvent: any) => {
        //             const percentCompleted = Math.round(
        //                 (progressEvent.loaded * 100) / progressEvent.total
        //             );
        //             setProgress(percentCompleted);
        //         }
        //     });
        //     console.log(result)
        //     closeToast();
        //     // showToast('success', result.data.message)
        // } catch (errorx: any) {
        //     const message = await errorManagemet(errorx);
        //     closeToast();
        //     showToast('error', message.toString())
        // }
    }

    return (
        <>
            <Button text="Upload" icon="heroicons-outline:cloud-arrow-down" className="btn-outline-dark" onClick={onButtonUploadClick} />
            <input id="file" type="file" multiple ref={inputFile} style={{ display: 'none' }} onChange={handleChangeSubmitFile}></input>
        </>
    )
}

export default withProviders(DocumentProvider)(Upload)
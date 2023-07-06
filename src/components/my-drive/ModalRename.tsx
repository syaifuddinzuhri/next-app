import Icon from "@/components/ui/Icon";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { getParamsPath } from "@/utils/GlobalFunction";
import { withProviders } from "@/utils/withProviders";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, Fragment, useContext, useEffect, useState } from "react";
import Button from "../ui/Button";
import Textinput from "../ui/Textinput";

const ModalRename = ({ showModal, setShowModal, data, themeClass = "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700" }: any) => {
    const router = useRouter();
    const {
        state: { detailUid },
        action: { renameDocument }
    } = useContext(DocumentContext)

    const closeModal = () => {
        setShowModal(false)
    }
    const [path, setPath] = useState('')
    const [form, setForm] = useState({
        uid: '',
        name: '',
    });

    useEffect(() => {
        setForm({
            name: data.name,
            uid: data.uid
        })
        setPath(getParamsPath('path'))
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        renameDocument(form)
        window.location.reload();
        // setShowModal(false)
        // router.push('/my-drive')
        // router.refresh();
        // if (path == '') {
        //     router.push('/my-drive')
        // } else {
        //     router.push('/my-drive/folders/' + path)
        // }
    }


    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[999]"
                onClose={closeModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className={`flex min-h-full justify-center text-center p-6 items-start`}>
                        <Transition.Child
                            as={Fragment}
                            enter="duration-300  ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`w-full transform overflow-hidden rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-alll max-w-xl`}
                            >
                                <div
                                    className={`relative overflow-hidden py-4 px-5 text-white flex justify-between  ${themeClass}`}
                                >
                                    <h2 className="capitalize leading-6 tracking-wider font-medium text-base text-white">
                                        Rename
                                    </h2>
                                    <button className="text-[22px]" onClick={closeModal}>
                                        <Icon icon="heroicons-outline:x" />
                                    </button>
                                </div>
                                <div
                                    className={`px-6 py-8 overflow-y-auto max-h-[400px]`}
                                >
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
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        text="Submit"
                                        className="btn-dark btn-sm mt-3"
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default withProviders(DocumentProvider)(ModalRename)
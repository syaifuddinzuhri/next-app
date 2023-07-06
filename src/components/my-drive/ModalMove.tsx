import { default as Icon, default as Icons } from "@/components/ui/Icon";
import { MAIN_PATH } from "@/constant/global";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { withProviders } from "@/utils/withProviders";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import Button from "../ui/Button";

const ModalMove = ({ showModalMove, setShowModalMove, data, isMultiple, themeClass = "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700" }: any) => {
    const router = useRouter();
    const {
        state: { },
        action: { getFolders, moveDocuments }
    } = useContext(DocumentContext)

    const closeModal = () => {
        setShowModalMove(false)
    }
    const [path, setPath] = useState(MAIN_PATH)
    const [selected, setSelected] = useState(MAIN_PATH)
    const [prevPath, setPrevPath] = useState<any>([MAIN_PATH])
    const [isMain, setIsMain] = useState(true)
    const [form, setForm] = useState({
        uid: '',
        name: '',
    });
    const [folders, setFolders] = useState<any>([])

    useEffect(() => {
        getDataFolders();
    }, [path])

    const getDataFolders = async () => {
        const result = await getFolders({
            path: path,
            exclude: isMultiple ? data : [data.uid],
        })
        setFolders(result)
    }

    const handleDoubleClickFolder = (item: any) => {
        setIsMain(false)
        setPrevPath((oldArray: any) => [...oldArray, item.uid]);
        setPath(item.uid)
        setSelected(item.uid)
    }

    const handleBack = () => {
        if (prevPath.length == 2) {
            setIsMain(true)
            setPrevPath((prev: any) => (prev.slice(0, -1)));
            setPath(MAIN_PATH)
            setSelected(MAIN_PATH)
        } else {
            setIsMain(false)
            setSelected(prevPath.at(-2))
            setPath(prevPath.at(-2))
            setPrevPath((prev: any) => (prev.slice(0, -1)));
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        moveDocuments({
            data: isMultiple ? data : [data.uid],
            path: selected
        })
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const handleSelect = (value: any) => {
        if (selected == value) {
            setSelected(path)
        } else {
            setSelected(value)
        }
    }


    return (
        <Transition appear show={showModalMove} as={Fragment}>
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
                                        Move
                                    </h2>
                                    <button className="text-[22px]" onClick={closeModal}>
                                        <Icon icon="heroicons-outline:x" />
                                    </button>
                                </div>
                                <div
                                    className={`px-6 py-8 overflow-y-auto max-h-[400px]`}
                                >
                                    {
                                        !isMain && prevPath && prevPath.length > 0 ? (
                                            <span className="flex cursor-pointer mb-2" onClick={handleBack}>
                                                <Icons icon="mdi:arrow-left" className="mr-1 w-8 text-xl text-dark-500" /> Back
                                            </span>
                                        ) : ''
                                    }
                                    <ul className="flex flex-col">
                                        {
                                            folders && folders.length > 0 ? (
                                                folders.map((item: any, i: number) => (
                                                    <li className="flex flex-row mb-2" key={i} onDoubleClick={() => handleDoubleClickFolder(item)} onClick={() => handleSelect(item.uid)}>
                                                        <div className={`select-none cursor-pointer hover:bg-gray-100 border-solid border-2 border-gray-100 hover:border-gray-200 rounded-md flex flex-1 items-center p-4 ${selected == item.uid ? 'bg-gray-200' : ''}`}>
                                                            <div className="flex flex-col w-5 h-5 justify-center items-center mr-4">
                                                                <Icons icon="mdi:folder" className="w-8 text-xl text-dark-500" />
                                                            </div>
                                                            <small>{item.name}</small>
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="flex flex-row mb-2">
                                                    <div className="select-none border-solid border-2 border-gray-100 rounded-md flex flex-1 items-center p-4">
                                                        <small>Empty folders</small>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
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

export default withProviders(DocumentProvider)(ModalMove)
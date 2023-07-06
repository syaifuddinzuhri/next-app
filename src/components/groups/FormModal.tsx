import Icon from "@/components/ui/Icon";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import FormGroup from "./FormGroup";

const FormModal = ({ id, type, title, isOpen, setIsOpen, themeClass = "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700", fetchGroup }: any) => {

    const closeModal = () => {
        setIsOpen(false)
        fetchGroup(1)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
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
                                        {title}
                                    </h2>
                                    <button className="text-[22px]" onClick={closeModal}>
                                        <Icon icon="heroicons-outline:x" />
                                    </button>
                                </div>
                                <div
                                    className={`px-6 py-8 overflow-y-auto max-h-[400px]`}
                                >
                                    <FormGroup close={closeModal} type={type} id={id} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default FormModal
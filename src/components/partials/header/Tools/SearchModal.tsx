import Icon from "@/components/ui/Icon";
import IconCustoms from "@/components/ui/IconCustoms";
import { MAIN_PATH } from "@/constant/global";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { withProviders } from "@/utils/withProviders";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useState } from "react";
const SearchModal = () => {
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    action: { searchDocuments }
  } = useContext(DocumentContext)

  const [query, setQuery] = useState(" ");
  const [list, setList] = useState<any>([])

  const handleChange = async (e: any) => {
    let keyword = e.target.value;
    setQuery(keyword)
    if(keyword){
      const payload = {
        keyword: keyword,
        limit: 1
      }
      const result = await searchDocuments(payload)
      setList(result)
    } else {
      setList([])
    }
  }

  const handleRedirect = (item: any) => {
    if(item.path_uid == MAIN_PATH){
      closeModal();
      router.push('/my-drive')
    } else {
      closeModal();
      router.push('/my-drive/folders/' + item.path_uid)
    }
  }

  return (
    <>
      <div>
        <button
          className="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 px-1 space-x-3 rtl:space-x-reverse"
          onClick={openModal}
        >
          <>
            <Icon icon="heroicons-outline:search" />
            <span className="xl:inline-block hidden">Search... </span>
          </>
        </button>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[9999] overflow-y-auto p-4 md:pt-[25vh] pt-20"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-filter backdrop-blur-sm backdrop-brightness-10" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel>
              <Combobox>
                <div className="relative">
                  <div className="relative mx-auto max-w-xl rounded-md bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-gray-500-500 dark:ring-light divide-y divide-gray-500-300 dark:divide-light">
                    <div className="flex bg-white dark:bg-slate-800  px-3 rounded-md py-3 items-center">
                      <div className="flex-0  text-slate-700 dark:text-slate-300 ltr:pr-2 rtl:pl-2 text-lg">
                        <Icon icon="heroicons-outline:search" />
                      </div>
                      <Combobox.Input
                        className="bg-transparent outline-none focus:outline-none border-none w-full flex-1 dark:placeholder:text-slate-300 dark:text-slate-200"
                        placeholder="Search..."
                        onChange={handleChange}
                      />
                    </div>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Combobox.Options className="max-h-40 overflow-y-auto text-sm py-2">
                        {list.length === 0 && query !== "" && (
                          <div>
                            <div className=" text-base py-2 px-4">
                              <p className="text-slate-500 text-base dark:text-white">
                                No result found
                              </p>
                            </div>
                          </div>
                        )}

                        {list.map((item: any, i: number) => (
                          <Combobox.Option key={i} value={item}>
                            {({ active }) => (
                              <div
                                className={`px-4 text-[15px] font-normal py-2 ${active
                                  ? "bg-slate-900 dark:bg-slate-600 dark:bg-opacity-60 text-white cursor-pointer"
                                  : "text-slate-900 dark:text-white cursor-pointer"
                                  }`}
                                  onClick={() => handleRedirect(item)}
                              >
                                <span className="inline-flex items-center cursor-pointer">
                                  <IconCustoms type={item.type} />
                                  <span>{item?.name}</span>
                                </span>
                              </div>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default withProviders(DocumentProvider)(SearchModal);

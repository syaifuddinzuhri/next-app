"use client"
import ListLoading from "@/components/skeleton/ListLoading";
import Card from "@/components/ui/Card";
import { DocumentContext, DocumentProvider } from "@/contexts/DocumentContext";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Blank = () => {
  const {
    data: { documents, isLoading, isSuccess },
    action: { },
    setState,
  } = useContext(DocumentContext);
  const [selectAll, setSelectAll] = useState(false)
  const [datas, setDatas] = useState<any>([])
  const [arrIds, setArrIds] = useState<any>([])
  const { ref, inView } = useInView();

  useEffect(() => {
    // if (inView) {
    //   nextPageDocument();
    // }
  }, [inView]);

  const actions = [
    {
      name: "download",
      icon: "heroicons-outline:cloud-arrow-down",
    },
  ];

  const selectedAll = () => {
    setSelectAll(!selectAll)
  }

  const selectRow = (id: any) => {
    setArrIds((oldArray: any) => [...oldArray, id]);
  }

  if (isSuccess) {
    return (
      <DocumentProvider>
        <Card noborder>
          <table
            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className="border-t border-slate-100 dark:border-slate-800">
              <tr>
                <th className="table-th text-center">
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    id="all"
                    name="all"
                    checked={selectAll}
                    onChange={selectedAll}
                  />
                </th>
                <th className="table-th text-left">Name</th>
                <th className="table-th">Owner</th>
                <th className="table-th">Last Modified</th>
                <th className="table-th">Size</th>
                <th className="table-th">Action</th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
              {/* {documents?.map((page: any, i: number) => (
                <React.Fragment key={i}>
                  {page.data.data.data.map((item: any) => (
                    <tr key={item.id} className="dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer">
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="table-checkbox"
                          checked={selectAll}
                          id={item.id}
                          name={item.id}
                          onChange={(e) => selectRow(item.id)}
                        />
                      </td>
                      <td className="table-td">
                        <span className="inline-flex items-center">
                          <IconCustoms type={item.type} />
                          <span>{item?.name}</span>
                        </span>
                      </td>
                      <td className="text-center">
                        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
                          <span className="inline-flex items-center">
                            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                              <img
                                src={item.user?.image}
                                alt=""
                                className="object-cover w-full h-full rounded-full"
                              />
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                              {item.user?.name}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        {formatDate(item.updated_at)}
                      </td>
                      <td className="text-center">
                        {item.type != 'folder' && formatBytes(item.size)}
                      </td>
                      <td className="text-center">
                        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
                          <Dropdown
                            classMenuItems="right-0 w-[140px] top-[110%] "
                            label={
                              <span className="text-xl text-center block w-full">
                                <Icon icon="heroicons-outline:dots-vertical" />
                              </span>
                            }
                          >
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                              {
                                actions.map((item: any, i: number) => (
                                  <Menu.Item key={i}>
                                    <div
                                      className={`${item.name === "delete"
                                        ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                                        : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                                        }
    w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
    first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                                    >
                                      <span className="text-base">
                                        <Icon icon={item.icon} />
                                      </span>
                                      <span className="capitalize">{item.name}</span>
                                    </div>
                                  </Menu.Item>
                                ))
                              }
                            </div>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))} */}
            </tbody>
          </table>
        </Card >
        <div ref={ref}></div>
        {/* {
          hasNextDocument ? (
            <ListLoading />
          ) : (
            <div></div>
          )
        } */}
      </DocumentProvider>
    );
  }
  return <ListLoading />
};

export default Blank;

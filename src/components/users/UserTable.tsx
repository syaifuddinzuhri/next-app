"use client"
import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from "react-table";
import Dropdown from "../ui/Dropdown";
import PaginationButtons from "../ui/PaginationButtons";

const actions = [
    // {
    //     name: "view",
    //     icon: "heroicons-outline:eye",
    // },
    {
        name: "edit",
        icon: "heroicons:pencil-square",
    },
    {
        name: "delete",
        icon: "heroicons-outline:trash",
    },
];

const UserTable = ({ listUser, fetchUser, rowAction }: any) => {
    const COLUMNS = [
        {
            Header: "#",
            Cell: (row: any) => {
                let { index } = row.cell.row
                return getIndex(index);
            }
        },
        {
            Header: "name",
            accessor: (row: any) => {
                return (
                    <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
                        <span className="inline-flex items-center">
                            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                                <img
                                    src={row?.image}
                                    alt=""
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                                {row?.name}
                            </span>
                        </span>
                    </div>
                );
            },
        },
        {
            Header: "nip",
            accessor: "nip",
            Cell: (row: any) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "username",
            accessor: "username",
            Cell: (row: any) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "email",
            accessor: "email",
            Cell: (row: any) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "position",
            accessor: "position",
            Cell: (row: any) => {
                return <span>{row?.cell?.value?.name}</span>;
            },
        },
        {
            Header: "action",
            accessor: (row: any) => {
                return (
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
                                                onClick={() => handleRowAction(item.name, row)}
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
                );
            },
        },
    ];

    const columns: any = useMemo(() => COLUMNS, []);
    const data = useMemo(() => listUser?.data, []);
    const router = useRouter();
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect
    );

    const handleRowAction = (type: string, row: any) => {
        rowAction(type, row)
    }



    const getIndex = (idx: any) => {
        const currentPage = listUser?.current_page;
        const perPage = listUser?.per_page;
        if (currentPage == 1) {
            return Number(idx) + 1
        } else {
            return (currentPage - 1) * perPage + Number(idx) + 1
        }
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    }: any = tableInstance;

    const handlePageChange = (page: number) => {
        fetchUser(page)
    }

    return (
        <>
            <div className="inline-block min-w-full align-middle">
                <table
                    className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                    {...getTableProps}
                >
                    <thead className="border-t border-slate-100 dark:border-slate-800">
                        {headerGroups.map((headerGroup: any) => {
                            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...restHeaderGroupProps}>
                                    {headerGroup.headers.map((column: any) => {
                                        const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps())
                                        return (
                                            <th key={key} {...restColumn} className="table-th">
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? " 🔽"
                                                            : " 🔼"
                                                        : ""}
                                                </span>
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody
                        className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                        {...getTableBodyProps}
                    >
                        {page.map((row: any) => {
                            prepareRow(row);
                            const { key, ...restRowProps } = row.getRowProps();
                            return (
                                <tr key={key} {...restRowProps}>
                                    {row.cells.map((cell: any) => {
                                        const { key, ...restCellProps } = cell.getCellProps();
                                        return (
                                            <td
                                                key={key}
                                                {...restCellProps}
                                                className="table-td"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <PaginationButtons
                totalPages={listUser?.last_page}
                currentPage={listUser?.current_page}
                setCurrentPage={handlePageChange}
            />
            {/* <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <span className=" flex space-x-2  rtl:space-x-reverse items-center">
                            <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                                Go
                            </span>
                            <span>
                                <input
                                    type="number"
                                    className=" form-control py-2"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                    }}
                                    style={{ width: "50px" }}
                                />
                            </span>
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{" "}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons-outline:chevron-left" />
                            </button>
                        </li>
                        {pageOptions.map((page: any, pageIdx: number) => (
                            <li key={pageIdx}>
                                <button
                                    aria-current="page"
                                    className={` ${pageIdx === pageIndex
                                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                                        }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <Icon icon="heroicons-outline:chevron-right" />
                            </button>
                        </li>
                    </ul>
                </div> */}
        </>
    );
};


export default UserTable;
// export default withProviders(UserProvider)(UserTable);
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
    {
        name: "edit",
        icon: "heroicons:pencil-square",
    },
    {
        name: "delete",
        icon: "heroicons-outline:trash",
    },
];

const PositionTable = ({ listPositions, fetchPosition, rowAction }: any) => {
    const COLUMNS = [
        {
            Header: "#",
            Cell: (row: any) => {
                let { index } = row.cell.row
                return getIndex(index);
            },
            width: 5,
            minWidth: 5,
            maxWidth: 5,
        },
        {
            Header: "name",
            accessor: "name",
            Cell: (row: any) => {
                return <span>{row?.cell?.value}</span>;
            },
            width: 500,
            minWidth: 500,
            maxWidth: 500,
        },
        {
            Header: "action",
            width: 10,
            minWidth: 10,
            maxWidth: 10,
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
    const data = useMemo(() => listPositions?.data, []);
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


    const getIndex = (idx: any) => {
        const currentPage = listPositions?.current_page;
        const perPage = listPositions?.per_page;
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
        fetchPosition(page)
    }

    const handleRowAction = (type: string, row: any) => {
        rowAction(type, row)
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
                                            <th key={key} {...restColumn} style={{
                                                'width': column.width,
                                                'maxWidth': column.maxWidth,
                                                'minWidth': column.minWidth,
                                            }} className="table-th">
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
                totalPages={listPositions?.last_page}
                currentPage={listPositions?.current_page}
                setCurrentPage={handlePageChange}
            />
        </>
    );
};


export default PositionTable;
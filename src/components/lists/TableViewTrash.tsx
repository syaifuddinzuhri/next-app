import { trashActions } from '@/constant/actions';
import { formatBytes, formatDate } from '@/utils/GlobalFunction';
import { Menu } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { useRowSelect, useSortBy, useTable } from "react-table";
import Dropdown from '../ui/Dropdown';
import IconCustoms from '../ui/IconCustoms';
import TableCheckBox from './TableCheckBox';

const TableViewTrash = ({ data, title, handleRowAction }: any) => {
  const COLUMNS: any = [
    {
      Header: "Name",
      accessor: (row: any) => {
        return (
          <>
            <span className="inline-flex items-center">
              <IconCustoms type={row.type} />
              <span>{row?.name}</span>
            </span>
          </>
        )
      },
    },
    {
      Header: "Owner",
      accessor: (row: any) => {
        return (
          <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
            <span className="inline-flex items-center">
              <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                <img
                  src={row?.user?.image}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                {row?.user?.name}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      Header: "Last Modified",
      accessor: "updated_at",
      Cell: (row: any) => {
        return formatDate(row?.cell?.value);
      },
    },
    {
      Header: "Size",
      accessor: "size",
      Cell: (row: any) => {
        return row?.cell?.value ? formatBytes(row?.cell?.value) : '';
      },
    },
    {
      Header: "action",
      accessor: (row: any) => {
        return (
          <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
            <Dropdown
              classMenuItems="right-0 w-[200px] top-[110%] "
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {
                  trashActions.map((item: any, i: number) => (
                    <Menu.Item key={i}>
                      <div
                        onClick={() => handleActionRow(item.name, row)}
                        className={`${item.name === "permanent delete"
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

  const router = useRouter();
  const [arrUid, setArrUid] = useState<any>([])
  const columns = useMemo(() => COLUMNS, []);
  const IndeterminateCheckbox = React.forwardRef(TableCheckBox)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy, selectedRowIds },
    selectedFlatRows
  }: any = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useRowSelect,
  );

  const handleActionRow = (type: string, row: any) => {
    handleRowAction(type, row)
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
            {
              rows.length > 0 ? (
                rows.map((row: any) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps();
                  return (
                    <tr key={key} {...restRowProps} className="dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer">
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
                })
              ) : (
                <tr className="dark:hover:bg-gray-700 hover:bg-gray-200">
                  <td colSpan={6} className='table-td text-center'>Empty Data</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}


export default TableViewTrash;
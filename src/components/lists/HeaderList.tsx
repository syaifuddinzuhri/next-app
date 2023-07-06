import useListView from "@/hooks/useListView";
import { useEffect, useState } from "react";
import CircleButton from "../ui/CircleButton";

const HeaderList = ({ selectedRowIds, title }: any) => {
    const [listView, setListView] = useListView();
    const [arrUid, setArrUid] = useState<any>([])

    const handleShare = () => {
        console.log('Share');
    }

    const handleDownload = () => {
        console.log('Download');
    }

    const handleMove = () => {
        console.log('Move');
    }

    const handleDelete = () => {
        console.log('Delete');
    }

    const handleFilter = () => {
        console.log('Filter');
    }

    const handleListView = () => {
        setListView(listView == 'table' ? 'grid' : 'table');
    }

    const fetchArraySelected = () => {
        const arr: any[] = []; 
        selectedRowIds.forEach((item: any) => {
            arr.push(item.original.uid)
        });
        setArrUid(arr);
    }

    useEffect(() => {
        fetchArraySelected()
    }, [selectedRowIds])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                {Object.keys(selectedRowIds).length == 0 ?
                    <h4 className="card-title">{title}</h4>
                    : (
                        <div className="flex items-center space-x-2">
                            <span>{Object.keys(selectedRowIds).length} selected</span>
                            <CircleButton icon='heroicons-outline:share' click={handleShare}></CircleButton>
                            <CircleButton icon='heroicons-outline:cloud-arrow-down' click={handleDownload}></CircleButton>
                            <CircleButton icon='ri:file-transfer-line' click={handleMove}></CircleButton>
                            <CircleButton icon='heroicons-outline:trash' click={handleDelete}></CircleButton>
                        </div>
                    )
                }
            </div>
            <div className="text-start md:text-end">
                <div className="flex items-center justify-start md:justify-end space-x-2">
                    {/* <CircleButton icon='material-symbols:filter-list-rounded' click={handleFilter}></CircleButton> */}
                    {/* <CircleButton icon={listView == 'list' ? 'heroicons-outline:table-cells' : 'ic:baseline-grid-on'} click={handleListView}></CircleButton> */}
                </div>
            </div>
        </div>
    )
}

export default HeaderList;

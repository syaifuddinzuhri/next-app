import Card from "@/components/ui/Card";
import useListPage from "@/hooks/useListPage";
import useListView from "@/hooks/useListView";
import TableView from "./TableView";


const ListComponent = ({ data, type, title, handleHeaderAction, handleRowAction, folderDetail }: any) => {

    const [listView, setListView] = useListView();
    const [listPage, setListPage] = useListPage();

    return (
        // <>
        //     <InfiniteScroll
        //         dataLength={listPage}
        //         next={update}
        //         hasMore={hasMore}
        //         loader={''}
        //     >
                <>
                    <Card noborder>
                        {
                            listView == 'table' ?
                                <TableView folderDetail={folderDetail} data={data} title={title} type={type} handleRowAction={handleRowAction} handleHeaderAction={handleHeaderAction} /> : ''
                        }
                    </Card>
                </>
        //     </InfiniteScroll>
        // </>
    );
}

export default ListComponent
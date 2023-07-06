"use client"
import HeadPage from "@/app/head";
import ListComponent from "@/components/lists/ListComponent";
import { trainTable } from "@/constant/table-data";
import useListPage from "@/hooks/useListPage";
import { useEffect, useMemo, useState } from "react";

const Blank = () => {

    const [hasMore, setHasMore] = useState(true)
    const [items, setItems] = useState(trainTable);
    const [listPage, setListPage] = useListPage();

    const fetchMoreData = () => {
        if (items.length >= 20) {
            setHasMore(false)
            return;
        }

        setTimeout(() => {
            setItems(items.concat(trainTable));
        }, 1500);

    };

    const data = useMemo(() => items, [items]);

    useEffect(() => {
        setListPage(data.length)
    }, [data]);

    return (
        <>
             <HeadPage title="Shared With Me" />
            <div className="space-y-5 mt-4">
                <ListComponent type='shared' data={data} update={fetchMoreData} hasMore={hasMore} title='Shared with me' />
            </div>
        </>
    )
}
export default Blank;

import { handleListView } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useListView = () => {
  const dispatch = useDispatch();
  const listView = useSelector((state: any) => state.layout.listView);

  const setListView = (mode: any) => {
    dispatch(handleListView(mode));
  };

  return [listView, setListView];
};

export default useListView;

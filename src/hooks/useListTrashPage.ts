import { handleListPage } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useListTrashPage = () => {
  const dispatch = useDispatch();
  const listTrashPage = useSelector((state: any) => state.layout.listTrashPage);

  const setListTrashPage = (val: any) => {
    dispatch(handleListPage(val));
  };

  return [listTrashPage, setListTrashPage];
};

export default useListTrashPage;

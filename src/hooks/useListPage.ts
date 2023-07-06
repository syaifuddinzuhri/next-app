import { handleListPage } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useListPage = () => {
  const dispatch = useDispatch();
  const listPage = useSelector((state: any) => state.layout.listPage);

  const setListPage = (val: any) => {
    dispatch(handleListPage(val));
  };

  return [listPage, setListPage];
};

export default useListPage;

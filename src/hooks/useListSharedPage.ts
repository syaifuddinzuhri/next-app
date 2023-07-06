import { handleListSharedPage } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useListSharedPage = () => {
  const dispatch = useDispatch();
  const listSharedPage = useSelector((state: any) => state.layout.listSharedPage);

  const setListSharedPage = (val: any) => {
    dispatch(handleListSharedPage(val));
  };

  return [listSharedPage, setListSharedPage];
};

export default useListSharedPage;

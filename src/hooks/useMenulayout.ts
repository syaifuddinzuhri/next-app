import { handleType } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useMenuLayout = () => {
  const dispatch = useDispatch();
  const menuType = useSelector((state: any) => state.layout.type);

  const setMenuLayout = (value: any) => {
    dispatch(handleType(value));
  };

  return [menuType, setMenuLayout];
};

export default useMenuLayout;

import { handleMenuHidden } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useMenuHidden = () => {
  const dispatch = useDispatch();
  const menuHidden = useSelector((state: any) => state.layout.menuHidden);

  const setMenuHidden = (value: any) => {
    dispatch(handleMenuHidden(value));
  };

  return [menuHidden, setMenuHidden];
};

export default useMenuHidden;

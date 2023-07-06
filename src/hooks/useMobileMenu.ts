import { handleMobileMenu } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useMobileMenu = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.layout.mobileMenu);

  // ** Toggles Mobile Menu
  const setMobileMenu = (val: any) => dispatch(handleMobileMenu(val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;

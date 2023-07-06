import { handleNavBarType } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useNavbarType = () => {
  const dispatch = useDispatch();
  const navbarType = useSelector((state: any) => state.layout.navBarType);
  const setNavbarType = (val: any) => dispatch(handleNavBarType(val));
  return [navbarType, setNavbarType];
};

export default useNavbarType;

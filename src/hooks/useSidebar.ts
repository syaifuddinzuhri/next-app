import { handleSidebarCollapsed } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useSidebar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: any) => state.layout.isCollapsed);

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val: any) => dispatch(handleSidebarCollapsed(val));

  return [collapsed, setMenuCollapsed];
};

export default useSidebar;

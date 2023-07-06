import { handleDarkMode } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useDarkmode = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: any) => state.layout.darkMode);

  const setDarkMode = (mode: any) => {
    dispatch(handleDarkMode(mode));
  };

  return [isDark, setDarkMode];
};

export default useDarkmode;

import { handleSemiDarkMode } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useSemiDark = () => {
  const dispatch = useDispatch();
  const isSemiDark = useSelector((state: any) => state.layout.semiDarkMode);

  const setSemiDark = (val: any) => dispatch(handleSemiDarkMode(val));

  return [isSemiDark, setSemiDark];
};

export default useSemiDark;

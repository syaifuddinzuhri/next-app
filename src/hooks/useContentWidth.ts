import { handleContentWidth } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useContentWidth = () => {
  const dispatch = useDispatch();
  const contentWidth = useSelector((state: any) => state.layout.contentWidth);

  // ** Toggles Content Width
  const setContentWidth = (val: any) => dispatch(handleContentWidth(val));

  return [contentWidth, setContentWidth];
};

export default useContentWidth;

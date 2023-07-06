import { handleFooterType } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useFooterType = () => {
  const dispatch = useDispatch();
  const footerType = useSelector((state: any) => state.layout.footerType);
  const setFooterType = (val: any) => dispatch(handleFooterType(val));
  return [footerType, setFooterType];
};

export default useFooterType;

import { handleRtl } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useRtl = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector((state: any) => state.layout.isRTL);

  const setRtl = (val: any) => dispatch(handleRtl(val));

  return [isRtl, setRtl];
};

export default useRtl;

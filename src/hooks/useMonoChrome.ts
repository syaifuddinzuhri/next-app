import { handleMonoChrome } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useMonoChrome = () => {
  const dispatch = useDispatch();
  const isMonoChrome = useSelector((state: any) => state.layout.isMonochrome);

  const setMonoChrome = (val: any) => dispatch(handleMonoChrome(val));

  return [isMonoChrome, setMonoChrome];
};

export default useMonoChrome;

import { handleSubmitLoading } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useSubmitLoading = () => {
  const dispatch = useDispatch();
  const submitLoading = useSelector((state: any) => state.layout.submitLoading);

  const setSubmitLoading = (value: any) => {
    dispatch(handleSubmitLoading(value));
  };

  return [submitLoading, setSubmitLoading];
};

export default useSubmitLoading;

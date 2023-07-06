import { handleSkin } from "@/store/reducers/layoutReducer";
import { useDispatch, useSelector } from "react-redux";

const useSkin = () => {
  const dispatch = useDispatch();
  const skin = useSelector((state: any) => state.layout.skin);

  const setSkin = (mod: any) => dispatch(handleSkin(mod));

  return [skin, setSkin];
};

export default useSkin;

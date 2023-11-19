import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFlashModalFalse } from "../../store/slice/ToggleSlice";
import { RootState } from "../../store/store";
import "./FlashModal.css";

export default function NoLandMessage() {
  // 기본세팅
  const dispatch = useDispatch();
  const isModalMsgActive = useSelector(
    (state: RootState) => state.toggle.isUseDemo
  );
  // const modalMsg = useSelector(
  //   (state: RootState) => state.string.flashModalMdg
  // );

  useEffect(() => {
    // 선택 가능한 땅이 없을 때, 2초 동안 메시지를 보여준 후 숨김
    const timer = setTimeout(() => {
      dispatch(setFlashModalFalse());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isModalMsgActive]);

  return isModalMsgActive ? (
    <div className="noLandMessage">{"Sample"}</div>
  ) : null;
}

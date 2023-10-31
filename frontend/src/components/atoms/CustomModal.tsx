import "./CustomModal.css";

/** 토글로 커지는 옵션창 */
export function AlertModal() {
  // 모달 토글

  return (
    <>
      <div className="alertModalOverlay">
        <div className="alertModal">
          <div className="alertModalClose">
            <div onClick={() => {}}>✖</div>
          </div>
          <div className="alertModalBody">
            <div>sample</div>
          </div>
        </div>
      </div>
    </>
  );
}

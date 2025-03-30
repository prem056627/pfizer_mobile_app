
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
    selectIsCompletedKycHistoryModalOpen,
  selectIsKycHistoryModalOpen,

  setIsCompletedKycHistoryModalOpen,

  setIsKycHistoryModalOpen,

} from "../../../slice/patient-detail-form";
import Modal from "../../../components/Modal/Modal";
// import KycHistory from "./KycHistory";
import CompleteKyc from "./CompleteKyc";

function CompleteKycModal() {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setIsCompletedKycHistoryModalOpen(false));
    // console.log("Modal closed");
  }
  const isKycHistoryOpen = useSelector(selectIsCompletedKycHistoryModalOpen);

  return (
    <Modal
      // label={'Profile'}
      labelType="center"
      show={isKycHistoryOpen}
      closeModal={closeModal}
      ModalBody={<CompleteKyc />}
      // ModalBody={< RequestCallBackForm />}
      // isScroll = false"
      type="center"
      isCloseVisible={true}
    />
  );
}

export default CompleteKycModal;
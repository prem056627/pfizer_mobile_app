
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectIsKycHistoryModalOpen,

  setIsKycHistoryModalOpen,

} from "../../../slice/patient-detail-form";
import Modal from "../../../components/Modal/Modal";
import KycHistory from "./KycHistory";

function KycHistoryModal() {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setIsKycHistoryModalOpen(false));
    // console.log("Modal closed");
  }
  const isKycHistoryOpen = useSelector(selectIsKycHistoryModalOpen);

  return (
    <Modal
      // label={'Profile'}
      labelType="center"
      show={isKycHistoryOpen}
      closeModal={closeModal}
      ModalBody={<KycHistory />}
      // ModalBody={< RequestCallBackForm />}
      // isScroll = false"
      type="center"
      isCloseVisible={true}
    />
  );
}

export default KycHistoryModal;
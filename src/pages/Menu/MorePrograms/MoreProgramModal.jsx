
import React from "react";
// import Modal from "../../../components";
import { useDispatch, useSelector } from "react-redux";
// import ProfileBody from "./ProfileBody";
import {
    selectIsMoreProgramPageOpen,
  selectIsProfilePageOpen,
  setIsMoreProgramPageOpen,
  setIsProfilePageOpen,
} from "../../../slice/patient-detail-form";
import Modal from "../../../components/Modal/Modal";
import MoreProgram from "./MoreProgram";

function MoreProgramModal() {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setIsMoreProgramPageOpen(false));
    console.log("Modal closed");
  }
  const isMoreProgram = useSelector(selectIsMoreProgramPageOpen);

  return (
    <Modal
      // label={'Profile'}
      labelType="center"
      show={isMoreProgram}
      closeModal={closeModal}
      ModalBody={<MoreProgram />}
      // ModalBody={< RequestCallBackForm />}
      // isScroll = false"
      type="center"
      isCloseVisible={true}
    />
  );
}

export default MoreProgramModal;

import React from "react";
import Modal from "../../../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import ProfileBody from "./ProfileBody";
import {
  selectIsProfilePageOpen,
  setIsProfilePageOpen,
} from "../../../slice/patient-detail-form";

function ProfileModal() {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setIsProfilePageOpen(false));
    console.log("Modal closed");
  }
  const isProfilePageOpen = useSelector(selectIsProfilePageOpen);

  return (
    <Modal
      // label={'Profile'}
      labelType="center"
      show={isProfilePageOpen}
      closeModal={closeModal}
      ModalBody={<ProfileBody />}
      // ModalBody={< RequestCallBackForm />}
      // isScroll = false"
      type="center"
      isCloseVisible={true}
    />
  );
}

export default ProfileModal;

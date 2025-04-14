

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../../../components/Modal/SuccessModal';
import { selectPatientEnrollmentModalOpen, selectProgramEnrollmentSuccess, setPatientEnrollmentSuccessModalOpen } from '../../../slice/patient-detail-form';
import PatientEnrollmentSuccess from './PatientEnrollmentSuccess';

function PatientEnrollmentSuccessModal() {

    // const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
       dispatch(setPatientEnrollmentSuccessModalOpen(false));
        // console.log("Modal closed");
    }
const patientEnrollmentSuccess =  useSelector(selectPatientEnrollmentModalOpen);

    return (
        <SuccessModal
            // label={'Profile'}
            labelType="center"
            show={patientEnrollmentSuccess}
            closeModal={closeModal}
            ModalBody={<PatientEnrollmentSuccess />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default PatientEnrollmentSuccessModal;

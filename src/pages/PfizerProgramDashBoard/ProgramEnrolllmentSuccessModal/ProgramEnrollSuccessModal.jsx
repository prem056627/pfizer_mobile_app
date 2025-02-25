

import React from 'react';
// import RequestOrderModalForm from './RequestOrderForm';
import Modal from '../../../components/Modal/Modal';

import { useDispatch, useSelector } from 'react-redux';

import ProgramEnrollSucess from '../ProgramEnrollSucess';
import SuccessModal from '../../../components/Modal/SuccessModal';
import { selectProgramEnrollmentSuccess } from '../../../slice/patient-detail-form';

function ProgramEnrollSuccessModal() {

    // const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
    //    dispatch(setProgramEnrollmentConsent(false));
        console.log("Modal closed");
    }
const programEnrollmentSuccess =  useSelector(selectProgramEnrollmentSuccess);

    return (
        <SuccessModal
            // label={'Profile'}
            labelType="center"
            show={programEnrollmentSuccess}
            // closeModal={closeModal}
            ModalBody={<ProgramEnrollSucess />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default ProgramEnrollSuccessModal;



import React from 'react';
// import RequestOrderModalForm from './RequestOrderForm';
import Modal from '../../../components/Modal/Modal';

import { useDispatch, useSelector } from 'react-redux';

import ProgramEnrollSucess from '../ProgramEnrollSucess';
import SuccessModal from '../../../components/Modal/SuccessModal';
import { selectIsProgramEnrollDocDuplicateFound, selectProgramEnrollmentSuccess } from '../../../slice/patient-detail-form';
import ProgramEnrollDocDuplicateFound from './ProgramEnrollDocDuplicateFound';

function ProgramEnrollDocDuplicateFoundModal() {

    // const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
    //    dispatch(setProgramEnrollmentConsent(false));
        // console.log("Modal closed");
    }
    const { showModal, status } = useSelector(selectIsProgramEnrollDocDuplicateFound);
    

    return (
        <SuccessModal
            // label={'Profile'}
            labelType="center"
            show={showModal}
            // closeModal={closeModal}
            ModalBody={<ProgramEnrollDocDuplicateFound />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default ProgramEnrollDocDuplicateFoundModal;

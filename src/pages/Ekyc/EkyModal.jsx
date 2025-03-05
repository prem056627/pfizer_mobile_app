

import React from 'react';
import Modal from '../../components/Modal/Modal';

import { selectIsEkySuccessModalOpen, selectPhysicalVerificationModalOpen, setIsEkySuccessModalOpen, setPhysicalVerificationModalOpen } from '../../slice/patient-detail-form';
import { useDispatch, useSelector } from 'react-redux';
import EkycSuccess from './EkycSuccess';
import EkycSuccessModal from '../../components/Modal/EkycSuccessModal';


function EkyModal() {
    const EkyModalOpen = useSelector(selectIsEkySuccessModalOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
        dispatch(setIsEkySuccessModalOpen(false)); // Dispatch the close action
        console.log("Modal closed");
    }

    return (
        <EkycSuccessModal
            // label={'Physical Verification'}
            labelType="center"
            show={EkyModalOpen}
            closeModal={closeModal}
            ModalBody={<EkycSuccess />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default EkyModal;

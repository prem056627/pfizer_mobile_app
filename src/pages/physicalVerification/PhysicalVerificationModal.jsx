

import React from 'react';
import Modal from '../../components/Modal/Modal';
// import UploadInvoiceForm from './UploadInvoiceForm';
import InvoiceModal from '../../components/Modal/InvoiceModal';
import PhysicalVerification from './PhysicalVerification';
import { selectPhysicalVerificationModalOpen, setPhysicalVerificationModalOpen } from '../../slice/patient-detail-form';
import { useDispatch, useSelector } from 'react-redux';
// import RequestOrderModalForm from './RequestOrderForm';
// import Modal from '../../../components/Modal/Modal';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsProfilePageOpen, closeRequestOrderModal, isRequestOrderClose, isProfilePageOpen } from '../../slice';
// import RequestOrderModalForm from './RequestOrderModalForm';
// import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';
// import ProfileModalForm from './ProfileModalForm';
// import PatientConsent from './PatientConsent';

function PhysicalVerificationModal() {
    const PhysicalVerificationModalOpen = useSelector(selectPhysicalVerificationModalOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
        dispatch(setPhysicalVerificationModalOpen(false)); // Dispatch the close action
        console.log("Modal closed");
    }

    return (
        <Modal
            // label={'Physical Verification'}
            labelType="center"
            show={PhysicalVerificationModalOpen}
            closeModal={closeModal}
            ModalBody={<PhysicalVerification />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default PhysicalVerificationModal;

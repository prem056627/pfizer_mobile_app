

import React from 'react';
import Modal from '../../components/Modal/Modal';
// import UploadInvoiceForm from './UploadInvoiceForm';
import InvoiceModal from '../../components/Modal/InvoiceModal';
import PhysicalVerification from './PhysicalVerification';
// import RequestOrderModalForm from './RequestOrderForm';
// import Modal from '../../../components/Modal/Modal';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsProfilePageOpen, closeRequestOrderModal, isRequestOrderClose, isProfilePageOpen } from '../../slice';
// import RequestOrderModalForm from './RequestOrderModalForm';
// import RequestCallBackForm from '../RequestCallback/RequestCallBackForm';
// import ProfileModalForm from './ProfileModalForm';
// import PatientConsent from './PatientConsent';

function PhysicalVerificationModal() {
    // const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    // const dispatch = useDispatch(); 

    // function closeModal() {
    //     dispatch(isProfilePageOpen(false)); // Dispatch the close action
    //     console.log("Modal closed");
    // }

    return (
        <Modal
            label={'Physical Verification'}
            labelType="center"
            show={true}
            closeModal={false}
            ModalBody={<PhysicalVerification />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
        />
    );
}

export default PhysicalVerificationModal;

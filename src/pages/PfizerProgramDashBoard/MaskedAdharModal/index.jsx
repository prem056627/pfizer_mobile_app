

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsSampleAadharOpen, selectProgramEnrollmentConsent, setCurrentView, setIsSampleAadharOpen, setIsSampleAadharOpenActive, setProgramEnrollmentConsent } from '../../../slice/patient-detail-form';
import MaskedAdharModal from '../../../components/Modal/MaskedAdharModal'
import MaskedAadhaarModalImage from './MaskedAdharModalImage';

function DemoAdharModal() {

    const dispatch = useDispatch(); 

    function closeModal() {
        dispatch(setIsSampleAadharOpen(false));
        //  dispatch(setIsSampleAadharOpenActive(false));

        console.log("Modal closed");
    }
const isSampleAadharOpen =  useSelector(selectIsSampleAadharOpen);

    return (
        <MaskedAdharModal
            label={'Sample Document'}
            labelType="center"
            show={isSampleAadharOpen}
            closeModal={closeModal}
            ModalBody={<MaskedAadhaarModalImage />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={true}
            moreZindex={true}
        />
    );
}

export default DemoAdharModal;

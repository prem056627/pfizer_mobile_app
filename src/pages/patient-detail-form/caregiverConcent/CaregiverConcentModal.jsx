

import React from 'react';
// import RequestOrderModalForm from './RequestOrderForm';
import Modal from '../../../components/Modal/Modal';

import { useDispatch, useSelector } from 'react-redux';
import { selectCaregiver_enroll_consent, selectProgramEnrollmentConsent, setCaregiver_enroll_consent, setCurrentView, setProgramEnrollmentConsent } from '../../../slice/patient-detail-form';
import CaregiverConcent from './CaregiverConcent';

function CaregiverConcentModal() {
    // const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
    //    dispatch(setProgramEnrollmentConsent(false));
        dispatch(setCaregiver_enroll_consent(false));
    //    dispatch(setCurrentView("home"));
        console.log("Modal closed");
    }
const enrollmentConsent =  useSelector(selectCaregiver_enroll_consent);
// console.log('enrollmentConsent:',enrollmentConsent.consent
// );

    return (
        <Modal
            // label={'Profile'}
            labelType="center"
            show={enrollmentConsent}
            closeModal={closeModal}
            ModalBody={<CaregiverConcent />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={false}
        />
    );
}

export default CaregiverConcentModal;

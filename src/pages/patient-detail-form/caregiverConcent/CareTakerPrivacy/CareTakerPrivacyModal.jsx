

import React from 'react';


import { useDispatch, useSelector } from 'react-redux';
// import { selectCaregiver_enroll_consent, selectProgramEnrollmentConsent, setCaregiver_enroll_consent, setCurrentView, setProgramEnrollmentConsent } from '../../../slice/patient-detail-form';
// import CaregiverConcent from './CaregiverConcent';
import { selectCaregiver_enroll_consent_privacy, setCaregiver_enroll_consent_privacy } from '../../../../slice/patient-detail-form';
import Modal from '../../../../components/Modal/Modal';
import CareTakerPrivacy from './CareTakerPrivacy';

function CareTakerPrivacyModal() {
    // const profilePageOpen = useSelector(selectIsProfilePageOpen); 
    const dispatch = useDispatch(); 

    function closeModal() {
    //    dispatch(setProgramEnrollmentConsent(false));
        dispatch(setCaregiver_enroll_consent_privacy(false));
    //    dispatch(setCurrentView("home"));
        console.log("Modal closed");
    }
const enrollmentConsent =  useSelector(selectCaregiver_enroll_consent_privacy);
// console.log('enrollmentConsent:',enrollmentConsent.consent
// );

    return (
        <Modal
            // label={'Profile'}
            labelType="center"
            show={enrollmentConsent}
            closeModal={closeModal}
            ModalBody={<CareTakerPrivacy />}
            // ModalBody={< RequestCallBackForm />}
            // isScroll = false"
            type="center"
            isCloseVisible={false}
        />
    );
}

export default CareTakerPrivacyModal;

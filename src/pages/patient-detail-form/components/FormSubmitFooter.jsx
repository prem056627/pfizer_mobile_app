import React from 'react';
import { ReactComponent as FormSubmitLeftArrow } from '../../../assets/images/svg/FormSubmit_Left_Arrow.svg';
import { ReactComponent as RightArrow } from '../../../assets/images/svg/right-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';

import {
  setPatientDetails,
  changeStep,
  selectCurrentStep,
  selectPatientDetails,
  selectCurrentPageState,
  setCurrentPageState,
//   setCurrentPageState,
} from '../../../slice/patient-detail-form';



function FormSubmitFooter({ formik }) {
  const dispatch = useDispatch();
  
  // Get the current page state from Redux store
  const currentPageState = useSelector(selectCurrentPageState);

//   console.log("currentPageStatecurrentPageState!",currentPageState)
  
  const handleSubmit = () => {
    if (currentPageState === 'caregiver_addition') {
      // This is the final page, submit the form
      // Add your submission logic here
    } else {
      // Move to the next page based on current page state
    //   const nextPageState = 'caregiver_addition';
    //   setCurrentPageState(nextPageState);
    }
  };
  
  const onsubmitReverse = () => {
    if (currentPageState === 'caregiver_addition') {
      // Go back to patient enrollment page
      dispatch(setCurrentPageState('patient_enrolment'))
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 flex justify-center w-full border-t bg-white px-6 py-6">
      <div className="max-w-screen-lg flex w-full justify-between">
        <button
          type="button"
          onClick={onsubmitReverse}
          disabled={currentPageState === 'patient_enrolment'}
          className={`h-12 w-12 rounded-full bg-primary-light p-4 text-red-500 ${
            currentPageState === 'patient_enrolment' ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <FormSubmitLeftArrow className='text-white' />
        </button>
        <button
          type="submit"
          // disabled={!formik.isValid && !formik.dirty}
          disabled={!(formik.isValid && formik.dirty)}
          className={`flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white font-open-sans font-semibold tracking-wide 
            ${!(formik.isValid && formik.dirty) ? 'opacity-30' : 'opacity-100'} disabled:opacity-75`}
          
          onClick={handleSubmit}
        >
          {currentPageState === 'caregiver_addition' ? <span>Submit</span> : <span>Save & Next</span>}
          <RightArrow />
        </button>
      </div>
    </div>
  );
}

export default FormSubmitFooter;
import React from 'react';
import { ReactComponent as FormSubmitLeftArrow } from '../../../assets/images/svg/FormSubmit_Left_Arrow.svg';
import { ReactComponent as RightArrow } from '../../../assets/images/svg/right-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';

import {
	setPatientDetails,
	changeStep,
	selectCurrentStep,
	selectPatientDetails,
} from '../../../slice/patient-detail-form';
// import { useNavigate } from "react-router-dom";
// import useApi from '../../../hooks/useApi';



function FormSubmitFooter({ formik, setCurrentState }) {


	const dispatch = useDispatch();
	// const navigate = useNavigate();
	// const triggerApi = useApi();

	const currentStep = useSelector(selectCurrentStep);

	const handleSubmit = () => {
        if (currentStep === 2) {
            // Redirect to another page

			

        } else {
            // Handle save and next
            // const nextStep = currentStep + 1;
            // dispatch(changeStep(nextStep));
        }
    };
	const onsubmitReverse = () => {
		const previousStep = currentStep - 1;
		if (previousStep >= 1) {
			dispatch(changeStep(previousStep));
		}
	};

	console.log("formik", formik.isValid, formik.dirty, formik);

	return (
		<div className="fixed bottom-0 left-0 z-50 flex justify-center w-full border-t bg-white px-6 py-6">
			<div className="max-w-screen-lg flex w-full justify-between ">
				<button
					type="button"
					onClick={onsubmitReverse}
					disabled={currentStep === 1}
					className={`h-12 w-12 rounded-full bg-primary-light p-4 text-red-500 ${currentStep === 1 ? 'opacity-30' : 'opacity-100'
						}`}
				>
					<FormSubmitLeftArrow className='text-white' />
				</button>
				<button
					type="submit"
					disabled={!formik.isValid && !formik.dirty}
					className={`${!formik.isValid && !formik.dirty ? 'opacity-30' : 'opacity-100'
						} flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white disabled:opacity-75 font-open-sans font-semibold tracking-wide`}

					onClick={handleSubmit}
				>
					{currentStep === 2 ? <span>Submit</span> : <span>Save & Next</span>}

					<RightArrow />
				</button>
			</div>
		</div>
	);
}

export default FormSubmitFooter;

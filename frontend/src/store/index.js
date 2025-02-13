import { configureStore } from '@reduxjs/toolkit';
import patientDetailFormReducer from '../slice/patient-detail-form';

export default configureStore({
	reducer: {
		patientDetailForm: patientDetailFormReducer,
	},
});

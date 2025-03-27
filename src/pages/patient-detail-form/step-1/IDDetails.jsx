import React from 'react';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';

const idCardOptions = [
	{ id: 'passport', label: 'Passport' },
	{ id: 'aadhaar', label: 'Aadhaar' },
	{ id: 'pan', label: 'PAN Card' },
	{ id: 'voter', label: 'Voter ID' },
	{ id: 'driving', label: 'Driving License' },
];

export default function IDDetails({ formik }) {
	return (
		<>
			<div className="flex grow flex-col gap-[16px]">
			<SelectField
					key="id_card_type"
					label={
						<>
						ID Card Type  
					</>
					}
					name="id_card_type"
					id="id_card_type"
					formik={formik}
					placeholder="Select ID Card Type"
					value={formik.values.id_card_type}
					optionsDataName="id_card_type"
					optionsData={idCardOptions}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				<InputField
					key="id_number"
					label={
						<>
						ID Number  
					</>
					}
					name="id_number"
					id="id_number"
					placeholder="Enter ID Number"
					value={formik.values.id_number}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>
		</>
	);
}

import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import FormDatePicker from '../../../components/Form/FormDatePicker';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';

const genderOptions = [
	{ id: 'male', label: 'Male' },
	{ id: 'female', label: 'Female' },
	{ id: 'other', label: 'Other' },
];

export default function PersonalDetailsForm({ formik }) {
	// Function to calculate BMI
	const calculateBMI = (weight, height) => {
		if (weight > 0 && height > 0) {
			// Parse height into feet and inches
			const [feet, inches] = height.toString().split('.').map(Number);

			// Convert feet and inches to meters
			const heightInCm = feet * 30.48 + (inches || 0) * 2.54; // 1 foot = 30.48 cm, 1 inch = 2.54 cm
			const heightInMeters = heightInCm / 100; // Convert to meters

			// Calculate BMI
			return (weight / (heightInMeters * heightInMeters)).toFixed(2);
		}
		return '';
	};

	// Update BMI automatically when weight or height changes
	const handleBMIChange = (e, fieldName) => {
		const { value } = e.target;
		formik.setFieldValue(fieldName, value); // Update the specific field
		if (fieldName === 'weight' || fieldName === 'height') {
			const weight = fieldName === 'weight' ? value : formik.values.weight;
			const height = fieldName === 'height' ? value : formik.values.height;
			const bmi = calculateBMI(Number(weight), Number(height));
			formik.setFieldValue('bmi', bmi); // Update BMI field
		}
	};

	return (
		<>
			<div className="flex grow flex-col gap-[16px] ">
				<InputField
					key="full_name"
					label={
						<>
							Full Name <span className="text-red-500">*</span>
						</>
					}
					name="full_name"
					id="full_name"
					placeholder="Enter"
					value={formik.values.full_name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<div className='md:grid md:grid-cols-2 flex flex-col gap-4'>
					<FormDatePicker
						key="date_of_birth"
						label={
							<>
								Date of Birth <span className="text-red-500">*</span>
							</>
						}
						name="date_of_birth"
						id="date_of_birth"
						placeholder="DD/MM/YYYY"
						value={get(formik.values, 'date_of_birth', '')}
						onChange={formik.handleChange}
						formik={formik}
						min={moment().subtract(200, 'years')}
						max={moment()}
						className="flex grow rounded-md border border-[#D5D5D5] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0 placeholder:leading-none"
					/>

					<SelectField
						key="gender"
						label={
							<>
								Gender <span className="text-red-500">*</span>
							</>
						}
						name="gender"
						id="gender"
						formik={formik}
						placeholder="Select"
						value={formik.values.gender}
						optionsDataName="gender"
						optionsData={genderOptions}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="w-1/2"
					/>
				</div>
				<InputField
					key="address"
					label={
						<>
							Address <span className="text-red-500">*</span>
						</>
					}
					name="address"
					id="address"
					placeholder="Enter"
					value={formik.values.address}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<div className='md:grid md:grid-cols-2 flex flex-col gap-4'>
					<div className="flex flex-col gap-[4px]">
						<label
							htmlFor="mobile_number"
							className="font-open-sans text-form-xs font-semibold text-[#595454]"
						>
							Mobile Number <span className="text-red-500">*</span>
						</label>
						<div className="flex gap-[12px] rounded-md border border-[#ACA9A9]  px-[12px] py-[14px] bg-white">
							<span className="font-open-sans text-[#6C747D]">+91</span>
							<input
								id="mobile_number"
								name="mobile_number"
								type="number"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.mobile_number}
								className="h-full w-full font-open-sans  text-[#283A46] placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0 disabled:bg-[#f2f2f2]"
								placeholder="0000000000"
							/>
						</div>
						{formik.touched.mobile_number && formik.errors.mobile_number ? (
							<div className="font-open-sans text-form-xs text-[#cc3300]">
								{formik.errors.mobile_number}
							</div>
						) : null}
					</div>
					<InputField
						key="email"
						label={
							<>
								Email ID <span className="text-red-500">*</span>
							</>
						}
						name="email"
						id="email"
						placeholder="john.doe@xyz.com"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				<div className='md:grid md:grid-cols-3 flex flex-col gap-4 relative'>
					<InputField
						key="weight"
						label={
							<>
								Weight (in kgs) <span className="text-red-500">*</span>
							</>
						}
						name="weight"
						id="weight"
						placeholder="Enter your weight in kgs"
						value={formik.values.weight}
						onChange={(e) => handleBMIChange(e, 'weight')}
						onBlur={formik.handleBlur}
					/>
					<InputField
						key="height"
						label={
							<>
								Height (in feet) <span className="text-red-500">*</span>
							</>
						}
						name="height"
						id="height"
						placeholder="Enter your heght in feet.inches"
						value={formik.values.height}
						onChange={(e) => handleBMIChange(e, 'height')}
						onBlur={formik.handleBlur}
					/>
					<InputField
						key="bmi"
						label={
							<>
								BMI
							</>
						}
						name="bmi"
						id="bmi"
						placeholder="Convert automatically"
						value={formik.values.bmi}
						disabled={true} // Disable manual input for BMI
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<p className='text-[#9B9B9B] absolute right-2 -bottom-12 md:-bottom-8 italic'>
						BMI is automatically calculated after weight and height
					</p>
				</div>
			</div>
		</>
	);
}

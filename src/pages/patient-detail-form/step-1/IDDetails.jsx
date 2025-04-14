// import React from 'react';
// import InputField from '../../../components/Form/InputField';
// import SelectField from '../../../components/Form/SelectField';

// const idCardOptions = [
// 	{ id: 'passport', label: 'Passport' },
// 	{ id: 'aadhaar', label: 'Aadhaar' },
// 	{ id: 'pan', label: 'PAN Card' },
// 	{ id: 'Others', label: 'Others ID' },
// 	{ id: 'driving', label: 'Driving License' },
// ];

// export default function IDDetails({ formik }) {
// 	return (
// 		<>
// 			<div className="flex grow flex-col gap-[16px]">
// 			<SelectField
// 					key="id_card_type"
// 					label={
// 						<>
// 						ID Card Type  
// 					</>
// 					}
// 					name="id_card_type"
// 					id="id_card_type"
// 					formik={formik}
// 					placeholder="Select ID Card Type"
// 					value={formik.values.id_card_type}
// 					optionsDataName="id_card_type"
// 					optionsData={idCardOptions}
// 					onChange={formik.handleChange}
// 					onBlur={formik.handleBlur}
// 				/>

// 				<InputField
// 					key="id_number"
// 					label={
// 						<>
// 						ID Number  
// 					</>
// 					}
// 					name="id_number"
// 					id="id_number"
// 					placeholder="Enter ID Number"
// 					value={formik.values.id_number}
// 					onChange={formik.handleChange}
// 					onBlur={formik.handleBlur}
// 				/>
// 			</div>
// 		</>
// 	);
// }


import React, { useState, useEffect } from 'react';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';

const idCardOptions = [
  { id: 'passport', label: 'Passport' },
  { id: 'aadhaar', label: 'Aadhaar' },
  { id: 'pan', label: 'PAN Card' },
  { id: 'Others', label: 'Others' },
  { id: 'driving', label: 'Driving License' },
];

// ID format examples
const idFormatExamples = {
  passport: "A1234567 (1 letter followed by 7 digits)",
  aadhaar: "123456789012 (12 digits)",
  pan: "ABCDE1234F (5 letters, 4 digits, 1 letter)",
  driving: "DL0420180012345 (2 letters followed by 13 digits)",
};

export default function IDDetails({ formik }) {
  const [exampleText, setExampleText] = useState("");
  
  // Update example text when ID type changes
  useEffect(() => {
    const selectedIdType = formik.values.id_card_type;
    if (selectedIdType && idFormatExamples[selectedIdType]) {
      setExampleText(idFormatExamples[selectedIdType]);
    } else {
      setExampleText("");
    }
  }, [formik.values.id_card_type]);

  return (
    <>
      <div className="flex grow flex-col gap-[16px]  mb-16">
        <SelectField
          key="id_card_type"
          label={<>ID Card Type</>}
          name="id_card_type"
          id="id_card_type"
          formik={formik}
          placeholder="Select ID Card Type"
          value={formik.values.id_card_type}
          optionsDataName="id_card_type"
          optionsData={idCardOptions}
          onChange={(e) => {
            formik.handleChange(e);
            // Clear ID number when changing ID type
            formik.setFieldValue('id_number', '');
          }}
          onBlur={formik.handleBlur}
        />

        <InputField
          key="id_number"
          label={<>ID Number</>}
          name="id_number"
          id="id_number"
          placeholder={formik.values.id_card_type ? `Enter ${formik.values.id_card_type} Number` : "Enter ID Number"}
          value={formik.values.id_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // helperText={exampleText}
          error={formik.touched.id_number && formik.errors.id_number}
        />
      </div>
    </>
  );
}
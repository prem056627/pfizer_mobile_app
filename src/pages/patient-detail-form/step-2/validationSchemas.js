// import * as Yup from "yup";

// const caregiverValidationSchema = (id) => ({
//   [`caregiver_${id}_name`]: Yup.string()
//     .trim()
//     .required(`Caregiver ${id} name is required`),

//   [`caregiver_${id}_mobile_verify`]: Yup.string()
//     .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
//     .required(`Caregiver ${id} mobile number is required`),

//   [`caregiver_${id}_mobile`]: Yup.string()
//     .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
//     .required(`Caregiver ${id} mobile is required`).nullable(),

//   [`caregiver_${id}_email`]: Yup.string()
//     .trim()
//     .email("Enter a valid email address")
//     .required(`Caregiver ${id} email is required`),

//   [`relationship_${id}`]: Yup.string()
//     .oneOf(["parent", "spouse", "sibling", "guardian", "other"], "Invalid relationship")
//     .required(`Caregiver ${id} relationship is required`),
// });

// // Generate validation schema for up to 3 caregivers
// export const combinedValidationSchema = Yup.object().shape({
//   ...caregiverValidationSchema(1),
//   ...caregiverValidationSchema(2),
//   ...caregiverValidationSchema(3),
// });

// // Function to initialize caregiver details dynamically
// export const getCaregiverDetailsInitialValues = (initialData = {}) => {
//   const defaultValues = {};
  
//   [1, 2, 3].forEach((id) => {
//     defaultValues[`caregiver_${id}_mobile_verify`] = initialData[`caregiver_${id}_mobile_verify`] || "";
//     defaultValues[`caregiver_${id}_mobile`] = initialData[`caregiver_${id}_mobile`] || "";
//     defaultValues[`caregiver_${id}_name`] = initialData[`caregiver_${id}_name`] || "";
//     defaultValues[`caregiver_${id}_email`] = initialData[`caregiver_${id}_email`] || "";
//     defaultValues[`relationship_${id}`] = initialData[`relationship_${id}`] || "";
//   });

//   return defaultValues;
// };

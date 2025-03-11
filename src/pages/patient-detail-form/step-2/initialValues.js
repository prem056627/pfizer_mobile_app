// export const getCaregiverDetailsInitialValues = (initialData) => {
//   // Default initial values
//   const defaultValues = {
//     caregiverData: [
//       {
//         caregiver_id: 10009,
//         caregiver_name: "",
//         caregiver_email: null,
//         caregiver_mobile: null,
//         caregiver_relation: "NA"
//       },
//       {
//         caregiver_id: 10010,
//         caregiver_name: "",
//         caregiver_email: null,
//         caregiver_mobile: null,
//         caregiver_relation: "NA"
//       },
//       {
//         caregiver_id: 10011,
//         caregiver_name: "",
//         caregiver_email: null,
//         caregiver_mobile: null,
//         caregiver_relation: "NA"
//       }
//     ]
//   };

//   // If initialData is provided, use it instead of the defaults
//   if (initialData && initialData.caregiverData) {
//     return { caregiverData: initialData.caregiverData };
//   }

//   return defaultValues;
// };



export const getCaregiverDetailsInitialValues = (initialData) => {
  // Default initial values
  const defaultValues = {
    caregiver_0_email: "",
    caregiver_0_mobile: "",
    caregiver_0_mobile_verify: "",
    caregiver_0_name: "",

    caregiver_1_email: "",
    caregiver_1_mobile: "",
    caregiver_1_mobile_verify: "",
    caregiver_1_name: "",

    caregiver_2_email: "",
    caregiver_2_mobile: "",
    caregiver_2_mobile_verify: "",
    caregiver_2_name: "",

    relationship_0: "",
    relationship_1: "",
    relationship_2: "",
  };

  return defaultValues;
};

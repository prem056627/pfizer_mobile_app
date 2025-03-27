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

    // Group 1 Initial Values
    id_card_type_1: "",
    id_number_1: "",
    id_doc_upload_1: [], // Assuming this holds file uploads as an array

    // Group 2 Initial Values
    id_card_type_2: "",
    id_number_2: "",
    id_doc_upload_2: [], // Assuming this holds file uploads as an array
  };

  return defaultValues;
};

export const getCaregiverDetailsInitialValues = (initialData) => {
  // Default initial values
  const defaultValues = {
    // Caregiver 0 details
  caregiver_0_name: "",
  caregiver_0_email: "",
  caregiver_0_mobile: "",
  relationship_0: "",
  
  // Caregiver 0 - Primary ID details
  id_card_type_0: "",
  id_number_0: "",
  id_doc_upload_0: [],
  
  // Caregiver 0 - First Additional ID details
  id_card_1_type_00: "",
  id_number_1_00: "",
  id_doc_1_upload_0: [],

  // Caregiver 1 details
  caregiver_1_name: "",
  caregiver_1_email: "",
  caregiver_1_mobile: "",
  relationship_1: "",
  
  // Caregiver 1 - Primary ID details
  id_card_type_1: "",
  id_number_1: "",
  id_doc_upload_1: [],
  
  // Caregiver 1 - First Additional ID details
  id_card_1_type_11: "",
  id_number_1_11: "",
  id_doc_1_upload_11: [],

  // Caregiver 2 details
  caregiver_2_name: "",
  caregiver_2_email: "",
  caregiver_2_mobile: "",
  relationship_2: "",
  
  // Caregiver 2 - Primary ID details
  id_card_type_2: "",
  id_number_2: "",
  id_doc_upload_2: [],
  
  // Caregiver 2 - First Additional ID details
  id_card_type_22: "",
  id_number_22: "",
  id_doc_1_upload_22: [],

  // This will be populated by the form submission logic
  caregiverData: {}
  };

  return defaultValues;
};







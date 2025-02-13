export const getCaregiverDetailsInitialValues = (initialData) => {
  return {
    caregiver_mobile_verify: initialData?.caregiver_mobile_verify || "",
    caregiver_mobile: initialData?.caregiver_mobile || "",
    caregiver_name: initialData?.caregiver_name || "",
    caregiver_email: initialData?.caregiver_email || "",
    relationship: initialData?.relationship || "",
  };
};

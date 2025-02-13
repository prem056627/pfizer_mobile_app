import moment from 'moment';

export const getPersonalDetailsInitialValues = (initialData) => {
  console.log('initialData', initialData);
  return {
    full_name: initialData?.full_name || "",
    date_of_birth:
      moment(initialData?.date_of_birth, "DD-MM-YYYY").format("DD/MM/YYYY") ||
      "",
    gender: initialData?.gender?.toLowerCase() || "",
    address: initialData?.address || "",
    mobile_number: initialData?.mobile_number || "",
    email: initialData?.email || "",
    weight: initialData?.weight || "",
    height: initialData?.height || "",
    bmi: initialData?.bmi || "",
  };
};

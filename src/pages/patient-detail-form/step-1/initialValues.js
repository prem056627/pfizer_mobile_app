

import moment from "moment";

export const getPersonalDetailsInitialValues = (initialData) => {
  return {
    full_name: initialData?.full_name || "",
    gender: initialData?.gender || "",
    date_of_birth: initialData?.date_of_birth
      ? moment(initialData.date_of_birth)
      : null,
    mobile_number: initialData?.mobile_number || "",
    email: initialData?.email || "",
    nationality: initialData?.nationality || "",
   
  };
};


// Initial Values
export const getAddressProofInitialValues = (initialData) => {
  return {
    permanent_addressline1: initialData?.permanent_addressline1 || "",
    permanent_addressline2: initialData?.permanent_addressline2 || "",
    permanent_city: initialData?.permanent_city || "",
    permanent_state: initialData?.permanent_state || "",
    permanent_pincode: initialData?.permanent_pincode || "",
  };
};

export const getCurrentResidentialAddressInitialValues = (initialData) => {
  return {
    same_as_permanent: initialData?.same_as_permanent || false,
    current_addressline1: initialData?.current_addressline1 || "",
    current_addressline2: initialData?.current_addressline2 || "",
    current_city: initialData?.current_city || "",
    current_state: initialData?.current_state || "",
    current_pincode: initialData?.current_pincode || "",
  };
};

export const getIDDetailsInitialValues = (initialData) => {
  return {
    id_card_type: initialData?.id_card_type || "",
    id_number: initialData?.id_number || "",
  };
};

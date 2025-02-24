

// import moment from "moment";

// export const getPersonalDetailsInitialValues = (initialData) => {
//   return {
//     full_name: initialData?.full_name || "",
//     gender: initialData?.gender || "",
//     date_of_birth: initialData?.date_of_birth
//       ? moment(initialData.date_of_birth)
//       : null,
//     mobile_number: initialData?.mobile_number || "",
//     email: initialData?.email || "",
//     nationality: initialData?.nationality || "",
   
//   };
// };


// // Initial Values
// export const getAddressProofInitialValues = (initialData) => {
//   return {
//     permanent_addressline1: initialData?.permanent_addressline1 || "",
//     permanent_addressline2: initialData?.permanent_addressline2 || "",
//     permanent_city: initialData?.permanent_city || "",
//     permanent_state: initialData?.permanent_state || "",
//     permanent_pincode: initialData?.permanent_pincode || "",
//   };
// };

// export const getCurrentResidentialAddressInitialValues = (initialData) => {
//   return {
//     same_as_permanent: initialData?.same_as_permanent || false,
//     current_addressline1: initialData?.current_addressline1 || "",
//     current_addressline2: initialData?.current_addressline2 || "",
//     current_city: initialData?.current_city || "",
//     current_state: initialData?.current_state || "",
//     current_pincode: initialData?.current_pincode || "",
//   };
// };

// export const getIDDetailsInitialValues = (initialData) => {
//   return {
//     id_card_type: initialData?.id_card_type || "",
//     id_number: initialData?.id_number || "",
//   };
// };


import moment from 'moment';

export const getProfileInitialValues = (storedData = {}) => {
  return {
    // Personal Details
    full_name: storedData.full_name || "",
    gender: storedData.gender || "",
    date_of_birth: storedData.date_of_birth ? moment(storedData.date_of_birth) : null,
    mobile_number: storedData.mobile_number || "",
    email: storedData.email || "",
    nationality: storedData.nationality || "",
    
    // Address Proof
    permanent_addressline1: storedData.permanent_addressline1 || "",
    permanent_addressline2: storedData.permanent_addressline2 || "",
    permanent_city: storedData.permanent_city || "",
    permanent_state: storedData.permanent_state || "",
    permanent_pincode: storedData.permanent_pincode || "",
    
    // Current Residential Address
    same_as_permanent: storedData.same_as_permanent || false,
    current_addressline1: storedData.current_addressline1 || "",
    current_addressline2: storedData.current_addressline2 || "",
    current_city: storedData.current_city || "",
    current_state: storedData.current_state || "",
    current_pincode: storedData.current_pincode || "",
    
    // ID Details
    id_card_type: storedData.id_card_type || "",
    id_number: storedData.id_number || "",
  };
};

// Field groups for different sections (optional, but helpful for organization)
export const fieldGroups = {
  personalDetails: [
    'full_name',
    'gender',
    'date_of_birth',
    'mobile_number',
    'email',
    'nationality'
  ],
  addressProof: [
    'permanent_addressline1',
    'permanent_addressline2',
    'permanent_city',
    'permanent_state',
    'permanent_pincode'
  ],
  currentResidentialAddress: [
    'same_as_permanent',
    'current_addressline1',
    'current_addressline2',
    'current_city',
    'current_state',
    'current_pincode'
  ],
  idDetails: [
    'id_card_type',
    'id_number'
  ]
};
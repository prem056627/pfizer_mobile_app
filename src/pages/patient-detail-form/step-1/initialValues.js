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
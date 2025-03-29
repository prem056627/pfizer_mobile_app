import moment from 'moment';

export const getProfileInitialValues = (storedData = {}) => {

  console.log("storedData",storedData);
  return {
    // Personal Details
    full_name: storedData.full_name || "",
    gender: storedData.gender || "",
    date_of_birth: '',
    mobile_number: storedData.mobile_number || "",
    email: storedData.email || "",
    nationality: storedData.nationality || "",

    // Address
    address: {
      // Permanent Address
      permanent: {
        line1: storedData.permanent_line1 || "",
        line2: storedData.permanent_line2 || "",
        city: storedData.permanent_city || "",
        state: storedData.permanent_state || "",
        pincode: storedData.permanent_pincode || "",
      },
      // Current Residential Address
      current: {
        same_as_permanent: storedData.same_as_permanent || false,
        line1: storedData.current_line1 || "",
        line2: storedData.current_line2 || "",
        city: storedData.current_city || "",
        state: storedData.current_state || "",
        pincode: storedData.current_pincode || "",
      },
    },
    
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
    'address.permanent.addressline1',
    'address.permanent.addressline2',
    'address.permanent.city',
    'address.permanent.state',
    'address.permanent.pincode'
  ],
  currentResidentialAddress: [
    'address.current.same_as_permanent',
    'address.current.addressline1',
    'address.current.addressline2',
    'address.current.city',
    'address.current.state',
    'address.current.pincode'
  ],
  idDetails: [
    'id_card_type',
    'id_number'
  ]
};
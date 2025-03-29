import moment from 'moment';

export const getProfileInitialValues = (storedData = {}) => {

  console.log("storedData",storedData);
  return {
    // Personal Details
    full_name: storedData.full_name || "",
    gender: storedData.gender || "",
    date_of_birth: storedData.date_of_birth || '',
    mobile_number: storedData.mobile_number || "",
    email: storedData.email || "",
    nationality: storedData.nationality || "",

    // Address
    address: {
      // Permanent Address
      
      
      permanent: {
        line1: storedData.address?.permanent?.line1 || "",
        line2: storedData.address?.permanent?.line2 || "",
        city: storedData.address?.permanent?.city || "",
        state: storedData.address?.permanent?.state || "",
        pincode: storedData.address?.permanent?.pincode || "",
      },
      // Current Residential Address
      current: {
        same_as_permanent: storedData?.address?.current.line1 || false,
        line1: storedData?.address?.current.line2 || "",
        line2: storedData?.address?.current.current_line2 || "",
        city: storedData?.address?.current.city || "",
        state: storedData?.address?.current.state || "",
        pincode: storedData?.address?.current.pincode || "",
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
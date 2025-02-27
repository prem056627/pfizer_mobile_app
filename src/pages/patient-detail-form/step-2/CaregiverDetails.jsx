// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import InputField from '../../../components/Form/InputField';
// import SelectField from '../../../components/Form/SelectField';

// const relationshipOptions = [
//   { id: 'parent', label: 'Parent' },
//   { id: 'spouse', label: 'Spouse' },
//   { id: 'sibling', label: 'Sibling' },
//   { id: 'guardian', label: 'Guardian' },
//   { id: 'other', label: 'Other' },
// ];

// const CaregiverDetails = ({ formik }) => {
//   const [isVerified, setIsVerified] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState(Array(6).fill(''));
//   const [isOtpComplete, setIsOtpComplete] = useState(false);

//   useEffect(() => {
//     const isComplete = otp.every(digit => digit !== '');
//     setIsOtpComplete(isComplete);
//   }, [otp]);

//   if (!formik) {
//     return null;
//   }

//   const handleSendOtp = () => {
//     if (formik.validateField) {
//       formik.validateField('caregiver_mobile_verify').then(() => {
//         if (!formik.errors.caregiver_mobile_verify) {
//           setOtpSent(true);
//         }
//       });
//     }
//   };

//   const handleVerify = () => {
//     setIsVerified(true);
//     if (formik.setFieldValue) {
//       formik.setFieldValue('caregiver_mobile', formik.values.caregiver_mobile_verify);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
      
//       if (value !== '' && index < 5) {
//         const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const values = formik.values || {};
//   const touched = formik.touched || {};
//   const errors = formik.errors || {};

//   return (
//     <div className="flex flex-col gap-4">
//       {!isVerified && (
//         <>
//           <h3 className="font-semibold text-[#283A46] font-sans text-[16px] py-4">
//             Verify Caregiver's Mobile Number
//           </h3>
//           <InputField
//             key="caregiver_mobile_verify"
//             label="Caregiver's Mobile Number"
//             name="caregiver_mobile_verify"
//             id="caregiver_mobile_verify"
//             placeholder="Enter caregiver's mobile number"
//             value={values.caregiver_mobile_verify || ''}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={touched.caregiver_mobile_verify && errors.caregiver_mobile_verify}
//             disabled={otpSent}
//           />
          
//           {!otpSent ? (
//             <button
//               onClick={handleSendOtp}
//               disabled={!values.caregiver_mobile_verify || errors.caregiver_mobile_verify}
//               className={`text-primary text-[12px] font-semibold w-fit ${
//                 !values.caregiver_mobile_verify || errors.caregiver_mobile_verify
//                   ? 'opacity-50 cursor-not-allowed'
//                   : 'hover:underline cursor-pointer'
//               }`}
//             >
//               GET OTP
//             </button>
//           ) : (
//             <>
//               <p className="text-gray-700">
//                 Enter the OTP sent to <b>{values.caregiver_mobile_verify}</b>
//               </p>
//               <div className="flex gap-2">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     name={`otp-${index}`}
//                     type="text"
//                     maxLength="1"
//                     className="w-[52px] h-[52px] border rounded text-center"
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-500">Resend OTP in 30</p>
//               <button
//                 onClick={handleVerify}
//                 disabled={!isOtpComplete}
//                 className={`flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white font-open-sans font-semibold tracking-wide ${
//                   !isOtpComplete ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 Verify
//               </button>
//             </>
//           )}
//         </>
//       )}

//       {isVerified && (
//         <>
//           <InputField
//             key="caregiver_mobile"
//             label="Caregiver's Mobile Number"
//             name="caregiver_mobile"
//             id="caregiver_mobile"
//             value={values.caregiver_mobile || ''}
//             error={touched.caregiver_mobile && errors.caregiver_mobile}
//             disabled
//           />
//           <InputField
//             key="caregiver_name"
//             label="Caregiver's Name"
//             name="caregiver_name"
//             id="caregiver_name"
//             placeholder="Enter name"
//             value={values.caregiver_name || ''}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={touched.caregiver_name && errors.caregiver_name}
//           />
//           <InputField
//             key="caregiver_email"
//             label="Caregiver's Email ID"
//             name="caregiver_email"
//             id="caregiver_email"
//             placeholder="Enter email"
//             value={values.caregiver_email || ''}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={touched.caregiver_email && errors.caregiver_email}
//           />
//           <SelectField
//             key="relationship"
//             label="Relationship"
//             name="relationship"
//             id="relationship"
//             formik={formik}
//             placeholder="Select"
//             value={values.relationship || ''}
//             optionsData={relationshipOptions}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={touched.relationship && errors.relationship}
//           />
//           <button className="mt-2 text-blue-600 font-semibold hover:underline text-left">
//             + Add New Caregiver
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// CaregiverDetails.propTypes = {
//   formik: PropTypes.object.isRequired
// };

// export default CaregiverDetails;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';

const relationshipOptions = [
  { id: 'parent', label: 'Parent' },
  { id: 'spouse', label: 'Spouse' },
  { id: 'sibling', label: 'Sibling' },
  { id: 'guardian', label: 'Guardian' },
  { id: 'other', label: 'Other' },
];

const CaregiverDetails = ({ formik }) => {
  const [caregivers, setCaregivers] = useState([{ id: 1, isVerified: false, otpSent: false, otp: Array(6).fill('') }]);
  const [otpTimers, setOtpTimers] = useState({});

  useEffect(() => {
    if (!formik) return;
  
    [1, 2, 3].forEach(id => {
      if (!formik.values[`caregiver_${id}_mobile_verify`]) {
        formik.setFieldValue(`caregiver_${id}_mobile_verify`, '');
      }
      if (!formik.values[`caregiver_${id}_mobile`]) {
        formik.setFieldValue(`caregiver_${id}_mobile`, '');
      }
      if (!formik.values[`caregiver_${id}_name`]) {
        formik.setFieldValue(`caregiver_${id}_name`, '');
      }
      if (!formik.values[`caregiver_${id}_email`]) {
        formik.setFieldValue(`caregiver_${id}_email`, '');
      }
      if (!formik.values[`relationship_${id}`]) {
        formik.setFieldValue(`relationship_${id}`, '');
      }
    });
  }, [formik.values]); // Only re-run if values change
  

  if (!formik) {
    return null;
  }

  const startOtpTimer = (caregiverId) => {
    let seconds = 30;
    
    // Clear any existing timer
    if (otpTimers[caregiverId]) {
      clearInterval(otpTimers[caregiverId]);
    }
    
    // Start new timer
    const timerId = setInterval(() => {
      seconds--;
      
      // Update the caregiver's timer display
      const caregiverElement = document.getElementById(`otp-timer-${caregiverId}`);
      if (caregiverElement) {
        caregiverElement.innerText = `Resend OTP in ${seconds}`;
      }
      
      // When timer reaches 0, clear interval and allow resend
      if (seconds <= 0) {
        clearInterval(timerId);
        
        if (caregiverElement) {
          caregiverElement.innerHTML = `<button type="button" class="text-primary font-semibold hover:underline">Resend OTP</button>`;
          caregiverElement.querySelector('button').addEventListener('click', () => handleSendOtp(caregiverId));
        }
        
        // Remove timer from state
        setOtpTimers(prev => {
          const newTimers = {...prev};
          delete newTimers[caregiverId];
          return newTimers;
        });
      }
    }, 1000);
    
    // Store timer ID in state
    setOtpTimers(prev => ({
      ...prev,
      [caregiverId]: timerId
    }));
  };

  const handleSendOtp = (caregiverId) => {
    // Simulate OTP sending
    const updatedCaregivers = caregivers.map(caregiver => 
      caregiver.id === caregiverId ? { ...caregiver, otpSent: true, otp: Array(6).fill('') } : caregiver
    );
    setCaregivers(updatedCaregivers);
    
    // Start the OTP timer
    startOtpTimer(caregiverId);
  };

  const handleVerify = (caregiverId) => {
    // In a real app, you would verify the OTP with your backend
    // For now, we'll simulate successful verification
    
    const caregiver = caregivers.find(c => c.id === caregiverId);
    const enteredOtp = caregiver.otp.join('');
    
    // Dummy check - in real app, verify with API
    if (enteredOtp.length === 6) {
      // Simulate successful verification
      const updatedCaregivers = caregivers.map(caregiver => 
        caregiver.id === caregiverId ? { ...caregiver, isVerified: true } : caregiver
      );
      setCaregivers(updatedCaregivers);
      
      // Update formik field value
      if (formik.setFieldValue) {
        formik.setFieldValue(
          `caregiver_${caregiverId}_mobile`, 
          formik.values[`caregiver_${caregiverId}_mobile_verify`]
        );
      }
      
      // Clear any existing timer
      if (otpTimers[caregiverId]) {
        clearInterval(otpTimers[caregiverId]);
        setOtpTimers(prev => {
          const newTimers = {...prev};
          delete newTimers[caregiverId];
          return newTimers;
        });
      }
    }
  };

  const handleOtpChange = (caregiverId, index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const caregiver = caregivers.find(c => c.id === caregiverId);
      if (!caregiver) return;
      
      const newOtp = [...caregiver.otp];
      newOtp[index] = value;
      
      const updatedCaregivers = caregivers.map(c => 
        c.id === caregiverId ? { ...c, otp: newOtp } : c
      );
      setCaregivers(updatedCaregivers);
      
      // Auto-focus next input field
      if (value !== '' && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${caregiverId}-${index + 1}]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const addNewCaregiver = (e) => {
    e.preventDefault(); // Prevent form submission
    
    if (caregivers.length < 3) {
      const newId = Math.max(...caregivers.map(c => c.id)) + 1;
      const newCaregivers = [...caregivers, { 
        id: newId, 
        isVerified: false, 
        otpSent: false, 
        otp: Array(6).fill('')
      }];
      
      setCaregivers(newCaregivers);
    }
  };

  const checkOtpComplete = (caregiverId) => {
    const caregiver = caregivers.find(c => c.id === caregiverId);
    return caregiver && caregiver.otp.every(digit => digit !== '');
  };

  const values = formik.values || {};
  const touched = formik.touched || {};
  const errors = formik.errors || {};

  return (
    <div className="flex flex-col gap-4">
      {caregivers.map((caregiver) => (
        <div key={caregiver.id} className="border-b pb-4 mb-4">
          <h3 className="font-semibold text-[#283A46] font-sans text-[14px] pt-2">
            {caregiver.id === 1 ? 'Primary Caregiver' : `Additional Caregiver ${caregiver.id - 1}`}
          </h3>
          
          {!caregiver.isVerified && (
            <>
              <h3 className="font-semibold text-black font-sans text-[12px] py-4">
                Verify Caregiver's Mobile Number
              </h3>
              <InputField
                key={`caregiver_${caregiver.id}_mobile_verify`}
                label="Caregiver's Mobile Number"
                name={`caregiver_${caregiver.id}_mobile_verify`}
                id={`caregiver_${caregiver.id}_mobile_verify`}
                placeholder="Enter caregiver's mobile number"
                value={values[`caregiver_${caregiver.id}_mobile_verify`] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={touched[`caregiver_${caregiver.id}_mobile_verify`] && errors[`caregiver_${caregiver.id}_mobile_verify`]}
                disabled={caregiver.otpSent}
              />
              
              {!caregiver.otpSent ? (
                <button
                  type="button"
                  onClick={() => handleSendOtp(caregiver.id)}
                  disabled={!values[`caregiver_${caregiver.id}_mobile_verify`]}
                  className={`text-primary text-[12px] font-semibold w-fit pt-5 ${
                    !values[`caregiver_${caregiver.id}_mobile_verify`]
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:underline cursor-pointer'
                  }`}
                >
                  GET OTP
                </button>
              ) : (
                <>
                <div className='flex flex-col gap-4 pt-4'>
                <div className='flex flex-col gap-3'>
                 <p className="text-gray-700">
                    Enter the OTP sent to <b>{values[`caregiver_${caregiver.id}_mobile_verify`]}</b>
                  </p>
                  <div className="flex gap-2">
                    {caregiver.otp.map((digit, index) => (
                      <input
                        key={index}
                        name={`otp-${caregiver.id}-${index}`}
                        type="text"
                        maxLength="1"
                        className="w-[52px] h-[52px] border rounded text-center"
                        value={digit}
                        onChange={(e) => handleOtpChange(caregiver.id, index, e.target.value)}
                      />
                    ))}
                  </div>
                 </div>
                 <div className='flex flex-col gap-3'>
                 <p id={`otp-timer-${caregiver.id}`} className="text-gray-500">Resend OTP in 30</p>
                  <button
                    type="button"
                    onClick={() => handleVerify(caregiver.id)}
                    disabled={!checkOtpComplete(caregiver.id)}
                    className={`flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white font-open-sans font-semibold tracking-wide ${
                      !checkOtpComplete(caregiver.id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Verify
                  </button>
                 </div>
                </div>
                </>
              )}
            </>
          )}

          {caregiver.isVerified && (
            <>
            <div className='flex flex-col gap-2 pt-4'>
            <InputField
                key={`caregiver_${caregiver.id}_mobile`}
                label="Caregiver's Mobile Number"
                name={`caregiver_${caregiver.id}_mobile`}
                id={`caregiver_${caregiver.id}_mobile`}
                value={values[`caregiver_${caregiver.id}_mobile`] || ''}
                error={touched[`caregiver_${caregiver.id}_mobile`] && errors[`caregiver_${caregiver.id}_mobile`]}
                disabled
              />
              <InputField
                key={`caregiver_${caregiver.id}_name`}
                label="Caregiver's Name"
                name={`caregiver_${caregiver.id}_name`}
                id={`caregiver_${caregiver.id}_name`}
                placeholder="Enter name"
                value={values[`caregiver_${caregiver.id}_name`] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={touched[`caregiver_${caregiver.id}_name`] && errors[`caregiver_${caregiver.id}_name`]}
              />
              <InputField
                key={`caregiver_${caregiver.id}_email`}
                label="Caregiver's Email ID"
                name={`caregiver_${caregiver.id}_email`}
                id={`caregiver_${caregiver.id}_email`}
                placeholder="Enter email"
                value={values[`caregiver_${caregiver.id}_email`] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={touched[`caregiver_${caregiver.id}_email`] && errors[`caregiver_${caregiver.id}_email`]}
              />
              <SelectField
                key={`relationship_${caregiver.id}`}
                label="Relationship"
                name={`relationship_${caregiver.id}`}
                id={`relationship_${caregiver.id}`}
                formik={formik}
                placeholder="Select"
                value={values[`relationship_${caregiver.id}`] || ''}
                optionsData={relationshipOptions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={touched[`relationship_${caregiver.id}`] && errors[`relationship_${caregiver.id}`]}
              />
            </div>
            </>
          )}
        </div>
      ))}

      {caregivers.length < 3 && caregivers[caregivers.length - 1].isVerified && (
        <button 
          type="button"
          onClick={addNewCaregiver}
          className="mt-2 text-primary font-semibold hover:underline text-left"
        >
          + Add New Caregiver
        </button>
      )}
    </div>
  );
};

CaregiverDetails.propTypes = {
  formik: PropTypes.object.isRequired
};

export default CaregiverDetails;
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedProgram, setIsInitalDataLoad, setRequestFocModalOpen, setViewingOrderHistory } from '../../slice/patient-detail-form';
import { toast } from 'react-toastify';
import { ReactComponent as Tick } from "../../../../pfizer-app/src/assets/images/physicalVerify/tick_1.svg";
import useApi from '../../hooks/useApi';
import { transformToFormData } from '../../utils/forms';
import { LoaderContext } from '../../context/LoaderContextProvider';

function RequestFOCForm({ setStep, fetchProgramDetails }) {
    const dispatch = useDispatch();
    const triggerApi = useApi();
   
    const { setLoading, isLoading } = useContext(LoaderContext);
    const program = useSelector(selectSelectedProgram);

    const initialValues = {
        current_step: "place_foc_order",
        program_id: program?.program_id,
        prescription_files: [],

    };

    const validationSchema = Yup.object({
        prescription_files: Yup.array()
            .min(1, 'Please upload at least one file')
            .max(1, 'You can upload a maximum of 1 files')
            .test('fileSize', 'File size must be less than 5MB', (files) => {
                if (!files) return true;
                return files.every(file => file.size <= 5 * 1024 * 1024); // 5MB limit
            })
            .test('fileType', 'Only jpg, png, and pdf files are allowed', (files) => {
                if (!files) return true;
                const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                return files.every(file => validTypes.includes(file.type));
            })
            .required('File upload is required'),
    });

    const notify = () =>
        toast('You have successfully requested your FOC order.', {
            duration: 6000,
            position: 'top-right',
    
            // Styling
            style: {
                borderBottom: '1.5px solid #86C4B6',
                fontFamily: 'open sans',
                fontSize: '14px',
                padding: '16px',
                fontWeight: '800',
                color: '#156352',
                background: '#E6FAF3',
                width: '100%',
            },
            className: 'custom-toast',
            progressStyle: { background: '#B4E3D5' },
    
            // Custom Icon
            icon: <Tick className="w-16 h-12" />,
    
            // Aria
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });

    // API call using JSON with base64 encoded files
  // API call using FormData with files
  const makeApiCall = async (values) => {
    try {
        setLoading(true);

        // Create FormData object
        const formData = transformToFormData(values)



        // API request
        const { response, success } = await triggerApi({
            url: `/patient_dashboard/?current_step=place_foc_order`,
            type: "POST",
            payload: formData,
            loader: true,
        });

        if (success && response) {
            return { success: true, data: response };
        } else {
            console.error("API call failed or returned no data.");
            return { success: false, error: "API call failed" };
        }
    } catch (error) {
        console.error("Error in makeApiCall:", error);
        return { success: false, error };
    } finally {
        setLoading(false);
    }
};


    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
       
        try {
            const result = await makeApiCall(values);
            
            if (result.success) {
                dispatch(setRequestFocModalOpen(false));
                
                // Show success toast
                notify();

                   
                
                        dispatch(setViewingOrderHistory(false));

                          setTimeout(() => {
                            dispatch(setIsInitalDataLoad(true));
                         }, 500);
                        
                
                
                
                // Refresh program details if the function exists
                if (typeof fetchProgramDetails === 'function') {
                    fetchProgramDetails();
                }
                
                // Move to next step if setStep function exists
                if (typeof setStep === 'function') {
                    setStep(prevStep => prevStep + 1);
                }
            } else {
                // Handle API error
                setFieldError('prescription_files', 'Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFieldError('prescription_files', 'An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    //    useEffect(()=>{
    //      dispatch(setIsInitalDataLoad(false));
    // console.log("hi");
    //     },[])
    

    return (
        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}
        >
            {(formik) => {
                const isFileUploaded = formik.values.prescription_files.length > 0;
                const hasErrors = Object.keys(formik.errors).length > 0 && formik.touched.prescription_files;

                return (
                    <Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
                        <div className="px-5">
                        <MultiFileUpload
                        isMultiple={true}
                        formik={formik}
                        id="prescription_files"  // Remove the trailing space
                        name="prescription_files"  // Remove the trailing space
                        label="Prescription *"
                         description="* - manditory fields"
                        // description="The file must be in jpg/pdf/png format. Maximum size of the document should be 5MB. You can upload up to 5 files."
                    />


                        <p className="text-red-500 text-[12px] italic text-start mb-4 py-4">
                          The file must be in jpg/pdf/png format.In case of multiple file upload please upload as a single pdf.
                          Maximum size of the document should be 5MB.
                        </p>
                         
                        </div>

                        <div className="flex flex-col gap-5">
                            <button
                                type="submit"
                                disabled={!isFileUploaded || hasErrors || formik.isSubmitting || isLoading}
                                className={`flex mt-6 w-full items-center justify-center rounded-b-[8px] bg-primary py-6 font-lato text-[18px] font-bold leading-[20px] text-white transition-opacity duration-300 ${
                                    isFileUploaded && !hasErrors && !formik.isSubmitting && !isLoading ? 'opacity-100' : 'opacity-30'
                                }`}
                            >
                                <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default RequestFOCForm;
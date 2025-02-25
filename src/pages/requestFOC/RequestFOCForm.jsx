import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MultiFileUpload from '../../components/Form/MultiFileUpload';
import { useDispatch } from 'react-redux';
import { setRequestFocModalOpen, setUploadInvoiceModalOpen } from '../../slice/patient-detail-form';
// import { setUploadInvoiceModalOpen } from '../../redux/actions';

function RequestFOCForm({ setStep, fetchProgramDetails }) {
    const dispatch = useDispatch();

    const initialValues = {
        BrowseFiles: [],
    };

    const validationSchema = Yup.object({
        BrowseFiles: Yup.array()
            .min(1, 'Please upload at least one file')
            .required('File upload is required'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        console.log('Form Submitted', values);
        dispatch(setRequestFocModalOpen(false));
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => {
                const isFileUploaded = formik.values.BrowseFiles.length > 0;

                return (
                    <Form className="complete-hidden-scroll-style flex flex-grow flex-col gap-4 overflow-y-auto">
                        <div className="px-5">
                            <MultiFileUpload
                                isMultiple={false}
                                formik={formik}
                                id="BrowseFiles"
                                name="BrowseFiles"
                                label="Prescription"
                                description="The file must be in jpg/pdf/png format. Maximum size of the document should be 2MB."
                            />
                        </div>

                        <div className="flex flex-col gap-5">
                            <button
                                type="submit"
                                disabled={!isFileUploaded}
                                className={`flex mt-6 w-full items-center justify-center rounded-b-[8px] bg-primary py-6 font-lato text-[18px] font-bold leading-[20px] text-white transition-opacity duration-300 ${
                                    isFileUploaded ? 'opacity-100' : 'opacity-30'
                                }`}
                            >
                                <span>Submit</span>
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default RequestFOCForm;

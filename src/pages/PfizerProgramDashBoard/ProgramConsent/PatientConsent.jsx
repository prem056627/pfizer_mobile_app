import { handleRequest } from 'msw'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setDocUploadStatus } from '../../../slice/patient-detail-form'

function PatientConsent() {
  const dispatch =useDispatch()

  function handleRequest(){

dispatch(setDocUploadStatus("scheme_enroll_doc"));
  }

  return (
    <div className='flex flex-col gap-10'>
        <div>
				<h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
                Patient Consent
				</h1>
				<div className="h-1 w-8 rounded-full bg-primary"></div>
			</div>

      <p className='w-full font-sans text-[14px] font-normal text-[#283A46] leading-loose'>
I hereby voluntarily agree, consent and authorize Pfizer Product India Private Limited (Pfizer), Prerna Patient Access Program Team - Service provider of Pfizer which includes TATA 1MG Private Limited, Rx Consultants Private Limited or any other service
provider appointed by Pfizer to receive, collect, upload/store, use, transfer, possess,
store, deal, evaluate, handle or have access (in physical/electronic form) to the information, communication and documents (including this enrollment form, identity,
address and financial documents) shared by me or my caregiver(s) or other family members as required under Law or otherwise by Pfizer(i) in connection with me availing the benefit and participating in the program, and (ii) for the purpose of
administration and implementation of the Prerna Patient Access Program , for which
I have made this application as well as to:

      </p>

     <div className='bg-white w-full fixed bottom-0 left-0 px-4 py-4'>
     <button onClick={handleRequest} className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-lg">
         Agree & Submit
        </button>
     </div>
    </div>
  )
}

export default PatientConsent

import { http, delay, HttpResponse } from 'msw';
// import { useEffect, useState } from 'react';
// import { ReactComponent as BrandIcon } from '../../assets/images/svg/brand-logo.svg';
// import MenuFooter from '../../components/MenuFooter';
// import PlayIcon from '../assets/images/svg/Play.svg';
// import bg1 from '../assets/images/svg/bg_image/bg-1.png'; // Import the background image
// import bg2 from '../assets/images/svg/bg_image/bg-2.png';

// let initialData = {
// 	// message: 'Consent Flag',
// 	// ekyc_details: {
// 	// 	status: 'Complete KYC',
// 	// },
// 	is_Program_enrollment_submited: false,
// 	// is_Concent_Submitted: false,
// 	// is_ekyc_completed: true,
// 	is_profile_completed: true,
// 	// is_document_submitted : false,
// 	is_document_status: true,

// 	// "patient_id": "10005",    
//     //   "current_state": "terms_and_conditions",
// };


let initialData ={
    response: {
    
            current_step: "patient_enrolment"
			// caregiver_addition
      
    },
    success: true
}

export const handlers = [
	// http.get('/patient/initialize-dashboard/', async () => {
	// 	return HttpResponse.json({
	// 		response: initialData,
	// 		success: true,
	// 	});
	// }),


	http.get('/patient_dashboard/?current_step=initialize', async () => {
		return HttpResponse.json({
			response: initialData,
			success: true,
		});
	}),

	

	// http.get('/patient-initialize/', () => {
	// 	return HttpResponse.json({
	// 		success: true,
	// 		response: {
	// 			uid: '12345', // Unique ID for the user "enrollment_not_complete"
	// 			current_page_state: "enrollment_not_complete", 
	// 			// program_status: 'un_active',
    //             // program_status: "active",
	// 			// program_status: 'profile_under_review', 
	// 			// program_status: 'doc_shortfall', 
    //             program_name :'Opdyta',
            
	// 			// current_state: "program_dashboard",
	// 			// current_state: "enrollment_not_complete",
	// 			program_status: 'active',

	// 			enrollment_details: {
	// 				steps: [
	// 					// 'terms_and_conditions',
	// 					'personal_details',
	// 					'caregiver_details'
	// 				],
	// 				completed_steps: ['terms_and_conditions', 'patient_details'],
	// 				current_step: 'patient_details',
	// 				step_data: {
	// 					terms_and_conditions: 'Yes', // Can be "yes", "no"
	// 					personal_details: {
	// 						full_name: "John Doe",
	// 						gender: "Male",
	// 						date_of_birth: "1990-05-15",
	// 						mobile_number: "9876543210",
	// 						email: "johndoe@example.com",
	// 						nationality: "American",
	// 						permanent_addressline1: "123 Main Street",
	// 						permanent_addressline2: "Apt 4B",
	// 						permanent_city: "New York",
	// 						permanent_state: "NY",
	// 						permanent_pincode: "100401",
	// 						same_as_permanent: false,
	// 						current_addressline1: "456 Elm Street",
	// 						current_addressline2: "Suite 2A",
	// 						current_city: "Los Angeles",
	// 						current_state: "CA",
	// 						current_pincode: "900123",
	// 						id_card_type: "Passport",
	// 						id_number: "A12345678"
	// 					},
	// 					caregiver_details: {
	// 						caregiver_email: "pk@gmail.com",
	// 						caregiver_mobile: "9894906630",
	// 						caregiver_mobile_verify: "9894906630",
	// 						caregiver_name: "Prem",
	// 						relationship: "Brother"
	// 					}
	// 				},
	// 				completed: false // Whether the process is fully completed
	// 			}
	// 		}
	// 	});
	// }),
	
   // Mock server implementation
   http.post('/patient_dashboard/', async ({ request }) => {
	try {
	  // Get the current_step from URL query parameters
	  const url = new URL(request.url);
	  const currentStep = url.searchParams.get('current_step');
	  
	  // Make sure request has a body before trying to parse it
	  let requestBody = {};
	  try {
		const contentType = request.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
		  const text = await request.text();
		  if (text) {
			requestBody = JSON.parse(text);
		  }
		}
	  } catch (e) {
		console.error('Error parsing request body:', e);
	  }
	  
	  let responseData;
	  if (currentStep === "patient_enrolment") {
		responseData = {
		  current_step: "caregiver_addition",
		  patient_data: requestBody
		};
	  }else if (currentStep === "caregiver_addition") {
		responseData = {
		  current_step: "program_enrolment",
		  program_status:"un_active",
		//   un_active
		  patient_data: requestBody
		};
	  } else {
		responseData = {
		  current_step: currentStep || "unknown",
		  ...requestBody
		};
	  }
	  
	  // Return proper JSON response
	  return new HttpResponse(
		JSON.stringify({
		  response: responseData,
		  success: true,
		  message: "Data updated successfully"
		}),
		{
		  status: 200,
		  headers: {
			'Content-Type': 'application/json'
		  }
		}
	  );
	} catch (error) {
	  console.error('Mock server error:', error);
	  return new HttpResponse(
		JSON.stringify({
		  success: false,
		  message: "Server error",
		  error: error.message
		}),
		{
		  status: 500,
		  headers: {
			'Content-Type': 'application/json'
		  }
		}
	  );
	}
  })
  
	// http.get('/patient/get-programs/', () => {
	// 	return HttpResponse.json({
	// 		success: true,
	// 		response: {
	// 			foc_ekyc_completed: false,
	// 			available_programs: [
	// 				{
	// 					// logo: WinForPatient,
	// 					title: 'SAMBHAV',
	// 					// description:
	// 					// 	'Win for Patients - Transplant welcomes you to our digital patient support platform to support you through your treatment journey.',
	// 					program_id: '12321',
	// 					enrolled_date: '30 May’ 22',
	// 					remaining_infusions: '3 nos',
	// 					doctor_name: 'Dr. Johnathan Weiss',
	// 					program_name: 'SAMBHAV',
	// 				},
	// 				{
	// 					// logo: WinForPatient,
	// 					title: 'AARAMBH',
	// 					program_id: '22321',
	// 					enrolled_date: '31 May’ 22',
	// 					remaining_infusions: '2 nos',
	// 					doctor_name: 'Dr. levis',
	// 					program_name: 'AARAMBH',
	// 				},
	// 			],
	// 			all_orders: [
	// 				{
	// 					order_code: 202,
	// 					order_date: '22 Feb 2024',
	// 					dispensed_date: '27 Feb 2024',
	// 					dosage: '180 mg',
	// 					infusion_date: '01 Mar 2024',
	// 					distributor: 'Charity Distributors',
	// 					pharmacy: 'GoodCare Pharmacy',
	// 					order_type: 'free',
	// 				},
	// 				{
	// 					order_code: 146,
	// 					order_date: '05 Mar 2024',
	// 					dispensed_date: '17 June 2022',
	// 					dosage: '240 mg',
	// 					distributor: 'XYZ',
	// 					pharmacy: 'PremiumPharm',
	// 					order_type: 'paid',
	// 				},
	// 				{
	// 					order_code: 204,
	// 					order_date: '18 Mar 2024',
	// 					dispensed_date: '23 Mar 2024',
	// 					dosage: '300 mg',
	// 					infusion_date: '26 Mar 2024',
	// 					distributor: 'Helping Hands Pharma',
	// 					pharmacy: 'Community Pharmacy',
	// 					order_type: 'free',
	// 				},
	// 				{
	// 					order_code: 205,
	// 					order_date: '25 Mar 2024',
	// 					dispensed_date: '30 Mar 2024',
	// 					dosage: '160 mg',
	// 					infusion_date: '02 Apr 2024',
	// 					distributor: 'Wellness Pharma',
	// 					pharmacy: 'HealthLink Pharmacy',
	// 					order_type: 'free',
	// 				},
	// 				{
	// 					order_code: 201,
	// 					order_date: '08 Jan 2024',
	// 					dispensed_date: '12 Jan 2024',
	// 					dosage: '120 mg',
	// 					infusion_date: '15 Jan 2024',
	// 					distributor: 'FreeMeds Supply',
	// 					pharmacy: 'HealthFirst Pharmacy',
	// 					order_type: 'free',
	// 				},
	// 				{
	// 					order_code: 206,
	// 					order_date: '10 Apr 2024',
	// 					dispensed_date: '15 Apr 2024',
	// 					dosage: '200 mg',
	// 					infusion_date: '18 Apr 2024',
	// 					distributor: 'Community Health Supplies',
	// 					pharmacy: 'CarePlus Pharmacy',
	// 					order_type: 'free',
	// 				},
	// 				{
	// 					order_code: 203,
	// 					order_date: '01 Mar 2024',
	// 					dispensed_date: '06 Mar 2024',
	// 					dosage: '220 mg',
	// 					infusion_date: '09 Mar 2024',
	// 					distributor: 'GoodHealth Providers',
	// 					pharmacy: 'MediSupply Pharmacy',
	// 					order_type: 'paid',
	// 				},
	// 			],
	// 			foc_order: [
	// 				{
	// 					order_code: 201,
	// 					order_date: '08 Jan 2024',
	// 					dispensed_date: '12 Jan 2024',
	// 					dosage: '120 mg',
	// 					infusion_date: '15 Jan 2024',
	// 					distributor: 'FreeMeds Supply',
	// 					pharmacy: 'free',
	// 				},
	// 				{
	// 					order_code: 202,
	// 					order_date: '22 Feb 2024',
	// 					dispensed_date: '27 Feb 2024',
	// 					dosage: '180 mg',
	// 					infusion_date: '01 Mar 2024',
	// 					distributor: 'Charity Distributors',
	// 					pharmacy: 'free',
	// 				},
	// 				{
	// 					order_code: 203,
	// 					order_date: '01 Mar 2024',
	// 					dispensed_date: '06 Mar 2024',
	// 					dosage: '220 mg',
	// 					infusion_date: '09 Mar 2024',
	// 					distributor: 'GoodHealth Providers',
	// 					pharmacy: 'free',
	// 				},
	// 				{
	// 					order_code: 204,
	// 					order_date: '18 Mar 2024',
	// 					dispensed_date: '23 Mar 2024',
	// 					dosage: '300 mg',
	// 					infusion_date: '26 Mar 2024',
	// 					distributor: 'Helping Hands Pharma',
	// 					pharmacy: 'free',
	// 				},
	// 				{
	// 					order_code: 205,
	// 					order_date: '25 Mar 2024',
	// 					dispensed_date: '30 Mar 2024',
	// 					dosage: '160 mg',
	// 					infusion_date: '02 Apr 2024',
	// 					distributor: 'Wellness Pharma',
	// 					pharmacy: 'free',
	// 				},
	// 				{
	// 					order_code: 206,
	// 					order_date: '10 Apr 2024',
	// 					dispensed_date: '15 Apr 2024',
	// 					dosage: '200 mg',
	// 					infusion_date: '18 Apr 2024',
	// 					distributor: 'Community Health Supplies',
	// 					pharmacy: 'free',
	// 				},
	// 			],
	// 			paid_order: [
	// 				{
	// 					order_code: 101,
	// 					order_date: '12 Jan 2024',
	// 					dispensed_date: '18 Jan 2024',
	// 					dosage: '150 mg',
	// 					infusion_date: '20 Jan 2024',
	// 					distributor: 'ABC Pharma',
	// 					pharmacy: 'paid',
	// 				},
	// 				{
	// 					order_code: 102,
	// 					order_date: '25 Feb 2024',
	// 					dispensed_date: '02 Mar 2024',
	// 					dosage: '300 mg',
	// 					infusion_date: '05 Mar 2024',
	// 					distributor: 'HealthCare Distributors',
	// 					pharmacy: 'paid',
	// 				},
	// 				{
	// 					order_code: 103,
	// 					order_date: '10 Mar 2024',
	// 					dispensed_date: '15 Mar 2024',
	// 					dosage: '200 mg',
	// 					infusion_date: '18 Mar 2024',
	// 					distributor: 'XYZ Pharma',
	// 					pharmacy: 'paid',
	// 				},
	// 				{
	// 					order_code: 104,
	// 					order_date: '28 Mar 2024',
	// 					dispensed_date: '02 Apr 2024',
	// 					dosage: '250 mg',
	// 					infusion_date: '05 Apr 2024',
	// 					distributor: 'MediPlus Distributors',
	// 					pharmacy: 'paid',
	// 				},
	// 				{
	// 					order_code: 105,
	// 					order_date: '05 Apr 2024',
	// 					dispensed_date: '10 Apr 2024',
	// 					dosage: '180 mg',
	// 					infusion_date: '12 Apr 2024',
	// 					distributor: 'Global Health Distributors',
	// 					pharmacy: 'paid',
	// 				},
	// 				{
	// 					order_code: 106,
	// 					order_date: '15 Apr 2024',
	// 					dispensed_date: '20 Apr 2024',
	// 					dosage: '320 mg',
	// 					infusion_date: '22 Apr 2024',
	// 					distributor: 'Care Pharma',
	// 					pharmacy: 'paid',
	// 				},
	// 			],
	// 		},
	// 	});
	// }),

	// http.get('/profile_details/', () => {
	// 	return HttpResponse.json({
	// 		success: true,
	// 			response: {
	// 				patient_gender: "Male",
	// 				patient_email: "patient89876@mail.com",
	// 				patient_name: "Patient test api",
	// 				program_name: "Opdyta",
	// 				registration_date: "15-10-2024",
	// 				patient_primary_phone: "+918876787877",
	// 				patient_dob: "10-10-1989",
	// 				patient_id: 10053,
	// 				enrollment_details: {
	// 					address_details: {
	// 						city: "New York",
	// 						state: "NY",
	// 						address_line_1: "123 Main St",
	// 						address_line_2: "Apt 4B",
	// 						pin_code: "10001"
	// 					},
	// 					reimbursement_info: {
	// 						reimbursement_type: null,
	// 						reimbursement_limits: null,
	// 						has_reimbursement: "no",
	// 						reimbursement_mount: null
	// 					},
	// 					caregiver_address_proof: {
	// 						city: "New York",
	// 						state: "NY",
	// 						address_line_1: "123 Main St",
	// 						address_line_2: "Apt 4B",
	// 						pin_code: "10001"
	// 					},
	// 					current_residence: {
	// 						city: "New York",
	// 						state: "NY",
	// 						address_line_1: "123 Main St",
	// 						address_line_2: "Apt 4B",
	// 						pin_code: "10001"
	// 					},
	// 					caregiver_details: {
	// 						gender: "Female",
	// 						email: "janesmith@example.com",
	// 						full_name: "Jane Smith",
	// 						mobile_number: "9876543210"
	// 					},
	// 					terms_and_conditions: "yes",
	// 					patient_details: {
	// 						gender: "Male",
	// 						nationality: "IND"
	// 					},
	// 					document_upload: {
	// 						proof_type: "Aadhar Card"
	// 					},
	// 					caregiver_id_proof: {
	// 						proof_type: null
	// 					},
	// 					current_step: "authorization",
	// 					authorization: {
	// 						program_explained: "Yes",
	// 						oasiss_consent: "Yes"
	// 					}
	// 				}
	// 			},
				
		
	// 	});
	// }),
];
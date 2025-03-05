import { http, delay, HttpResponse } from 'msw';
// import { useEffect, useState } from 'react';
// import { ReactComponent as BrandIcon } from '../../assets/images/svg/brand-logo.svg';
// import MenuFooter from '../../components/MenuFooter';
// import PlayIcon from '../assets/images/svg/Play.svg';
// import bg1 from '../assets/images/svg/bg_image/bg-1.png'; // Import the background image
// import bg2 from '../assets/images/svg/bg_image/bg-2.png';

let initialData = {
	// message: 'Consent Flag',
	// ekyc_details: {
	// 	status: 'Complete KYC',
	// },
	is_Program_enrollment_submited: false,
	// is_Concent_Submitted: false,
	// is_ekyc_completed: true,
	is_profile_completed: true,
	// is_document_submitted : false,
	is_document_status: true,

	// "patient_id": "10005",    
    //   "current_state": "terms_and_conditions",
};

export const handlers = [
	http.get('/patient/initialize-dashboard/', async () => {
		return HttpResponse.json({
			response: initialData,
			success: true,
		});
	}),

	http.get('/patient-initialize/', () => {
		return HttpResponse.json({
			success: true,
			response: {
				uid: '12345', // Unique ID for the user "enrollment_not_complete"
				current_page_state: "program_dashboard", // Options: tnc_pending, patient_enrollment
				// program_status: 'un_active', // program status
                // program_status: "active", // program status
                program_name :'Opdyta',
            	// program_status: 'profile_under_review', // program status
				// current_state: "program_dashboard",
				// doc_shortfall
				// doc_upload_status: "",
				program_status: 'active',

				enrollment_details: {
					steps: [
						// 'terms_and_conditions',
						'personal_details',
						'caregiver_details'
					],
					completed_steps: ['terms_and_conditions', 'patient_details'],
					current_step: 'patient_details',
					step_data: {
						terms_and_conditions: 'Yes', // Can be "yes", "no"
						personal_details: {
							full_name: "John Doe",
							gender: "Male",
							date_of_birth: "1990-05-15",
							mobile_number: "9876543210",
							email: "johndoe@example.com",
							nationality: "American",
							permanent_addressline1: "123 Main Street",
							permanent_addressline2: "Apt 4B",
							permanent_city: "New York",
							permanent_state: "NY",
							permanent_pincode: "100401",
							same_as_permanent: false,
							current_addressline1: "456 Elm Street",
							current_addressline2: "Suite 2A",
							current_city: "Los Angeles",
							current_state: "CA",
							current_pincode: "900123",
							id_card_type: "Passport",
							id_number: "A12345678"
						},
						caregiver_details: {
							caregiver_email: "pk@gmail.com",
							caregiver_mobile: "9894906630",
							caregiver_mobile_verify: "9894906630",
							caregiver_name: "Prem",
							relationship: "Brother"
						}
					},
					completed: false // Whether the process is fully completed
				}
			}
		});
	}),
	
    
	http.post('api/patient/enrol', () => {
		initialData = { ...initialData };
		return HttpResponse.json({
			success: true,
			response: {
				message: 'Form submitted Successfully',
			},
		});
	}),
	// http.get('/patient/get-programs/', () => {
	// 	return HttpResponse.json({
	// 		success: true,
	// 		response: {
	// 			foc_ekyc_completed: false,
	// 			// program_enrolment_type: 'self_pay',

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
	// 			// changes

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
	// 			current_order: {
	// 				order_code: 146,
	// 				order_date: '05 Mar 2024',
	// 				dispensed_date: '17 June’ 22',
	// 				dosage: '240 mg',
	// 				distributor: 'XYZ',
	// 				pharmacy: 'Medi Pharmacy',
	// 				order_type: 'paid',
	// 				order_status: 'Dispatch',
	// 			},
	// 			applied_programs: {
	// 				title: 'AARAMBH',
	// 				program_id: '22321',
	// 				enrolled_date: '31 May’ 22',
	// 				remaining_infusions: '2 nos',
	// 				doctor_name: 'Dr. levis',
	// 				program_name: 'AARAMBH',
	// 			},
	// 			pap_informations: [
	// 				{
	// 					tag: 'PV Reporting',
	// 					icon: PlayIcon,
	// 					date: '31th May, 2022',
	// 					desc: `How to Access Your Medicines...`,
	// 					bg: bg1,
	// 				},
	// 				{
	// 					tag: 'How to administer tutorial',
	// 					icon: PlayIcon,
	// 					date: '31th May, 2022',
	// 					desc: `How to Access Your Medicines...`,
	// 					bg: bg2,
	// 				},
	// 				{
	// 					tag: 'PV Reporting',
	// 					icon: PlayIcon,
	// 					date: '31th May, 2022',
	// 					desc: `How to Access Your Medicines...`,
	// 					bg: bg1,
	// 				},
	// 				{
	// 					tag: 'How to administer tutorial',
	// 					icon: PlayIcon,
	// 					date: '31th May, 2022',
	// 					desc: `How to Access Your Medicines...`,
	// 					bg: bg2,
	// 				},
	// 				// Add more card objects here as needed
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

	// 			// SAP PAID ORDER
	// 			// paid_order: [
	// 			// 	{
	// 			// 		order_uid: '10121',
	// 			// 		order_id: 121,
	// 			// 		invoice_file: '',
	// 			// 		status_track: {
	// 			// 			'Claim Disbursement': {
	// 			// 				Amount: '75000',
	// 			// 				is_latest: false,
	// 			// 				'Recipient Name': 'test',
	// 			// 				'Date Of Reimbursement': '05:00 PM',
	// 			// 			},
	// 			// 			'Document shared with TPA': {
	// 			// 				'Document shared with TPA': '23 Jul 2024 06:55 AM',
	// 			// 				is_latest: false,
	// 			// 			},
	// 			// 			'Confirmation received from TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Confirmation received from TPA': '23 Jul 2024 06:57 AM',
	// 			// 				'claim Status': 'Rejected',
	// 			// 			},
	// 			// 		},
	// 			// 		order_generation_date: '23 Jul 2024',
	// 			// 		order_display_status: 'Closed',
	// 			// 		order_status: 'closed',
	// 			// 	},
	// 			// ],

	// 			// sap_paid_order: [
	// 			// 	{
	// 			// 		order_id: 146,
	// 			// 		order_generation_date: '05 Mar 2024',
	// 			// 		order_display_status: 'Open',
	// 			// 		order_uid: '10146',
	// 			// 		order_status: 'open',
	// 			// 		invoice_file: '',
	// 			// 		status_track: {},
	// 			// 	},
	// 			// 	{
	// 			// 		order_id: 146,
	// 			// 		order_generation_date: '05 Mar 2024',
	// 			// 		order_display_status: 'Document shared with TPA',
	// 			// 		order_uid: '10146',
	// 			// 		order_status: 'extrastatus_1',
	// 			// 		invoice_file: '',
	// 			// 		status_track: {
	// 			// 			'Document shared with TPA': {
	// 			// 				is_latest: true,
	// 			// 				'Document shared with TPA': '23 Jul 2024 06:55 AM',
	// 			// 			},
	// 			// 		},
	// 			// 	},
	// 			// 	{
	// 			// 		confirmation_data: {
	// 			// 			claim_status: 'Approved',
	// 			// 			confirmation_received_datetime: '23 Jul 2024 06:57 AM',
	// 			// 		},
	// 			// 		order_uid: '10121',
	// 			// 		order_id: 121,
	// 			// 		invoice_file: '',
	// 			// 		order_generation_date: '23 Jul 2024',
	// 			// 		order_display_status: 'Confirmation received from TPA',
	// 			// 		order_status: 'extrastatus_1',
	// 			// 		status_track: {
	// 			// 			'Document shared with TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Document shared with TPA': '23 Jul 2024 06:55 AM',
	// 			// 			},
	// 			// 			'Confirmation received from TPA': {
	// 			// 				is_latest: true,
	// 			// 				'Confirmation received from TPA': '23 Jul 2024 06:57 AM',
	// 			// 				'Claim Status': 'Approved',
	// 			// 			},
	// 			// 		},
	// 			// 	},
	// 			// 	{
	// 			// 		order_uid: '10121',
	// 			// 		order_id: 121,
	// 			// 		invoice_file: '',
	// 			// 		order_generation_date: '23 Jul 2024',
	// 			// 		order_display_status: 'Confirmation received from TPA',
	// 			// 		order_status: 'extrastatus_1',
	// 			// 		status_track: {
	// 			// 			'Document shared with TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Document shared with TPA': '23 Jul 2024 06:55 AM',
	// 			// 			},
	// 			// 			'Confirmation received from TPA': {
	// 			// 				is_latest: true,
	// 			// 				'Confirmation received from TPA': '23 Jul 2024 06:57 AM',
	// 			// 				'Claim Status': 'Rejected',
	// 			// 				'Rejection Note': 'Test',
	// 			// 			},
	// 			// 		},
	// 			// 	},
	// 			// 	{
	// 			// 		order_uid: '10121',
	// 			// 		order_id: 121,
	// 			// 		invoice_file: '',
	// 			// 		order_generation_date: '23 Jul 2024',
	// 			// 		order_display_status: 'Claim Disbursement',
	// 			// 		document_shared_datetime: '23 Jul 2024 06:55 AM',
	// 			// 		order_status: 'extrastatus_3',
	// 			// 		status_track: {
	// 			// 			'Document shared with TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Document shared with TPA': '23 Jul 2024 06:55 AM',
	// 			// 			},
	// 			// 			'Confirmation received from TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Confirmation received from TPA': '23 Jul 2024 06:57 AM',
	// 			// 				'Claim Status': 'Approved',
	// 			// 			},
	// 			// 			'Claim Disbursement': {
	// 			// 				is_latest: true,
	// 			// 				Amount: '24000',
	// 			// 				Date_Of_Reimbursement: '23 Jul 2024 06:55 AM',
	// 			// 				Recipient_Name: 'Simon Matthew',
	// 			// 			},
	// 			// 		},
	// 			// 	},
	// 			// 	{
	// 			// 		order_uid: '10121',
	// 			// 		order_id: 121,
	// 			// 		invoice_file: '',
	// 			// 		order_generation_date: '23 Jul 2024',
	// 			// 		order_display_status: 'Closed',
	// 			// 		document_shared_datetime: '23 Jul 2024 06:55 AM',
	// 			// 		order_status: 'close',
	// 			// 		status_track: {
	// 			// 			'Document shared with TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Document shared with TPA': '23 Jul 2024 06:55 AM',
	// 			// 			},
	// 			// 			'Confirmation received from TPA': {
	// 			// 				is_latest: false,
	// 			// 				'Confirmation received from TPA': '23 Jul 2024 06:57 AM',
	// 			// 				'Claim Status': 'Approved',
	// 			// 			},
	// 			// 			'Claim Disbursement': {
	// 			// 				is_latest: false,
	// 			// 				Amount: '24000',
	// 			// 				Date_Of_Reimbursement: '23 Jul 2024 06:55 AM',
	// 			// 				Recipient_Name: 'Simon Matthew',
	// 			// 			},
	// 			// 		},
	// 			// 	},
	// 			// ],

	// 			// counselling: [
	// 			// 	{
	// 			// 		order_id: 143,
	// 			// 		counselling_date: '05 Mar 2024',
	// 			// 		counselling_time: '06:00',
	// 			// 		order_display_status: 'Open',
	// 			// 		order_uid: '10142',
	// 			// 		order_status: 'open',
	// 			// 		invoice_file: 'url',
	// 			// 	},
	// 			// ],
	// 			// counselling_button_show: false,
	// 			// has_prescription: true,
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
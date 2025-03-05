import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ReactComponent as DropDownTickIcon } from '../../../../src/assets/images/svg/Form-dropDownTick-icon.svg';

function MyProfileDetails() {
	const [profileDetails, setProfileDetails] = useState({});

	// Dummy data instead of API call
	const profileData = {
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
	};

	useEffect(() => {
		// Format dummy data to match the structure expected by the UI
		// Format dummy data to match the structure expected by the UI
    const formattedData = {
      data: {
        patient_name: profileData.personal_details.full_name,
        patient_gender: profileData.personal_details.gender,
        patient_dob: profileData.personal_details.date_of_birth,
        patient_primary_phone: profileData.personal_details.mobile_number,
        patient_email: profileData.personal_details.email,
        enrollment_details: {
          address_details: {
            address_line_1: profileData.personal_details.current_addressline1,
            address_line_2: profileData.personal_details.current_addressline2,
            city: profileData.personal_details.current_city,
            state: profileData.personal_details.current_state,
            pin_code: profileData.personal_details.current_pincode
          },
          caregiver_details: {
            full_name: profileData.caregiver_details.caregiver_name,
            gender: "Not Specified", // Not provided in dummy data
            date_of_birth: "Not Specified", // Not provided in dummy data
            mobile_number: profileData.caregiver_details.caregiver_mobile,
            email: profileData.caregiver_details.caregiver_email
          },
          caregiver_address_proof: {
            address_line_1: profileData.personal_details.permanent_addressline1,
            address_line_2: profileData.personal_details.permanent_addressline2,
            city: profileData.personal_details.permanent_city,
            state: profileData.personal_details.permanent_state,
            pin_code: profileData.personal_details.permanent_pincode
          },
          reimbursement_info: {
            has_reimbursement: "Yes",
            reimbursement_limits: "$5,000 per year",
            reimbursement_mount: "$3,500 remaining",
            reimbursement_type: "Medical Expenses"
          }
        }
      }
    };

		setProfileDetails(formattedData);
	}, []);

	const notify = () =>
		toast('Profile updated successfully', {
			duration: 6000,
			position: 'top-right',

			// Styling
			style: {
				borderBottom: '3px solid #1EA41D',
				fontFamily: 'open sans',
				fontSize: '14px',
				padding: '16px',
				fontWeight: '800',
				color: '#1EA41D',
				background: '#E8F6E8',
				width: '100%',
			},
			className: 'custom-toast',

			// Custom Icon
			icon: <DropDownTickIcon />,

			// Aria
			ariaProps: {
				role: 'status',
				'aria-live': 'polite',
			},
		});

	return (
		<div className="relative h-auto w-full overflow-scroll">
			<div className="flex flex-col gap-5 ">
				<div>
					{/* <button onClick={notify}>Make me a toast</button> */}
					{/* <Toaster /> */}
				</div>
       			 <div>
					<h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
					Profile Details
					</h1>
				<div className="h-[4px] w-11 rounded-full bg-primary"></div>
				</div>
				{/* Personal details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						Personal Details
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						Name:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_name || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Gender:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_gender || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Date of Birth:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_dob || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Mobile Number:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_primary_phone || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Email:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.patient_email || 'N/A'}
						</span>
					</p>
				</div>

				{/* Address details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						Address Details
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						Address Line 1:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.address_line_1 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Address Line 2:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.address_line_2 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						City:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.city || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						State:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.state || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Pin Code:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.address_details
								?.pin_code || 'N/A'}
						</span>
					</p>
				</div>

				{/* Caregiver details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						Caregiver Details
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						Name:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.full_name || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Gender:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.gender || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Date of Birth:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.date_of_birth || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Mobile Number:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.mobile_number || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Email:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_details
								?.email || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Address Line 1:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.address_line_1 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Address Line 2:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.address_line_2 || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						City:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.city || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						State:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.state || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Pin Code:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.caregiver_address_proof
								?.pin_code || 'N/A'}
						</span>
					</p>
				</div>

				{/* Reimbursement Info */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						Reimbursement Information
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						Status:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.has_reimbursement || 'N/A'}
						</span>
					</p>

					<p className="py-1 font-normal text-[#69757E]">
						Limits:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.reimbursement_limits || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Amount:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.reimbursement_mount || 'N/A'}
						</span>
					</p>

					<p className="py-1 font-normal text-[#69757E]">
						Type:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{profileDetails?.data?.enrollment_details?.reimbursement_info
								?.reimbursement_type || 'N/A'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default MyProfileDetails;
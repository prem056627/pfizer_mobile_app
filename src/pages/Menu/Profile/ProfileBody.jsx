import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ReactComponent as DropDownTickIcon } from '../../../../src/assets/images/svg/Form-dropDownTick-icon.svg';
import { useSelector } from 'react-redux';
import { selectInitializeData } from '../../../slice/patient-detail-form';

function MyProfileDetails() {
	const patient_profile_data = useSelector(selectInitializeData);
	
	const patient_detail = patient_profile_data?.patient_data;
	const caregivers = patient_profile_data?.caregiver_data;
	
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
							{patient_detail?.patient_name || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Gender:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.patient_gender || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Date of Birth:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.patient_dob || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Mobile Number:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.patient_primary_phone || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Email:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.patient_email || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						Nationality:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.nationality || 'N/A'}
						</span>
					</p>
				</div>

				{/* Address details */}
				{patient_detail?.addresses && patient_detail.addresses.length > 0 && (
					<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
						<h1 className="pb-4 font-open-sans text-base font-semibold">
							Current Address Details
						</h1>
						<p className="py-1 font-normal text-[#69757E]">
							Address Line 1:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[0]?.line1 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Address Line 2:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[0]?.line2 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							City:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[0]?.city || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							State:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[0]?.state || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Pin Code:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[0]?.pincode || 'N/A'}
							</span>
						</p>
					</div>
				)}

				{/* Residential address details */}
				{patient_detail?.addresses && patient_detail.addresses.length > 1 && (
					<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
						<h1 className="pb-4 font-open-sans text-base font-semibold">
							Residential Address Details
						</h1>
						<p className="py-1 font-normal text-[#69757E]">
							Address Line 1:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[1]?.line1 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Address Line 2:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[1]?.line2 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							City:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[1]?.city || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							State:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[1]?.state || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Pin Code:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{patient_detail.addresses[1]?.pincode || 'N/A'}
							</span>
						</p>
					</div>
				)}

				{/* ID details */}
				<div className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
					<h1 className="pb-4 font-open-sans text-base font-semibold">
						ID Details
					</h1>
					<p className="py-1 font-normal text-[#69757E]">
						ID Card Type:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.id_type || 'N/A'}
						</span>
					</p>
					<p className="py-1 font-normal text-[#69757E]">
						ID number:
						<span className="font-open-sans font-bold text-[#69757E]">
							{'  '}
							{patient_detail?.id_number || 'N/A'}
						</span>
					</p>
				</div>

				{/* Caregiver details */}
				{Array.isArray(caregivers) && caregivers.map((caregiver, index) => (
					<div key={caregiver?.caregiver_id || index} className="rounded-2xl border-2 border-[#DBDBDB] bg-white p-4">
						<h1 className="pb-4 font-open-sans text-base font-semibold">
							Caregiver Details - {index + 1} 
						</h1>
						<p className="py-1 font-normal text-[#69757E]">
							Mobile Number:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.caregiver_mobile || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Name:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.caregiver_name || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Email:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.caregiver_email || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							Relationship:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.caregiver_relation || 'N/A'}
							</span>
						</p>
						{/* id */}

						<p className="py-1 font-normal text-[#69757E]">
							ID Card Type 1:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.caregiver_id_card_type_1 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							ID Card Type 2:
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.caregiver_id_card_type_2 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
						ID Card Number 1 :
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.id_card_number_1 || 'N/A'}
							</span>
						</p>
						<p className="py-1 font-normal text-[#69757E]">
							ID Card Number 2 :
							<span className="font-open-sans font-bold text-[#69757E]">
								{'  '}
								{caregiver?.id_card_number_2 || 'N/A'}
							</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default MyProfileDetails;





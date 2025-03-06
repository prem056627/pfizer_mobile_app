import React from 'react';
import { ReactComponent as CallIcon } from '../../assets/images/svg/FabButton/Call_icon.svg';
import { ReactComponent as EmailIcon } from '../../assets/images/svg/FabButton/Mail_icon.svg';
import { useSelector } from 'react-redux';
import { selectInitializeData } from '../../slice/patient-detail-form';
// import { selectInitializeData } from '../../pages/slice';
function FabModalBody() {
	const initialData = useSelector(selectInitializeData);


	return (
		<div className="flex w-full flex-col gap-4 py-4">
			<div className="flex flex-row flex-wrap items-center justify-between">
				<div>
					<p className="font-open-sans text-base text-[#283A46]">Call on :</p>
					<p>
					<a href="tel:+919000029292" className="font-open-sans text-sm font-bold text-[#283A46] ">
						+91 9000029292 /
					</a>
					{
						initialData?.data?.program_name == 'Opdyta' ? (
<a href="tel:18002671982" className="font-open-sans text-sm font-bold text-[#283A46] ">
						{" "}1800 267 1982
					</a>
						) :(
							<a href="tel:18002098860" className="font-open-sans text-sm font-bold text-[#283A46] ">
						{" "}1800 209 8860
					</a>
						)
					}
					
					</p>
					
				</div>
				<a href="tel:18002671982" className="font-open-sans text-sm font-bold text-[#283A46] ">
					<CallIcon className="h-[38px] min-h-[38px]" />
				</a>
			</div>

			<div className=" flex flex-row flex-wrap items-center  justify-between">
				<div>
					<p className="font-open-sans text-base text-[#283A46]">Email on :</p>
					
					{
						initialData?.data?.program_name == 'Opdyta' ? (
							<a href="mailto:customersupport@bms.com" className="font-open-sans text-sm font-bold text-[#283A46] ">
						customersupport@bms.com
					</a>
						):(
							<a href="mailto:aarambh@oasiscenter.co.in" className="font-open-sans text-sm font-bold text-[#283A46] ">
						aarambh@oasiscenter.co.in
					</a>
						)
					}
					
				</div>
				{
					initialData?.data?.program_name == 'Opdyta' ? (
					<a href="mailto:customersupport@bms.com" className="font-open-sans text-sm font-bold text-[#283A46] ">
						<EmailIcon />
					</a>
					):(
					<a href="mailto:aarambh@oasiscenter.co.in" className="font-open-sans text-sm font-bold text-[#283A46] ">
						<EmailIcon />
					</a>
					)
				}
				
				
			</div>
		</div>
	);
}

export default FabModalBody;
import React from 'react';
import { ReactComponent as CallIcon } from '../../assets/images/svg/FabButton/Call_icon.svg';
import { ReactComponent as EmailIcon } from '../../assets/images/svg/FabButton/Mail_icon.svg';
import { useSelector } from 'react-redux';
import { selectInitializeData } from '../../slice/patient-detail-form';

function FabModalBody() {
	const initialData = useSelector(selectInitializeData);

	// Function to open links manually
	const handleLinkPress = (url) => {
		if (window.ReactNativeWebView) {
			// Running inside React Native WebView
			window.location.href = url;  // Forces navigation to external app
		} else {
			// Running in a normal browser
			window.open(url, "_self");
		}
	};

	return (
		<div className="flex w-full flex-col gap-4 py-4">
			<div className="flex flex-row flex-wrap items-center justify-between">
				<div>
					<p className="font-open-sans text-base text-[#283A46]">Call on :</p>
					<p>
						<span
							className="font-open-sans text-sm font-bold text-[#283A46] cursor-pointer"
							onClick={() => handleLinkPress("tel:+919000029292")}
						>
							+91 9000029292 /
						</span>
						<span
							className="font-open-sans text-sm font-bold text-[#283A46] cursor-pointer"
							onClick={() => handleLinkPress("tel:18002098860")}
						>
							{" "}1800 209 8860
						</span>
					</p>
				</div>
				<CallIcon
					className="h-[38px] min-h-[38px] cursor-pointer"
					onClick={() => handleLinkPress("tel:18002671982")}
				/>
			</div>

			<div className="flex flex-row flex-wrap items-center justify-between">
				<div>
					<p className="font-open-sans text-base text-[#283A46]">Email on :</p>
					<span
						className="font-open-sans text-sm font-bold text-[#283A46] cursor-pointer"
						onClick={() => handleLinkPress("mailto:access@mediangels.com")}
					>
						access@mediangels.com
					</span>
				</div>
				<EmailIcon
					className="cursor-pointer"
					onClick={() => handleLinkPress("mailto:aarambh@oasiscenter.co.in")}
				/>
			</div>
		</div>
	);
}

export default FabModalBody;

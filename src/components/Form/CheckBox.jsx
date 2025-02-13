import { useField } from 'formik';
import React from 'react';
import { ReactComponent as IconToggleTick } from '../../assets/images/svg/checkbox-tick.svg';

export default function CheckboxField({ label, description = '', ...props }) {
	const [field, meta] = useField({ ...props });

	return (
		<div className="my-1 flex flex-col items-start gap-1">
			<label
				htmlFor={props.id || props.name}
				className="relative flex items-start gap-4"
			>
				{props.value ? (
					<div className="relative h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-sm border-2 border-primary bg-primary">
						<IconToggleTick className="absolute inset-0 top-[3px] left-[2px]" />
					</div>
				) : (
					<div className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-sm border-2 border-[#C4C4C4]"></div>
				)}

				<input
					className="invisible absolute h-[0px] w-[0px]"
					type="checkbox"
					{...field}
					{...props}
				/>
				<div className="flex flex-col">
					<span className="font-open-sans text-sm leading-5 ">{label}</span>
					<p className="font-lato text-[12px] italic text-[#696969]">
						{description}
					</p>
				</div>
			</label>
			{meta.touched && meta.error ? (
				<div className="font-lato text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}




import { useField } from 'formik';

function NoteInputField({ label, content, type = 'text', id, ...props }) {
	const [field, meta] = useField({ ...props });
	return (
		<div className="flex flex-col gap-[4px]">
			<label
				htmlFor={id} 
				className="font-open-sans text-form-xs font-semibold text-[#595454] "
			>
				{label}
			</label>
			<input
				type={type}
				className="border text-portal-sm rounded-md   border-[#ACA9A9] px-[16px] py-[14px] font-open-sans  placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="font-open-sans text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}

export default NoteInputField;

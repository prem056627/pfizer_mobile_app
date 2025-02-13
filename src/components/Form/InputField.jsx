import { useField } from 'formik';

function InputField({ label, type = 'text', id, ...props }) {
	const [field, meta] = useField({ ...props });

	const isTextarea = type === 'textarea';

	return (
		<div className="flex flex-col gap-[4px]">
			{label && (
				<label
					htmlFor={id}
					className="font-open-sans text-form-xs font-semibold text-[#595454]"
				>
					{label}
				</label>
			)}

			{isTextarea ? (
				<textarea
					className="z-20 resize-none rounded-md border border-[#ACA9A9] px-[16px] py-[14px] font-open-sans text-portal-sm placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
					id={id}
					{...field}
					{...props}
				/>
			) : (
				<input
					type={type}
					className="rounded-md border border-[#ACA9A9] px-[16px] py-[14px] font-open-sans text-portal-sm  text-[#283A46] placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0 disabled:bg-[#f2f2f2]"
					id={id}
					{...field}
					{...props}
				/>
			)}

			{meta.touched && meta.error ? (
				<div className="font-open-sans text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}

export default InputField;

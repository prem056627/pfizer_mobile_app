import { useField } from 'formik';
import { ReactComponent as IconToggleTick } from '../../assets/images/svg/checkbox-tick.svg';

const HorizontalRadio = ({
	label,
	name,
	radioData,
	formik,
	checkboxType = 'circle',
	onChange = () => {},
	...props
}) => {
	const [field, meta] = useField({ ...props, type: 'radio' });

	function handleRadioChange(name, value) {
		onChange();
		formik.setFieldValue(name, value);
	}

	return (
		<div className="my-1 flex flex-col items-start gap-[12px]">
			<label className="font-lato text-form-xs text-[#696969]">{label}</label>
			{radioData.map(({ id, value, label, description, onSelectMessage }) => {
				return (
					<>
						<label
							key={id}
							htmlFor={id}
							className="relative flex items-start gap-4"
						>
							{
								{
									circle:
										props.value === value ? (
											<div className="relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] items-center justify-center rounded-full border-2 border-primary bg-[#ffffff]">
												<span className="h-[10px] min-h-[10px] w-[10px] min-w-[10px] rounded-full bg-primary"></span>
											</div>
										) : (
											<div className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-full border-2 border-[#C4C4C4]"></div>
										),
									square:
										props.value === value ? (
											<div className="relative h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-sm border-2 border-primary bg-primary">
												<IconToggleTick className="absolute inset-0 top-[3px] left-[2px]" />
											</div>
										) : (
											<div className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-sm border-2 border-[#C4C4C4]"></div>
										),
								}[checkboxType]
							}
							{}
							<input
								{...field}
								className="invisible absolute h-[0px] w-[0px]"
								type="radio"
								id={id}
								value={value}
								checked={props.value === value}
								onChange={() => handleRadioChange(name, value)}
							/>
							<div className="flex flex-col">
								<span className="font-lato text-sm leading-5 ">{label}</span>
								<p className="font-lato text-[12px] italic text-[#696969]">
									{description}
								</p>
							</div>
						</label>
						{props.value === value ? (
							onSelectMessage ? (
								<div className="flex flex-col gap-[16px] bg-[#E6EFF6] px-[12px] py-[16px]">
									<p className="font-lato text-[14px]">{onSelectMessage}</p>
								</div>
							) : null
						) : null}
					</>
				);
			})}

			{formik.errors[name] ? (
				<div className="font-open-sans text-form-xs text-[#cc3300]">
					{formik.errors[name]}
				</div>
			) : null}
		</div>
	);
};

export default HorizontalRadio;


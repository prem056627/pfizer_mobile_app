import { useField } from 'formik';
import { ReactComponent as IconToggleTick } from '../../assets/images/svg/checkbox-tick.svg';

const Radio = ({
	label,
	name,
	radioData,
	formik,
	bottomLabel,
	checkboxType = 'circle',
	onChange = () => {},
	...props
}) => {
	const [field] = useField({ ...props, name, type: 'radio' });

	// Updated handleRadioChange to ensure onChange works properly
	function handleRadioChange(event, value) {
		onChange(event); // Call parent-provided onChange
		formik.setFieldValue(name, value); // Update Formik state
	}

	return (
		<div className="my-1 flex flex-col items-start">
			<label className="font-open-sans text-form-md text-[#283A46]">{label}</label>
			<div className="flex gap-6">
				{radioData.map(({ id, value, label, description, onSelectMessage }) => (
					<div key={id} className="flex flex-col">
						<label
							htmlFor={id}
							className="relative flex items-start gap-4 pt-4"
						>
							{/* Circle or Square Radio Indicator */}
							{
								{
									circle: formik.values[name] === value ? (
										<div className="relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] items-center justify-center rounded-full border-2 border-primary bg-[#ffffff]">
											<span className="h-[10px] min-h-[10px] w-[10px] min-w-[10px] rounded-full bg-primary"></span>
										</div>
									) : (
										<div className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-full border-2 border-[#767676]"></div>
									),
									square: formik.values[name] === value ? (
										<div className="relative h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-sm border-2 border-primary bg-primary">
											<IconToggleTick className="absolute inset-0 top-[3px] left-[2px]" />
										</div>
									) : (
										<div className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] rounded-sm border-2 border-[#C4C4C4]"></div>
									),
								}[checkboxType]
							}
							<input
								{...field}
								className="invisible absolute h-[0px] w-[0px]"
								type="radio"
								id={id}
								value={value}
								checked={formik.values[name] === value} // Correct checked state
								onChange={(event) => handleRadioChange(event, value)} // Update state
							/>
							<div className="flex flex-col">
								<span className="font-lato text-sm leading-5 text-[#3B3B3B]">{label}</span>
								<p className="font-open-sans text-[12px] italic text-[#3B3B3B]">
									{description}
								</p>
							</div>
						</label>

						{/* Conditionally render the onSelectMessage */}
						{formik.values[name] === value && onSelectMessage && (
							<div className="flex flex-col gap-[16px] bg-[#E6EFF6] px-[12px] py-[16px]">
								<p className="font-lato text-[14px]">{onSelectMessage}</p>
							</div>
						)}
					</div>
				))}
			</div>
			<p className="text-[#283A46] p-1 pt-4">{bottomLabel}</p>

			{/* Error message display */}
			{formik.errors[name] && (
				<div className="font-open-sans text-form-xs text-[#cc3300]">
					{formik.errors[name]}
				</div>
			)}
		</div>
	);
};

export default Radio;

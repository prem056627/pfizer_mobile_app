import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { get } from 'lodash';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useField } from 'formik';
import { ReactComponent as CalenderIcon } from '../../assets/images/svg/calender-icon.svg';

export default function FormDatePicker({
	label,
	formik,
	value,
	min,
	max,
	disabled = false,
	...props
}) {
	// Parse the initial value properly
	const initialDate = moment(value, 'DD/MM/YYYY').isValid() 
		? moment(value, 'DD/MM/YYYY') 
		: null;
	
	const [date, setDate] = useState(initialDate);
	const [dateFocused, setDateFocused] = useState(false);
	const [field, meta] = useField(props);

	// Set the initial date value as a JavaScript Date object
	useEffect(() => {
		if (initialDate) {
			formik.setFieldValue(props.id, initialDate.toDate());
		}
	}, []);

	function handleChange(date) {
		if (date?.isValid()) {
			setDate(date);
			
			// Set the field value as a JavaScript Date object
			formik.setFieldValue(props.id, date.toDate());
			
			// If you still need the formatted string for display elsewhere,
			// you can set it in a separate field
			// formik.setFieldValue(`${props.id}_formatted`, date.format('DD/MM/YYYY'));
		} else {
			setDate(null);
			formik.setFieldValue(props.id, null);
		}
		formik.setFieldTouched(props.id, true);
	}

	const returnYears = () => {
		let years = [];
		for (
			let i = parseInt(moment(min).format('YYYY'));
			i <= parseInt(moment(max).format('YYYY'));
			i++
		) {
			years.push(<option key={i} value={i}>{i}</option>);
		}
		return years;
	};

	const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div>
					<select
						value={
							moment(month).isBefore(moment(min))
								? moment(min).month()
								: month.month()
						}
						onChange={(e) => {
							if (month.isBefore(moment(min))) {
								onMonthSelect(moment(min), moment(min).month());
							} else {
								onMonthSelect(month, e.target.value);
							}
						}}
					>
						{moment.months().map((label, value) => (
							<option key={value} value={value}>{label}</option>
						))}
					</select>
				</div>
				<div>
					<select
						value={month.year()}
						onChange={(e) => {
							onYearSelect(month, e.target.value);
						}}
					>
						{returnYears()}
					</select>
				</div>
			</div>
		);
	};

	const isInRange = (momentDate) => {
		let valid = momentDate.isBetween(min, max);
		return !valid;
	};

	return (
		<div className="flex flex-col gap-[4px] ">
			<label
				htmlFor={props.id}
				className="font-open-sans text-form-xs font-semibold text-[#595454]"
				{...field}
			>
				{label}
			</label>
			<div
				className="datepicker-container relative"
			>
				<div className="z-40">
					<SingleDatePicker
						date={date}
						onDateChange={handleChange}
						focused={dateFocused}
						onFocusChange={({ focused }) => {
							setDateFocused(focused);
						}}
						id={props.id}
						placeholder={'DD/MM/YYYY'}
						renderMonthElement={renderMonthElement}
						block={true}
						noBorder={true}
						numberOfMonths={1}
						hideKeyboardShortcutsPanel={true}
						isOutsideRange={isInRange}
						disableScroll={false}
						disabled={disabled}
						displayFormat={'DD/MM/YYYY'}
					/>
				</div>
				<CalenderIcon className="pointer-events-none absolute top-[16px] right-[16px] text-blue-500" />
			</div>
			{/* {meta.touched && meta.error ? (
				<div className="font-lato text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			) : null} */}
			{meta.touched && meta.error ? (
    <div className="font-lato text-form-xs text-[#cc3300]">
        {String(meta.error).includes("Invalid Date") || 
         String(meta.error).includes("must be a `date` type") 
            ? "This field is required" 
            : meta.error}
    </div>
) : null}
		</div>
	);
}
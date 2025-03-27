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
	onChange,
	min,
	max,
	className,
	...props
}) {
	// Convert value to moment object, handling various input types
	const parseInitialDate = (val) => {
		// If already a Date object
		if (val instanceof Date) return moment(val);
		
		// If a string
		if (typeof val === 'string') {
			// Try parsing with moment
			const momentDate = moment(val, ['DD/MM/YYYY', moment.ISO_8601]);
			return momentDate.isValid() ? momentDate : null;
		}
		
		// If already a moment object
		if (moment.isMoment(val)) return val;
		
		return null;
	};

	const initialDate = parseInitialDate(value);
	
	const [date, setDate] = useState(initialDate);
	const [dateFocused, setDateFocused] = useState(false);
	const [field, meta] = useField({
		...props,
		validate: (value) => {
			// Handle null, undefined, or Date object
			if (!value) {
				return 'Date of birth is required';
			}
	
			// Convert to moment if it's a Date object
			const selectedDate = moment(value);
			
			// Check if date is valid
			if (!selectedDate.isValid()) {
				return 'Please enter a valid date';
			}
	
			// Age validation (18 years old)
			const age = moment().diff(selectedDate, 'years');
	
			if (age < 18) {
				return 'You must be at least 18 years old';
			}
	
			return undefined;
		}
	});

	useEffect(() => {
		if (initialDate) {
			// Ensure we're setting a Date object
			const dateToSet = initialDate.toDate();
			
			if (onChange) {
				onChange(dateToSet);
			} else if (props.name) {
				formik.setFieldValue(props.name, dateToSet);
			}
		}
	}, []); // Watch initialDate instead of an empty dependency array

	function handleChange(selectedDate) {
		// Convert to moment if it's not already
		const momentDate = moment(selectedDate);
	
		if (momentDate.isValid()) {
			setDate(momentDate);
			
			// Always set as a Date object
			const dateToSet = momentDate.toDate();
			
			if (onChange) {
				onChange(dateToSet);
			} else {
				formik.setFieldValue(props.name, dateToSet);
			}
			
			// Ensure the field is marked as touched
			formik.setFieldTouched(props.name, true);
		} else {
			setDate(null);
			
			if (onChange) {
				onChange(null);
			} else {
				formik.setFieldValue(props.name, null);
			}
			
			formik.setFieldTouched(props.name, true);
		}
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
		// Invert the logic to match react-dates isOutsideRange expectation
		return momentDate && (
			momentDate.isBefore(moment(min)) || 
			momentDate.isAfter(moment(max))
		);
	};

	return (
		<div className="flex flex-col gap-[4px]">
			<label
				htmlFor={props.id}
				className="font-open-sans text-form-xs font-semibold text-[#595454]"
			>
				{label}
			</label>
			<div className="datepicker-container relative">
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
						displayFormat={'DD/MM/YYYY'}
						className={className}
						{...props}
					/>
				</div>
				<CalenderIcon className="pointer-events-none absolute top-[16px] right-[16px] text-blue-500" />
			</div>
			{meta.touched && meta.error && (
				<div className="font-lato text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			)}
		</div>
	);
}
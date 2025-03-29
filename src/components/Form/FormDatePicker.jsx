import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { useState } from 'react';
import { useField } from 'formik';
import { ReactComponent as CalenderIcon } from '../../assets/images/svg/calender-icon.svg';

export default function FormDatePicker({
	label,
	formik,
	value,
	min,
	max,
	...props
}) {
	const [date, setDate] = useState(
		moment(value, 'DD/MM/YYYY', true).isValid() ? moment(value, 'DD/MM/YYYY') : null
	);
	const [dateFocused, setDateFocused] = useState(false);
	const [field, meta] = useField(props);


	function handleChange(selectedDate) {
		if (selectedDate && moment(selectedDate, 'DD/MM/YYYY', true).isValid()) {
			const jsDate = moment(selectedDate, 'DD/MM/YYYY').toDate(); // Convert to JS Date
			setDate(moment(selectedDate, 'DD/MM/YYYY')); // Keep formatted moment object
			formik.setFieldValue(props.id, jsDate); // Store JavaScript Date in Formik
		} else {
			setDate(null);
			formik.setFieldValue(props.id, null);
		}
		formik.setFieldTouched(props.id, true);
	}
	
	
	

	const returnYears = () => {
		let years = [];
		for (let i = moment(min).year(); i <= moment(max).year(); i++) {
			years.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}
		return years;
	};

	const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div>
					<select
						value={month.month()}
						onChange={(e) => onMonthSelect(month, parseInt(e.target.value))}
					>
						{moment.months().map((label, index) => (
							<option key={index} value={index}>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<select
						value={month.year()}
						onChange={(e) => onYearSelect(month, parseInt(e.target.value))}
					>
						{returnYears()}
					</select>
				</div>
			</div>
		);
	};

	const isInRange = (momentDate) => {
		return !momentDate.isBetween(moment(min), moment(max), undefined, '[]');
	};

	return (
		<div className="flex flex-col gap-[4px]">
			<label htmlFor={props.id} className="font-lato text-form-xs text-[#696969]">
				{label}
			</label>
			<div className="relative">
				<SingleDatePicker
					date={date}
					onDateChange={handleChange}
					focused={dateFocused}
					onFocusChange={({ focused }) => setDateFocused(focused)}
					id={props.id}
					placeholder={'Select'}
					renderMonthElement={renderMonthElement}
					block
					noBorder
					numberOfMonths={1}
					hideKeyboardShortcutsPanel
					isOutsideRange={isInRange}
					disableScroll={false}
				/>
				<CalenderIcon className="absolute top-[16px] right-[16px]" />
			</div>
			{meta.touched && meta.error ? (
				<div className="font-lato text-form-xs text-[#cc3300]">{meta.error}</div>
			) : null}
		</div>
	);
}

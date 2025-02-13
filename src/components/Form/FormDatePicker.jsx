import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { get } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { useField } from 'formik';
import { ReactComponent as CalenderIcon } from '../../assets/images/svg/calender-icon.svg';
// import '../../index.css'
export default function FormDatePicker({
	label,
	formik,
	value,
	min,
	max,
	disabled = false,
	...props
}) {
	const [date, setDate] = useState(
		moment(value, 'DD/MM/YYYY')?.isValid() ? moment(value, 'DD/MM/YYYY') : ''
	);
	const [dateFocused, setDateFocused] = useState(false);
	const [field, meta] = useField(props);

	function handleChange(date) {
		console.log("date change!!")
		if (date?.isValid()) {
			setDate(date ? date : '');
			formik.setFieldValue(
				props.id,
				moment(date).format('DD/MM/YYYY')
					? moment(date).format('DD/MM/YYYY')
					: ''
			);
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
			years.push(<option value={i}>{i}</option>);
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
							<option value={value}>{label}</option>
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
				onClick={() => console.log('Div clicked')}
			>
				<div className="z-40 bg-slate-600">
					<SingleDatePicker
						date={date}
						onDateChange={handleChange}
						focused={dateFocused}
						// onFocusChange={({ focused }) => setDateFocused(focused)}x
						onFocusChange={({ focused }) => {
							console.log('Focused:', focused);
							setDateFocused(focused);
						}}
						id={props.id}
						placeholder={'DD/MM/YY'}
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
			{meta.touched && meta.error ? (
				<div className="font-lato text-form-xs text-[#cc3300]">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}

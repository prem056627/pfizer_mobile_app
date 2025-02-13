import { useField } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { ReactComponent as CalenderIcon } from '../../assets/images/svg/calender-icon.svg';

const DatePicker = ({
  label,
  formik,
  value,
  min,
  max,
  displayFormat = 'DD/MM/YYYY',
  ...props
}) => {
  // Change: Initialize `date` as a moment object or null
  const [date, setDate] = useState(
    moment(value, displayFormat, true).isValid() ? moment(value, displayFormat) : null
  );
  const [dateFocused, setDateFocused] = useState(false);
  const [field, meta] = useField(props);

  function handleChange(date) {
    // Change: Ensure `date` is a moment object
    if (date && date.isValid()) {
      setDate(date);
      formik.setFieldValue(
        props.id,
        date.format(displayFormat)
      );
    } else {
      setDate(null); // Change: Set `date` to null if invalid
      formik.setFieldValue(props.id, '');
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
              if (moment(month).isBefore(moment(min))) {
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
    <div className="flex flex-col gap-[4px]">
      <label
        htmlFor="date"
        className="font-open-sans text-form-xs font-semibold text-[#A3ABB1]"
        {...field} 
      >
        {label}
      </label>
	  <div className="relative datepicker-container">
  <SingleDatePicker
    // className="datepicker-input"
    date={date}
    onDateChange={handleChange}
    focused={dateFocused}
    onFocusChange={({ focused }) => setDateFocused(focused)}
    id={props.id}
    placeholder={'Select'}
    renderMonthElement={renderMonthElement}
    block={true}
    noBorder={true}
    numberOfMonths={1}
    hideKeyboardShortcutsPanel={true}
    isOutsideRange={isInRange}
    disableScroll={false}
    displayFormat={displayFormat}
  />
  <CalenderIcon className="absolute top-[16px] right-[16px]" />
</div>

      {meta.touched && meta.error ? (
        <div className="font-invention-app text-form-xs text-[#cc3300]">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default DatePicker;

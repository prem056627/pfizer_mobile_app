import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { useEffect, useState, useCallback } from 'react';
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
  // Parse the initial date value only once on component mount
  const [date, setDate] = useState(null);
  const [dateFocused, setDateFocused] = useState(false);
  const [field, meta] = useField(props);
  
  // Initialize date on mount only
  useEffect(() => {
    let initialDate = null;
    
    if (value) {
      if (value instanceof Date && !isNaN(value.getTime())) {
        initialDate = moment(value);
      } else if (typeof value === 'string' && value.trim() !== '') {
        const dateFromFormat = moment(value, 'DD/MM/YYYY', true);
        if (dateFromFormat.isValid()) {
          initialDate = dateFromFormat;
        } else {
          const flexDate = moment(value);
          if (flexDate.isValid()) {
            initialDate = flexDate;
          }
        }
      }
    }
    
    setDate(initialDate);
  }, []); // Empty dependency array means it only runs once on mount
  
  // Handle date change using useCallback to prevent recreation on each render
  const handleDateChange = useCallback((selectedDate) => {
    setDate(selectedDate);
    
    if (selectedDate && selectedDate.isValid()) {
      // Create JS Date object at noon to avoid timezone issues
      const jsDate = selectedDate.clone().hour(12).minute(0).second(0).millisecond(0).toDate();
      formik.setFieldValue(props.id, jsDate);
    } else {
      formik.setFieldValue(props.id, null);
    }
    
    // Mark as touched but don't trigger validation immediately
    formik.setFieldTouched(props.id, true, false);
  }, [formik, props.id]);
  
  // Handle focus change with useCallback
  const handleFocusChange = useCallback(({ focused }) => {
    setDateFocused(focused);
    
    // If losing focus, trigger validation
    if (!focused) {
      formik.validateField(props.id);
    }
  }, [formik, props.id]);
  
  // Create year options only once
  const returnYears = useCallback(() => {
    const minYear = moment(min).year();
    const maxYear = moment(max).year();
    let years = [];
    
    for (let i = minYear; i <= maxYear; i++) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    
    return years;
  }, [min, max]);
  
  // Memoize the month element renderer
  const renderMonthElement = useCallback(({ month, onMonthSelect, onYearSelect }) => {
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
  }, [returnYears]);
  
  // Memoize the date range validator
  const isInRange = useCallback((momentDate) => {
    return !momentDate.isBetween(moment(min), moment(max), undefined, '[]');
  }, [min, max]);

  return (
    <div className="flex flex-col gap-[4px]">
      <label htmlFor={props.id} className="font-lato text-form-xs text-[#696969]">
        {label}
      </label>
      <div className="relative">
        <SingleDatePicker
          date={date}
          onDateChange={handleDateChange}
          focused={dateFocused}
          onFocusChange={handleFocusChange}
          id={props.id}
          placeholder={'Select'}
          renderMonthElement={renderMonthElement}
          block
          noBorder
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
          isOutsideRange={isInRange}
          disableScroll={false}
          displayFormat="DD/MM/YYYY"
        />
        <CalenderIcon className="absolute top-[16px] right-[16px]" />
      </div>
      {meta.touched && meta.error ? (
        <div className="font-lato text-form-xs text-[#cc3300]">{meta.error}</div>
      ) : null}
    </div>
  );
}
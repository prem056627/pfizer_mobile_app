import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';

const PhysicalVerification = () => {
  // Default date range (from today to 5 days later)
  const [selectedDate, setSelectedDate] = useState({
    from: moment(),
    to: moment().add(4, 'days'),
  });

  const [selectedTime, setSelectedTime] = useState('12:30'); // Default time
  const [calendarVisible, setCalendarVisible] = useState(false); // To toggle calendar visibility

  const calendarRef = useRef(); // Ref for calendar container
  const inputRef = useRef(); // Ref for input field

  // Handle selecting a day in the calendar
  const handleDateChange = (date) => {
    if (!selectedDate.from) {
      // If "from" date is not selected, set it
      setSelectedDate({ from: date, to: moment(date).add(5, 'days').toDate() });
    } else if (selectedDate.from && !selectedDate.to) {
      // If "from" date is selected, set "to" date (5 days later)
      setSelectedDate({ from: selectedDate.from, to: date });
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    console.log('Selected Time:', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', {
      startDate: moment(selectedDate.from).format('DD/MM/YYYY'),
      endDate: moment(selectedDate.to).format('DD/MM/YYYY'),
      time: selectedTime,
    });
  };

  // Toggle calendar visibility when input is clicked
  const handleInputClick = () => {
    setCalendarVisible((prev) => !prev); // Toggle visibility
  };

  // Close the calendar when both dates are selected
  useEffect(() => {
    if (selectedDate.from && selectedDate.to) {
      setCalendarVisible(false); // Close calendar
    }
  }, [selectedDate]);

  // Close calendar when clicking outside the input or calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        setCalendarVisible(false); // Close calendar if clicked outside
      }
    };

    // Listen for click events
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="">
        {/* Date Picker */}
        <div className="w-full relative">
          <label className="text-sm text-gray-600 mb-1 block">Select Date Range</label>
          <div className="relative">
            {/* Input field for displaying date range */}
            <input
              ref={inputRef}
              type="text"
              value={`${selectedDate.from ? moment(selectedDate.from).format('DD/MM/YYYY') : ''} - ${selectedDate.to ? moment(selectedDate.to).format('DD/MM/YYYY') : ''}`}
              onClick={handleInputClick} // Show calendar on click
              readOnly
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 cursor-pointer"
              placeholder="Select date range"
            />
            
            {/* Show calendar only when clicked */}
            {calendarVisible && (
              <div ref={calendarRef} className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg z-50 rounded-lg">
                <DayPicker
                  selected={selectedDate}
                  onDayClick={handleDateChange}
                  mode="range"
                  selectedDate={selectedDate.from}
                />
              </div>
            )}
          </div>
        </div>

        {/* Time Picker */}
        <div className="w-full pt-4">
          <label htmlFor='physical-verification-time' className="text-sm text-gray-600 mb-1 block">Select Time
          {/* <div className="relative"> */}
            {/* Make sure time input field is clickable */}
            <input
              type="time"
              name='physical-verification-time'
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 cursor-pointer z-10" // Added z-10 for z-index control
            />
          {/* </div> */}
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-10"
        >
          Submit Date & Time
        </button>
      </form>
    </div>
  );
};

export default PhysicalVerification;

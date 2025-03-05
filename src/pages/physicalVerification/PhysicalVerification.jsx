import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomToast from './CustomToast';
import { setPhysicalVerificationModalOpen } from '../../slice/patient-detail-form';
import { useDispatch } from 'react-redux';


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
  const timeInputRef = useRef(); // Ref for time input
const dispatch = useDispatch()
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


    // toastify
    const notify = () => {
      toast(({ closeToast }) => (
        <CustomToast date="24-02-2024" time="2.40 PM" closeToast={closeToast} />
      ), {
        position: "top-right",
        autoClose: 5000, // Closes after 5 seconds
        closeOnClick: false,
        progressStyle: { backgroundColor: "white" }, // Change progress bar to white
      });
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
    // closing modal
    dispatch(setPhysicalVerificationModalOpen(false)); 

    // Trigger the toast notification
  // ();
    
  };

  //     onClick={}
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
      // Only close if click is outside both calendar and date input
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target) && 
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        timeInputRef.current && 
        !timeInputRef.current.contains(event.target)
      ) {
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
        <div className='py-4 pb-8'> 
          <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
            Physical Verification
          </h1>
          <div className="h-[4px] w-11 rounded-full bg-primary"></div>
        </div>

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
          <label htmlFor='physical-verification-time' className="text-sm text-gray-600 mb-1 block">Select Time</label>
          <input
            ref={timeInputRef}
            type="time"
            name='physical-verification-time'
            value={selectedTime}
            onChange={handleTimeChange}
            onClick={(e) => {
              e.target.showPicker(); // Ensures the picker opens on click
              e.stopPropagation(); // Prevent closing other dropdowns
            }}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary cursor-pointer z-10"
          />
        </div>

        {/* Submit Button */}
        <button
   onClick={notify}
          type="submit"
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary transition-colors mt-10"
        >
          Submit Date & Time
        </button>
      </form>
    </div>
  );
};

export default PhysicalVerification;


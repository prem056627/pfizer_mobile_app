import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomToast from './CustomToast';
import { setPhysicalVerificationModalOpen } from '../../slice/patient-detail-form';
import { useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';


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
const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const triggerApi = useApi();
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

//   const initial_data =  {
//     current_step: "physical_verification",
//     date:"",
//     time:""
// }


    // toastify
    const notify = (date_data) => {
      toast(({ closeToast }) => (
        <CustomToast date= {`${date_data?.startDate}`} time={`${date_data?.time}`} closeToast={closeToast} />
      ), {
        position: "top-right",
        autoClose: 5000, // Closes after 5 seconds
        closeOnClick: false,
        progressStyle: { backgroundColor: "white" }, 
      });
    };
    


// Function to make API call with FormData
const makeApiCall = async (values) => {
  try {
    setIsLoading(true);
    
    // Create payload with date, time and current_step
    const payload = {
      current_step: "physical_verification",
      date: moment(selectedDate.from).format('DD/MM/YYYY'),
      time: selectedTime
    };
    
   
    
    // Set current_step parameter in the URL
    const url = `/patient_dashboard/?current_step=physical_verification`;
    
    // Make the API call with the FormData payload
    const { response, success } = await triggerApi({
      url: url,
      type: "POST",
      payload: payload,
      loader: true,
      // Important: Don't manually set Content-Type for FormData
      headers: {
        // Let the browser set the Content-Type with boundary
      }
    });

    if (success && response) {
      return { success: true, data: response };
    } else {
      console.error("API call failed or returned no data.");
      return { success: false, error: "API call failed" };
    }
  } catch (error) {
    console.error("Error in makeApiCall:", error);
    return { success: false, error };
  } finally {
    setIsLoading(false);
  }
};

    
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    console.log('Selected Time:', e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', );


    
    // Make the API call with the form data
    const result = await makeApiCall();
    
    if (result.success) {
      // API call was successful
      console.log("API call successful:", result.data);
      // Trigger the toast notification

    notify({
      startDate: moment(selectedDate.from).format('DD/MM/YYYY'),
      endDate: moment(selectedDate.to).format('DD/MM/YYYY'),
      time: selectedTime,
    });
      
    } else {
      // API call failed
      console.error("API call failed:", result.error);
      // You might want to show an error toast here
    }
    
    // closing modal
    dispatch(setPhysicalVerificationModalOpen(false));
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
  //  onClick={notify}
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


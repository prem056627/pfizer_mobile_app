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
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: null,
    to: null
  });

  const [selectedTime, setSelectedTime] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);

  const calendarRef = useRef();
  const inputRef = useRef();
  const timeInputRef = useRef();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const triggerApi = useApi();

  const handleDateChange = (selectedDay) => {
    if (!selectedDateRange.from) {
      setSelectedDateRange({ from: selectedDay, to: null });
    } 
    else if (selectedDateRange.from && !selectedDateRange.to) {
      const newToDate = selectedDay >= selectedDateRange.from 
        ? selectedDay 
        : selectedDateRange.from;
      
      const newFromDate = selectedDay < selectedDateRange.from 
        ? selectedDay 
        : selectedDateRange.from;

      setSelectedDateRange({
        from: newFromDate,
        to: newToDate
      });
    } 
    else {
      setSelectedDateRange({ from: selectedDay, to: null });
    }
  };

  const notify = (date_data) => {
    toast(({ closeToast }) => (
      <CustomToast 
        date={`${date_data?.startDate}`} 
        time={`${date_data?.time}`} 
        closeToast={closeToast} 
      />
    ), {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      progressStyle: { backgroundColor: "white" }, 
    });
  };

  const makeApiCall = async () => {
    try {
      setIsLoading(true);
      
      // Validate date and time before API call
      if (!selectedDateRange.from || !selectedTime) {
        toast.error("Please select both date and time");
        return { success: false, error: "Incomplete selection" };
      }

      // Prepare payload with full date range
      const payload = {
        current_step: "physical_verification",
        start_date: moment(selectedDateRange.from).format('DD/MM/YYYY'),
        end_date: selectedDateRange.to 
          ? moment(selectedDateRange.to).format('DD/MM/YYYY') 
          : moment(selectedDateRange.from).format('DD/MM/YYYY'),
        time: selectedTime
      };
      
      const url = `/patient_dashboard/?current_step=physical_verification`;
      
      const { response, success } = await triggerApi({
        url: url,
        type: "POST",
        payload: payload,
        loader: true
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await makeApiCall();
    
    if (result.success) {
      notify({
        startDate: moment(selectedDateRange.from).format('DD/MM/YYYY'),
        endDate: selectedDateRange.to 
          ? moment(selectedDateRange.to).format('DD/MM/YYYY') 
          : moment(selectedDateRange.from).format('DD/MM/YYYY'),
        time: selectedTime,
      });
      
      // Close modal
      dispatch(setPhysicalVerificationModalOpen(false));
    } else {
      // Handle error
      toast.error("Failed to schedule physical verification");
    }
  };

  const handleInputClick = () => {
    setCalendarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target) && 
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        timeInputRef.current && 
        !timeInputRef.current.contains(event.target)
      ) {
        setCalendarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDateRange = () => {
    if (!selectedDateRange.from) return '';
    
    const fromDate = moment(selectedDateRange.from).format('DD/MM/YYYY');
    const toDate = selectedDateRange.to 
      ? moment(selectedDateRange.to).format('DD/MM/YYYY') 
      : fromDate;
    
    return `${fromDate} - ${toDate}`;
  };

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
            <input
              ref={inputRef}
              type="text"
              value={formatDateRange()}
              onClick={handleInputClick}
              readOnly
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 cursor-pointer"
              placeholder="Select date range"
            />
            
            {calendarVisible && (
              <div ref={calendarRef} className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg z-50 rounded-lg">
                <DayPicker
                  mode="range"
                  selected={selectedDateRange}
                  onDayClick={handleDateChange}
                  numberOfMonths={1}
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
              e.target.showPicker();
              e.stopPropagation();
            }}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary cursor-pointer z-10"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedDateRange.from || !selectedTime}
          className={`w-full py-3 px-4 rounded-lg transition-colors mt-10 ${
            !selectedDateRange.from || !selectedTime 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          Submit Date & Time
        </button>
      </form>
    </div>
  );
};

export default PhysicalVerification;
import React, { useState, useEffect, useRef, useContext } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

import CustomToast from './CustomToast';
import { setPhysicalVerificationModalOpen } from '../../slice/patient-detail-form';
import { useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';
import { transformToPatientDetailsFormData } from '../../utils/forms';
import { LoaderContext } from '../../context/LoaderContextProvider';

const PhysicalVerification = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: null,
    to: null
  });

  const [selectedHalf, setSelectedHalf] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);

  const calendarRef = useRef();
  const inputRef = useRef();
  const halfDayRef = useRef();

  const dispatch = useDispatch();
  const { setLoading, isLoading } = useContext(LoaderContext);
  const triggerApi = useApi();

  // Slot options for the select field
  const slotOptions = [
    { value: 'Morning', label: 'Morning (10AM - 1PM)' },
    { value: 'Afternoon', label: 'Afternoon (2PM - 6PM)' }
  ];

  const handleDateChange = (selectedDay) => {
    // Create a new Date object for the next day
    const nextDay = new Date(selectedDay);
    nextDay.setDate(nextDay.getDate() + 4);

    // Set the date range from the selected day to the next day
    setSelectedDateRange({
      from: selectedDay,
      to: nextDay
    });

    // Close the calendar after selection
    setCalendarVisible(false);
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

  // Function to disable past dates
  const isPastDate = (date) => {
    // Get current date at the start of the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Compare the input date with today
    return date < today;
  };
    
  const makeApiCall = async () => {
    try {
      setLoading(true);
      
      // Validate date and half day before API call
      if (!selectedDateRange.from || !selectedHalf) {
        toast.error("Please select both date and half day");
        return { success: false, error: "Incomplete selection" };
      }


      const formData = {
        current_step: "physical_verification",
        start_date: moment(selectedDateRange.from).format('DD/MM/YYYY'),
        end_date: selectedDateRange.to 
          ? moment(selectedDateRange.to).format('DD/MM/YYYY') 
          : moment(selectedDateRange.from).format('DD/MM/YYYY'),
        time: selectedHalf
      };
      
      const url = `/patient_dashboard/?current_step=physical_verification`;
      
      const { response, success } = await triggerApi({
        url: url,
        type: "POST",
        payload: transformToPatientDetailsFormData(formData),
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
      setLoading(false);
    }
  };

  const handleHalfDayChange = (e) => {
    setSelectedHalf(e.target.value);
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
        time: selectedHalf,
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
        halfDayRef.current && 
        !halfDayRef.current.contains(event.target)
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
          <label className="text-sm text-gray-600 mb-1 block">Select Date Range <span className="text-red-500"> *</span></label>
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
                  // Disable past dates using the disabled prop
                  disabled={isPastDate}
                />
              </div>
            )}
          </div>
        </div>

        {/* Half Day Picker */}
        <div className="w-full pt-4">
  <label className="text-sm text-gray-600 mb-1 block">Select Slot<span className="text-red-500"> *</span></label>

  <Select
    options={slotOptions}
    value={slotOptions.find(option => option.value === selectedHalf)}
    onChange={(selectedOption) => setSelectedHalf(selectedOption.value)}
    placeholder="Select"
    className="w-full"
  />

  <p className='text-sm font-sans text-[#AB3436] mb-1 block italic pt-2'>The PV will be scheduled on one of the selected dates</p>
</div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedDateRange.from || !selectedHalf}
          className={`w-full py-3 px-4 rounded-lg transition-colors mt-10 ${
            !selectedDateRange.from || !selectedHalf 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          Submit Date & Slot
        </button>
      </form>
    </div>
  );
};

export default PhysicalVerification;
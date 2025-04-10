import React, { useState, useEffect, useRef, useContext } from 'react';
import MenuFooter from '../../components/MenuFooter';
import FabButton from '../../components/FabButton';
import { ReactComponent as Notification } from "../../assets/images/svg/Notification.svg";
import { Transition } from 'react-transition-group';

import { ReactComponent as Empty } from "../../assets/images/menus1/empty_notify.svg";
import { selectInitializeData, setCurrentPageState, setInitializeData } from '../../slice/patient-detail-form';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../../hooks/useApi';
import { transformToPatientDetailsFormData } from '../../utils/forms';
import { LoaderContext } from '../../context/LoaderContextProvider';
import { cardio } from 'ldrs';

// Register the cardio component
cardio.register();

const Notifications = () => {
  const triggerApi = useApi();
  const [notifications, setNotifications] = useState([]);
   const { setLoading,isLoading } = useContext(LoaderContext);
    
  const [removingIds, setRemovingIds] = useState([]);
  const dispatch = useDispatch();
  const initialData = useSelector(selectInitializeData);
  const apiNotifications = initialData.notifications || [];
  
  // Use a ref to track if we're in the middle of making an API call
  const isRequestInProgress = useRef(false);

  useEffect(() => {
    // This single function handles the API call
    const makeApiCall = async () => {
      // If a request is already in progress, don't start another
      if (isRequestInProgress.current) return;
      
      try {
        // Mark that we're starting a request
        isRequestInProgress.current = true;
        setLoading(true);
        
        const url = `/patient_dashboard/?current_step=notification_history`;
        const { response, success } = await triggerApi({
          url: url,
          type: "GET",
          loader: true,
        });
    
        if (success && response) {
          dispatch(setInitializeData(response));
          dispatch(setCurrentPageState(response.current_step));
          
          // Process notifications directly
          if (response.notifications && response.notifications.length > 0) {
            const formattedNotifications = response.notifications.map((notification) => ({
              id: notification.id,
              date: notification.date || '',
              message: notification.title || '',
              subMessage: notification.description || '',
            }));
            
            setNotifications(formattedNotifications);
          } else {
            setNotifications([]);
          }
        } else {
          console.error("API call failed or returned no data.");
        }
      } catch (error) {
        console.error("Error in makeApiCall:", error);
      } finally {
        // Mark that the request is complete
        isRequestInProgress.current = false;
        setLoading(false);

      }
    };

    // Call the API function
    makeApiCall();
    
    // No dependencies - this will run every time the component mounts,
    // but our isRequestInProgress ref prevents duplicate calls
  }, []);

  const handleDismiss = async (id) => {
    // Find the notification to be dismissed
    const notificationToDismiss = notifications.find(n => n.id === id);
    
    if (!notificationToDismiss) return;
    
    console.log("notificationToDismiss", notificationToDismiss.id);
    
    // Add the ID to the removing list to trigger animation
    setRemovingIds(prev => [...prev, id]);

    const formData = {
      notification_id: notificationToDismiss.id,
      notification_message: notificationToDismiss.message
    }

    try {

      setLoading(true);
      // Make API call to mark notification as read
      const apiResponse = await triggerApi({
        url: `/patient_dashboard/?current_step=mark_read`,
        type: "POST",
        payload: transformToPatientDetailsFormData(formData),
        loader: true,
      });
  
      // Wait for animation to complete before removing from state
      setTimeout(() => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
        setRemovingIds(prev => prev.filter(removeId => removeId !== id));
      }, 500); // Match this with animation duration
    } catch (error) {
      console.error('Error dismissing notification:', error);
      // Remove from removing list if there was an error
      setRemovingIds(prev => prev.filter(removeId => removeId !== id));
    }finally {
    
      setLoading(false);

    }
  };

  // Transition styles for slide effect
  const duration = 500;
  const defaultStyle = {
    transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
    transform: 'translateX(0)',
    opacity: 1,
  };
  
  const transitionStyles = {
    entering: { transform: 'translateX(0)', opacity: 1 },
    entered: { transform: 'translateX(0)', opacity: 1 },
    exiting: { transform: 'translateX(100%)', opacity: 0 },
    exited: { transform: 'translateX(100%)', opacity: 0 },
  };

  return (
    <div className="bg-white relative font-['Open_Sans'] pt-6 no-scrollbar">
      {/* Transaction Section */}
      <div className="px-2 bg-white mx-4 rounded-[20px]">
        {notifications.length !== 0 ? <h2 className="text-lg font-semibold w-full mb-4">Transaction</h2> : null}
        
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
           <l-cardio
            size="70"
            stroke="4"
            speed="2" 
            color="#0101C8"
          ></l-cardio>
        </div>
        ) : notifications.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className='p-4 text-center flex flex-col items-center gap-4'>
              <Empty/>
              <div>
                <h1 className='font-bold font-sans text-[#5D5D5D] text-[24px]'>No Notifications yet</h1>
                <p className='font-regular font-sans text-[#808080] text-[16px]'>"We'll notify you when something arrives!"</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Transition
                key={notification.id}
                in={!removingIds.includes(notification.id)}
                timeout={duration}
                mountOnEnter
                unmountOnExit
              >
                {state => (
                  <div 
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state]
                    }}
                    className="flex items-center justify-between border border-[#E5E5E5] bg-white p-4 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <Notification />
                      <div className=" w-[85%]">
                        <p className="text-sm font-semibold font-open-sans">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.subMessage}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.date}
                        </p>
                      </div>
                    </div>
                    <button 
                      className="text-primary hover:text-primary"
                      onClick={() => handleDismiss(notification.id)}
                      aria-label="Dismiss notification"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </Transition>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
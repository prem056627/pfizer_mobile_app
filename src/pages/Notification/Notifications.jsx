import React, { useState, useEffect } from 'react';
import MenuFooter from '../../components/MenuFooter';
import FabButton from '../../components/FabButton';
import { ReactComponent as Notification } from "../../assets/images/svg/Notification.svg";
import { Transition } from 'react-transition-group';

import { ReactComponent as Empty } from "../../assets/images/menus1/empty_notify.svg";
import { selectInitializeData, setCurrentPageState, setInitializeData } from '../../slice/patient-detail-form';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../../hooks/useApi';
import { transformToPatientDetailsFormData } from '../../utils/forms';

const Notifications = () => {

  const triggerApi = useApi();
  // console.log(apiNotifications);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState([]);

 const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  
      const makeApiCall = async () => {
        try {
          setIsLoading(true);
          const url = `/patient_dashboard/?current_step=notification_history`;
          const { response, success } = await triggerApi({
            url: url,
            type: "GET",
            loader: true,
          });
      
          if (success && response) {
            dispatch(setInitializeData(response));
            // console.log('responseresponseresponse!!',response);
            dispatch(setCurrentPageState(response.current_step)); 
            // dispatch(setProgramStatus(response.program_status)); 
          } else {
            console.error("API call failed or returned no data.");
          }
        } catch (error) {
          console.error("Error in makeApiCall:", error);
        } finally {
          setIsLoading(false); // Ensure loading state is reset
        }
      };
    
      // console.log('initialDatainitialData',initialData);
      
  
  
  
      useEffect(() => {
      
            // console.log("2",isInitalDataLoad);
              makeApiCall();
        
      }, [ ]);


      const initiaData = useSelector(selectInitializeData);
      const apiNotifications = initiaData.notifications || [];

  useEffect(() => {
    // Use the API notifications directly from the Redux store
    if (apiNotifications && apiNotifications.length > 0) {
      console.log("apiNotifications", apiNotifications);
      
      // Format notifications to match the new structure
      const formattedNotifications = apiNotifications.map((notification) => ({
        id: notification.id, // Use the existing ID
        date: notification.date || '',
        message: notification.title || '',
        subMessage: notification.description || '',
      }));
      
      setNotifications(formattedNotifications);
    }
    setLoading(false);
  }, [apiNotifications]);

  const handleDismiss = async (id) => {
    // Find the notification to be dismissed
    const notificationToDismiss = notifications.find(n => n.id === id);
    console.log("notificationToDismiss", notificationToDismiss.id);
    
    // Add the ID to the removing list to trigger animation
    setRemovingIds(prev => [...prev, id]);

    const formData = {
      notification_id: notificationToDismiss.id,
      notification_message: notificationToDismiss.message
    }

    try {
      // Make API call to mark notification as read
      const apiResponse = await triggerApi({
        url: `/patient_dashboard/?current_step=mark_read`,
        type: "POST",
        payload: transformToPatientDetailsFormData(formData) ,
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
        
        {loading ? (
          <div className="overlay-spinner" />
        ) : notifications.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
           <div className='p-4 text-center  flex flex-col items-center gap-4'>
           <Empty/>
             <div>
             <h1 className='font-bold font-sans text-[#5D5D5D] text-[24px]'>No Notifications yet</h1>
             <p className='font-regular font-sans text-[#808080] text-[16px]'> "We'll notify you when something arrives!"</p>
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
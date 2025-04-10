import { createContext, useEffect, useMemo, useState, useContext } from 'react';
import { cardio } from 'ldrs';

// Register the cardio component
cardio.register();

// Create the LoaderContext
export const LoaderContext = createContext();

// Custom hook to use the loader context
export const useLoader = () => useContext(LoaderContext);

export default function LoaderContextProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    // Keeps visibility in sync with loading
    setVisible(isLoading);
  }, [isLoading]);

  const contextValue = useMemo(() => {
    return { isVisible, isLoading, setLoading };
  }, [isVisible, isLoading]);

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-[1051]">
          <l-cardio
            size="70"
            stroke="4"
            speed="2" 
            color="#0101C8"
          ></l-cardio>
        </div>
      )}
    </LoaderContext.Provider>
  );
}
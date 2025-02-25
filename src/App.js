import React from 'react';
import { DashboardContextProvider } from './context/DashboardContextProvider';
import LoaderContextProvider from './context/LoaderContextProvider';
import ErrorMessageContextProvider from './context/ErrorMessageContextProvider';
import store from './store';
import { Provider } from 'react-redux';
import AppNavigation from './routes';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <DashboardContextProvider>
      <ErrorMessageContextProvider>
        <LoaderContextProvider>
          <Provider store={store}>
            {/* Removed BrowserRouter as we're using custom navigation */}
            <AppNavigation />
            <Toaster />
          </Provider>
        </LoaderContextProvider>
      </ErrorMessageContextProvider>
    </DashboardContextProvider>
  );
}

export default App;
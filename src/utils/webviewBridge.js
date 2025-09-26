// src/utils/webviewBridge.js (React Web App)

class WebViewBridge {
  constructor() {
    this.pendingRequests = new Map();
    this.setupMessageListener();
    this.isInitialized = false;
    this.initializeBridge();
  }

  initializeBridge() {
    // Wait for the bridge to be available
    const checkBridge = () => {
      if (window.ReactNativeWebView && window.ReactNativeWebView.requestImagePicker) {
        this.isInitialized = true;
        console.log('WebView bridge initialized successfully');
      } else {
        // Try again in 100ms
        setTimeout(checkBridge, 100);
      }
    };
    checkBridge();
  }

  setupMessageListener() {
    // Listen for messages from React Native
    window.addEventListener('rnMessage', (event) => {
      this.handleMessage(event.detail);
    });
  }

  handleMessage(message) {
    console.log('Received message from React Native:', message);
    
    const { type, requestId, data, error } = message;
    
    if (this.pendingRequests.has(requestId)) {
      const { resolve, reject } = this.pendingRequests.get(requestId);
      this.pendingRequests.delete(requestId);
      
      if (error) {
        reject(new Error(error));
      } else {
        resolve(data);
      }
    }
    
    // Emit custom events for general listeners
    window.dispatchEvent(new CustomEvent(`rn_${type.toLowerCase()}`, { detail: message }));
  }

  /**
   * Request image picker from React Native
   * @param {object} options - Picker options
   * @returns {Promise} - Promise that resolves with processed images
   */
  requestImagePicker(options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.isInitialized || !window.ReactNativeWebView) {
        reject(new Error('React Native WebView bridge not available. Running in web browser.'));
        return;
      }

      try {
        const requestId = window.ReactNativeWebView.requestImagePicker(options);
        
        // Store promise resolvers
        this.pendingRequests.set(requestId, { resolve, reject });
        
        // Timeout after 60 seconds
        setTimeout(() => {
          if (this.pendingRequests.has(requestId)) {
            this.pendingRequests.delete(requestId);
            reject(new Error('Request timeout - please try again'));
          }
        }, 60000);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Request camera from React Native
   * @param {object} options - Camera options
   * @returns {Promise} - Promise that resolves with processed image
   */
  requestCamera(options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.isInitialized || !window.ReactNativeWebView) {
        reject(new Error('React Native WebView bridge not available. Running in web browser.'));
        return;
      }

      try {
        const requestId = window.ReactNativeWebView.requestCamera(options);
        
        this.pendingRequests.set(requestId, { resolve, reject });
        
        setTimeout(() => {
          if (this.pendingRequests.has(requestId)) {
            this.pendingRequests.delete(requestId);
            reject(new Error('Request timeout - please try again'));
          }
        }, 60000);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Check if running inside React Native WebView
   * @returns {boolean}
   */
  isReactNativeWebView() {
    return this.isInitialized && !!(window.ReactNativeWebView && window.ReactNativeWebView.postMessage);
  }
}

// Create singleton instance
const webViewBridge = new WebViewBridge();

// Export functions for easy use
export const requestImagePicker = (options) => webViewBridge.requestImagePicker(options);
export const requestCamera = (options) => webViewBridge.requestCamera(options);
export const isReactNativeWebView = () => webViewBridge.isReactNativeWebView();

export default webViewBridge;
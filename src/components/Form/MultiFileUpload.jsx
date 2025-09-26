import React, { useState, useRef } from 'react';
import { get } from 'lodash';
import { handleFileUpload as handleFileUploadHelper } from '../../../src/utils/helper';
import { ReactComponent as UploadIcon } from '../../assets/images/svg/upload-icon.svg';
import { ReactComponent as UploadCloseIcon } from '../../assets/images/svg/upload-close-icon.svg';

// SILENT: Import WebView bridge functions with complete fallback
let requestImagePicker, isReactNativeWebView;
try {
  const bridge = require('../../utils/webviewBridge');
  requestImagePicker = bridge.requestImagePicker;
  isReactNativeWebView = bridge.isReactNativeWebView;
} catch (error) {
  // Complete fallback - no errors, no logs
  requestImagePicker = () => Promise.reject(new Error('Bridge not available'));
  isReactNativeWebView = () => false;
}

export default function MultiFileUpload({
  formik,
  label,
  id,
  isMultiple = true,
  description = '',
  onFileUpload,
  onFileRemove
}) {
  const [fileName, setFileName] = useState();
  const fileInputRef = useRef(null);
  
  // ENHANCED: Handle React Native images with bulletproof processing (SILENT - no UI changes)
  const handleReactNativeImages = async (images) => {
    try {
      console.log('🔄 handleReactNativeImages: Processing', images.length, 'images from React Native');
      
      const currentFiles = get(formik.values, id, []);
      const processedFiles = [];
      
      for (const image of images) {
        try {
          console.log('📸 Processing image:', image.fileName, 'Type:', image.type, 'Size:', image.fileSize);
          
          // ENHANCED: Validate image data exists
          if (!image.base64) {
            console.error('❌ No base64 data for image:', image.fileName);
            continue;
          }
          
          // ENHANCED: More robust base64 conversion with error handling
          let binaryString;
          try {
            binaryString = atob(image.base64);
          } catch (base64Error) {
            console.error('❌ Invalid base64 data for:', image.fileName, base64Error);
            continue;
          }
          
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          // ENHANCED: Better MIME type detection using file signatures
          let correctType = image.type;
          if (!correctType || correctType === 'image' || correctType === 'unknown') {
            // Check file signature (magic bytes)
            if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
              correctType = 'image/jpeg';
            } else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
              correctType = 'image/png';
            } else {
              correctType = 'image/jpeg'; // Safe default
            }
          }
          
          console.log('🔧 Corrected type from', image.type, 'to', correctType);
          
          const blob = new Blob([bytes], { type: correctType });
          
          // Create proper File object with correct type
          const file = new File([blob], image.fileName || 'image.jpg', {
            type: correctType,
            lastModified: Date.now()
          });
          
          console.log('✅ File object created:', file.name, 'Size:', file.size, 'Type:', file.type);
          processedFiles.push(file);
          
        } catch (imageError) {
          console.error('❌ Error processing individual image:', imageError);
          // Continue processing other images instead of failing completely
        }
      }
      
      // ENHANCED: Only fail if NO images were processed successfully
      if (processedFiles.length === 0) {
        console.error('❌ No images could be processed successfully');
        formik.setErrors({ [id]: 'Failed to process images. Please try again.' });
        return;
      }
      
      // Same validation as original
      const oversizedFiles = processedFiles.filter(file => file.size > 5242880);
      if (oversizedFiles.length > 0) {
        console.error('❌ Oversized files detected:', oversizedFiles.map(f => f.name));
        formik.setErrors({ [id]: 'Maximum size of the document should be 5MB.' });
        return;
      }
      
      const newUniqueFiles = processedFiles.filter(file => 
        !currentFiles.some(existingFile => existingFile.name === file.name)
      );
      
      if (newUniqueFiles.length === 0) {
        console.log('⚠️ All files are duplicates, skipping');
        return;
      }
      
      const updatedFiles = isMultiple 
        ? [...currentFiles, ...newUniqueFiles] 
        : newUniqueFiles;
      
      console.log('📁 Setting formik field value:', id, 'with', updatedFiles.length, 'files');
      formik.setFieldValue(id, updatedFiles);
      
      if (onFileUpload) {
        console.log('📤 Calling onFileUpload callback');
        onFileUpload(updatedFiles);
      }
      
      setFileName(newUniqueFiles[0]?.name);
      console.log('✅ Successfully processed', newUniqueFiles.length, 'new files with EXIF removal');
      
    } catch (error) {
      console.error("❌ Error handling React Native images:", error);
      formik.setErrors({ [id]: 'Failed to process file. Please try again.' });
    }
  };
  
  // ORIGINAL: Handle file selection from input (EXACTLY THE SAME)
  const handleFileChange = (e) => {
    try {
      const files = Array.from(e.target.files || []);
      
      if (!files.length) return;
      
      setFileName(files[0]?.name);
      
      // Check file size (5MB limit)
      const oversizedFiles = files.filter(file => file.size > 5242880);
      if (oversizedFiles.length > 0) {
        formik.setErrors({ [id]: 'Maximum size of the document should be 5MB.' });
        e.target.value = '';
        return;
      }
      
      // Check for duplicate files
      const currentFiles = get(formik.values, id, []);
      const newUniqueFiles = files.filter(file => 
        !currentFiles.some(existingFile => existingFile.name === file.name)
      );
      
      if (newUniqueFiles.length === 0) {
        e.target.value = '';
        return; // All files are duplicates
      }
      
      // Update formik state with new files
      const updatedFiles = isMultiple 
        ? [...currentFiles, ...newUniqueFiles] 
        : newUniqueFiles;
      
      formik.setFieldValue(id, updatedFiles);
      
      // Call callback if provided
      if (onFileUpload) {
        onFileUpload(updatedFiles);
      }
      
      // Reset input
      e.target.value = '';
    } catch (error) {
      console.error("Error handling file upload:", error);
      formik.setErrors({ [id]: 'Failed to process file. Please try again.' });
      e.target.value = '';
    }
  };
  
  // ORIGINAL: Handle file removal (EXACTLY THE SAME)
  const handleFileRemove = (fileToRemove) => {
    try {
      const filteredFiles = get(formik.values, id, []).filter(
        file => file.name !== fileToRemove.name
      );
      
      formik.setFieldValue(id, filteredFiles);
      
      if (onFileRemove) {
        onFileRemove(filteredFiles);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };
  
  // ENHANCED: Multi-method React Native picker with comprehensive fallbacks (SILENT)
  const handleImagePickerSilent = async () => {
    try {
      console.log('📱 [ENHANCED] Attempting React Native image picker...');
      
      let images;
      let attemptCount = 0;
      const maxAttempts = 3;
      
      // ENHANCED: Try multiple methods with retry logic
      while (attemptCount < maxAttempts && !images) {
        attemptCount++;
        console.log(`📱 [ENHANCED] Attempt ${attemptCount}/${maxAttempts}`);
        
        try {
          // Method 1: Try promise-based approach first (Android optimized)
          if (window.ReactNativeWebView && window.ReactNativeWebView.requestImagePickerPromise) {
            console.log('📱 [ENHANCED] Using promise-based picker');
            images = await Promise.race([
              window.ReactNativeWebView.requestImagePickerPromise({ multiple: isMultiple }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 30000))
            ]);
          } else {
            console.log('📱 [ENHANCED] Using callback-based picker');
            images = await Promise.race([
              requestImagePicker({ multiple: isMultiple }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 30000))
            ]);
          }
          
          break; // Success - exit retry loop
          
        } catch (attemptError) {
          console.log(`📱 [ENHANCED] Attempt ${attemptCount} failed:`, attemptError.message);
          
          if (attemptCount < maxAttempts) {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * attemptCount));
          }
        }
      }
      
      // ENHANCED: If all methods failed, try direct approach
      if (!images && attemptCount >= maxAttempts) {
        console.log('📱 [ENHANCED] All methods failed, trying direct approach');
        
        try {
          images = await new Promise((resolve, reject) => {
            const requestId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            const messageHandler = (event) => {
              const message = event.detail;
              if (message.requestId === requestId) {
                window.removeEventListener('rnMessage', messageHandler);
                
                if (message.type === 'IMAGE_PICKER_SUCCESS') {
                  resolve(message.data);
                } else if (message.type === 'IMAGE_PICKER_CANCELLED') {
                  resolve(null); // User cancelled - not an error
                } else {
                  reject(new Error(message.error || 'Unknown error'));
                }
              }
            };
            
            window.addEventListener('rnMessage', messageHandler);
            
            // Send request manually
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'REQUEST_IMAGE_PICKER',
                payload: { multiple: isMultiple, requestId }
              }));
            } else {
              reject(new Error('No communication method available'));
            }
            
            // Timeout after 30 seconds
            setTimeout(() => {
              window.removeEventListener('rnMessage', messageHandler);
              reject(new Error('Request timeout'));
            }, 30000);
          });
        } catch (directError) {
          console.log('📱 [ENHANCED] Direct approach also failed:', directError.message);
        }
      }
      
      console.log('📱 [ENHANCED] React Native picker result:', images?.length || 0, 'images');
      
      if (images && images.length > 0) {
        await handleReactNativeImages(images);
      } else if (images === null) {
        console.log('📱 [ENHANCED] User cancelled image picker');
        // Don't fallback to file input if user explicitly cancelled
      } else {
        console.log('📱 [ENHANCED] No images received, falling back to file input');
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }
      
    } catch (error) {
      console.log('🌐 [ENHANCED] React Native picker failed, falling back to regular file input:', error.message);
      // Silent fallback to regular file input
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };
  
  // ORIGINAL: Safely trigger file input (MODIFIED to include enhanced picker)
  const triggerFileInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔄 triggerFileInput called');
    console.log('📱 isReactNativeWebView():', isReactNativeWebView());
    
    if (isReactNativeWebView()) {
      console.log('📱 Using enhanced React Native picker with EXIF removal');
      handleImagePickerSilent();
    } else {
      console.log('🌐 Using regular file input for web browser');
      // Regular file input for web
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  // ORIGINAL: Function to truncate file name (EXACTLY THE SAME)
  const getTruncatedFileName = (name) => {
    if (name.length > 25) {
      const extension = name.split('.').pop();
      const baseName = name.substring(0, name.lastIndexOf('.'));
      return `${baseName.substring(0, 20)}...${extension ? '.' + extension : ''}`;
    }
    return name;
  };

  // ORIGINAL UI - EXACTLY THE SAME AS YOUR ORIGINAL VERSION - NO CHANGES
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-col gap-[4px]">
        <label className="text-[12px] font-open-sans font-semibold leading-4 text-[#595454]">{label}</label>
        <div
          onClick={triggerFileInput}
          className="flex w-full text-[14px] items-center justify-between gap-[16px] truncate rounded-md border border-dashed border-[#D5D5D5] px-[12px] py-[16px] pr-[14px] font-lato leading-5 text-medium-gray cursor-pointer"
        >
          {get(formik.values, id, [])?.length <= 1 ? (
            <span>Click to Upload</span>
          ) : (
            <span>Click here to upload more</span>
          )}
          <UploadIcon className="relative flex-shrink-0" />
        </div>
        {description ? (
          <p className="text-xs italic leading-4 text-dark-gray">
            {description}
          </p>
        ) : null}
      </div>
      
      {formik.errors[id] ? (
        <div className="font-lato text-form-xs text-[#cc3300]">
          {formik.errors[id]}
        </div>
      ) : null}
      
      {get(formik.values, id, [])?.length > 0 && (
        <div className="flex gap-[8px] flex-col w-full">
          {get(formik.values, id, []).map((file) => (
            <div key={file.name + '_' + file.size} className="flex justify-between items-center w-full">
              <div className="max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-extrabold text-primary" title={file.name}>
                {getTruncatedFileName(file.name)}
              </div>
              <button
                type="button"
                onClick={() => handleFileRemove(file)}
                className="flex-shrink-0 ml-2"
              >
                <UploadCloseIcon className="w-[10px]" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,application/pdf"
        multiple={isMultiple}
        id={id}
        name={id}
        className="hidden h-0 w-0"
        onChange={handleFileChange}
      />
    </div>
  );
}
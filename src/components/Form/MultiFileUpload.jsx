import React, { useState, useRef } from 'react';
import { get } from 'lodash';
import { handleFileUpload as handleFileUploadHelper } from '../../../src/utils/helper';
import { ReactComponent as UploadIcon } from '../../assets/images/svg/upload-icon.svg';
import { ReactComponent as UploadCloseIcon } from '../../assets/images/svg/upload-close-icon.svg';

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
  
  // Handle file selection from either input or camera
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
  
  // Handle file removal
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
  
  // Safely trigger file input
  const triggerFileInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to truncate file name if it's too long
  const getTruncatedFileName = (name) => {
    if (name.length > 25) {
      const extension = name.split('.').pop();
      const baseName = name.substring(0, name.lastIndexOf('.'));
      return `${baseName.substring(0, 20)}...${extension ? '.' + extension : ''}`;
    }
    return name;
  };

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
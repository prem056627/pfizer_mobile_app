import React, { useState } from 'react';
import { get } from 'lodash';
import { handleFileUpload as handleFileUploadHelper } from '../../utils/helper';
import { ReactComponent as UploadIcon } from '../../assets/images/svg/upload-icon.svg';
import { ReactComponent as UploadCloseIcon } from '../../assets/images/svg/upload-close-icon.svg';

export default function MultiFileUpload({
  formik,
  label,
  id,
  isMultiple = true,
  description = '',
  onFileUpload, // New callback prop
  onFileRemove
}) {
  const [fileName, setFileName] = useState();
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileName(files[0]?.name);
    if (files[0]?.size <= 5242880) {
      let isPresent = get(formik.values, id, [])?.some(
        (eachFilteredFile) => eachFilteredFile?.name === files[0]?.name
      );

      if (!isPresent) {
        const newFiles = isMultiple
          ? [...get(formik.values, id, []), ...files]
          : files;

        formik.setFieldValue(id, newFiles);

        console.log('files', newFiles, onFileUpload);
        
        // Call the onFileUpload callback if provided
        if (onFileUpload) {
          onFileUpload(newFiles);
        }
      }
    } else {
		formik.setErrors({ [id]: 'Maximum size of the document should be 5mb.' });
    //   handleFileUploadHelper(e, formik, id, isMultiple);
    }
    e.target.value = '';
  };

  return (
		<div className="flex flex-col gap-[12px]">
			<div className="flex flex-col gap-[4px]">
				<label className="text-xs leading-4 text-dark-gray">{label}</label>
				<label
					htmlFor={id}
					className={`flex w-full items-center justify-between gap-[16px] truncate rounded-md border border-dashed border-[#D5D5D5] px-[12px] py-[16px] pr-[14px] font-lato leading-5 text-medium-gray`}
				>
					{get(formik.values, id, [])?.length <= 1 ? (
						<span>Click to Upload</span>
					) : (
						<span>Click here to upload more</span>
					)}
					<UploadIcon className="relative" />
				</label>
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
			{get(formik.values, id, [])?.length ? (
				<div className="flex flex-col gap-[8px]">
					{console.log("file name", get(formik.values, id, []))}
					{get(formik.values, id, [])?.map((eachFile) => (
						<div key={eachFile?.name} className="flex gap-[16px]">
							<a
								href={eachFile?.name}
								target="_blank"
								rel="noreferrer"
								className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-extrabold text-primary"
							>
								{/* {eachFile?.name} */}
								Uploaded File
							</a>
							<button
								type="button"
								onClick={() => {
									let filteredFiles = get(formik.values, id, [])?.filter(
										(eachFilteredFile) =>
											eachFilteredFile?.name !== eachFile?.name
									);
									if (onFileRemove) {
										onFileRemove(filteredFiles);
									}
									formik.setFieldValue(id, [...filteredFiles]);
								}}
							>
								<UploadCloseIcon className="w-[10px]" />
							</button>
						</div>
					))}
				</div>
			) : null}
			<input
				type="file"
				// accept="image/png, image/jpeg"
				multiple={isMultiple}
				id={id}
				name={id}
				className="hidden h-0 w-0"
				onChange={handleFileChange}
			/>
		</div>
	);
}

import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import imageCompression from 'browser-image-compression';

export function transformToFormData(
	data,
	formData = new FormData(),
	parentKey = null
) {
	forEach(data, (value, key) => {
		if (value === null) return;

		let formattedKey = isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

		if (value instanceof File) {
			formData.set(formattedKey, value);
		} else if (value instanceof Array) {
			forEach(value, (ele) => {
				if (ele instanceof File) {
					formData.append(`${formattedKey}`, ele);
				} else if (ele instanceof Object) {
					formData.append(`${formattedKey}`, JSON.stringify(ele));
				} else {
					formData.append(`${formattedKey}`, ele);
				}
			});
		} else if (value instanceof Object) {
			transformToFormData(value, formData, formattedKey);
		} else {
			formData.set(formattedKey, value);
		}
	});
	return formData;
}

export function transformToFormDataOrder(
	data,
	formData = new FormData(),
	parentKey = null
) {
	// console.log(data);
	forEach(data, (value, key) => {
		if (value === null) return; // else "null" will be added

		let formattedKey = isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

		if (value instanceof File) {
			formData.set(formattedKey, value);
		} else if (value instanceof Array) {
			formData.set(formattedKey, JSON.stringify(value));
		} else if (value instanceof Object) {
			transformToFormData(value, formData, formattedKey);
		} else {
			formData.set(formattedKey, value);
		}
	});
	return formData;
}

export function transformToDynamicFormData(
	data,
	formData = new FormData(),
	parentKey = null
) {
	let tempData = data;
	forEach(tempData, (value, key) => {
		if (value === null) return; // else "null" will be added

		if (value instanceof File) {
			formData.set(key, value);
			if (key) {
				delete tempData[key];
			}
		}
	});

	formData.set('data', JSON.stringify(tempData));
	return formData;
}

export const handleFileUpload = async (event, formik, formik_field) => {
	const imageFile = event.target.files[0];

	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		formik.setFieldValue(formik_field, compressedFile);
	} catch (error) {
		console.log(error);
	}
};


export function transformToPatientDetailsFormData(
	data,
	formData = new FormData(),
	parentKey = null
) {
	forEach(data, (value, key) => {
		if (value === null) return;

		let formattedKey = isEmpty(parentKey) ? key : `${parentKey}[${key}]`;

		if (value instanceof File) {
			formData.set(formattedKey, value);
		} else if (value instanceof Array) {
			forEach(value, (ele, index) => {
				if (ele instanceof File) {
					formData.append(`${formattedKey}`, ele);
				} else if (ele instanceof Object) {
					Object.entries(ele).map(([key, keyValue]) => {
						if (keyValue instanceof Array) {
							forEach(keyValue, (eachValue) => {
								if (eachValue instanceof File) {
									formData.append(`${formattedKey}_${index}_${key}`, eachValue);
								}
							});
						}
					});
					formData.append(`${formattedKey}`, JSON.stringify(ele));
				} else {
					formData.append(`${formattedKey}`, ele);
				}
			});
		} else if (value instanceof Object) {
			transformToFormData(value, formData, formattedKey);
		} else {
			formData.set(formattedKey, value);
		}
	});
	return formData;
}
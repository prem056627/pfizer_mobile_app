import { Listbox, Transition } from '@headlessui/react';
import { useField } from 'formik';
import { Fragment, useState } from 'react';
import { ReactComponent as SelectDropdownIcon } from '../../../src/assets/images/svg/select-dropdown-icon.svg';
import CheckedIcon from '../Form/CheckedIcon'

export default function MultiSelectField({
    label,
    formik,
    optionsData,
    disabled = false,
    ...props
}) {
    const [selected, setSelected] = useState([]);
    const [field, meta] = useField(props);

    // Handle individual option selection/deselection
    const handleOptionClick = (value) => {
        const updatedSelected = selected.includes(value)
            ? selected.filter((item) => item !== value) // Deselect
            : [...selected, value]; // Select

        setSelected(updatedSelected);
        formik.setFieldValue(props.id, updatedSelected);
    };

    // Handle Select All
    const handleSelectAll = () => {
        const allIds = optionsData.map((option) => option.id); // Get all option IDs
        setSelected(allIds);
        formik.setFieldValue(props.id, allIds);
    };

    // Handle Clear All
    const handleClearAll = () => {
        setSelected([]);
        formik.setFieldValue(props.id, []);
    };

    return (
        <div className="relative flex w-full md:w-[40%] flex-col gap-[4px]">
            <label className="font-open-sans text-form-xs font-semibold text-[#595454]">
                {label}
            </label>
            <div className="">
                <Listbox
                    disabled={disabled}
                    value={selected}
                    onChange={() => { }} // Handled manually
                    multiple
                >
                    <div className="relative">
                        <Listbox.Button
                            className={`w-full rounded-md bg-white ${disabled ? 'cursor-not-allowed bg-[#f2f2f2]' : ''
                                } border border-[#ACA9A9] px-[16px]  py-[14px]  font-open-sans placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0`}
                            {...field}
                            disabled={disabled}
                        >
                            <span className={`block truncate text-left`}>
                                {selected.length > 0
                                    ? `${selected.length} Selected`
                                    : 'Select items'}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-[16px] flex items-center ">
                                <SelectDropdownIcon aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-[1] mt-1 h-fit max-h-96 w-full overflow-y-auto rounded-md border border-[#D2D1D1] bg-white py-3 text-base ring-opacity-5 focus:outline-none sm:text-sm font-open-sans">
                                {/* Select All and Clear All Buttons */}
                                <div className="flex flex-col items-start gap-2 px-4 py-2 mb-2 font-open-sans">
                                    <button
                                        type="button"
                                        onClick={handleSelectAll}
                                        className="text-primary text-sm "
                                    >
                                        Select All
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearAll}
                                        className="text-primary "
                                    >
                                        Clear Selection
                                    </button>
                                </div>
                                {/* Options */}
                                {optionsData.map((option) => (
                                    <Listbox.Option
                                        key={option.id}
                                        value={option.id}
                                        onClick={() => handleOptionClick(option.id)} // Handle clicks manually
                                        className={({ active }) =>
                                            `relative cursor-pointer  select-none py-2 px-4 text-[#171717] ${active ? 'bg-[#F1F3F5]' : ''
                                            }`
                                        }
                                    >
                                        {({ selected: optionSelected }) => (
                                            <><div className='flex gap-2'>
                                                <CheckedIcon color={optionSelected ? "#5B5B5B" : "#F0F3F4"} />
                                                <span
                                                    className={`block w-[90%] ${selected.includes(option.id)
                                                        ? ' text-[#5B5B5B] font-semibold'
                                                        : 'font-normal text-[#5B5B5B]'
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>
                                            </div>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            {meta.touched && meta.error ? (
                <div className="font-lato text-form-xs text-[#cc3300]">
                    {meta.error}
                </div>
            ) : null}
        </div>
    );
}

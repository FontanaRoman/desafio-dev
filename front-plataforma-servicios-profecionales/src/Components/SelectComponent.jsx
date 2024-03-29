import React, { useState, useEffect } from 'react';

export default function SelectComponent({ apiUrl, textSelect, optionKey, register, name, validation=null }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        const { data } = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOptions();

    return () => {
      setOptions([]);
    };
  }, [apiUrl]);

  return (
    <select  {...(validation ? register(name, validation) : register(name))}  id={name} name={name} className='bg-transparent text-white'>
      <option value="">{textSelect}</option>
      {options.map(option => (
        <option key={option[optionKey]} value={option[optionKey]}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

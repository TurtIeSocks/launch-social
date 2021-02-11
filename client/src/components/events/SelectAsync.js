import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

const SelectAsync = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = value => {
    setTimeout(setInputValue(value), 1000);
  };
 
  const handleChange = value => {
    setTimeout(setSelectedValue(value), 1000);
  }
 
  const loadOptions = (inputValue) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(fetch(`/api/v1/games/names?search=${inputValue}`).then(res => res.json()))
      }, 1000)
    }) 
  };
 
  return (
    <div>
      <AsyncSelect
        value={selectedValue}
        getOptionLabel={e => e.name}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
    </div>
  );
}
 
export default SelectAsync;

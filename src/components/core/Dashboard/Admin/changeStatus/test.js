import React, { useState } from 'react';

const DropdownManager = () => {
  const [dropdowns, setDropdowns] = useState([{ id: 1, selectedOption: '' }]);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const handleAddDropdown = () => {
    setDropdowns([
      ...dropdowns,
      { id: dropdowns.length + 1, selectedOption: '' }
    ]);
      console.log(dropdowns)
  };

  const handleOptionChange = (id, selectedOption) => {
    setDropdowns(
      dropdowns.map((dropdown) =>
        dropdown.id === id ? { ...dropdown, selectedOption } : dropdown
      )
    );
  };

  const getAvailableOptions = (id) => {
    const selectedOptions = dropdowns
      .filter((dropdown) => dropdown.id !== id)
      .map((dropdown) => dropdown.selectedOption);
    return options.filter((option) => !selectedOptions.includes(option));
  };

  return (
    <div>
      {dropdowns.map((dropdown) => (
        <div key={dropdown.id}>
          <select
            value={dropdown.selectedOption}
            onChange={(e) =>
              handleOptionChange(dropdown.id, e.target.value)
            }
          >
            <option value="">Select an option</option>
            {getAvailableOptions(dropdown.id).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleAddDropdown}>Add Dropdown</button>
    </div>
  );
};

export default DropdownManager;
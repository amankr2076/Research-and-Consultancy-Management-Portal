import React, { useState } from 'react'
import AddSubhead from './ManageSubheads/AddSubhead';
import RemoveSubHead from './ManageSubheads/RemoveSubHead';

const ManageSubHeads = () => {


  const [selectedOption,setSelectedOption]=useState(1);
  return (
    <div>
          <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>

            <div className='flex justify-around'>
                <p className={selectedOption===1 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setSelectedOption(1)}}>Add Sub-Head</p>
                <p className={selectedOption===2 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setSelectedOption(2)}}>Remove Sub-Head</p>
            </div>

            {selectedOption===1 && <AddSubhead></AddSubhead>}
            {selectedOption===2 && <RemoveSubHead></RemoveSubHead>}

          </div>

    </div>
  )
}

export default ManageSubHeads
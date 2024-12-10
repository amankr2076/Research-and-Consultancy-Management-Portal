import React from 'react'

const FundDetailsResearch = ({fund_details,setIsChoosen,type}) => {
  return (
    <div>
        <div className='overflow-hidden bg-white shadow-xl sm:rounded-lg pl-8 pr-6'>
        <div className='flex mt-8 justify-between'>
            {type==="fundReleased" && <h2 className='text-2xl font-bold'>Fund released Details</h2>} 
            {type==="expenditure" &&<h2 className='text-2xl font-bold'>Expenditure Details</h2>} 
            {type==="subHeads" &&<h2 className='text-2xl font-bold'>Sub-Heads Details</h2>} 
            <p className='mr-6 text-indigo-600 cursor-pointer' onClick={()=>{setIsChoosen(false)}}>Hide</p></div>
      {/* Table headers */}
      {type==="fundReleased" &&<div className="grid grid-cols-3 font-bold border-b-2 pb-2 mt-6">
        <div>Subhead Name</div>
        <div>Amount Released</div>
        <div>Release Date</div>
      </div>}

      {type==="expenditure" &&<div className="grid grid-cols-3 font-bold border-b-2 pb-2 mt-6">
        <div>Subhead Name</div>
        <div>Amount Spent</div>
        <div>Expenditure Date</div>
      </div>}

      {type==="subHeads" &&<div className="grid grid-cols-3 font-bold border-b-2 pb-2 mt-6">
        <div>Subhead Name</div>
        <div>Allocated Amount</div>
        <div>Remaining Amount</div>
      </div>}

      {/* Table data */}
      {fund_details.map((item,index) => (
        <div key={index}>
        
        {type==="fundReleased" && <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <div>{item?.r_subhead_name}</div>
          <div>₹ {item?.amount_released}</div>
          <div>{item?.release_date}</div>
          </div>}

          {type==="expenditure" && <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <div>{item?.r_subhead_name}</div>
            <div>₹ {item?.amount_spent}</div>
            <div>{item?.expenditure_date}</div>
          </div>}

          {type==="subHeads" && <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <div>{item?.r_subhead_name}</div>
            <div>₹ {item?.allocated_funds}</div>
            <div>₹ {item?.fund_balance }</div>
          </div>}
        </div>
      ))}
    </div>
    </div>
  )
}

export default FundDetailsResearch
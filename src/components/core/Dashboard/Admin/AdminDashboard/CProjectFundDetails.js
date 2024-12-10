import React from 'react'

const CProjectFundDetails = ({fund_details,setIsChoosen,type}) => {
  return (
    <div>
        <div className='overflow-hidden bg-white shadow-xl sm:rounded-lg pl-8 pr-6'>
            <div className='flex mt-8 justify-between'>
            {type==="invoice" && <h2 className='text-2xl font-bold'>Invoice Details</h2>} 
            {type==="disbursement" &&<h2 className='text-2xl font-bold'>Disbursement Details</h2>} 
            {type==="expenditure" &&<h2 className='text-2xl font-bold'>Expenditure Details</h2>} 
            <p className='mr-6 text-indigo-600 cursor-pointer' onClick={()=>{setIsChoosen(false)}}>Hide</p></div>
      {/* Table headers */}
      {type==="invoice" &&<div className="grid grid-cols-6 font-bold border-b-2 pb-2 mt-6">
        {/* <div>Invoice Id</div> */}
        <div>Invoice amount</div>
        <div>GST amount</div>
        <div>Total Invoice amount</div>
        <div>Payment Status</div>
        <div>Invoice date</div>
        <div>Payment received date</div>
      </div>}

      {type==="disbursement" &&<div className="grid grid-cols-5 font-bold border-b-2 pb-2 mt-6">
        {/* <div>Disbursement Id</div> */}
        <div>Consultant Name</div>
        <div>Requested amount</div>
        <div>Consultant Share</div>
        <div>Institute Share</div>
        <div>Disbursement date</div>
      </div>}

      {type==="expenditure" &&<div className="grid grid-cols-3 font-bold border-b-2 pb-2 mt-6">
        <div>Expenditure Type</div>
        <div>Expenditure amount</div>
        <div>Expenditure date</div>
      </div>}

      {/* Table data */}
      {fund_details.map((item,index) => (
        <div key={index}>
        
        {type==="invoice" && <div className="grid grid-cols-6 gap-4 py-2 border-b">
          <div>₹ {item?.invoice_amount}</div>
          <div>₹ {item?.gst_amount}</div>
          <div>₹ {item?.total_invoice_amount}</div>
          <div>{item?.payment_received===1 ? "Received" : "Pending"}</div>
          <div>{item?.invoice_date}</div>
          <div>{item?.payment_received_date==="Invalid date" ? "" : item?.payment_received_date}</div>
          </div>}

          {type==="disbursement" && <div className="grid grid-cols-5 gap-4 py-2 border-b">
            <div>{item?.u_name}</div>
            <div>₹ {item?.requested_amount}</div>
            <div>₹ {item?.consultant_share}</div>
            <div>₹ {item?.institute_share}</div>
            <div>{item?.request_date}</div>
          </div>}

          {type==="expenditure" && <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <div>{item?.expenditure_type}</div>
            <div>₹ {item?.amount_spent}</div>
            <div>{item?.expenditure_date }</div>
          </div>}
        </div>
      ))}
    </div>
    </div>
  )
}

export default CProjectFundDetails
import { useState } from "react";
import AddInvoice from "./AddInvoice";
import UpdateInvoice from "./UpdateInvoice";
import ConsultancyDisbursement from "./ConsultancyDisbursement";
import AddConsultancyExpenditure from "./AddConsultancyExpenditure";

export default function ConsultancyProject() {

    const [selectedoption,setSelectedOption]=useState(1);

    let text1;
    let text2;

    if(selectedoption===1)
    {
        text1="Enter Release Fund";
        text2="Enter Release Date";
    }
    else
    {
        text1="Enter Expenditure Fund";
        text2="Enter Expenditure Date";
    }

  return (
    <div>
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
        <div className="flex justify-around">
            <p className={selectedoption===1 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setSelectedOption(1)}}>Add Invoices</p>
            <p className={selectedoption===2 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setSelectedOption(2)}}>Update Invoices</p>
            <p className={selectedoption===3 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setSelectedOption(3)}}>Add Disbursement</p>
            <p className={selectedoption===4 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setSelectedOption(4)}}>Add Expenditure</p>
        </div>
        {/* <div className="border-b border-gray-400 pb-12 mt-[-55px]"></div> */}

        {selectedoption===1 && <AddInvoice></AddInvoice>}
        {selectedoption===2 && <UpdateInvoice></UpdateInvoice>}
        {selectedoption===3 && <ConsultancyDisbursement></ConsultancyDisbursement>}
        {selectedoption===4 && <AddConsultancyExpenditure></AddConsultancyExpenditure>}
        
    </div>

    </div>
  )
}
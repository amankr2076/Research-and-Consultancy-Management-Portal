import React, { useEffect, useState } from 'react'
import { getAllInvoicesForConSultancy } from '../../../../../services/operations/Admin/GetData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const statuses = {
    1: 'text-green-600 bg-green-200 ring-green-600/20',
    0: 'text-gray-600 bg-gray-200 ring-gray-500/10',
  }


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const AllInvoices = () => {

  const {token}=useSelector((state)=> state.auth);
  const [projectData,setProjectData]=useState([]);

    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getAllInvoicesForConSultancy(token,1);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setProjectData(res[1]);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getProjectDetails();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All Consultancy Invoices</h2>

      {/* Table headers */}
      <div className="grid grid-cols-10 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">Invoice ID</div>
        <div className="col-span-2 ml-[-10px]">Project Name</div>
        <div className="col-span-1 ml-2">Invoice Amount</div>
        <div className="col-span-1 ml-1">GST Amount</div>
        <div className="col-span-1 ml-1">Total invoice Amount</div>
        <div className="col-span-1 ml-1">Invoice Date</div>
        <div className="col-span-1 ml-1">Payment Status</div>
        <div className="col-span-1 ml-1">Payment Received Date</div>
      </div>


      
      {/* Table data */}
      {projectData.map((item,index) => (
        <div key={index}>

          {item?.c_invoice_id && <div className="grid grid-cols-10 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.c_invoice_id}</div>
            <div className="col-span-2 ml-[-20px]">{item?.c_project_title?.length > 35 ? `${item?.c_project_title.slice(0, 35)}...` : item?.c_project_title}</div>
            <div className="col-span-1">{item?.invoice_amount}</div>
            <div className="col-span-1">{item?.gst_amount}</div>
            <div className="col-span-1">{item?.total_invoice_amount}</div>
            <div className="col-span-1">{item?.invoice_date}</div>
            <div className="col-span-1"><p className={classNames(statuses[item?.payment_received],
                                        'mt-0.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset w-[70px]',
                                        )}>{item?.payment_received==1 ? "Received" : "Pending"}</p></div>
            <div className="col-span-1">{item?.payment_received_date==="Invalid date" ? "" : item?.payment_received_date}</div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default AllInvoices
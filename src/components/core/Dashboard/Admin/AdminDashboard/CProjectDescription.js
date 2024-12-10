import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { fundReleasedDetailsConsultancy } from '../../../../../services/operations/GetProjects';
import { getUserConsultancyProjectDetails } from '../../../../../services/operations/GetProjects';
import { getUserConsultancyProjectFiles } from '../../../../../services/operations/GetProjects';
import CProjectFundDetails from './CProjectFundDetails';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const rupeesInWord = require('rupeesinword');

const statuses = {
    active: 'text-green-600 bg-green-200 ring-green-600/20',
    closed: 'text-gray-600 bg-gray-200 ring-gray-500/10',
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

export default function CProjectDescription() {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { projectID,userID } = useParams();
    // const userID=user.u_id;


    const [isChoosen,setIsChoosen]=useState(false);
    const [fund_details ,Setfund_details]=useState([]);
    const [type,setType]=useState("invoice")
    const [response, setResponse] = useState(null);
    const [val,setVal]=useState(null);
    const [projectFiles,setProjectFiles]=useState([]);


    useEffect(()=>{
        const getfundReleased = async () => {

            try{
                const res=await fundReleasedDetailsConsultancy(token,projectID,type);
                // console.log("printing the fund Released details",res);
                if(res!==null)
                {   
                    console.log("printing the fund Released details",res);
                    Setfund_details(res);
                }
            } catch(error)
            {
                console.log("error in getting fund released details",error);
            }
        }

        if(isChoosen)
        {
            getfundReleased();
        }
    },[isChoosen,type]);
    

    useEffect(() => {
        const getProjectDetails = async () => {
          try {
            const res = await getUserConsultancyProjectDetails(token,projectID,userID);
            console.log("printing the response",res);
            if(res!==null)
                {
                    setResponse(res);
                    // setVal(res?.total_deal_amount);
                }
          } catch (error) {
            console.log("could not fetch project details.")
          }
        }; 
        const getProjectFiles = async () => {
          try {
            const res = await getUserConsultancyProjectFiles(token,projectID);
            console.log("printing the files",res);
            if(res!==null)
                {
                  setProjectFiles(res);
                }
          } catch (error) {
            console.log("could not fetch project details.");
          }
        }; 
        getProjectDetails();
        getProjectFiles();
      }, [])

  return (
    <div className='flex flex-col gap-y-4'>
    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">{response?.c_project_title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"><span>Status :</span>
            <span className={classNames(statuses[response?.status],
                  'mt-0.5 ml-2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {response?.status}
            </span> 
        </p>
      </div>
      <div className="border-t border-gray-400">
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Project ID :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.c_agency_id}</dd>
          </div>
          {response?.scheme_name!==null && <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Role :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.role}</dd>
          </div>}

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Sponsoring Agency :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.c_agency_name}</dd>
          </div>

          {(response?.status==="active" || response?.status==="closed") && <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Start Date :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.start_date}</dd>
          </div>
            }
          {response?.status==="closed" && <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Completed on :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.end_date}</dd>
          </div>}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total Deal Amount :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">₹ {response?.total_deal_amount} {val!==null && <span>({rupeesInWord(response?.total_deal_amount)} rupees)</span>}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total Amount Received with GST :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">₹ {response?.total_amount_received_with_GST} {val!==null && <span>({rupeesInWord(response?.total_funds)} rupees)</span>}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total Remaining Funds :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">₹ {response?.total_amount_left} {val!==null && <span>({rupeesInWord(response?.total_funds_remaining)} rupees)</span>}</dd>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
            </dd>
          </div> */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments :</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              {projectFiles.length>0 ? (projectFiles.map((files)=>(

                <li key={files?.c_file_id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">File</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                  <a href={files?.c_proposal_file}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    View
                </a>
                  </div>
                </li>
                  ))) : (<div className='border-none py-3 px-3'>No files</div>)}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">See all invoices details :</dt>
            <dd className="mt-1 text-sm leading-6 font-medium text-indigo-600 hover:text-indigo-500 sm:col-span-2 
                            sm:mt-0 cursor-pointer" onClick={()=>{setIsChoosen(true); setType("invoice")}}><a href='#funds'>View Details</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">See all disbursement details :</dt>
            <dd className="mt-1 text-sm leading-6 font-medium text-indigo-600 hover:text-indigo-500 sm:col-span-2 
                            sm:mt-0 cursor-pointer" onClick={()=>{setIsChoosen(true); setType("disbursement")}}><a href='#funds'>View Details</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">See all expenditure details:</dt>
            <dd className="mt-1 text-sm leading-6 font-medium text-indigo-600 hover:text-indigo-500 sm:col-span-2 
                            sm:mt-0 cursor-pointer" onClick={()=>{setIsChoosen(true); setType("expenditure")}}><a href='#funds'>View Details</a></dd>
          </div>
        </dl>
      </div>
    </div>
    



    {/* listing the fund details */}
    { isChoosen && <div id='funds'>
        {fund_details.length>0 ? (<CProjectFundDetails fund_details={fund_details} setIsChoosen={setIsChoosen} type={type}></CProjectFundDetails>) : 
            (<div className='overflow-hidden bg-white shadow-xl sm:rounded-lg pl-8 pr-6'>
                <p className='py-20 text-xl font-bold flex justify-center'>No Data Found</p>
            </div>)}
            </div>}
        </div>
    )
    }
import toast from "react-hot-toast";
import {AddEndpoints,modifyData} from "../../apis";
import { fileuploadApis } from "../../apis";
import { apiConnector } from "../../apiconnector";



const {ADD_DEPARTMRNT_API,ADD_FUND_EXPENDTIURE_RESEARCH,ADD_CONSULTANCY_INVOICE_API,ADD_CONSULTANCY_DISBURSEMENT_API,
        ADD_CONSULTANCY_EXPENDITURE_API,ADD_SUBHEAD_API}=AddEndpoints;

const {ADD_NEW_RESEARCH_PROJECT_API,ADD_NEW_CONSULTANCY_PROJECT_API,ADD_NEW_RESEARCH_UC_API,ADD_DOCUMENT_EXISTING_RESEARCH_PROJECT_API
        ,ADD_DOCUMENT_EXISTING_CONSULTANCY_PROJECT_API
            }=fileuploadApis;

export async function addDepartment(token,DeptName) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            ADD_DEPARTMRNT_API,
            {
                DeptName,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Department Added Successfully");
    } catch (error) {
      console.log("ADD_DEPARTMRNT_API ERROR............", error)
      toast.error("Department not Added");
    }
    toast.dismiss(toastId)
  }




export async function addResearchFundExpenditure(token,formData,selectedoption) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            ADD_FUND_EXPENDTIURE_RESEARCH,
            {
              formData,
              selectedoption,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Fund details Updated Successfully");
    } catch (error) {
      console.log("ADD_FUND_EXPENDTIURE_RESEARCH ERROR............", error)
      toast.error("Department not Added");
    }
    toast.dismiss(toastId)
  }



//function to add invoice for the consultancy project
export async function addConsultanctyInvoices(token,formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            ADD_CONSULTANCY_INVOICE_API,
            {
              formData,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Fund details Updated Successfully");
    } catch (error) {
      console.log("ADD_CONSULTANCY_INVOICE_API ERROR............", error)
      toast.error("Department not Added");
    }
    toast.dismiss(toastId)
  }


//function to add disbursement for the consultancy project
export async function addConsultanctyDisbursements(token,formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            ADD_CONSULTANCY_DISBURSEMENT_API,
            {
              formData,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Disbursement details Updated Successfully");
    } catch (error) {
      console.log("ADD_CONSULTANCY_DISBURSEMENT_API ERROR............", error)
      toast.error("Disbursement details Adding failed");
    }
    toast.dismiss(toastId)
  }



  
  
  //function to add disbursement for the consultancy project
  export async function addConsultanctyExpenditure(token,formData) {
      const toastId = toast.loading("Loading...")
      try {
          const response = await apiConnector(
              "POST",
              ADD_CONSULTANCY_EXPENDITURE_API,
              {
                formData,
              },
              {
                Authorization: `Bearer ${token}`,
              }
            )
    
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("expenditure details Updated Successfully");
      } catch (error) {
        console.log("ADD_CONSULTANCY_EXPENDITURE_API ERROR............", error)
        toast.error("expenditure details Adding failed");
      }
      toast.dismiss(toastId)
    }





  //function to add new sub head name 
  export async function addNewSubHead(token,formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            ADD_SUBHEAD_API,
            {
              formData,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("subhead name added Successfully");
    } catch (error) {
      console.log("ADD_SUBHEAD_API ERROR............", error)
      toast.error("subhead name adding failed");
    }
    toast.dismiss(toastId)
  }





//function to add new Consultancy project
export async function AddNewConsultancyProject(token,formData) {

  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_NEW_CONSULTANCY_PROJECT_API,
              formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("file uploaded Successfully");
  } catch (error) {
    console.log("ADD_NEW_RESEARCH_PROJECT_API ERROR............", error)
    toast.error("file upload failed");
  }
  toast.dismiss(toastId)
}






//function to add new Research project
export async function AddNewResearchProject(token,formData) {

  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_NEW_RESEARCH_PROJECT_API,
              formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("file uploaded Successfully");
  } catch (error) {
    console.log("ADD_NEW_RESEARCH_PROJECT_API ERROR............", error)
    toast.error("file upload failed");
  }
  toast.dismiss(toastId)
}






//function to add new utilization certificates
export async function AddUCResearch(token,formData) {

  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_NEW_RESEARCH_UC_API,
              formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("file uploaded Successfully");
  } catch (error) {
    console.log("ADD_NEW_RESEARCH_UC_API ERROR............", error)
    toast.error("file upload failed");
  }
  toast.dismiss(toastId)
}





//function to add documents to an existing project
export async function AddDocumentInExistingResearchProject(token,formData) {

  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_DOCUMENT_EXISTING_RESEARCH_PROJECT_API,
              formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("file uploaded Successfully");
  } catch (error) {
    console.log("ADD_DOCUMENT_EXISTING_RESEARCH_PROJECT_API ERROR............", error)
    toast.error("file upload failed");
  }
  toast.dismiss(toastId)
}






//function to add documents to an existing project
export async function AddDocumentInExistingConsultancyProject(token,formData) {

  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_DOCUMENT_EXISTING_CONSULTANCY_PROJECT_API,
              formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("file uploaded Successfully");
  } catch (error) {
    console.log("ADD_DOCUMENT_EXISTING_CONSULTANCY_PROJECT_API ERROR............", error)
    toast.error("file upload failed");
  }
  toast.dismiss(toastId)
}











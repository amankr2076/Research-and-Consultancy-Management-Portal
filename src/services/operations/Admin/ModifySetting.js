import toast from "react-hot-toast";
import {modifyData} from "../../apis";
import { apiConnector } from "../../apiconnector";



const {CHANGE_STATUS_TO_CLOSED_API,UPDATE_INVOICE_STATUS_API,REMOVE_SUBHEAD_RESEARCH,CHANGE_STATUS_TO_AWARDED_API}=modifyData;

export async function changeStatusToClosed(token,formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            CHANGE_STATUS_TO_CLOSED_API,
            formData,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Status Changed Successfully");
    } catch (error) {
      console.log("CHANGE_STATUS_TO_CLOSED_API ERROR............", error)
      toast.error("Status change failed");
    }
    toast.dismiss(toastId)
  }



export async function changeStatusToAwarded(token,finalFormData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            CHANGE_STATUS_TO_AWARDED_API,
            {
              finalFormData,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Status Changed Successfully");
    } catch (error) {
      console.log("CHANGE_STATUS_TO_AWARDED_API ERROR............", error)
      toast.error("Status change failed");
    }
    toast.dismiss(toastId)
  }



  //function to update invoice for the consultancy project
export async function updateConsultanctyInvoices(token,formData) {
  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          UPDATE_INVOICE_STATUS_API,
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
    toast.success("Invoice Updated Successfully");
  } catch (error) {
    console.log("UPDATE_INVOICE_STATUS_API ERROR............", error)
    toast.error("Data not Updated");
  }
  toast.dismiss(toastId)
}




  //function to remove subhead
export async function removeSubHead(token,formData) {
  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          REMOVE_SUBHEAD_RESEARCH,
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

      if (response.data.success && !response.data.check) {
            toast.dismiss(toastId)
            toast.error("Deletion Failed due to constrained");
            return;
      }

    toast.success("SubHead removed Successfully");
  } catch (error) {
    console.log("REMOVE_SUBHEAD_RESEARCH ERROR............", error)
    toast.error("Data not Updated");
  }
  toast.dismiss(toastId)
}

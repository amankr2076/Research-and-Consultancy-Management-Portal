import toast from "react-hot-toast";
import { fileuploadApis } from "../../apis";
import { apiConnector } from "../../apiconnector";


const {FILE_UPLOAD_API}=fileuploadApis;

//function to add disbursement for the consultancy project
export async function AddNewConsultancyProject(token,formData) {

    console.log("prining the api",FILE_UPLOAD_API);
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            FILE_UPLOAD_API,
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
      console.log("FILE_UPLOAD_API ERROR............", error)
      toast.error("file upload failed");
    }
    toast.dismiss(toastId)
  }



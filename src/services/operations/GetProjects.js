import toast from "react-hot-toast";
import {projectsEndpoints} from "../apis";
import { apiConnector } from "../apiconnector";

const {RESEARCH_PROJECTS_API,RESEARCH_PROJECT_DETAILS_API,RESEARCH_PROJECT_FUND_DETAILS_API,
        CONSULTANCY_PROJECTS_API,CONSULTANCY_PROJECT_DETAILS_API,CONSULTANCY_PROJECT_FUND_DETAILS_API,RESEARCH_PROJECT_FILES_API,CONSULTANCY_PROJECT_FILES_API} =projectsEndpoints;

export async function getUserResearchProjects(token,userID) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector(
            "POST",
            RESEARCH_PROJECTS_API,
            {
              userID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
      toast.success("data fetched successfully");
    } catch (error) {
      console.log("RESEARCH_PROJECTS_API ERROR............", error)
      toast.error("Error in getting projects");
    }
    toast.dismiss(toastId)
    return result
  }



export async function getUserConsultancyProjects(token,userID) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector(
            "POST",
            CONSULTANCY_PROJECTS_API,
            {
              userID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
      toast.success("data fetched successfully");
    } catch (error) {
      console.log("CONSULTANCY_PROJECTS_API ERROR............", error)
      toast.error("Error in getting projects");
    }
    toast.dismiss(toastId)
    return result
  }




//function to get details of a single research project
export async function getUserResearchProjectDetails(token,projectID,userID) {
    const toastId = toast.loading("Loading...")
    let result =null;
    try {
        const response = await apiConnector(
            "POST",
            RESEARCH_PROJECT_DETAILS_API,
            {
              projectID,userID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data[0]
      toast.success("data fetched successfully");
    } catch (error) {
      console.log("RESEARCH_PROJECT_DETAILS_API ERROR............", error)
      toast.error("Error in getting projects");
    }
    toast.dismiss(toastId)
    return result;
  }



//function to get details of a files of a single research project
export async function getUserResearchProjectFiles(token,projectID) {
    const toastId = toast.loading("Loading...")
    let result =[];
    try {
        const response = await apiConnector(
            "POST",
            RESEARCH_PROJECT_FILES_API,
            {
              projectID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data;
      // toast.success("data fetched successfully");
    } catch (error) {
      console.log("RESEARCH_PROJECT_FILES_API ERROR............", error)
      // toast.error("Error in getting projects");
    }
    toast.dismiss(toastId)
    return result;
  }



//function to get details of a files of a single research project
export async function getUserConsultancyProjectFiles(token,projectID) {
    const toastId = toast.loading("Loading...")
    let result =[];
    try {
        const response = await apiConnector(
            "POST",
            CONSULTANCY_PROJECT_FILES_API,
            {
              projectID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data;
      // toast.success("data fetched successfully");
    } catch (error) {
      console.log("CONSULTANCY_PROJECT_FILES_API ERROR............", error)
      // toast.error("Error in getting projects");
    }
    toast.dismiss(toastId)
    return result;
  }




  //function to get information about the fund released for a single project
export async function fundReleasedDetailsResearch(token,projectID,type) {
    const toastId = toast.loading("Loading...")
    let result =null;
    try {
        const response = await apiConnector(
            "POST",
            RESEARCH_PROJECT_FUND_DETAILS_API,
            {
              projectID,
              type
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
      toast.success("data fetched successfully");
    } catch (error) {
      console.log("RESEARCH_PROJECT_FUND_DETAILS_API ERROR............", error)
      toast.error("Error in getting projects");
    }
    toast.dismiss(toastId)
    return result;
  }




//function to get details of a single consultancy project
export async function getUserConsultancyProjectDetails(token,projectID,userID) {
  const toastId = toast.loading("Loading...")
  let result =null;
  try {
      const response = await apiConnector(
          "POST",
          CONSULTANCY_PROJECT_DETAILS_API,
          {
            projectID,userID,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data[0]
    toast.success("data fetched successfully");
  } catch (error) {
    console.log("CONSULTANCY_PROJECT_DETAILS_API ERROR............", error)
    toast.error("Error in getting projects");
  }
  toast.dismiss(toastId)
  return result;
}




  //function to get information about the fund released for a single project
  export async function fundReleasedDetailsConsultancy(token,projectID,type) {
    const toastId = toast.loading("Loading...")
    let result =null;
    try {
        const response = await apiConnector(
            "POST",
            CONSULTANCY_PROJECT_FUND_DETAILS_API,
            {
              projectID,
              type
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
      toast.success("fund details fetched successfully");
    } catch (error) {
      console.log("CONSULTANCY_PROJECT_FUND_DETAILS_API ERROR............", error);
      toast.error("Error in getting fund details");
    }
    toast.dismiss(toastId)
    return result;
  }



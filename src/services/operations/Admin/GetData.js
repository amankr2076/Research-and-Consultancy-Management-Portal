import toast from "react-hot-toast";
import {getData} from "../../apis";
import { apiConnector } from "../../apiconnector";


const {GET_ALL_FACULTY_API,GET_ALL_RESEARCH_AGENCIES_API,GET_ALL_CONSULTANCY_AGENCIES_API,GET_ALL_RESEARCH_PROJECT_API,GET_ALL_CONSULTANCY_PROJECT_API,
      GET_ALL_SUBHEAD_REASEARCH_API,GET_SOME_SUBHEAD_REASEARCH_API,
      GET_ALL_INVOICES_FOR_CONSULTANCY_API,GET_SOME_R_C_PROJECTS_API,GET_COUNT_DETAILS_API,GET_ALL_DEPARTMENT_API,GET_ALL_R_C_FILES_API}=getData;



//function to get details of all the faculties
export async function getAllFaculties(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_FACULTY_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_FACULTY_API ERROR............", error)
    }
    return result
  }




//gettin details of all the agencies of research projects
export async function getAllResearchAgenciesData(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_RESEARCH_AGENCIES_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_RESEARCH_AGENCIES_API ERROR............", error)
    }
    return result
  }


  
//gettin details of all the agencies of consultancy projects
export async function getAllConsultancyAgenciesData(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_CONSULTANCY_AGENCIES_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_CONSULTANCY_AGENCIES_API ERROR............", error)
    }
    return result
  }



//gettin details of all the agencies
export async function getAllResearchProjectsDeatils(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_RESEARCH_PROJECT_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_AGENCIES_API ERROR............", error)
    }
    return result
  }





  //function to get details of all the consultancy projects
export async function getAllConsultancyProjectsDeatils(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_CONSULTANCY_PROJECT_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_CONSULTANCY_PROJECT_API ERROR............", error)
    }
    return result
  }





  //function to get details of all the invoices
export async function getAllInvoicesForConSultancy(token,projectID) {
    let result = []
    try {
        const response = await apiConnector(
            "POST",
            GET_ALL_INVOICES_FOR_CONSULTANCY_API,
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
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_INVOICES_FOR_CONSULTANCY_API ERROR............", error)
    }
    return result
  }





//function to get the subhead of all the research projects
export async function getAllSubheadsResearch(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_SUBHEAD_REASEARCH_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_SUBHEAD_REASEARCH_API ERROR............", error)
    }
    return result
  }


  
//function to get the subHeads of related to a specific project that is in awarded state
export async function getSomeSubheadsResearch(token,projectID) {
    let result = []
    try {
        const response = await apiConnector(
            "POST",
            GET_SOME_SUBHEAD_REASEARCH_API,
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
      result = response.data.data
    } catch (error) {
      console.log("GET_SOME_SUBHEAD_REASEARCH_API ERROR............", error)
    }
    return result
  }



//function to get sone reaserch and some consultancy projects list
export async function getSomeR_C_projects(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_SOME_R_C_PROJECTS_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_SOME_R_C_PROJECTS_API ERROR............", error);
    }
    return result
  }




//function to get sone reaserch and some consultancy projects list
export async function getCountDetails(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_COUNT_DETAILS_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_COUNT_DETAILS_API ERROR............", error);
    }
    return result
  }




//function to get sone reaserch and some consultancy projects list
export async function getAllDepartments(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_DEPARTMENT_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_DEPARTMENT_API ERROR............", error);
    }
    return result
  }



//function to get sone reaserch and some consultancy projects list
export async function getAllRCFiles(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_R_C_FILES_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_R_C_FILES_API ERROR............", error);
    }
    return result
  }



const BASE_URL="http://localhost:4000";


//Auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
  }


export const projectsEndpoints={
  RESEARCH_PROJECTS_API:BASE_URL+ "/projects/research",
  CONSULTANCY_PROJECTS_API: BASE_URL + "/projects/consultancy",
  RESEARCH_PROJECT_DETAILS_API: BASE_URL+"/projects/research/projectDeatils",
  CONSULTANCY_PROJECT_DETAILS_API: BASE_URL+ "/projects/consultancy/projectDetails",
  RESEARCH_PROJECT_FUND_DETAILS_API: BASE_URL + "/projects/research/projectDeatils/fundDetails",
  CONSULTANCY_PROJECT_FUND_DETAILS_API: BASE_URL + "/projects/consultancy/projectDeatils/fundDetails",
  RESEARCH_PROJECT_FILES_API: BASE_URL + "/projects/research/files",
  CONSULTANCY_PROJECT_FILES_API: BASE_URL + "/projects/consultancy/files"
}



export const AddEndpoints={
  ADD_DEPARTMRNT_API:BASE_URL+"/admin/add-dept",
  ADD_FUND_EXPENDTIURE_RESEARCH:BASE_URL + "/admin/add-r-funds",
  ADD_CONSULTANCY_INVOICE_API: BASE_URL+ "/admin/addInvoice",
  ADD_CONSULTANCY_DISBURSEMENT_API: BASE_URL+ "/admin/addDisbursement",
  ADD_CONSULTANCY_EXPENDITURE_API: BASE_URL+ "/admin/add-c-expenditure",
  ADD_SUBHEAD_API: BASE_URL+ "/admin/addsubhead"
}


export const getData={
  GET_ALL_FACULTY_API: BASE_URL + "/admin/getdata/faculty",
  GET_ALL_DEPARTMENT_API: BASE_URL + "/admin/getdata/department",
  GET_ALL_RESEARCH_AGENCIES_API: BASE_URL +"/admin/getdata/r-agencies",
  GET_ALL_CONSULTANCY_AGENCIES_API: BASE_URL +"/admin/getdata/c-agencies",
  GET_ALL_RESEARCH_PROJECT_API: BASE_URL+"/admin/getdata/rprojects",
  GET_ALL_CONSULTANCY_PROJECT_API: BASE_URL +"/admin/getdata/cprojects",
  GET_ALL_SUBHEAD_REASEARCH_API: BASE_URL+ "/admin/getdata/rsubhead",
  GET_SOME_SUBHEAD_REASEARCH_API: BASE_URL+ "/admin/getdata/specific-rsubhead",
  GET_ALL_INVOICES_FOR_CONSULTANCY_API: BASE_URL+"/admin/getdata/invoices",
  GET_SOME_R_C_PROJECTS_API: BASE_URL+"/admin/getdata/some-r-c-projects",
  GET_COUNT_DETAILS_API: BASE_URL+"/admin/getdata/count-details",
  GET_ALL_R_C_FILES_API: BASE_URL+"/admin/getdata/r-c-files",
}



export const modifyData={
  CHANGE_STATUS_TO_CLOSED_API: BASE_URL + "/admin/modify/change-status-to-closed",
  CHANGE_STATUS_TO_AWARDED_API : BASE_URL + "/admin/modify/change-status-to-awarded",
  UPDATE_INVOICE_STATUS_API: BASE_URL+"/admin/modify/invoices",
  REMOVE_SUBHEAD_RESEARCH: BASE_URL+ "/admin/modify/subhead"
}


export const fileuploadApis={
  ADD_NEW_CONSULTANCY_PROJECT_API: BASE_URL + "/admin/add-c-project",
  ADD_NEW_RESEARCH_PROJECT_API: BASE_URL + "/admin/add-r-project",
  ADD_NEW_RESEARCH_UC_API : BASE_URL+ "/admin/add-r-uc",
  ADD_DOCUMENT_EXISTING_RESEARCH_PROJECT_API: BASE_URL + "/admin/add-r-document",
  ADD_DOCUMENT_EXISTING_CONSULTANCY_PROJECT_API: BASE_URL + "/admin/add-c-document",
}
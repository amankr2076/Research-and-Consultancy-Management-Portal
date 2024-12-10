// Import the required modules
const express = require("express")
const router = express.Router()


const {auth,isUser,isAdmin} =require("../middleware/auth");
const {Add_department,addResearchFundExpenditure,addConsultanctyInvoices,addConsultanctyDisbursements,
            addConsultanctyExpenditure,addNewSubHead,AddNewConsultancyProject,AddNewResearchProject,AddNewResearchUC,
            AddDocumentInExistingResearchProject,AddDocumentInExistingConsultancyProject} =require("../controller/AddSettings");




const {getAllFaculty,getAllResearchAgenciesData,getAllConsultancyAgenciesData,getAllResearchProjectsData,getAllConsultancyProjectsData,
        getAllSubheadsResearch,getSomeSubheadsResearch,getval,
        getAllInvoicesForConSultancy,getSomeR_C_projects,CountDetails,getAllDepartment,getAllRCFILES}=require("../controller/GetData");

const {changeStatusToClosed,updateConsultanctyInvoices,removeSubHead,changeStatusToAwarded}=require("../controller/ModifySettings");


router.post("/add-dept",auth,isAdmin,Add_department);
router.post("/add-r-funds",auth,isAdmin,addResearchFundExpenditure);
router.post("/addInvoice",auth,isAdmin,addConsultanctyInvoices);
router.post("/addDisbursement",auth,isAdmin,addConsultanctyDisbursements);
router.post("/add-c-expenditure",auth,isAdmin,addConsultanctyExpenditure);
router.post("/addsubhead",auth,isAdmin,addNewSubHead);
router.post("/add-c-project",auth,isAdmin,AddNewConsultancyProject);
router.post("/add-r-project",auth,isAdmin,AddNewResearchProject);
router.post("/add-r-uc",auth,isAdmin,AddNewResearchUC);
router.post("/add-r-document",auth,isAdmin,AddDocumentInExistingResearchProject);
router.post("/add-c-document",auth,isAdmin,AddDocumentInExistingConsultancyProject);








//alll routes to get data
router.get("/getdata/faculty",auth,isAdmin,getAllFaculty)
router.get("/getdata/department",getAllDepartment)
router.get("/getdata/r-agencies",auth,isAdmin,getAllResearchAgenciesData)
router.get("/getdata/c-agencies",auth,isAdmin,getAllConsultancyAgenciesData)
router.get("/getdata/rprojects",auth,isAdmin,getAllResearchProjectsData)
router.get("/getdata/cprojects",auth,isAdmin,getAllConsultancyProjectsData)
router.get("/getdata/rsubhead",auth,isAdmin,getAllSubheadsResearch)
router.post("/getdata/specific-rsubhead",auth,isAdmin,getSomeSubheadsResearch)
router.post("/getdata/invoices",auth,isAdmin,getAllInvoicesForConSultancy)
router.get("/getdata/some-r-c-projects",auth,isAdmin,getSomeR_C_projects)
router.get("/getdata/count-details",auth,isAdmin,CountDetails)
router.get("/getdata/r-c-files",auth,isAdmin,getAllRCFILES)




//all routes to modify data
router.post("/modify/change-status-to-closed",auth,isAdmin,changeStatusToClosed);
router.post("/modify/change-status-to-awarded",auth,isAdmin,changeStatusToAwarded);
router.post("/modify/invoices",auth,isAdmin,updateConsultanctyInvoices);
router.post("/modify/subhead",auth,isAdmin,removeSubHead);


//file upload

// const {documentUpload}=require("../controller/UploadFileController");

// router.post("/upload",documentUpload);


//testing
router.get("/getdata/val",getval);




module.exports = router;
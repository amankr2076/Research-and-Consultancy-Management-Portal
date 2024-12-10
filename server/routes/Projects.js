// Import the required modules
const express = require("express")
const router = express.Router()

const {auth,isUser,isAdmin} =require("../middleware/auth");
const {research_Projects, research_Project_Details, research_fundDetails,consultancy_Projects,consultancy_Project_Details,consultancy_fundDetails,
    getUserResearchProjectFiles,getUserConsultancyProjectFiles
} =require("../controller/Projects");

router.post("/research",auth,isUser,research_Projects);
router.post("/research/projectDeatils",research_Project_Details);
router.post("/consultancy/projectDetails",consultancy_Project_Details);
router.post("/research/projectDeatils/fundDetails",auth,research_fundDetails);
router.post("/consultancy/projectDeatils/fundDetails",consultancy_fundDetails);
router.post("/consultancy",auth,isUser,consultancy_Projects);
router.post("/research/files",auth,getUserResearchProjectFiles);
router.post("/consultancy/files",auth,getUserConsultancyProjectFiles);



module.exports = router;
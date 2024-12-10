const connectDB = require('../config/database');
const moment = require('moment-timezone');


//for fetching the faculty information
exports.getAllFaculty= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT u.u_id AS user_id,u.u_name AS user_name,d.department_name,u.u_email,u.u_phone FROM users u JOIN 
                    departments d ON u.department_id = d.department_id WHERE u.ac_type = 'normal_user'`

        const [results] = await db.execute(query);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}



//for fetching the faculty information
exports.getAllDepartment= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT d.*, COUNT(u.u_id) AS faculty_count FROM departments d LEFT JOIN users u ON d.department_id = u.department_id 
                    GROUP BY d.department_id`

        const [results] = await db.execute(query);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}






//for fetching the sponsoring agencies information
exports.getAllResearchAgenciesData= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query1=`SELECT sa.r_agency_id, sa.r_agency_name,COUNT(rp.r_project_id) AS total_projects FROM sponsoring_agencies_research sa
                        LEFT JOIN research_projects rp ON sa.r_agency_id = rp.sponsoring_agency_id GROUP BY sa.r_agency_id`
        const [results1] = await db.execute(query1);

        const query2=`SELECT * FROM schemes`
        const [results2] = await db.execute(query2);
        const query3=`SELECT * FROM sub_schemes`
        const [results3] = await db.execute(query3);

        const agencies=results1;
        const schemes=results2;
        const sub_schemes=results3;

        const combinedArray = [agencies, schemes, sub_schemes];

        return res.status(200).json({
            success: true,
            data:combinedArray,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}




//for fetching the sponsoring agencies information
exports.getAllConsultancyAgenciesData= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query1=`SELECT sa.c_agency_id, sa.c_agency_name,COUNT(cp.c_project_id) AS total_projects FROM sponsoring_agencies_consultancy sa
                        LEFT JOIN consultancy_projects cp ON sa.c_agency_id = cp.c_agency_id GROUP BY sa.c_agency_id`
        const [results1] = await db.execute(query1);

        return res.status(200).json({
            success: true,
            data:results1,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}





//for fetching the faculty information
exports.getAllResearchProjectsData= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT rp.*, u.u_name, rpi.role, rpi.u_id, sar.r_agency_name FROM research_projects rp JOIN r_project_investigators rpi 
                    ON rp.r_project_id = rpi.r_project_id JOIN users u ON rpi.u_id = u.u_id JOIN sponsoring_agencies_research sar 
                    ON rp.sponsoring_agency_id = sar.r_agency_id  ORDER BY rp.r_project_id `

        const [results] = await db.execute(query);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}



//for fetching the faculty information
exports.getAllConsultancyProjectsData= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT cp.*,ci.u_id,ci.role,sac.c_agency_name,u.u_name FROM consultancy_projects cp JOIN 
                    consultancy_investigators ci ON cp.c_project_id = ci.c_project_id JOIN users u ON ci.u_id = u.u_id JOIN 
                    sponsoring_agencies_consultancy sac ON cp.c_agency_id = sac.c_agency_id ORDER BY cp.c_project_id`

        const [results] = await db.execute(query);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}



//function to get all research subHeads
exports.getAllSubheadsResearch= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT * FROM r_subheads`

        const [results] = await db.execute(query);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}




//function to get specific research subHeads of a single project which is in awarded state
exports.getSomeSubheadsResearch= async (req,res)=>{

    try{

        const { projectID } = req.body;
        console.log("printing the project ID",projectID);
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT r_subheads.r_subhead_id,r_subheads.r_subhead_name FROM research_project_funding JOIN 
                    r_subheads ON research_project_funding.r_subhead_id = r_subheads.r_subhead_id WHERE research_project_funding.r_project_id = ?;
`

        const [results] = await db.execute(query,[projectID]);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`, 
          });
    }
}



//function to get all invoice details of consultancy for a given project
exports.getAllInvoicesForConSultancy= async (req,res)=>{

    try{

        const {projectID}=req.body;
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT * FROM consultancy_invoices WHERE c_project_id= ? `
        const query2=`SELECT ci.* ,cp.c_project_title FROM consultancy_invoices ci JOIN consultancy_projects cp ON ci.c_project_id=cp.c_project_id `

        const [results] = await db.execute(query,[projectID]);
        const [results2] = await db.execute(query2);

        results2.forEach((invoice) => {
            invoice.invoice_date = moment.tz(invoice.invoice_date, "Asia/Kolkata").format('YYYY-MM-DD');
            invoice.payment_received_date = moment.tz(invoice.payment_received_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

        const fresult=[results,results2];

        return res.status(200).json({
            success: true,
            data:fresult,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching invoice data ${error}`,
          });
    }
}



//function to get sone reaserch and some consultancy projects list
exports.getSomeR_C_projects= async (req,res)=>{

    try{

        // Get the database connection
        const db = await connectDB();

        const query1=`SELECT cp.c_project_id,cp.c_project_title,sac.c_agency_name,cp.status FROM consultancy_projects cp JOIN 
                        sponsoring_agencies_consultancy sac ON cp.c_agency_id = sac.c_agency_id ORDER BY cp.c_project_id DESC LIMIT 3`

        const [results1] = await db.execute(query1);

        const query2=`SELECT rp.r_project_id,rp.r_project_title,sar.r_agency_name,rp.r_status FROM research_projects rp JOIN 
                        sponsoring_agencies_research sar ON rp.sponsoring_agency_id = sar.r_agency_id ORDER BY rp.r_project_id DESC LIMIT 3`

        const [results2] = await db.execute(query2);

        const result=[...results2,...results1];

        return res.status(200).json({
            success: true,
            data:result,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching projects data ${error}`,
          });
    }
}





//function to get count of projects
exports.CountDetails= async (req,res)=>{

    try{

        // Get the database connection
        const db = await connectDB();

        const query1=`SELECT COUNT(c_project_id) AS total_c_projects FROM consultancy_projects`
        const query4=`SELECT COUNT(c_project_id) AS active_c_projects FROM consultancy_projects WHERE status= ? `
        const query2=`SELECT COUNT(r_project_id) AS total_r_projects FROM research_projects`
        const query5=`SELECT COUNT(r_project_id) AS active_r_projects FROM research_projects WHERE r_status= ? `
        const query3=`SELECT COUNT(u_id) AS total_users FROM users where ac_type= ? `
        const query6=`SELECT COUNT(c_invoice_id) AS total_invoices FROM consultancy_invoices`
        const query7=`SELECT COUNT(c_invoice_id) AS received_invoices FROM consultancy_invoices WHERE payment_received=1`

        const type="normal_user"
        const [results1] = await db.execute(query1);
        const [results2] = await db.execute(query2);
        const [results3] = await db.execute(query3,[type]);
        const [results4] = await db.execute(query4,["active"]);
        const [results5] = await db.execute(query5,["awarded"]);
        const [results6] = await db.execute(query6,["awarded"]);
        const [results7] = await db.execute(query7,["awarded"]);

        const result=[...results1,...results2,...results3,...results4,...results5,...results6,...results7];

        return res.status(200).json({
            success: true,
            data:result,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching projects data ${error}`,
          });
    }
}





//function to get all research subHeads
exports.getAllRCFILES= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`SELECT rpf.* ,rp.r_project_title FROM research_projects_files rpf JOIN research_projects rp ON rpf.r_project_id=rp.r_project_id`

        const [results] = await db.execute(query);

        const query2=`SELECT cpf.* ,cp.c_project_title FROM consultancy_projects_files cpf JOIN consultancy_projects cp ON cpf.c_project_id=cp.c_project_id `

        const [results2] = await db.execute(query2);

        const fresult=[results,results2];

        return res.status(200).json({
            success: true,
            data:fresult,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}






















//function to get all research subHeads
exports.getval= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query=`select value from temp where id=1`

        const [results] = await db.execute(query);

        return res.status(200).json({
            success: true,
            data:results,
            message: `Data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching data ${error}`,
          });
    }
}






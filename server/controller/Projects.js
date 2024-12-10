const connectDB = require('../config/database');
const moment = require('moment-timezone');




//for fetching all the research project list
exports.research_Projects= async (req,res)=>{

    try{
        const { userID } = req.body;
        // console.log("printing the email", userID);

        // Get the database connection
        const db = await connectDB();

        const query=`SELECT  rp.r_project_id,rp.r_status,rp.r_project_title,rp.Proposal_date,rp.Start_date,rp.completion_date,rpi.role FROM
        research_projects rp JOIN r_project_investigators rpi ON rp.r_project_id = rpi.r_project_id WHERE rpi.u_id = ? `

        const [results] = await db.execute(query, [userID]);
        // console.log("hello");
        // console.log(new Date(results[0].Proposal_date).toLocaleDateString('en-GB'));
        // console.log(moment.tz(results[0].Proposal_date, "Asia/Kolkata").format('YYYY-MM-DD'));

        results.forEach((project) => {
            project.Proposal_date = moment.tz(project.Proposal_date, "Asia/Kolkata").format('YYYY-MM-DD');
            project.Start_date = moment.tz(project.Start_date, "Asia/Kolkata").format('YYYY-MM-DD');
            project.completion_date = moment.tz(project.completion_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

        return res.status(200).json({
            success: true,
            data:results,
            message: `data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing data${error}`,
          });
    }
}



//for fetching all the research project list
exports.consultancy_Projects= async (req,res)=>{

    try{
        const { userID } = req.body;
        // console.log("printing the email", userID);

        // Get the database connection
        const db = await connectDB();

        const query=`SELECT  cp.c_project_id,cp.status,cp.c_project_title,cp.start_date,cp.end_date,cpi.role FROM
        consultancy_projects cp JOIN consultancy_investigators cpi ON cp.c_project_id = cpi.c_project_id WHERE cpi.u_id = ?`

        const [results] = await db.execute(query, [userID]);


        results.forEach((project) => {
            project.start_date = moment.tz(project.start_date, "Asia/Kolkata").format('YYYY-MM-DD');
            project.end_date = moment.tz(project.end_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

          console.log("hello",results);

        return res.status(200).json({
            success: true,
            data:results,
            message: `data fetched successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing data${error}`,
          });
    }
}



//for fetching the details of a single research project
exports.research_Project_Details= async (req,res)=>{

    try{
        const { projectID,userID } = req.body;
        // console.log("printing the projectId", projectID);

        // Get the database connection
        const db = await connectDB();

        const query=`SELECT rp.*, rpi.role, sar.r_agency_name FROM research_projects rp JOIN r_project_investigators rpi 
                    ON rp.r_project_id = rpi.r_project_id JOIN sponsoring_agencies_research sar ON rp.sponsoring_agency_id = sar.r_agency_id 
                    WHERE rp.r_project_id = ? AND rpi.u_id = ?`

        const [results] = await db.execute(query, [projectID,userID]);
        // console.log("hello");
        const projectDetails=results[0];
        // console.log(projectDetails.scheme_id);

        results.forEach((project) => {
            project.Proposal_date = moment.tz(project.Proposal_date, "Asia/Kolkata").format('YYYY-MM-DD');
            project.Start_date = moment.tz(project.Start_date, "Asia/Kolkata").format('YYYY-MM-DD');
            project.completion_date = moment.tz(project.completion_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

        if(projectDetails.scheme_id!==null)
        {
            const query1="SELECT scheme_name FROM schemes WHERE scheme_id = ? "

            const [results1]=await db.execute(query1,[projectDetails.scheme_id]);
            projectDetails.scheme_name=results1[0].scheme_name;
            console.log(results1[0].scheme_name);
        }
        else
        {
            projectDetails.scheme_name=null;
        }

        if(projectDetails.sub_scheme_id!==null)
        {
            const query2="SELECT sub_scheme_name FROM sub_schemes WHERE sub_scheme_id = ? "

            const [results2]=await db.execute(query2,[projectDetails.scheme_id]);
            projectDetails.sub_scheme_name=results2[0].sub_scheme_name;
            console.log(results2[0].sub_scheme_name);
        }
        else
        {
            projectDetails.sub_scheme_name=null;
        }


        //getting details about the total funds
        const query3="SELECT fund_balance FROM research_project_funding WHERE r_project_id = ? "

        const [results3]=await db.execute(query3,[projectID]);
        // console.log(typeof(results3));

        //calculating total funds
        if(results3.length>0)
        {
            let total_balance=0;
            for(let i=0;i<results3.length;i++)
            {
                let temp=parseFloat(results3[i].fund_balance);
                if (!isNaN(temp))
                {
                    total_balance+=temp;
                }
                
            }
            projectDetails.total_funds_remaining=total_balance;
            console.log("total funds is :",total_balance);
        }
        else
        {
            projectDetails.total_funds_remaining=null;
        }
        

        return res.status(200).json({
            success: true,
            data:results,
            message: `data fetched successfully`,
          });
    } catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing data${error}`,
          });
    }
}



//for fetching the details of a single Consultancy project
exports.consultancy_Project_Details= async (req,res)=>{

    try{
        const { projectID,userID } = req.body;
        // console.log("printing the projectId", projectID);

        // Get the database connection
        const db = await connectDB();

        const query=`SELECT cp.*, ci.role, sac.c_agency_name FROM consultancy_projects cp JOIN consultancy_investigators ci 
                    ON cp.c_project_id = ci.c_project_id JOIN sponsoring_agencies_consultancy sac ON cp.c_agency_id = sac.c_agency_id 
                    WHERE cp.c_project_id = ? AND ci.u_id = ?`

        const [results] = await db.execute(query, [projectID,userID]);

        results.forEach((project) => {
            project.start_date = moment.tz(project.start_date, "Asia/Kolkata").format('YYYY-MM-DD');
            project.end_date = moment.tz(project.end_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

          console.log("hello JEE",results);      

        return res.status(200).json({
            success: true,
            data:results,
            message: `data fetched successfully`, 
          });
    } catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing data${error}`,
          });
    }
}




//function to get the fund details of research project
exports.research_fundDetails= async (req,res)=>{

    try{
        const { projectID , type} = req.body;

        // Get the database connection
        const db = await connectDB();

        if(type==="fundReleased")
        {
            const query=`SELECT r_subheads.r_subhead_name, research_fund_releases.amount_released, research_fund_releases.release_date FROM 
                    research_fund_releases JOIN r_subheads ON research_fund_releases.r_subhead_id = r_subheads.r_subhead_id WHERE 
                    research_fund_releases.r_project_id = ? Order by release_date`;

            const [results] = await db.execute(query, [projectID]);

            results.forEach((details) => {
                details.release_date= moment.tz(details.release_date, "Asia/Kolkata").format('YYYY-MM-DD');
              });

            let fundDetails=results;
            if(results.length===0)
            {
                // results=null;
                fundDetails=null;
            }
            console.log("HII",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:fundDetails,
                message: `fund released data fetched successfully`,
            });
        }
        else if(type==="subHeads")
        {
            const query=`SELECT r_subheads.r_subhead_name, research_project_funding.allocated_funds, research_project_funding.fund_balance FROM 
                    research_project_funding JOIN r_subheads ON research_project_funding.r_subhead_id = r_subheads.r_subhead_id WHERE 
                    research_project_funding.r_project_id = ?;`

            const [results] = await db.execute(query, [projectID]);

            let fundDetails=results;
            if(results.length===0)
            {
                // results=null;
                fundDetails=null;
            }
            console.log("hello",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:fundDetails,
                message: `subheads data fetched successfully`,
            });
        }
        else if(type==="expenditure")
        {
            const query=`SELECT r_subheads.r_subhead_name, research_expenditures.amount_spent, research_expenditures.expenditure_date FROM 
                    research_expenditures JOIN r_subheads ON research_expenditures.r_subhead_id = r_subheads.r_subhead_id WHERE 
                    research_expenditures.r_project_id = ? ORDER BY expenditure_date`

            const [results] = await db.execute(query, [projectID]); 
            
            results.forEach((details) => {
                details.expenditure_date= moment.tz(details.expenditure_date, "Asia/Kolkata").format('YYYY-MM-DD');
              });

            let fundDetails=results;
            if(results.length===0)
            {
                // results=null;
                fundDetails=null;
            }
            console.log("hello",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:fundDetails,
                message: `subheads data fetched successfully`,
            }); 
        }
        
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing data${error}`,
          });
    }
}




// function to get the fund details of consultancy projects
exports.consultancy_fundDetails= async (req,res)=>{

    try{
        const { projectID , type} = req.body;

        // Get the database connection
        const db = await connectDB();

        if(type==="invoice")
        {
            const query=`SELECT * from consultancy_invoices WHERE c_project_id= ?  Order by invoice_date`;

            const [results] = await db.execute(query, [projectID]);

            results.forEach((details) => {
                details.invoice_date= moment.tz(details.invoice_date, "Asia/Kolkata").format('YYYY-MM-DD');
                details.payment_received_date= moment.tz(details.payment_received_date, "Asia/Kolkata").format('YYYY-MM-DD');
              });

            let fundDetails=results;
            if(results.length===0)
            {
                // results=null;
                fundDetails=null;
            }
            console.log("HII",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:fundDetails,
                message: `fund released data fetched successfully`,
            });
        }
        else if(type==="disbursement")
        {

            const query = `SELECT cdr.*, u.u_name FROM consultancy_disbursement_requests cdr INNER JOIN users u ON u.u_id = cdr.u_id 
                            WHERE c_project_id = ? ORDER BY request_date`
            const [results] = await db.execute(query, [projectID]);

            results.forEach((details) => {
                details.request_date= moment.tz(details.request_date, "Asia/Kolkata").format('YYYY-MM-DD');
              });

            let fundDetails=results;
            if(results.length===0)
            {
                // results=null;
                fundDetails=null;
            }
            console.log("hello",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:fundDetails,
                message: `subheads data fetched successfully`,
            });
        }
        else if(type==="expenditure")
        {
            const query=`SELECT * FROM consultancy_expenditures WHERE c_project_id= ? ORDER BY expenditure_date`

            const [results] = await db.execute(query, [projectID]); 
            
            results.forEach((details) => {
                details.expenditure_date= moment.tz(details.expenditure_date, "Asia/Kolkata").format('YYYY-MM-DD');
              });

            let fundDetails=results;
            if(results.length===0)
            {
                // results=null;
                fundDetails=null;
            }
            console.log("hello",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:fundDetails,
                message: `subheads data fetched successfully`,
            }); 
        }
        
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing data${error}`,
          });
    }
}





// function to get the file details of research projects
exports.getUserResearchProjectFiles= async (req,res)=>{

    try{
        const { projectID } = req.body;

        // Get the database connection
        const db = await connectDB();

            const query=`SELECT * from research_projects_files WHERE r_project_id= ? `;

            const [results] = await db.execute(query, [projectID]);

            let projectFiles=results;
            if(results.length===0)
            {
                // results=null;
                projectFiles=[];
            }
            console.log("HII",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:projectFiles,
                message: `files fetched successfully`,
            });

        
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing files${error}`,
          });
    }
}




// function to get the files of consultancy projects
exports.getUserConsultancyProjectFiles= async (req,res)=>{

    try{
        const { projectID } = req.body;

        // Get the database connection
        const db = await connectDB();

            const query=`SELECT * from consultancy_projects_files WHERE c_project_id= ? `;

            const [results] = await db.execute(query, [projectID]);

            let projectFiles=results;
            if(results.length===0)
            {
                // results=null;
                projectFiles=[];
            }
            console.log("HII",results);
            // console.log(results);
            return res.status(200).json({
                success: true,
                data:projectFiles,
                message: `files fetched successfully`,
            });

        
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetcheing files${error}`,
          });
    }
}
const connectDB = require('../config/database');
const fs = require('fs');
const {authorize} = require('../config/googleDrive');
const uploadFile = require('../utils/fileupload');
const path = require('path');




//for changing the staus to closed
exports.changeStatusToClosed= async (req,res)=>{

    try{
        const { projectID,type,closingDate,year } = req.body;

        console.log("print the final form data",projectID,type,closingDate,year);
        console.log("printing the datatype",typeof(type));

        // Get the database connection
        const db = await connectDB();
        // let query="";


        if(type==="research")
        {
            if(!req.files)
                {
                    return res.status(400).json({ 
                        message:"file not found",
                        success: false,
                    });
                }


            const pdfFilesReport = req.files.pdfFilesReport;
            const pdfFilesUC = req.files.pdfFilesUC;

            const test= await authorize();
            
            const filesArrayReport = Array.isArray(pdfFilesReport) ? pdfFilesReport : [pdfFilesReport];
            const filesArrayUC = Array.isArray(pdfFilesUC) ? pdfFilesUC : [pdfFilesUC];



            //moving all the report files to local storage
            filesArrayReport.forEach((file) => {
                const uploadPath = path.join(__dirname, 'uploads', file.name);
            
                // Move the file to the server's directory
                file.mv(uploadPath, (err) => {
                  if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send(err);
                  }
                
                console.log(file.name);
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${file.name}`;
              });
            });

            const drivePathReport=[];
            //uploading all the report files to google cloud
            for(let i=0;i<filesArrayReport.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArrayReport[i].name}`;
                const res=await uploadFile(test,filePath,filesArrayReport[i].name);
                drivePathReport.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }



            //moving all the UC files to local storage
            filesArrayUC.forEach((file) => {
                const uploadPath = path.join(__dirname, 'uploads', file.name);
            
                // Move the file to the server's directory
                file.mv(uploadPath, (err) => {
                  if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send(err);
                  }
                
                console.log(file.name);
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${file.name}`;
              });
            });

            const drivePathUC=[];
            //uploading all the UC files to google cloud
            for(let i=0;i<filesArrayUC.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArrayUC[i].name}`;
                const res=await uploadFile(test,filePath,filesArrayUC[i].name);
                drivePathUC.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }


            //now inserting the UC for a research project
            const query=`INSERT INTO research_utilization_certificates (r_project_id,uc_year,uc_file,submission_date) VALUES (?,?,?,?)`
            for(let i=0;i<drivePathReport.length;i++)
            {
                const [results]=await db.execute(query,[projectID,year,drivePathReport[i],closingDate]);
            }


            //now inserting all the final reports of a resesrch project
            const query1=`INSERT INTO research_projects_files (r_project_id,r_proposal_file) VALUES (?,?)`
            for(let i=0;i<drivePathUC.length;i++)
            {
                const [results]=await db.execute(query1,[projectID,drivePathUC[i]]);
            }


            //chnaging the status to closed
            const query2=`UPDATE research_projects SET r_status="closed",completion_date= ? where r_project_id=?`
            const [results] = await db.execute(query2, [closingDate,projectID]);

        }
        else
        {
            const query=`UPDATE consultancy_projects SET status="closed",end_date= ? where c_project_id=?`
            const [results] = await db.execute(query, [closingDate,projectID]);
        }
        

        return res.status(200).json({
            success: true,
            message: `Status changed successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in changing status ${error}`,
          });
    }
}


//for changing the staus to closed
exports.changeStatusToAwarded= async (req,res)=>{

    try{
        const { finalFormData } = req.body;
        
        console.log("printing the finalFormData",finalFormData);
        // Get the database connection
        const db = await connectDB();
        
        const projectID=finalFormData[1];
        const s_date=finalFormData[0].start_date;
        const t_fuds=finalFormData[0].totalfund;
        const status="awarded";

        const query="UPDATE research_projects SET total_funds= ? ,Start_date = ?, r_status = ? where r_project_id = ? "
        const [results] = await db.execute(query, [t_fuds,s_date,status,projectID]);

        console.log("printing the data",projectID,s_date,t_fuds);
        const len=finalFormData[2].length;
        console.log("printing the length",len);

        for(let i=0;i<len;i++)
        {
            subHeadID=finalFormData[2][i].subhead;
            fund=finalFormData[2][i].fundForOneSubHead;
            console.log("printing the data inside loop",subHeadID,fund);
            const query= "INSERT INTO research_project_funding (r_project_id,r_subhead_id,allocated_funds,fund_balance) values(?,?,?,?)"
            const [results]=await db.execute(query,[projectID,subHeadID,fund,fund]);
        }

        return res.status(200).json({
            success: true,
            message: `Status changed successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in changing status ${error}`,
          });
    }
}




//for updating the invoices of consultancy
exports.updateConsultanctyInvoices= async (req,res)=>{

    try{
        const { formData } = req.body;

        console.log("printing the form data",formData);
        // Get the database connection
        const db = await connectDB();
        const payment_received=1;
       
        query=`UPDATE consultancy_invoices SET payment_received= ? ,payment_received_date= ?  where c_invoice_id=?`
        
        const [results] = await db.execute(query, [payment_received,formData.date,formData.invoice_id]);

        return res.status(200).json({
            success: true,
            message: `Status changed successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in changing status ${error}`,
          });
    }
}




//for updating the invoices of consultancy
exports.removeSubHead= async (req,res)=>{

    try{
        const { formData } = req.body;

        console.log("printing the form data",formData);
        // Get the database connection
        const db = await connectDB();
       
        query1=`SELECT * FROM research_project_funding where r_subhead_id= ? `
        
        const [results1] = await db.execute(query1, [formData.subHead_id]);
       
        query2=`SELECT * FROM research_fund_releases where r_subhead_id= ? `
        
        const [results2] = await db.execute(query2, [formData.subHead_id]);
       
        query3=`SELECT * FROM research_expenditures where r_subhead_id= ? `
        
        const [results3] = await db.execute(query1, [formData.subHead_id]);


        if(results1.length===0 && results2.length===0 && results3.length===0)
        {

            query=`DELETE FROM r_subheads where r_subhead_id= ? `
            const [result]=await db.execute(query,[formData.subHead_id]);

            return res.status(200).json({
                success: true,
                check:true,
                message: `SubHead removed successfully`,
              });

        }
        else
        {
            console.log("length zero nahi hai");
            return res.status(200).json({
                success: true,
                check: false,
                message: `SubHead removed successfully`,
              });
        }

    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in removing subHeads ${error}`,
          });
    }
}
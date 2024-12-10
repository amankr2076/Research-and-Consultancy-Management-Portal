const connectDB = require('../config/database');
const fs = require('fs');
const {authorize} = require('../config/googleDrive');
const uploadFile = require('../utils/fileupload');
const path = require('path');




//for fetching the resaerch project information
exports.Add_department= async (req,res)=>{

    try{
        const { DeptName } = req.body;

        // Get the database connection
        const db = await connectDB();

        const query=`INSERT INTO departments (department_name) VALUES (?)`

        const [results] = await db.execute(query, [DeptName]);

        return res.status(200).json({
            success: true,
            message: `Department Added successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in Adding department ${error}`,
          });
    }
}




//for fetching the resaerch project information
exports.addResearchFundExpenditure= async (req,res)=>{

    try{
        const { formData,selectedoption } = req.body;

        console.log("printing the form data",typeof(parseInt(formData.project_id)));
        console.log("printing the selected option",selectedoption);
        // Get the database connection
        const db = await connectDB();

        console.log("printing the date",formData.date);
        let query="";
        if(selectedoption===1)
        {
            query=`INSERT INTO research_fund_releases (r_project_id,r_subhead_id,amount_released,release_date) VALUES (?,?,?,?)`
        }
        else
        {
            query=`INSERT INTO research_expenditures (r_project_id,r_subhead_id,amount_spent,expenditure_date) VALUES (?,?,?,?)`
        }

        const [results] = await db.execute(query, [formData.project_id,formData.subHead_id,formData.fund,formData.date]);

        return res.status(200).json({
            success: true,
            message: `fund details updated successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in Adding fund details ${error}`,
          });
    }
}




//function to add invoices of consultancy project
exports.addConsultanctyInvoices= async (req,res)=>{

    try{
        const { formData } = req.body;
        console.log("printing the formdata",formData);
        // Get the database connection
        const db = await connectDB();

        const invoice_amount=(formData.fund)/(1.18);
        const gst_amount=(formData.fund-invoice_amount)
        const payment_received=0;
        console.log(invoice_amount,gst_amount);

        const query=`INSERT INTO consultancy_invoices (c_project_id,invoice_amount,gst_amount,total_invoice_amount,invoice_date,
                        payment_received) VALUES (?,?,?,?,?,?)`

        const [results] = await db.execute(query, [formData.project_id,invoice_amount,gst_amount,formData.fund,formData.date,payment_received]);

        return res.status(200).json({
            success: true,
            message: `Department Added successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in Adding department ${error}`,
          });
    }
}







//function to add disbursement of consultancy project
exports.addConsultanctyDisbursements= async (req,res)=>{

    try{
        const { formData } = req.body;
        console.log("printing the formdata",formData);
        // Get the database connection
        const db = await connectDB();

        const institute_share=(formData.amount)*(30/100);
        const consultant_share=(formData.amount-institute_share)
        console.log(institute_share,consultant_share);

        const query=`INSERT INTO consultancy_disbursement_requests (c_project_id,requested_amount,institute_share,consultant_share,request_date,u_id) 
                        VALUES (?,?,?,?,?,?)`

        const [results] = await db.execute(query, [formData.project_id,formData.amount,institute_share,consultant_share,formData.date,formData.u_id]);

        return res.status(200).json({
            success: true,
            message: `Disbursement data Added successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in Adding disbursement data ${error}`,
          });
    }
}




//function to add expenditure of consultancy project
exports.addConsultanctyExpenditure= async (req,res)=>{

    try{
        const { formData } = req.body;
        console.log("printing the formdata",formData);
        // Get the database connection
        const db = await connectDB();

        const query=`INSERT INTO consultancy_expenditures (c_project_id,expenditure_type,amount_spent,expenditure_date) 
                        VALUES (?,?,?,?)`

        const [results] = await db.execute(query, [formData.project_id,formData.exp_type,formData.amount,formData.date]);

        return res.status(200).json({
            success: true,
            message: `expenditure data Added successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in Adding expenditure data ${error}`,
          });
    }
}





//function to add new subhead
exports.addNewSubHead= async (req,res)=>{

    try{
        const { formData } = req.body;
        console.log("printing the formdata",formData);
        // Get the database connection
        const db = await connectDB();

        const query=`INSERT INTO r_subheads (r_subhead_name) VALUES (?)`

        const [results] = await db.execute(query, [formData.subHead_name]);

        return res.status(200).json({
            success: true,
            message: `subhead name Added successfully`,
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in Adding subhead name ${error}`,
          });
    }
}






//for adding a new consultancy project
exports.AddNewConsultancyProject= async (req,res)=>{

    try{

        const {title,sponsoring_agency_id,faculty_id,role,start_date,amount}=req.body;

        if(!req.files)
        {
            return res.status(400).json({ 
                message:"file not found",
                success: false,
            });
        }
            const pdfFiles = req.files.pdfFiles;
            const test= await authorize();
            console.log("printing the authroize",test);

            // Handle single or multiple files
            const filesArray = Array.isArray(pdfFiles) ? pdfFiles : [pdfFiles];


            //moving all the files to local storage
            filesArray.forEach((file) => {
                const uploadPath = path.join(__dirname, 'uploads', file.name);
            
                // Move the file to the server's directory
                file.mv(uploadPath, (err) => {
                  if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send(err);
                  }
                
                console.log(file.name);
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${file.name}`;

                // if (fs.existsSync(filePath)) {
                // console.log('File exists');
                // } else {
                // console.log('File does not exist');
                // }

              });
            });

            const drivePath=[];
            //uploading all the files to google cloud
            for(let i=0;i<filesArray.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArray[i].name}`;
                const res=await uploadFile(test,filePath,filesArray[i].name);
                drivePath.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }

             for(let i=0;i<drivePath.length;i++)
             {
                console.log("hii",drivePath[i]);
             }


            // Get the database connection
            const db = await connectDB();

             //now inserting the data into the database
            const query1=`INSERT INTO consultancy_projects (c_project_title,c_agency_id,status,start_date,total_deal_amount) VALUES (?,?,?,?,?)`
            const status="active";
            const [results1] = await db.execute(query1, [title,sponsoring_agency_id,status,start_date,amount]);
            console.log(results1.insertId);
            const query2=`INSERT INTO consultancy_investigators (c_project_id,u_id,role) VALUES(?,?,?)`
            const [results2]=await db.execute(query2,[results1.insertId,faculty_id,role]);

            const query3=`INSERT INTO consultancy_projects_files (c_project_id,c_proposal_file) VALUES (?,?)`
            for(let i=0;i<drivePath.length;i++)
            {
                const [results3]=await db.execute(query3,[results1.insertId,drivePath[i]]);
            }

        return res.status(200).json({
            success: true,
            message: `Consultancy Project Added Successfully`,   
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `Some Error in Adding Consultancy Projects ${error}`,
          });
    }
}






//for adding a new research project
exports.AddNewResearchProject= async (req,res)=>{

    try{

        const {title,sponsoring_agency_id,scheme_id,sub_scheme_id,faculty_id,role,proposal_date,enabled}=req.body;

        if(!req.files)
        {
            return res.status(400).json({ 
                message:"file not found",
                success: false,
            });
        }
            const pdfFiles = req.files.pdfFiles;
            const test= await authorize();
            // console.log("printing the authroize",test);
            console.log("printing the enabled", enabled);

            // Handle single or multiple files
            const filesArray = Array.isArray(pdfFiles) ? pdfFiles : [pdfFiles];


            //moving all the files to local storage
            filesArray.forEach((file) => {
                const uploadPath = path.join(__dirname, 'uploads', file.name);
            
                // Move the file to the server's directory
                file.mv(uploadPath, (err) => {
                  if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send(err);
                  }
                
                console.log(file.name);
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${file.name}`;

                // if (fs.existsSync(filePath)) {
                // console.log('File exists');
                // } else {
                // console.log('File does not exist');
                // }

              });
            });

            const drivePath=[];
            //uploading all the files to google cloud
            for(let i=0;i<filesArray.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArray[i].name}`;
                const res=await uploadFile(test,filePath,filesArray[i].name);
                drivePath.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }

             for(let i=0;i<drivePath.length;i++)
             {
                console.log("hii",drivePath[i]);
             }


            // Get the database connection
            const db = await connectDB();

             //now inserting the data into the database
            const query1=`INSERT INTO research_projects (r_project_title,r_status,sponsoring_agency_id,Proposal_date,scheme_id,sub_scheme_id) VALUES (?,?,?,?,?,?)`
            const query11=`INSERT INTO research_projects (r_project_title,r_status,sponsoring_agency_id,Proposal_date,scheme_id) VALUES (?,?,?,?,?)`
            const status="proposed";
            let fresult;
            if(enabled==="true")
            {
              console.log("enabled true hai")
              const [results1] = await db.execute(query1, [title,status,sponsoring_agency_id,proposal_date,scheme_id,sub_scheme_id]);
              fresult=results1;
            }
            else
            {
              console.log("enabled false hai");
              const [results1] = await db.execute(query11, [title,status,sponsoring_agency_id,proposal_date,scheme_id]);
              fresult=results1;
            }
            
            console.log(fresult.insertId);
            const query2=`INSERT INTO r_project_investigators (r_project_id,u_id,role) VALUES(?,?,?)`
            const [results2]=await db.execute(query2,[fresult.insertId,faculty_id,role]);

            const query3=`INSERT INTO research_projects_files (r_project_id,r_proposal_file) VALUES (?,?)`
            for(let i=0;i<drivePath.length;i++)
            {
                const [results3]=await db.execute(query3,[fresult.insertId,drivePath[i]]);
            }

        return res.status(200).json({
            success: true,
            message: `Research Project Added Successfully`,   
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `Some Error in Adding Research Projects ${error}`,
          });
    }
}






//for adding a new research project utulization certificate
exports.AddNewResearchUC= async (req,res)=>{

    try{

        const {project_id,uc_year,date}=req.body;

        if(!req.files)
        {
            return res.status(400).json({ 
                message:"file not found",
                success: false,
            });
        }
            const pdfFiles = req.files.pdfFiles;
            const test= await authorize();
            // console.log("printing the authroize",test);

            // Handle single or multiple files
            const filesArray = Array.isArray(pdfFiles) ? pdfFiles : [pdfFiles];


            //moving all the files to local storage
            filesArray.forEach((file) => {
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

            const drivePath=[];
            //uploading all the files to google cloud
            for(let i=0;i<filesArray.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArray[i].name}`;
                const res=await uploadFile(test,filePath,filesArray[i].name);
                drivePath.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }

             for(let i=0;i<drivePath.length;i++)
             {
                console.log("hii",drivePath[i]);
             }


            // Get the database connection
            const db = await connectDB();

             //now inserting the data into the database
            const query=`INSERT INTO research_utilization_certificates (r_project_id,uc_year,uc_file,submission_date) VALUES (?,?,?,?)`
            for(let i=0;i<drivePath.length;i++)
            {
                const [results]=await db.execute(query,[project_id,uc_year,drivePath[i],date]);
            }

        return res.status(200).json({
            success: true,
            message: `Research Project UC Successfully`,   
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `Some Error in Adding Research Projects UC ${error}`,
          });
    }
}





//for adding a new document to an existing research project
exports.AddDocumentInExistingResearchProject= async (req,res)=>{

    try{

        const {project_id}=req.body;

        if(!req.files)
        {
            return res.status(400).json({ 
                message:"file not found",
                success: false,
            });
        }
            const pdfFiles = req.files.pdfFiles;
            const test= await authorize();
            // console.log("printing the authroize",test);

            // Handle single or multiple files
            const filesArray = Array.isArray(pdfFiles) ? pdfFiles : [pdfFiles];


            //moving all the files to local storage
            filesArray.forEach((file) => {
                const uploadPath = path.join(__dirname, 'uploads', file.name);
            
                // Move the file to the server's directory
                file.mv(uploadPath, (err) => {
                  if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send(err);
                  }
                
                console.log(file.name);
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${file.name}`;

                // if (fs.existsSync(filePath)) {
                // console.log('File exists');
                // } else {
                // console.log('File does not exist');
                // }

              });
            });

            const drivePath=[];
            //uploading all the files to google cloud
            for(let i=0;i<filesArray.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArray[i].name}`;
                const res=await uploadFile(test,filePath,filesArray[i].name);
                drivePath.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }

             for(let i=0;i<drivePath.length;i++)
             {
                console.log("hii",drivePath[i]);
             }


            // Get the database connection
            const db = await connectDB();

             //now inserting the data into the database
            const query=`INSERT INTO research_projects_files (r_project_id,r_proposal_file) VALUES (?,?)`
            for(let i=0;i<drivePath.length;i++)
            {
                const [results]=await db.execute(query,[project_id,drivePath[i]]);
            }

        return res.status(200).json({
            success: true,
            message: `Document in Research Project Added Successfully`,   
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `Some Error in Adding document in Research Projects ${error}`,
          });
    }
}





//for adding a new document to an existing consultancy project
exports.AddDocumentInExistingConsultancyProject= async (req,res)=>{

    try{

        const {project_id}=req.body;

        if(!req.files)
        {
            return res.status(400).json({ 
                message:"file not found",
                success: false,
            });
        }
            const pdfFiles = req.files.pdfFiles;
            const test= await authorize();
            // console.log("printing the authroize",test);

            // Handle single or multiple files
            const filesArray = Array.isArray(pdfFiles) ? pdfFiles : [pdfFiles];


            //moving all the files to local storage
            filesArray.forEach((file) => {
                const uploadPath = path.join(__dirname, 'uploads', file.name);
            
                // Move the file to the server's directory
                file.mv(uploadPath, (err) => {
                  if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send(err);
                  }
                
                console.log(file.name);
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${file.name}`;

                // if (fs.existsSync(filePath)) {
                // console.log('File exists');
                // } else {
                // console.log('File does not exist');
                // }

              });
            });

            const drivePath=[];
            //uploading all the files to google cloud
            for(let i=0;i<filesArray.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArray[i].name}`;
                const res=await uploadFile(test,filePath,filesArray[i].name);
                drivePath.push(res);
                // console.log("printing the upload response",res);
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                      console.log(`Deleted local file: ${filePath}`);
                    }
                  });
            }

             for(let i=0;i<drivePath.length;i++)
             {
                console.log("hii",drivePath[i]);
             }


            // Get the database connection
            const db = await connectDB();

             //now inserting the data into the database
            const query=`INSERT INTO consultancy_projects_files (c_project_id,c_proposal_file) VALUES (?,?)`
            for(let i=0;i<drivePath.length;i++)
            {
                const [results]=await db.execute(query,[project_id,drivePath[i]]);
            }

        return res.status(200).json({
            success: true,
            message: `Document in consultancy Project Added Successfully`,   
          });
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `Some Error in Adding document in consultancy Projects ${error}`,
          });
    }
}
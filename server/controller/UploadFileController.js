const fs = require('fs');
const {authorize} = require('../config/googleDrive');
const uploadFile = require('../utils/fileupload');
const path = require('path');



// const upload = multer({ dest: 'uploads/' });


//for fetching the resaerch project information
exports.documentUpload= async (req,res)=>{

    try{
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

                if (fs.existsSync(filePath)) {
                console.log('File exists');
                } else {
                console.log('File does not exist');
                }

              });
            });

            for(let i=0;i<filesArray.length;i++)
            {
                const filePath = `E:/Projects/testing proj/server/controller/uploads/${filesArray[i].name}`;
                const res=await uploadFile(test,filePath,filesArray[i].name);
                console.log("printing the upload response",res);
            }

             
        // console.log(req.files.pdfFiles);

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






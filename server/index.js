const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
app.use(fileUpload());


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)


//for database
const connectDB = require('./config/database');
connectDB();




const userRoutes =require("./routes/User");
const projectsRoute=require("./routes/Projects");
const adminRoutes=require("./routes/Settings");




//routes
app.use("/auth",userRoutes);
app.use("/projects",projectsRoute);
app.use("/admin",adminRoutes);



app.get("/abcd", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})



// const {authorize} = require('./config/googleDrive');
// const uploadFile = require('./utils/fileupload');


// console.log("upload started");
// authorize()
//     .then(authClient => uploadFile(authClient))
//     .then(fileLink => console.log(`File uploaded successfully: ${fileLink}`))
//     .catch(error => console.error("Error uploading file:", error));

// console.log("upload successfull");





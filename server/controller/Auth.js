const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailsender'); // assuming this is your mail sending function
const emailTemplate = require('../emailTemplate/emailVerificationTemplate'); // assuming this is your email template function
const connectDB = require('../config/database');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { checkout } = require('../routes/User');




// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body;
      console.log("printing the email", email);
  
      // Get the database connection
      const db = await connectDB();
  
      // Check if user is already present
      const query1 = 'SELECT * FROM users WHERE u_email = ?';
  
      const [results] = await db.execute(query1, [email]);
      if (results.length > 0) {
        console.log('User is present');
        return res.status(200).json({
          success: false,
          check:true,
          message: `User is Already Registered`,
        });
      }
  
      // Generate OTP
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
  
      console.log("OTP", otp);
  
      // Set the current timestamp (created_at)
      const createdAt = new Date();
  
      const query2 = `INSERT INTO otps (email, otp, created_at) 
                      VALUES (?, ?, ?) 
                      ON DUPLICATE KEY UPDATE otp=?, created_at=?`;
  
      await db.execute(query2, [email, otp, createdAt, otp, createdAt]);
      console.log("otp generated and stored successfully");
  
      // Sending verification email
      try {
        console.log("sending email");
        const mailResponse = await mailSender(
          email,
          "Verification Email",
          emailTemplate(otp)
        );
        return res.status(200).json({
          success: true,
          message: `OTP Sent Successfully`,
          otp,
        });
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
        return res.status(500).json({ success: false, error: 'Email sending failed' });
      }
  
    } catch (error) {
      console.log('Error in sendotp function:', error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  };








  // Signup Controller for Registering USers
exports.signup = async (req, res) => {
    try {
      // Destructure fields from the request body
      const {
        firstName,
        lastName,
        email,
        department,
        contactNo,
        password,
        confirmPassword,
        accountType,
        otp,
      } = req.body
      // Check if All Details are there or not
      if (
        !firstName ||
        !lastName ||
        !email ||
        !department ||
        !contactNo ||
        !password ||
        !confirmPassword ||
        !accountType ||
        !otp
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }

      const db = await connectDB();

      // Check if user is already present
      const query1 = 'SELECT * FROM users WHERE u_email = ?';
  
      const [results1] = await db.execute(query1, [email]);
      if (results1.length > 0) {
        console.log('User is present');
        return res.status(400).json({
          success: false,
          message: `User is Already Registered`,
        });
      }

    //fetching the stored otp from the database
    const query2 = 'SELECT otp, created_at FROM otps WHERE email = ?';
    const [results2] = await db.execute(query2, [email]);

    if (results2.length === 0) {
        return res.status(404).json({ error: 'OTP not found for this email' });
      }

    //verifying the otp
    const { otp: storedOtp, created_at: createdAt } = results2[0];
    const currentTime = new Date();
    const timeDiff = (currentTime - new Date(createdAt)) / 1000 / 60; // Difference in minutes

    if (timeDiff > 5) {
        return res.status(400).json({
            success: false,
            message: "The OTP expired",
          })
    } else if(storedOtp !== otp) {
        return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          })
    }

    //if the otp is valid and not expired then proceed further

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Combine firstName and lastName for u_name
    const u_name = `${firstName} ${lastName}`;    

    // // SQL query to count total users
    const [rows] = await db.execute('SELECT COUNT(*) AS total_users FROM users');
        
    // Extract the total count from the results
    const totalUsers = rows[0].total_users;
    const uId=totalUsers+1;

    // Prepare the SQL query
    const query4 = `
      INSERT INTO users (u_id,u_name, department_id, u_email, u_phone, u_password, ac_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    const [results4] = await db.execute(query4, [
        uId,
        u_name,
        department,       // department_id
        email,            // u_email
        contactNo,        // u_phone
        hashedPassword,   // u_password
        accountType,      // ac_type
      ]);

      //if successful
      return res.status(200).json({
        success: true,
        message: "User registered successfully",
      });

    } catch (error) {
      console.log("signup testing");
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      })
    }
  };








  //function for login user
  exports.login = async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(200).json({
          success: false,
          check:true,
          message: `Please Fill up All the Required Fields`,
        })
      }


      // Create connection to the database
      const db = await connectDB();

      // finding the user in our database
      const [rows] = await db.execute('SELECT * FROM users WHERE u_email = ?', [email]);

    //   console.log(rows);

      // If user not found with provided email
      if (rows.length===0) {
        return res.status(200).json({
          success: false,
          check:true,
          message: `User is not Registered\n Please SignUp`,
        })
      }
      
      //create a user
      let user=rows[0];
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.u_password)) {
        const token = jwt.sign(
          { email: user.u_email, id: user.u_id, role: user.ac_type },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        const tokenExpiresIn=24*60*60*1000+Date.now();
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 24*60*60*1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          tokenExpiresIn,
          message: `User Login Success`,
        })
      } else {
        return res.status(200).json({
          success: false,
          check:true,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        check:false,
        message: `Login Failure Please Try Again`,
      })
    }
  }







  //function to change the password
  exports.changepassword = async (req, res) => {
    try {
      // Get email and password from request body
      const { formData } = req.body;
      // console.log("printing the password",formData);
      if (formData.new_pass !== formData.conf_pass) {
        return res.json({
          success: true,
          check:false,
          message: "Password and Confirm Password Does not Match",
        });
      }

      // console.log("printing the user data",req.user);


      // Create connection to the database
      const db = await connectDB();

      // finding the user in our database
      const [rows] = await db.execute('SELECT * FROM users WHERE u_email = ?', [req.user.email]);

      // console.log(rows);

      //create a user
      let user=rows[0];
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(formData.curr_pass, user.u_password)) {
          
          // Hash the password
          const hashedPassword = await bcrypt.hash(formData.new_pass, 10);

          const query="UPDATE users set u_password = ? WHERE u_id= ? "
          const [response]=await db.execute(query,[hashedPassword,user.u_id]);

          return res.status(200).json({
            message : "password updated successfully",
            success : true,
            check : true,
          });
      }
      else
      {
        return res.status(200).json({
          message :"provided password is wrong",
          success : true,
          check: false,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `operation failes Please Try Again`,
      })
    }
  }


  

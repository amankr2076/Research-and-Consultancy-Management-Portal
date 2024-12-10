
import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector"
import { setToken } from "../../slices/authslice"
import { setUser } from "../../slices/profileSlice"
import { setOption } from "../../slices/nav";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints;

  
export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")

      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)

        if(!response.data.success && response.data.check)
        {
            toast.dismiss(toastId);
            toast.error("User is Already Registered");
            return;
        }
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        toast.success("OTP Sent Successfully");
        navigate("/verify-email");
      } catch (error) {
        console.log("SENDOTP API ERROR............", error);
        toast.error("Could Not Send OTP kuch galti hai");
      }
      toast.dismiss(toastId)
    }
  }







//function for signup
  export function signUp(
        firstName,
        lastName,
        email,
        department,
        contactNo,
        password,
        confirmPassword,
        accountType,
        otp,
        navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
            firstName,
            lastName,
            email,
            department,
            contactNo,
            password,
            confirmPassword,
            accountType,
            otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      toast.dismiss(toastId)
    }
  }






//function for login user
  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response);
  
        if (!response.data.success && response.data.check) {
            toast.dismiss(toastId)
            toast.error(response.data.message);
            return;
        }

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser({ ...response.data.user}))
        console.log(response.data.user);
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("tokenExpiration", response.data.tokenExpiresIn) // Store expiration time
        navigate("/");
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      toast.dismiss(toastId)
    }
  }




  //function for logout
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(setOption(0));
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("tokenExpiration")
      toast.success("Logged Out");
      navigate("/");
    }
  }


//for getting a link over mail to reset the password
  export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
    const toastId = toast.loading("Loading...");
      try{
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})
  
        console.log("RESET PASSWORD TOKEN RESPONSE....", response);
  
        if(!response.data.success && response.data.check) {
            toast.dismiss(toastId)
            toast.error(response.data.message);
            return;
        }
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Reset Email Sent");
        setEmailSent(true);
        toast.dismiss(toastId);
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.dismiss(toastId);
        toast.error("Failed to send email for resetting password");
      }
    }
  }





//function to reset password
export function resetPassword(password, confirmPassword, token,navigate) {
    return async(dispatch) => {
      try{
        const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success && response.data.check) {
          toast.error(response.data.message);
          return;
        }
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
        navigate("/login");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
    }
  }



import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllDepartments } from "../../services/operations/Admin/GetData";

import { sendOtp } from "../../services/operations/authApi"
import { setSignupData } from "../../slices/authslice"

function SignupForm() {

  const {token}=useSelector((state)=> state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

const [deptList, setDeptList]=useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  })

  console.log("printing the form data",formData);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, department, contactNo, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if(firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || department.trim() === "" || contactNo.trim() ==="" ||
        password.trim() === "" || confirmPassword.trim() === "")
    {
      toast.error("Please enter All the details");
      return;
    }

    if(!email.includes("@"))
    {
      toast.error("Not a valid email address");
      return;
    }
    if(!email.endsWith("@iiitg.ac.in"))
    {
      toast.error("Enter iiitg email ID Only");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return
    }
    const accountType="normal_user";
    const signupData = {
        ...formData,
        accountType,
      }
    console.log(signupData);

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      contactNo: "",
      password: "",
      confirmPassword: "",
    })
  }


  useEffect(()=>{
    const getProjectDetails = async () => {
        //getting list of all faculties
        try {
          const res = await getAllDepartments(token);
          console.log("printing the response",res);
          if(res.length!==0)
              {
                setDeptList(res);
              }
        } catch (error) {
          console.log("could not fetch project details.")
        }
      }
      getProjectDetails();
    },[]);

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-6">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-red-500 font-bold">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] px-[18px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-red-500 font-bold">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <div className="flex gap-x-6">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Department <sup className="text-red-500 font-bold">*</sup>
            </p>
            <select
              required
              name="department"
              value={department}
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pl-[20px] pr-[65px] text-richblack-5"
            >
              {(deptList.length === 0) ?
                      (<option>No Department Available</option>) :
                      (
                          <>
                          <option value="">Select Department</option>
                          {deptList.map((dept) => (
                              <option key={dept?.department_id} value={dept?.department_id}>
                              {dept?.department_name}
                              </option>
                          ))}
                          </>
                      )}
            </select>
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Contact-no <sup className="text-red-500 font-bold">*</sup>
            </p>
            <input
              required
              type="text"
              name="contactNo"
              value={contactNo}
              onChange={handleOnChange}
              placeholder="Enter Contact no"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-red-500 font-bold">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-red-500 font-bold">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-red-500 font-bold">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-blue-300 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
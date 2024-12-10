import signupImg from "../assets/login.png"
import Template from "../components/core/Template"

function Signup() {
  return (
    <Template
      title="Create Account"
      description1=""
      description2=""
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup;
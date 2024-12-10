import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import OpenRoute from './components/core/OpenRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/PrivateRoute';
import MyProfile from './components/core/Dashboard/MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import ResearchProject from './components/core/Dashboard/ResearchProject';
import Error from './pages/Error';
import ProjectDescriptionResearch from './components/core/Dashboard/ProjectDescriptionResearch';
import toast from 'react-hot-toast';
import { logout } from './services/operations/authApi';
import { useEffect, useState } from 'react';
import {setIsLoggedIn} from "../src/slices/authslice";
import ExpirationModal from './components/common/ExpirationModal';
import AddDepartment from './components/core/Dashboard/Admin/AddDepartment';
import ManageProjects from './components/core/Dashboard/Admin/ManageProjects';
import ManageFunds from './components/core/Dashboard/Admin/ManageFunds';
import ManageSubHeads from './components/core/Dashboard/Admin/ManageSubHeads';
import ConsultancyProject from './components/core/Dashboard/ConsultancyProject';
import ProjectDescriptionConsultancy from './components/core/Dashboard/ProjectDescriptionConsultancy';
import ManageDocuments from './components/core/Dashboard/Admin/ManageDocuments/ManageDocuments';
import UserSetting from './components/core/Dashboard/UserSetting';
import AdminSetting from './components/core/Dashboard/Admin/AdminSetting';
import MainPage from './components/core/Dashboard/Admin/AdminDashboard/MainPage';
import RProjectsList from './components/core/Dashboard/Admin/AdminDashboard/RProjectsList';
import RProjectDescription from './components/core/Dashboard/Admin/AdminDashboard/RProjectDescription';
import CProjectList from './components/core/Dashboard/Admin/AdminDashboard/CProjectList';
import CProjectDescription from './components/core/Dashboard/Admin/AdminDashboard/CProjectDescription';
import AllUsers from './components/core/Dashboard/Admin/AdminDashboard/AllUsers';
import DepartmentList from './components/core/Dashboard/Admin/AdminDashboard/DepartmentList';
import SAResearch from './components/core/Dashboard/Admin/AdminDashboard/SAResearch';
import SAConsultancy from './components/core/Dashboard/Admin/AdminDashboard/SAConsultancy';
import AllInvoices from './components/core/Dashboard/Admin/AdminDashboard/AllInvoices';
import RProjectFileList from './components/core/Dashboard/Admin/AdminDashboard/RProjectFileList';
import CProjectFileList from './components/core/Dashboard/Admin/AdminDashboard/CProjectFileList';
import UserRoute from './components/core/UserRoute';
import AdminRoute from './components/core/AdminRoute';
import NotAuthorized from './components/core/NotAuthorized';
import DynamicComp from './components/core/Dashboard/Admin/DynamicComp';

function App() {

  const { user } = useSelector((state) => state.profile)
  const {token}=useSelector((state)=>state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth)
  console.log("printing the value of isLoggedIn",isLoggedIn);
  // const [isLoggedIn, setIsLoggedIn]=useState(false);
  console.log("inside App.js");
  // console.log(Date.now());
  // console.log(new Date(Date.now()));
  const dispatch=useDispatch();
  const navigate=useNavigate();



  function checkTokenExpiration(dispatch, navigate) {
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = Date.now();
    
    if (token!==null && currentTime >= expirationTime) {
      // Token is expired, log out
      // setIsLoggedIn(true);
      dispatch(logout(navigate));
      // toast.error("You have been logget out");
    }
    else if(token!==null)
    {
      const timeout = expirationTime - currentTime;
      if (timeout > 0) {
        setTimeout(() => {
          dispatch(setIsLoggedIn(true));
          dispatch(logout(navigate)); // Logout the user when token expires
        }, timeout);
      }
    }
  }

  useEffect(() => {
    checkTokenExpiration(dispatch, navigate);
  }, []);


  return (
    <div className="App relative">
    {isLoggedIn && <ExpirationModal></ExpirationModal>}
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Homepage></Homepage>}></Route>
      {/* <Route path='/val' element={<DynamicComp></DynamicComp>}></Route> */}
      <Route path='/not-auth' element={<NotAuthorized></NotAuthorized>}></Route>
      <Route path='/*' element={<Error />} />

      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

          <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

          <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        {/* -----------------------------------------Routes for Dashboard----------------------------------- */}

    <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="my-profile" element={<MyProfile />} />
        </Route>
    </Route>
    
    {/* ---------------------------------------------for normal user------------------------------------------- */}

          <Route element={<UserRoute></UserRoute>}>
              <Route path='/dashboard' element={<Dashboard></Dashboard>}>
                  <Route path="research-proj" element={<ResearchProject />} />
                  <Route path="cprojects" element={<ConsultancyProject />} />
                  <Route path="research-proj/:projectID" element={<ProjectDescriptionResearch />} />
                  <Route path="cprojects/:projectID" element={<ProjectDescriptionConsultancy />} />
                  <Route path="user-settings" element={<UserSetting />} />
              </Route>
          </Route>




    {/* ---------------------------------------------for admin route------------------------------------------------ */}

        <Route element={<AdminRoute></AdminRoute>}>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}>
            <Route path="admin/add-department" element={<AddDepartment />} />
            <Route path="admin/manage-documents" element={<ManageDocuments />} />
            <Route path="admin/manage-projects" element={<ManageProjects />} />
            <Route path="admin/manage-funds" element={<ManageFunds />} />
            <Route path="admin/manage-subheads" element={<ManageSubHeads></ManageSubHeads>} />
            <Route path="admin/main-page" element={<MainPage></MainPage>} />
            <Route path="admin/main-page/rprojects" element={<RProjectsList></RProjectsList>} />
            <Route path="admin/main-page/cprojects" element={<CProjectList></CProjectList>} />
            <Route path="admin/main-page/rprojects/:projectID/:userID" element={<RProjectDescription></RProjectDescription>} />
            <Route path="admin/main-page/cprojects/:projectID/:userID" element={<CProjectDescription></CProjectDescription>} />
            <Route path="admin/main-page/users" element={<AllUsers></AllUsers>} />
            <Route path="admin/main-page/department" element={<DepartmentList></DepartmentList>} />
            <Route path="admin/main-page/agency-research" element={<SAResearch></SAResearch>} />
            <Route path="admin/main-page/agency-consultancy" element={<SAConsultancy></SAConsultancy>} />
            <Route path="admin/main-page/invoices" element={<AllInvoices></AllInvoices>} />
            <Route path="admin/main-page/r-files" element={<RProjectFileList></RProjectFileList>} />
            <Route path="admin/main-page/c-files" element={<CProjectFileList></CProjectFileList>} />
            <Route path="admin-settings" element={<AdminSetting />} />
          </Route>
        </Route>

        
            
          

    </Routes>
    </div>
  );
}

export default App;

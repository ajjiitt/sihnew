import Navbar from "./Components/Navbar";
import AllCenterData from "./SubComponents/AllCenterData";
import IpfsUpload from "./SubComponents/IpfsUpload";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ViewDisasterAdmin from "./pages/ViewDisasterAdmin";
import DemandForm from "./pages/DemandForm";
import RegisterForm from "./pages/RegisterForm";
import ViewState from "./pages/ViewState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Volunteer from "./pages/Volunteer";
import FileSharing from "./Components/FileSharing";
import ViewGround from "./pages/ViewGround";
import ViewDisasterState from "./pages/ViewDisasterState";
import ViewDisasterGround from "./pages/ViewDisasterGround";
import Contactus from "./pages/Contactus";
import AboutUs from "./pages/AboutUs";
import RecentDisasterAdmin from "./pages/AdminFrontend/RecentDisasterAdmin";
import DisasterAlertAdmin from "./pages/AdminFrontend/DisasterAlertAdmin";
function App() {
  // const notify = () => toast.info("Hello World !");
  return (
    <div
      className="App overflow-scroll flex flex-col justify-between h-screen bg-gray-50"
      style={{ fontFamily: "Inter" }}
    >
      <div >

      <Navbar />
      <ToastContainer
        theme="dark"
        toastStyle={{
          backgroundColor: "#22262F",
          color: "white",
          border: "1px solid white",
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/state" element={<ViewState />} />
        <Route path="/ground" element={<ViewGround />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/disaster-admin" element={<ViewDisasterAdmin />} />
        <Route path="/disaster-state" element={<ViewDisasterState />} />
        <Route path="/disaster-ground" element={<ViewDisasterGround />} />
        <Route path="/file-share" element={<FileSharing />} />
        <Route path="/contactus" element={<Contactus/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/admin/recentdisasteradmin" element={<RecentDisasterAdmin/>} />
        <Route path="/admin/disasteralertadmin" element={<DisasterAlertAdmin/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

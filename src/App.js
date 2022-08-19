import Navbar from "./Components/Navbar";
import AllCenterData from "./SubComponents/AllCenterData";
import IpfsUpload from "./SubComponents/IpfsUpload";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ViewDisaster from "./pages/ViewDisaster";
import DemandForm from "./pages/DemandForm";
import SupplyForm from "./pages/SupplyForm";
import RegisterForm from "./pages/RegisterForm";
import ViewState from "./pages/ViewState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Volunteer from "./pages/Volunteer";
import FileSharing from "./Components/FileSharing";
function App() {
  // const notify = () => toast.info("Hello World !");
  return (
    <div
      className="App flex flex-col justify-between h-screen"
      style={{ fontFamily: "Inter" }}
    >
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
        <Route path="/ipfs" element={<IpfsUpload />} />
        <Route path="/allcenterdata" element={<AllCenterData />} />
        <Route path="/disaster" element={<ViewDisaster />} />
        <Route path="/demand" element={<DemandForm />} />
        <Route path="/supply" element={<SupplyForm />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/state" element={<ViewState />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/file-share" element={<FileSharing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

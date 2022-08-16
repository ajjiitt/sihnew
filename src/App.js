import Navbar from "./Components/Navbar";
import AllCenterData from "./SubComponents/AllCenterData";
import IpfsUpload from "./SubComponents/IpfsUpload";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App" style={{ fontFamily: "Inter" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ipfs" element={<IpfsUpload />} />
        <Route path="/allcenterdata" element={<AllCenterData />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

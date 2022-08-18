import Navbar from "./Components/Navbar";
import AllCenterData from "./SubComponents/AllCenterData";
import IpfsUpload from "./SubComponents/IpfsUpload";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import NotFound from "./pages/NotFound";
import ViewDisaster from "./pages/ViewDisaster";
function App() {
  return (
    <div className="App" style={{ fontFamily: "Inter" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ipfs" element={<IpfsUpload />} />
        <Route path="/allcenterdata" element={<AllCenterData />} />
        <Route path="/disaster" element={<ViewDisaster />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

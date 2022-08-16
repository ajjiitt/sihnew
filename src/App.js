import Navbar from "./Components/Navbar";
import AllCenterData from "./SubComponents/AllCenterData";
import IpfsUpload from "./SubComponents/IpfsUpload";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/ipfs" element={<IpfsUpload />} />
        <Route path="/allcenterdata" element={<AllCenterData />} />
      </Routes>
    </div>
  );
}

export default App;

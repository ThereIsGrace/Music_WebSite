import { Route, Routes } from "react-router-dom";
import Popular from "./components/API/Popular";
import Recent from "./components/API/Recent";
import Welcome from "./components/Welcom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </div>
  );
}

export default App;

import MapPage from "./pages/MapPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        {/*<Route path="/country/:id" element={<CountryPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;

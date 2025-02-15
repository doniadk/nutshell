import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import MapPage from "./pages/MapPage";
import CountryPage from "./pages/CountryPage"; // <-- Import our new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />

        <Route path="/country/:id" element={<CountryPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

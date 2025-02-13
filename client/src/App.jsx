import MapPage from "./pages/MapPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPAge";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/*<Route path="/country/:id" element={<CountryPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;

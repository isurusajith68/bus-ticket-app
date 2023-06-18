import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketGenerationPage from "./pages/TicketGenerationPage";
import QRCodeScannerPage from "./pages/QRCodeScannerPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TicketGenerationPage />} />
          <Route path="/scan" element={<QRCodeScannerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

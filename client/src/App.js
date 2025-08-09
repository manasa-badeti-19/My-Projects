import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import OnboardEmployee from "./pages/OnboardEmployee";
import ViewEmployees from "./pages/ViewEmployees";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<OnboardEmployee />} />
          <Route path="/employees" element={<ViewEmployees />} />
          <Route path="/employee/:id" element={<OnboardEmployee />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

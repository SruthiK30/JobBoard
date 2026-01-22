import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import RoleSelect from "./pages/RoleSelect";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

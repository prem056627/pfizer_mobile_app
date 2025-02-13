import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PatientDetailForm from "../pages/patient-detail-form";
import Thankspage from "../components/Thankspage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/enrolment" element={<Home />}>
        <Route path="" element={<PatientDetailForm />} />
        <Route path="submission" element={<Thankspage />} />
      </Route>
      <Route path="/" element={<Navigate to="/enrolment" />} />
    </Routes>
  );
};

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./Ui/AppLayout";
import Landing from "./Pages/Landing";
import DentistRegister from "./Pages/DentistRegister/DentistRegister";
import DentistDashboardLayout from "./Features/DentistDashboard/DentistDashboardLayout";
import ManageAppointments from "./Pages/Dentist/ManageAppointments/ManageAppointments";
import DentistInfo from "./Pages/Dentist/DentistInfo/DentistInfo";
import PatientDashboardLayout from "./Features/PatientDashboard/PatientDashboardLayout";
import PatientInfo from "./Pages/Patient/PatientInfo/PatientInfo";
import MyAppointments from "./Pages/Patient/MyAppointments/MyAppointments";
import ManageArticles from "./Pages/Dentist/ManageArticles/ManageArticles";
import ProfileDentist from "./ProfileDentist/ProfileDentist";
import Articles from "./Pages/Articles/Articles";
import Dentists from "./Pages/Dentists/Dentists";
import Article from "./Pages/Article";
import PatientLoginAndRegister from "./Pages/PatientLoginAndRegister/PatientLoginAndRegister";
import Spinner from "./Ui/Spinner";
import useUserRole from "./Pages/PatientLoginAndRegister/useUserRole";

function App() {
  const { isLoadingRole } = useUserRole();

  if (isLoadingRole) return <Spinner />;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "font-Vazirmatn-Medium",
          success: { duration: 4000 },
          error: { duration: 6000 },
        }}
      />
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="landing" />} />
            <Route path="landing" element={<Landing />} />
            <Route path="dentist-register" element={<DentistRegister />} />

            <Route
              path="dentist-dashboard"
              element={<DentistDashboardLayout />}
            >
              <Route
                index
                element={<Navigate replace to="dentist-manage-appointments" />}
              />
              <Route
                path="dentist-manage-appointments"
                element={<ManageAppointments />}
              />
              <Route path="dentist-info" element={<DentistInfo />} />
              <Route
                path="dentist-manage-articles"
                element={<ManageArticles />}
              />
            </Route>

            <Route
              path="patient-dashboard"
              element={<PatientDashboardLayout />}
            >
              <Route
                index
                element={<Navigate replace to="my-appointments" />}
              />
              <Route path="my-appointments" element={<MyAppointments />} />
              <Route path="patient-info" element={<PatientInfo />} />
            </Route>

            <Route path="profile-dentist" element={<ProfileDentist />} />
            <Route path="articles" element={<Articles />} />
            <Route path="article" element={<Article />} />
            <Route path="dentists" element={<Dentists />} />
          </Route>
          <Route
            path="patient-login-and-register"
            element={<PatientLoginAndRegister />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

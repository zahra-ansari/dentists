import { Outlet } from "react-router-dom";
import PatientDashboardSidebar from "./PatientDashboardSidebar";
import useUserInfo from "../../Pages/PatientLoginAndRegister/useUserInfo";
import Spinner from "../../Ui/Spinner";
import useGetPatientAppointments from "../../Pages/Patient/MyAppointments/useGetPatientAppointments";

function PatientDashboardLayout() {
  const role = localStorage.getItem("role");

  const { isLoadingPatientAppointments } = useGetPatientAppointments();
  const { isLoading } = useUserInfo(role);

  if (isLoadingPatientAppointments) return <Spinner />;
  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center mt-6 gap-x-3 lg:mx-4">
      <PatientDashboardSidebar />
      <Outlet />
    </div>
  );
}

export default PatientDashboardLayout;

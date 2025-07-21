import { Outlet } from "react-router-dom";
import DentistDashboardSidebar from "./DentistDashboardSidebar";
import useSetAppointments from "../../Pages/Dentist/ManageAppointments/useSetAppointments";
import useGetDoctorAppointments from "../../Pages/Dentist/ManageAppointments/useGetDoctorAppointments";
import Spinner from "../../Ui/Spinner";
import useGetCategoryArticle from "../../Pages/Dentist/ManageArticles/useGetCategoryArticle";
import useCreateArticle from "../../Pages/Dentist/ManageArticles/useCreateArticle";
import useUserInfo from "../../Pages/PatientLoginAndRegister/useUserInfo";
import useSendDentistInfo from "../../Pages/Dentist/DentistInfo/useSendDentistInfo";
import useEditDentistAppointment from "../../Pages/Dentist/ManageAppointments/useEditDentistAppointment";
import useDeleteAppointment from "../../Pages/Dentist/ManageAppointments/useDeleteAppointment";

function DentistDashboardLayout() {
  const role = localStorage.getItem("role");

  const { isLoadingSetAppointments } = useSetAppointments();
  const { isLoadingDoctorAppointments } = useGetDoctorAppointments();
  const { isLoadingCategoryArticle } = useGetCategoryArticle();
  const { isLoadingCreateArticle } = useCreateArticle();
  const { isLoadingSendDentistInfo } = useSendDentistInfo();
  const { isLoadingEditDentistAppointment } = useEditDentistAppointment();
  const { isLoadingDeleteDentistAppointment } = useDeleteAppointment();
  const { isLoading } = useUserInfo(role);

  if (isLoadingSetAppointments) return <Spinner />;
  if (isLoadingDeleteDentistAppointment) return <Spinner />;
  if (isLoadingDoctorAppointments) return <Spinner />;
  if (isLoadingCategoryArticle) return <Spinner />;
  if (isLoadingCreateArticle) return <Spinner />;
  if (isLoadingSendDentistInfo) return <Spinner />;
  if (isLoadingEditDentistAppointment) return <Spinner />;
  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center mt-6 gap-x-3 lg:mx-4">
      <DentistDashboardSidebar />
      <Outlet />
    </div>
  );
}

export default DentistDashboardLayout;

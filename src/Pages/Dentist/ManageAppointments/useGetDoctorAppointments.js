import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointmentsApi } from "../../../services/ApiDentists";

function useGetDoctorAppointments() {
  const { isLoading: isLoadingDoctorAppointments, data: doctorAppointments } =
    useQuery({
      queryKey: ["doctorAppointments"],
      queryFn: getDoctorAppointmentsApi,
    });

  return { isLoadingDoctorAppointments, doctorAppointments };
}

export default useGetDoctorAppointments;

import { useQuery } from "@tanstack/react-query";
import { getPatientAppointmentsApi } from "../../../services/ApiPatients";

function useGetPatientAppointments() {
  const { isLoading: isLoadingPatientAppointments, data: patientAppointments } =
    useQuery({
      queryKey: ["patientAppointments"],
      queryFn: getPatientAppointmentsApi,
    });

  return { isLoadingPatientAppointments, patientAppointments };
}

export default useGetPatientAppointments;

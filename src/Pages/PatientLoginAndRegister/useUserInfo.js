import { useQuery } from "@tanstack/react-query";
import { getDentistInfo, getPatientInfo } from "../../services/ApiAuth";

function useUserInfo(role) {
  const isPatient = role === "patient";
  const isDentist = role === "doctor";

  const { data: patientInfo, isLoading: isLoadingPatientInfo } = useQuery({
    queryKey: ["patientInfo"],
    queryFn: getPatientInfo,
    enabled: isPatient,
  });

  const { data: dentistInfo, isLoading: isLoadingDentistInfo } = useQuery({
    queryKey: ["dentistInfo"],
    queryFn: getDentistInfo,
    enabled: isDentist,
  });

  return {
    userInfo: isPatient ? patientInfo : dentistInfo,
    isLoading: isPatient ? isLoadingPatientInfo : isLoadingDentistInfo,
  };
}

export default useUserInfo;

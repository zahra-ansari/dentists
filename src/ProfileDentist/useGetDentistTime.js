import { useQuery } from "@tanstack/react-query";
import { getDentistTimeApi } from "../services/ApiDentists";

function useGetDentistTime(dentistId) {
  const { isLoading: isLoadingGetDentistTime, data: getDentistTime } = useQuery(
    {
      queryKey: ["dentistTime", dentistId], // کلید منحصر به فرد برای هر دکتر
      queryFn: () => getDentistTimeApi(dentistId),
      enabled: !!dentistId,
    }
  );

  return { isLoadingGetDentistTime, getDentistTime };
}

export default useGetDentistTime;

import { useQuery } from "@tanstack/react-query";
import { getDentistsList } from "../../services/ApiDentists";

function useDentists(search) {
  const { isLoading: isLoadingDentists, data: dentistsList } = useQuery({
    queryKey: ["dentistsList", search],
    queryFn: () => getDentistsList(search),
  });

  return { isLoadingDentists, dentistsList };
}

export default useDentists;

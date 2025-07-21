import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../../services/ApiAuth";

function useUserRole() {
  const { isLoading: isLoadingRole, data: role } = useQuery({
    queryKey: ["userRole"],
    queryFn: getUserRole,
  });

  return { isLoadingRole, role };
}

export default useUserRole;

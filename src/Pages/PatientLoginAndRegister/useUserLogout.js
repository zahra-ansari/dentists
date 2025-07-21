import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/ApiAuth";
import toast from "react-hot-toast";

function useUserLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: userLogout,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRole"] });
      navigate("/landing");
      toast.success("با موفقیت خارج شدید");
    },
  });

  return { logout };
}

export default useUserLogout;

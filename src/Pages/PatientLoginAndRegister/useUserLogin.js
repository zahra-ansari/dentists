import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userLogin } from "../../services/ApiAuth";
import { useNavigate } from "react-router-dom";

function useUserLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLoadingLogin, mutate: login } = useMutation({
    mutationFn: ({ phone_number, password }) =>
      userLogin({ phone_number, password }),

    onSuccess: async (data) => {
      const responseRoleAndId = await fetch(
        "https://reservationdentist.pythonanywhere.com/auth/me/role-id/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access}`,
          },
        }
      );

      const roleAndId = await responseRoleAndId.json();
      localStorage.setItem("role", roleAndId.role);

      if (roleAndId.role === "doctor") {
        queryClient.invalidateQueries({
          queryKey: ["dentistInfo"],
        });
        toast.success("با موفقیت وارد شدید");
        navigate("/dentist-dashboard");
      } else if (roleAndId.role === "patient") {
        queryClient.invalidateQueries({
          queryKey: ["patientInfo"],
        });
        toast.success("با موفقیت وارد شدید");
        navigate("/patient-dashboard");
      }
    },
  });

  return { isLoadingLogin, login };
}

export default useUserLogin;

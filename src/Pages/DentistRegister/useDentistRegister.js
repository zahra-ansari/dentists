import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dentistRegisterApi } from "../../services/ApiAuth";

function useDentistRegister() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingDentistRegister, mutate: dentistRegister } =
    useMutation({
      mutationFn: ({
        full_name,
        email,
        phone_number,
        password,
        Medical_system_code,
        specialty,
        captcha_response,
        experience_years,
      }) =>
        dentistRegisterApi({
          full_name,
          email,
          phone_number,
          password,
          Medical_system_code,
          specialty,
          captcha_response,
          experience_years,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["dentistInfo"] });
        toast.success("ثبت نام با موفقیت انجام شد");
      },
    });

  return { isLoadingDentistRegister, dentistRegister };
}

export default useDentistRegister;

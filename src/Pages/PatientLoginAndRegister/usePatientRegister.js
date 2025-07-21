import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { patientRegisterApi } from "../../services/ApiAuth";

function usePatientRegister({ onSuccess: externalSuccess } = {}) {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingPatientRegister, mutate: patientRegister } =
    useMutation({
      mutationFn: ({ full_name, email, phone_number, password }) =>
        patientRegisterApi({ full_name, email, phone_number, password }),

      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["patientInfo"] });
        toast.success("کد تایید برای شما ارسال شد");

        if (externalSuccess) {
          externalSuccess(data); // ارسال داده به بیرون
        }
      },
    });

  return { isLoadingPatientRegister, patientRegister };
}

export default usePatientRegister;

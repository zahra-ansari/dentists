import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyCodeApi } from "../../services/ApiAuth";

function useVerifyCode() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingVerifyCode, mutate: verifyCode } = useMutation({
    mutationFn: ({ otpCode, phoneNumber }) =>
      verifyCodeApi({ otpCode, phoneNumber }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientInfo"] });
      toast.success("ثبت نام کاملا با موفقیت انجام شد");
    },
  });

  return { isLoadingVerifyCode, verifyCode };
}

export default useVerifyCode;

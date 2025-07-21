import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendDentistInfoApi } from "../../../services/ApiDentists";

function useSendDentistInfo() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingSendDentistInfo, mutate: sendDentistInfo } =
    useMutation({
      mutationFn: (formData) => sendDentistInfoApi(formData),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["dentistInfo"] });
        toast.success("اطلاعات پزشک با موفقیت ارسال گردید");
      },
    });

  return { isLoadingSendDentistInfo, sendDentistInfo };
}

export default useSendDentistInfo;

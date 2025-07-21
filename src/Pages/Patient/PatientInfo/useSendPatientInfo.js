import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendPatientInfoApi } from "../../../services/ApiPatients";

function useSendPatientInfo() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingSendPatientInfo, mutate: sendPatientInfo } =
    useMutation({
      mutationFn: (formData) => sendPatientInfoApi(formData),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["patientInfo"] });
        toast.success("اطلاعات بیمار با موفقیت ارسال گردید");
      },
    });

  return { isLoadingSendPatientInfo, sendPatientInfo };
}

export default useSendPatientInfo;

import { useMutation } from "@tanstack/react-query";
import { submitPatientAppointmentApi } from "../services/ApiPatients";
import toast from "react-hot-toast";

function useSubmitPatientAppointment() {
  const {
    isLoading: isLoadingSubmitPatientAppointment,
    mutate: submitPatientAppointment,
  } = useMutation({
    mutationFn: ({ dentistId, selectedStartTime, selectedDate }) =>
      submitPatientAppointmentApi({
        dentistId,
        selectedStartTime,
        selectedDate,
      }),

    onSuccess: () => {
      toast.success("نوبت با موفقیت ثبت شد");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoadingSubmitPatientAppointment, submitPatientAppointment };
}

export default useSubmitPatientAppointment;

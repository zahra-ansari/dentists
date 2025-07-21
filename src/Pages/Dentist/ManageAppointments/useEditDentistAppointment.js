import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editDentistAppointmentApi } from "../../../services/ApiDentists";

function useEditDentistAppointment() {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingEditDentistAppointment,
    mutate: editDentistAppointment,
  } = useMutation({
    mutationFn: ({
      editMiladiDate,
      formattedEditStartTime,
      formattedEditEndTime,
      getId,
    }) =>
      editDentistAppointmentApi({
        editMiladiDate,
        formattedEditStartTime,
        formattedEditEndTime,
        getId,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
      toast.success("نوبت انتخابی با موفقیت ویرایش شد");
    },
  });

  return { isLoadingEditDentistAppointment, editDentistAppointment };
}

export default useEditDentistAppointment;

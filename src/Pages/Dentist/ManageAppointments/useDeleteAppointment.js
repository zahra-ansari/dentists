import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteDentistAppointmentApi } from "../../../services/ApiDentists";

function useDeleteAppointment() {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingDeleteDentistAppointment,
    mutate: deleteDentistAppointment,
  } = useMutation({
    mutationFn: (id) => deleteDentistAppointmentApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
      toast.success("نوبت انتخابی با موفقیت حذف شد");
    },
  });

  return {
    isLoadingDeleteDentistAppointment,
    deleteDentistAppointment,
  };
}

export default useDeleteAppointment;

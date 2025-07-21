import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setAppointmentsApi } from "../../../services/ApiDentists";

function useSetAppointments() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingSetAppointments, mutate: setAppointments } =
    useMutation({
      mutationFn: ({ miladiDate, formattedStartTime, formattedEndTime }) =>
        setAppointmentsApi({
          miladiDate,
          formattedStartTime,
          formattedEndTime,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
        toast.success("نوبت انتخابی با موفقیت ثبت شد");
      },
    });

  return { isLoadingSetAppointments, setAppointments };
}

export default useSetAppointments;

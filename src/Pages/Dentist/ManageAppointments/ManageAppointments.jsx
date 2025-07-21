import DatePicker from "react-multi-date-picker";
import { useState } from "react";
import DateObject from "react-date-object";
import DentistDashboardHeader from "../../../Features/DentistDashboard/DentistDashboardHeader";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useSetAppointments from "./useSetAppointments";
import useGetDoctorAppointments from "./useGetDoctorAppointments";
import useEditDentistAppointment from "./useEditDentistAppointment";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import useDeleteAppointment from "./useDeleteAppointment";

function ManageAppointments() {
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [showEditAppointmentModal, setShowEditAppointmentModal] =
    useState(false);
  const [getId, setGetId] = useState();

  const [editDate, setEditDate] = useState();
  const [editStartTime, setEditStartTime] = useState();
  const [editEndTime, setEditEndTime] = useState();

  const { setAppointments } = useSetAppointments();
  const { doctorAppointments } = useGetDoctorAppointments();
  const { editDentistAppointment } = useEditDentistAppointment();
  const { deleteDentistAppointment } = useDeleteAppointment();

  const handleSubmit = () => {
    const selectedDate = date.toDate();
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const miladiDate = `${year}-${month}-${day}`;

    const formattedStartTime = startTime.format("HH:mm");
    const formattedEndTime = endTime.format("HH:mm");

    setAppointments({ miladiDate, formattedStartTime, formattedEndTime });
  };

  const handleEdit = () => {
    const selectedDate = editDate.toDate();
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const editMiladiDate = `${year}-${month}-${day}`;

    const formattedEditStartTime = editStartTime.format("HH:mm");
    const formattedEditEndTime = editEndTime.format("HH:mm");

    editDentistAppointment({
      editMiladiDate,
      formattedEditStartTime,
      formattedEditEndTime,
      getId,
    });

    setShowEditAppointmentModal(false);
  };

  const showEditModal = (id) => {
    setShowEditAppointmentModal(true);

    setGetId(id);

    const findeAppointment = doctorAppointments.find((item) => item.id === id);

    const date = new DateObject({
      date: new Date(findeAppointment.date),
      calendar: gregorian,
      locale: gregorian_en,
    })
      .convert(persian)
      .setCalendar(persian)
      .setLocale(persian_fa)
      .format("YYYY/MM/DD");

    setEditDate(date);

    const startTime = new DateObject({
      date: new Date(`${findeAppointment.date}T${findeAppointment.start_time}`),
      calendar: gregorian,
      locale: gregorian_en,
    })
      .convert(persian)
      .setCalendar(persian)
      .setLocale(persian_fa);

    setEditStartTime(startTime);

    const endTime = new DateObject({
      date: new Date(`${findeAppointment.date}T${findeAppointment.end_time}`),
      calendar: gregorian,
      locale: gregorian_en,
    })
      .convert(persian)
      .setCalendar(persian)
      .setLocale(persian_fa);

    setEditEndTime(endTime);
  };

  const deleteAppointment = (id) => {
    deleteDentistAppointment(id);
  };

  const handleCloseMenuBar = () => {
    setShowEditAppointmentModal(false);
  };

  return (
    <div className="flex flex-col basis-4xl lg:basis-2/3">
      {showEditAppointmentModal && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 "
          onClick={handleCloseMenuBar}
        ></div>
      )}
      <DentistDashboardHeader />

      <div className="mt-10 mx-4">
        <div className="mb-3">
          <label className="font-Vazirmatn-Medium">انتخاب تاریخ:</label>
          <DatePicker
            className="font-Vazirmatn-Medium"
            value={date}
            onChange={setDate}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            calendarPosition="bottom-right"
          />
        </div>

        <div className="mb-3">
          <label className="font-Vazirmatn-Medium">ساعت شروع:</label>
          <DatePicker
            className="font-Vazirmatn-Medium"
            value={startTime}
            onChange={setStartTime}
            format="HH:mm"
            plugins={[<TimePicker />]}
            editable={false}
            disableDayPicker
          />
        </div>

        <div className="mb-3">
          <label className="font-Vazirmatn-Medium">ساعت پایان:</label>
          <DatePicker
            className="font-Vazirmatn-Medium"
            value={endTime}
            onChange={setEndTime}
            format="HH:mm"
            plugins={[<TimePicker />]}
            editable={false}
            disableDayPicker
          />
        </div>

        <button
          className="bg-blue-400 text-white font-Vazirmatn-Medium py-2 px-3 rounded-2xl"
          onClick={handleSubmit}
        >
          ذخیره نوبت
        </button>
      </div>

      <div className="mt-10">
        <table className="w-full table-auto text-center border border-gray-300">
          <thead className="bg-gray-200 font-Vazirmatn-Medium">
            <tr>
              <th className="text-xs xs:text-base">ردیف</th>
              <th className="text-xs xs:text-base">روز</th>
              <th className="text-xs xs:text-base">تاریخ</th>
              <th className="text-xs xs:text-base">ساعت شروع</th>
              <th className="text-xs xs:text-base">ساعت پایان</th>
              <th className="text-xs xs:text-base">ویرایش</th>
              <th className="text-xs xs:text-base">حذف</th>
            </tr>
          </thead>
          <tbody className="font-Vazirmatn-Light">
            {doctorAppointments.map((appointment, index) => (
              <tr key={index} className="border">
                <td className="text-xs xs:text-base h-10 border w-2">
                  {index + 1}
                </td>
                <td className="text-xs xs:text-base border">
                  {new DateObject({
                    date: new Date(appointment.date),
                    calendar: persian,
                    locale: persian_fa,
                  }).format("dddd")}
                </td>
                <td className="text-xs xs:text-base border">
                  {new DateObject({
                    date: new Date(appointment.date),
                    calendar: persian,
                    locale: persian_fa,
                  }).format("YYYY/MM/DD")}
                </td>
                <td className="text-xs xs:text-base border">
                  {/* T در قالب  ISO */}
                  {new DateObject({
                    date: new Date(
                      `${appointment.date}T${appointment.start_time}`
                    ),
                    format: "YYYY-MM-DDTHH:mm:ss",
                    locale: persian_fa,
                    calendar: persian,
                  }).format("HH:mm")}
                </td>
                <td className="text-xs xs:text-base border">
                  {/* T در قالب  ISO */}
                  {new DateObject({
                    date: new Date(
                      `${appointment.date}T${appointment.end_time}`
                    ),
                    format: "YYYY-MM-DDTHH:mm:ss",
                    locale: persian_fa,
                    calendar: persian,
                  }).format("HH:mm")}
                </td>
                <td className="border">
                  <svg
                    className="w-4 xs:w-6 h-4 xs:h-6 justify-self-center"
                    onClick={() => showEditModal(appointment.id)}
                  >
                    <use href="#pencil-square"></use>
                  </svg>
                </td>
                <td className="border">
                  <svg
                    className="w-4 xs:w-6 h-4 xs:h-6 justify-self-center"
                    onClick={() => deleteAppointment(appointment.id)}
                  >
                    <use href="#x-circle"></use>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditAppointmentModal && (
        <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-500 p-5 rounded-2xl mt-10 z-50">
          <div className="mb-3">
            <label className="font-Vazirmatn-Medium">انتخاب تاریخ:</label>
            <DatePicker
              className="font-Vazirmatn-Medium"
              value={editDate}
              onChange={setEditDate}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              calendarPosition="bottom-right"
            />
          </div>

          <div className="mb-3">
            <label className="font-Vazirmatn-Medium">ساعت شروع:</label>
            <DatePicker
              className="font-Vazirmatn-Medium"
              value={editStartTime}
              onChange={setEditStartTime}
              format="HH:mm"
              plugins={[<TimePicker />]}
              editable={false}
              disableDayPicker
            />
          </div>

          <div className="mb-3">
            <label className="font-Vazirmatn-Medium">ساعت پایان:</label>
            <DatePicker
              className="font-Vazirmatn-Medium"
              value={editEndTime}
              onChange={setEditEndTime}
              format="HH:mm"
              plugins={[<TimePicker />]}
              editable={false}
              disableDayPicker
            />
          </div>

          <button
            className="bg-blue-400 text-white font-Vazirmatn-Medium py-2 px-3 rounded-2xl"
            onClick={handleEdit}
          >
            ویرایش نوبت
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageAppointments;

import { useState } from "react";
import PatientDashboardHeader from "../../../Features/PatientDashboard/PatientDashboardHeader";
import useGetPatientAppointments from "./useGetPatientAppointments";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { NavLink } from "react-router-dom";

function MyAppointments() {
  const [pendingAppointment, setPendingAppointment] = useState(true);
  const [completedAppointment, setCompletedAppointment] = useState(false);
  const [cancledAppointment, setCancledAppointment] = useState(false);

  const { patientAppointments } = useGetPatientAppointments();

  const handleOpenPendingAppointment = () => {
    setPendingAppointment(true);
    setCompletedAppointment(false);
    setCancledAppointment(false);
  };

  const handleOpenCompletedAppointment = () => {
    setCompletedAppointment(true);
    setPendingAppointment(false);
    setCancledAppointment(false);
  };

  const handleOpenCancledAppointment = () => {
    setCancledAppointment(true);
    setCompletedAppointment(false);
    setPendingAppointment(false);
  };

  return (
    <div className="flex flex-col basis-4xl lg:basis-2/3">
      <PatientDashboardHeader />
      <div className="mt-10 xs:mx-4">
        <div className="flex flex-col md:flex-row justify-between border-b border-gray-300 pb-5">
          <div onClick={handleOpenPendingAppointment} className="mb-6 md:mb-0">
            <svg className="w-20 h-20 text-blue-300 md:justify-self-center">
              <use href="#clock"></use>
            </svg>
            <span className="font-Vazirmatn-ExtraBold text-gray-400">
              نوبت های در حال انتظار...
            </span>
          </div>
          <div
            onClick={handleOpenCompletedAppointment}
            className="mb-6 md:mb-0"
          >
            <svg className="w-20 h-20 text-blue-300 md:justify-self-center">
              <use href="#check-circle"></use>
            </svg>
            <span className="font-Vazirmatn-ExtraBold text-gray-400">
              نوبت های انجام شده...
            </span>
          </div>
          <div onClick={handleOpenCancledAppointment} className="mb-6 md:mb-0">
            <svg className="w-20 h-20 text-blue-300 md:justify-self-center">
              <use href="#x-circle"></use>
            </svg>
            <span className="font-Vazirmatn-ExtraBold text-gray-400">
              نوبت های لغو شده...
            </span>
          </div>
        </div>
        <div className="mt-7">
          {pendingAppointment &&
            patientAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row mt-10 border-dashed border-t border-gray-400"
              >
                <div className="basis-2/3 border-dashed border-gray-400 border-b md:border-l md:border-b-0 pl-4">
                  <div className="flex justify-between mb-3">
                    <p className="font-Vazirmatn-ExtraLight">بیمار:</p>
                    <p className="font-Vazirmatn-ExtraLight">{item.patient}</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="font-Vazirmatn-ExtraLight">دکتر:</p>
                    <p className="font-Vazirmatn-ExtraLight">{item.doctor}</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="font-Vazirmatn-ExtraLight">تاریخ:</p>
                    <p className="font-Vazirmatn-ExtraLight">
                      {new DateObject({
                        date: item.date,
                        calendar: gregorian,
                        locale: gregorian_en,
                      })
                        .convert(persian)
                        .setCalendar(persian)
                        .setLocale(persian_fa)
                        .format("YYYY/MM/DD dddd")}
                    </p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="font-Vazirmatn-ExtraLight">ساعت:</p>
                    <p className="font-Vazirmatn-ExtraLight">
                      {new DateObject({
                        date: new Date(`${item.date}T${item.time}`),
                        format: "YYYY-MM-DDTHH:mm:ss",
                        locale: persian_fa,
                        calendar: persian,
                      }).format("HH:mm")}
                    </p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="font-Vazirmatn-ExtraLight">کد رهگیری:</p>
                    <p className="font-Vazirmatn-ExtraLight">86268</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="font-Vazirmatn-ExtraLight">وضعیت:</p>
                    <p className="font-Vazirmatn-ExtraLight">در حال انتظار</p>
                  </div>
                </div>
                <div className="text-center md:pr-16">
                  <p className="font-Vazirmatn-Light md:text-center mb-3">
                    زمان باقی مانده
                  </p>
                  <p>
                    <span className="block font-Vazirmatn-Light md:text-center mb-3">
                      {item.days_until_appointment}
                    </span>
                  </p>
                  <button className="font-Vazirmatn-Light text-white rounded-lg bg-blue-500 px-10 py-2">
                    لغو نوبت
                  </button>
                </div>
              </div>
            ))}
          {completedAppointment &&
            patientAppointments.map(
              (item, index) =>
                item.days_until_appointment === "نوبت شما گذشته است" && (
                  <div key={index} className="flex flex-col md:flex-row">
                    <div className="basis-2/3 border-dashed border-gray-400 border-b md:border-l md:border-b-0 pl-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-Vazirmatn-ExtraLight">تاریخ:</p>
                        <p className="font-Vazirmatn-ExtraLight">
                          {new DateObject({
                            date: item.date,
                            calendar: gregorian,
                            locale: gregorian_en,
                          })
                            .convert(persian)
                            .setCalendar(persian)
                            .setLocale(persian_fa)
                            .format("YYYY/MM/DD dddd")}
                        </p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p className="font-Vazirmatn-ExtraLight">ساعت:</p>
                        <p className="font-Vazirmatn-ExtraLight">
                          {new DateObject({
                            date: new Date(`${item.date}T${item.time}`),
                            format: "YYYY-MM-DDTHH:mm:ss",
                            locale: persian_fa,
                            calendar: persian,
                          }).format("HH:mm")}
                        </p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p className="font-Vazirmatn-ExtraLight">وضعیت:</p>
                        <p className="font-Vazirmatn-ExtraLight">انجام شده</p>
                      </div>
                    </div>
                    <div className="text-center md:pr-16">
                      <p className="font-Vazirmatn-Light md:text-center mb-3">
                        دندانپزشک:
                      </p>
                      <p className="font-Vazirmatn-Light mb-3">{item.doctor}</p>
                      <NavLink className="font-Vazirmatn-Light text-white rounded-lg bg-blue-500 px-10 py-2">
                        اطلاعات تماس و آدرس
                      </NavLink>
                    </div>
                  </div>
                )
            )}
          {cancledAppointment && (
            <div className="flex flex-col md:flex-row">
              <div className="basis-2/3 border-dashed border-gray-400 border-b md:border-l md:border-b-0 pl-4">
                <div className="flex justify-between mb-3">
                  <p className="font-Vazirmatn-ExtraLight">تاریخ:</p>
                  <p className="font-Vazirmatn-ExtraLight">
                    سه شنبه 1404/02/18
                  </p>
                </div>
                <div className="flex justify-between mb-3">
                  <p className="font-Vazirmatn-ExtraLight">ساعت:</p>
                  <p className="font-Vazirmatn-ExtraLight">16-18</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p className="font-Vazirmatn-ExtraLight">وضعیت:</p>
                  <p className="font-Vazirmatn-ExtraLight">
                    لغو شده توسط پزشک یا بیمار
                  </p>
                </div>
              </div>
              <div className="text-center md:pr-16">
                <p className="font-Vazirmatn-Light md:text-center mb-3">
                  دندانپزشک:
                </p>
                <p className="font-Vazirmatn-Light mb-3">مریم اکبری</p>
                <button className="font-Vazirmatn-Light text-white rounded-lg bg-blue-500 px-10 py-2">
                  اطلاعات تماس و آدرس
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;

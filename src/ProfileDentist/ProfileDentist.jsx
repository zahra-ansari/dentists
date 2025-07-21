import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useGetDentistTime from "./useGetDentistTime";
import Spinner from "../Ui/Spinner";
import useSubmitPatientAppointment from "./useSubmitPatientAppointment";
//import toast from "react-hot-toast";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { specialtyLabels } from "../helper/specialtyLabels";

function ProfileDentist() {
  const [selectedStartTime, setSelectedStartTime] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const { state } = useLocation();
  const { isLoadingGetDentistTime, getDentistTime } = useGetDentistTime(
    state?.dentistInfo?.id
  );
  const { isLoadingSubmitPatientAppointment, submitPatientAppointment } =
    useSubmitPatientAppointment();

  const value = 75;

  const handleChooseDate = (e) => {
    const findStartTime = getDentistTime.find(
      (item) => item.id === Number(e.target.value)
    );

    setSelectedStartTime(findStartTime.start_time);
    setSelectedDate(findStartTime.date);
  };

  const handleSubmit = () => {
    const dentistId = state.dentistInfo.id;

    submitPatientAppointment({ dentistId, selectedStartTime, selectedDate });
  };

  if (isLoadingGetDentistTime) return <Spinner />;
  if (isLoadingSubmitPatientAppointment) return <Spinner />;

  return (
    <div className="relative mb-[1200px] lg:mb-[700px]">
      <img
        src="public/Pictures/profile-dentist-images/1.jpg"
        className="w-full"
      />
      <div className="absolute top-[38rem] xs:top-[41rem] lg:top-[30rem] xl:top-[33rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] xs:w-[calc(100%-10rem)] bg-white rounded-3xl py-4 lg:px-3 xl:px-10">
        <div className="flex flex-col items-center lg:flex-row lg:justify-evenly xl:justify-center">
          <div>
            <img
              src={
                state?.dentistInfo?.avatar ||
                "/Pictures/info-dentist-images/defaultImage.png"
              }
              onError={(e) => {
                e.target.onerror = null; // جلوگیری از لوپ بی نهایت
                e.target.src = "/Pictures/info-dentist-images/defaultImage.png";
              }}
              className="rounded-full w-24 h-24 xs:w-40 xs:h-40"
            />
          </div>
          <div className="lg:px-3 xl:px-10 mt-10">
            <p className="font-Vazirmatn-ExtraBold text-center lg:text-right">
              {state?.dentistInfo?.user?.full_name}
            </p>
            <p className="font-Vazirmatn-ExtraLight text-center lg:text-right">
              متخصص{" "}
              {specialtyLabels[state?.dentistInfo?.specialty] ||
                state?.dentistInfo?.specialty}
            </p>
            <div className="flex gap-x-6 mt-5">
              <p className="text-white bg-gradient-to-r from-teal-700 to-teal-300 px-4 py-2 rounded-4xl text-center">
                {state?.dentistInfo?.user?.phone_number}
              </p>
              <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-md shadow-gray-400">
                <svg className="w-5 h-5 text-gray-500">
                  <use href="#bookmark"></use>
                </svg>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-md shadow-gray-400">
                <svg className="w-5 h-5 text-gray-500">
                  <use href="#share"></use>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-x-7 xl:gap-x-10 items-center mt-10 lg:mt-0 lg:border-r lg:border-r-gray-200 lg:pr-10">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-5 xs:w-7 h-5 xs:h-7 xl:justify-self-center">
                <use href="#map-pin"></use>
              </svg>
              <span className="text-sm xs:text-base font-Vazirmatn-Medium xl:justify-self-center">
                اصفهان
              </span>
              <span className="text-sm xs:text-base font-Vazirmatn-Light text-gray-400 xl:justify-self-center text-center">
                شریعتی
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <svg className="w-5 xs:w-7 h-5 xs:h-7 xl:justify-self-center">
                <use href="#square-3-stack-3d"></use>
              </svg>
              <span className="text-sm xs:text-base font-Vazirmatn-Medium xl:justify-self-center">
                {state?.dentistInfo?.experience_years} سال
              </span>
              <span className="text-sm xs:text-base font-Vazirmatn-Light text-gray-400 xl:justify-self-center text-center">
                سابقه پزشکی
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <svg className="w-5 xs:w-7 h-5 xs:h-7 xl:justify-self-center">
                <use href="#qr-code"></use>
              </svg>
              <span className="text-sm xs:text-base font-Vazirmatn-Medium xl:justify-self-center">
                {state?.dentistInfo?.Medical_system_code}
              </span>
              <span className="text-sm xs:text-base font-Vazirmatn-Light text-gray-400 xl:justify-self-center text-center">
                کد نظام پزشکی
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-20 h-20 xs:w-24 xs:h-24">
              <CircularProgressbar
                className="xl:justify-self-center"
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                  pathColor: "#22c55e",
                  textColor: "#1e293b",
                  trailColor: "#e5e7eb",
                })}
              />
              <span className="text-sm xs:text-base font-Vazirmatn-Light text-gray-400 xl:justify-self-center text-center">
                رضایت کاربران
              </span>
            </div>
          </div>
        </div>
        <p className="font-Vazirmatn-Light text-cyan-500 mt-10">
          {state?.dentistInfo?.address}
        </p>
        <div className="flex flex-col-reverse gap-y-6 lg:flex-row lg:justify-evenly mt-20">
          <form className=" flex flex-col gap-y-5 bg-blue-100 rounded-2xl p-6">
            <span className="font-Vazirmatn-Medium">
              سوالات خود را برای دکتر {state?.dentistInfo?.user?.full_name}{" "}
              ارسال کنید
            </span>
            <input
              className="font-Vazirmatn-Light bg-white focus:outline-0"
              placeholder="نام و نام خانوادگی"
            />
            <select className="font-Vazirmatn-ExtraLight bg-white">
              <option>امتیاز خود را وارد کنید(5 بیشترین امتیاز)</option>
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
              <option value="four">4</option>
              <option value="five">5</option>
            </select>
            <textarea className="bg-white focus:outline-0 resize-none h-40"></textarea>
            <button className="flex justify-end">
              <svg className="flex justify-start w-7 h-7 -scale-x-100">
                <use href="#paper-airplane"></use>
              </svg>
            </button>
          </form>
          <div className="flex flex-col gap-y-5">
            <p className="font-Vazirmatn-Light">
              برای انتخاب نوبت در کادر زیر کلیک کنید:
            </p>
            <div>
              <label htmlFor="date">انتخاب تاریخ: </label>
              <select
                id="date"
                className="border border-gray-500 focus:outline-0"
                onChange={handleChooseDate}
              >
                <option value="">انتخاب کنید:</option>
                {getDentistTime
                  .filter((item) => {
                    const today = new DateObject({
                      calendar: gregorian,
                      locale: gregorian_en,
                    });
                    const itemDate = new DateObject({
                      date: item.date,
                      calendar: gregorian,
                      locale: gregorian_en,
                    });
                    return itemDate > today;
                  })
                  .map((item, index) => (
                    <option key={index} value={item.id}>
                      {new DateObject({
                        date: item.date,
                        calendar: gregorian,
                        locale: gregorian_en,
                      })
                        .convert(persian)
                        .setCalendar(persian)
                        .setLocale(persian_fa)
                        .format("YYYY-MM-DD dddd")}
                    </option>
                  ))}
              </select>
            </div>
            {selectedStartTime && (
              <div>
                <label htmlFor="time">انتخاب ساعت: </label>
                <select
                  id="time"
                  className="border border-gray-500 focus:outline-0"
                >
                  <option value="">انتخاب کنید:</option>
                  <option value={selectedStartTime}>{selectedStartTime}</option>
                </select>
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="font-Vazirmatn-Light bg-blue-100 rounded-lg h-10 w-full sm:w-32 lg:w-full"
            >
              ثبت نوبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDentist;

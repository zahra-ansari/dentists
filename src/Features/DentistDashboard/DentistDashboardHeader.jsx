import { useEffect, useState } from "react";
import Icons from "../../Ui/Icons";
import { NavLink } from "react-router-dom";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useUserLogout from "../../Pages/PatientLoginAndRegister/useUserLogout";
import useUserInfo from "../../Pages/PatientLoginAndRegister/useUserInfo";

function DentistDashboardHeader() {
  const { logout } = useUserLogout();

  const role = localStorage.getItem("role");
  const { userInfo } = useUserInfo(role);

  const [isProfileBox, setIsProfileBox] = useState(false);
  const [isDateAndTimeBox, setIsDateAndTimeBox] = useState(false);
  const [isMoreBox, setIsMoreBox] = useState(false);
  const [date, setDate] = useState({
    weekday: "",
    day: "",
    month: "",
    year: "",
    time: "",
  });

  useEffect(() => {
    const updateDate = () => {
      const now = new DateObject({ calendar: persian, locale: persian_fa });
      setDate({
        weekday: now.format("dddd"),
        day: now.format("D"),
        month: now.format("MMMM"),
        year: now.format("YYYY"),
        time: now.format("HH:mm"),
      });
    };

    updateDate(); // بار اول
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseAllBoxes = () => {
    setIsProfileBox(false);
    setIsDateAndTimeBox(false);
    setIsMoreBox(false);
  };

  const handleOpenProfileBox = () => {
    setIsProfileBox(true);
  };

  const handleOpenDateAndTimeBox = () => {
    setIsDateAndTimeBox(true);
  };

  const handleOpenMoreBox = () => {
    setIsMoreBox(true);
  };
  return (
    <>
      <Icons />
      {(isProfileBox || isDateAndTimeBox || isMoreBox) && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 lg:hidden"
          onClick={handleCloseAllBoxes}
        ></div>
      )}
      <div className="hidden lg:flex bg-blue-600 rounded-xl justify-between py-5 px-3">
        <div>
          <span className="text-white font-Vazirmatn-Medium ml-2">
            امروز {date.weekday}
          </span>
          <span className="text-white font-Vazirmatn-Medium ml-2">
            {date.day}
          </span>
          <span className="text-white font-Vazirmatn-Medium ml-2">
            {date.month}
          </span>
          <span className="text-white font-Vazirmatn-Medium ml-6">
            {date.year}
          </span>
          <span className="border text-white font-Vazirmatn-Medium ml-6"></span>
          <span className="text-white font-Vazirmatn-Medium ml-2">ساعت</span>
          <span className="text-white font-Vazirmatn-Medium">{date.time}</span>
        </div>
        <div className="flex gap-x-3">
          <svg className="w-5 h-5 text-white">
            <use href="#envelope"></use>
          </svg>
          <svg className="w-5 h-5 text-white">
            <use href="#ellipsis-vertical"></use>
          </svg>
        </div>
      </div>
      <div className="flex lg:hidden justify-between items-center border border-gray-300 rounded-2xl px-4 mx-3">
        <div
          className="flex flex-col justify-center items-center"
          onClick={handleOpenProfileBox}
        >
          <svg className="w-6 h-6 text-gray-400">
            <use href="#user"></use>
          </svg>
          <span className="text-gray-600 font-Vazirmatn-Light">پروفایل</span>
        </div>

        {isProfileBox && (
          <div className="absolute top-20 left-0 bg-blue-600 rounded-r-lg p-4 flex flex-col gap-y-2 justify-center items-center z-50">
            <svg className="w-10 h-10 text-white">
              <use href="#user-circle"></use>
            </svg>
            <p className="text-white font-Vazirmatn-Light">
              {userInfo.user.full_name}
            </p>
            <p className="text-white font-Vazirmatn-Light">
              {userInfo.user.phone_number}
            </p>
          </div>
        )}

        <div
          className="flex flex-col justify-center items-center"
          onClick={handleOpenDateAndTimeBox}
        >
          <svg className="w-6 h-6 text-gray-400">
            <use href="#calendar-days"></use>
          </svg>
          <span className="text-gray-600 font-Vazirmatn-Light">
            تاریخ و ساعت
          </span>
        </div>

        {isDateAndTimeBox && (
          <div className="absolute top-20 left-0 bg-blue-600 rounded-r-lg p-4 z-50">
            <span className="text-white font-Vazirmatn-Light">
              امروز {date.weekday}
            </span>
            <div>
              <span className="text-white font-Vazirmatn-Light ml-2">
                {date.day}
              </span>
              <span className="text-white font-Vazirmatn-Light ml-2">
                {date.month}
              </span>
              <span className="text-white font-Vazirmatn-Light">
                {date.year}
              </span>
            </div>
            <span className="text-white font-Vazirmatn-Light">
              ساعت {date.time}
            </span>
          </div>
        )}

        <div
          className="flex flex-col justify-center items-center"
          onClick={handleOpenMoreBox}
        >
          <svg className="w-6 h-6 text-gray-400">
            <use href="#bars-3"></use>
          </svg>
          <span className="text-gray-600 font-Vazirmatn-Light">بیشتر</span>
        </div>

        {isMoreBox && (
          <div className="absolute top-20 left-0 bg-blue-600 rounded-r-lg p-4 z-50 flex flex-col gap-y-3">
            <NavLink
              to="/dentist-dashboard/dentist-manage-appointments"
              className="text-white font-Vazirmatn-Medium flex gap-x-2 text-xs"
            >
              <svg className="w-4 h-4">
                <use href="#clipboard-document-list"></use>
              </svg>
              <span>ایجاد نوبت</span>
            </NavLink>

            <NavLink
              to="/dentist-dashboard/dentist-manage-articles"
              className="text-white font-Vazirmatn-Medium flex gap-x-2 text-xs"
            >
              <svg className="w-4 h-4">
                <use href="#newspaper"></use>
              </svg>
              <span>ایجاد وبلاگ</span>
            </NavLink>

            <NavLink
              to="/dentist-dashboard/dentist-info"
              className="text-white font-Vazirmatn-Medium flex gap-x-2 text-xs"
            >
              <svg className="w-4 h-4">
                <use href="#user"></use>
              </svg>
              <span>اطلاعات حساب کاربری</span>
            </NavLink>

            <NavLink
              onClick={logout}
              className="text-white font-Vazirmatn-Medium flex gap-x-2 text-xs"
            >
              <svg className="w-4 h-4">
                <use href="#power"></use>
              </svg>
              <span>خروج از پروفایل کاربری</span>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default DentistDashboardHeader;

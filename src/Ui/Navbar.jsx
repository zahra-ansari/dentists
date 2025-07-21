import { NavLink } from "react-router-dom";
import Icons from "./Icons";
import { useState } from "react";
import useUserRole from "../Pages/PatientLoginAndRegister/useUserRole";
import Spinner from "./Spinner";

function Navbar() {
  const [isMenuBar, setIsMenuBar] = useState(false);

  const handleCloseMenuBar = () => {
    setIsMenuBar(false);
  };

  const handleOpenMenuBar = () => {
    setIsMenuBar(true);
  };

  const { role } = useUserRole();

  return (
    <>
      {isMenuBar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={handleCloseMenuBar}
        ></div>
      )}
      <nav className="flex lg:hidden h-20 items-center justify-around border-b border-gray-300">
        <Icons />
        <svg className="w-10 h-10" onClick={handleOpenMenuBar}>
          <use href="#bars-3"></use>
        </svg>
        {isMenuBar && (
          <div className="absolute top-0 left-0 h-screen overflow-y-auto bg-white z-50">
            <svg
              className="absolute left-2 top-2 w-7 h-7 text-blue-500"
              onClick={handleCloseMenuBar}
            >
              <use href="#x-circle"></use>
            </svg>
            <div className="mt-10 p-5 flex flex-col gap-y-5 border-t border-gray-300">
              {role === "doctor" ? (
                <NavLink
                  to="/dentist-dashboard"
                  className="flex items-center gap-x-2 border border-blue-300 rounded-full h-12 px-3"
                >
                  <svg className="w-5 h-5 text-blue-500">
                    <use href="#key"></use>
                  </svg>
                  <span className="font-Vazirmatn-Medium text-gray-500 text-sm">
                    خوش آمدید
                  </span>
                </NavLink>
              ) : role === "patient" ? (
                <NavLink
                  to="/patient-dashboard"
                  className="flex items-center gap-x-2 border border-blue-300 rounded-full h-12 px-3"
                >
                  <svg className="w-5 h-5 text-blue-500">
                    <use href="#key"></use>
                  </svg>
                  <span className="font-Vazirmatn-Medium text-gray-500 text-sm">
                    خوش آمدید
                  </span>
                </NavLink>
              ) : (
                <NavLink
                  to="/patient-login-and-register"
                  className="flex items-center gap-x-2 border border-blue-300 rounded-full h-12 px-3"
                >
                  <svg className="w-5 h-5 text-blue-500">
                    <use href="#key"></use>
                  </svg>
                  <span className="font-Vazirmatn-Medium text-gray-500 text-sm">
                    ورود به حساب کاربری
                  </span>
                </NavLink>
              )}
              <NavLink to="/dentists" className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#list-bullet"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  لیست دندانپزشکان
                </span>
              </NavLink>
              <NavLink to="/dentist-register" className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#user-plus"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  ثبت نام دندانپزشکان
                </span>
              </NavLink>
              <NavLink to="/articles" className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#book-open"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  مجله دندانپزشکی
                </span>
              </NavLink>
              <NavLink className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#document-text"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  درباره ما
                </span>
              </NavLink>
              <NavLink className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#phone"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  ارتباط با پشتیبانی
                </span>
              </NavLink>
              <NavLink className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#exclamation-triangle"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  قوانین و مقررات
                </span>
              </NavLink>
              <NavLink className="flex gap-x-1">
                <svg className="w-6 h-6 text-blue-500">
                  <use href="#question-mark-circle"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500">
                  سوالات متداول
                </span>
              </NavLink>
            </div>
          </div>
        )}

        <div className="flex gap-x-1 items-center">
          <img src="/public/Pictures/logo.jpg" className="w-8 h-8" />
          <span className="text-sky-300 text-2xl font-Vazirmatn-ExtraBold hidden sm:block">
            دندانپزشکان ایران
          </span>
        </div>
        <NavLink className="flex gap-x-1">
          <svg className="w-6 h-6 text-gray-500">
            <use href="#home"></use>
          </svg>
          <span className="font-Vazirmatn-Light text-gray-500">خانه</span>
        </NavLink>
      </nav>
      <nav className="hidden lg:flex h-20 items-center justify-around border-b border-gray-300">
        <Icons />
        <div className="flex gap-x-1 items-center">
          <img src="/public/Pictures/logo.jpg" className="w-8 h-8" />
          <span className="text-sky-300 text-2xl font-Vazirmatn-ExtraBold">
            دندانپزشکان ایران
          </span>
        </div>
        <div>
          <ul className="flex gap-x-7 items-center">
            <li>
              <NavLink to="/landing" className="flex gap-x-1">
                <svg className="w-5 h-5 text-gray-500">
                  <use href="#home"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500 text-sm">
                  خانه
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dentists" className="flex gap-x-1">
                <svg className="w-5 h-5 text-gray-500">
                  <use href="#list-bullet"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500 text-sm">
                  لیست دندانپزشکان
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dentist-register" className="flex gap-x-1">
                <svg className="w-5 h-5 text-gray-500">
                  <use href="#user-plus"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500 text-sm">
                  ثبت نام دندانپزشکان
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" className="flex gap-x-1">
                <svg className="w-5 h-5 text-gray-500">
                  <use href="#book-open"></use>
                </svg>
                <span className="font-Vazirmatn-Light text-gray-500 text-sm">
                  مجله دندانپزشکی
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        {role === "doctor" ? (
          <NavLink
            to="/dentist-dashboard"
            className="flex items-center gap-x-2 border border-gray-300 rounded-full h-12 px-3"
          >
            <svg className="w-5 h-5 text-gray-500">
              <use href="#key"></use>
            </svg>
            <span className="font-Vazirmatn-Medium text-gray-500 text-sm">
              خوش آمدید
            </span>
          </NavLink>
        ) : role === "patient" ? (
          <NavLink
            to="/patient-dashboard"
            className="flex items-center gap-x-2 border border-gray-300 rounded-full h-12 px-3"
          >
            <svg className="w-5 h-5 text-gray-500">
              <use href="#key"></use>
            </svg>
            <span className="font-Vazirmatn-Medium text-gray-500 text-sm">
              خوش آمدید
            </span>
          </NavLink>
        ) : (
          <NavLink
            to="/patient-login-and-register"
            className="flex items-center gap-x-2 border border-gray-300 rounded-full h-12 px-3"
          >
            <svg className="w-5 h-5 text-gray-500">
              <use href="#key"></use>
            </svg>
            <span className="font-Vazirmatn-Medium text-gray-500 text-sm">
              ورود به حساب کاربری
            </span>
          </NavLink>
        )}
      </nav>
    </>
  );
}

export default Navbar;

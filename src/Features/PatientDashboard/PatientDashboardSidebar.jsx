import { NavLink } from "react-router-dom";
import Icons from "../../Ui/Icons";
import useUserLogout from "../../Pages/PatientLoginAndRegister/useUserLogout";
import useUserInfo from "../../Pages/PatientLoginAndRegister/useUserInfo";

function PatientDashboardSidebar() {
  const { logout } = useUserLogout();
  const role = localStorage.getItem("role");
  const { userInfo } = useUserInfo(role);
  return (
    <div className="hidden lg:block">
      <Icons />
      <div className="bg-blue-600 rounded-t-2xl mb-1 flex flex-col items-center justify-center py-20">
        <svg className="w-20 h-20 text-white">
          <use href="#user-circle"></use>
        </svg>
        <p className="text-white font-Vazirmatn-Medium">
          {userInfo.user.full_name}
        </p>
        <p className="text-white font-Vazirmatn-Medium">
          {userInfo.user.phone_number}
        </p>
      </div>
      <div className="bg-blue-600 rounded-b-2xl flex flex-col gap-y-4 p-7">
        <NavLink
          to="my-appointments"
          className="text-white font-Vazirmatn-Medium flex gap-x-2"
        >
          <svg className="w-5 h-5">
            <use href="#clipboard-document-list"></use>
          </svg>
          <span>نوبت های من</span>
        </NavLink>

        <NavLink className="text-white font-Vazirmatn-Medium flex gap-x-2">
          <svg className="w-5 h-5">
            <use href="#bookmark"></use>
          </svg>
          <span>ذخیره شده ها</span>
        </NavLink>

        <NavLink
          to="patient-info"
          className="text-white font-Vazirmatn-Medium flex gap-x-2"
        >
          <svg className="w-5 h-5">
            <use href="#user"></use>
          </svg>
          <span>اطلاعات حساب کاربری</span>
        </NavLink>

        <button
          onClick={logout}
          className="text-white font-Vazirmatn-Medium flex gap-x-2"
        >
          <svg className="w-5 h-5">
            <use href="#power"></use>
          </svg>
          <span>خروج از پروفایل کاربری</span>
        </button>
      </div>
    </div>
  );
}

export default PatientDashboardSidebar;

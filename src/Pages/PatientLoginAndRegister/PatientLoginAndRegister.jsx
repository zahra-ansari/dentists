import { useState } from "react";
import { useForm } from "react-hook-form";
import usePatientRegister from "./usePatientRegister";
import useVerifyCode from "./useVerifyCode";
import { NavLink } from "react-router-dom";
import useUserLogin from "./useUserLogin";

function PatientLoginAndRegister() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
  } = useForm();

  const { handleSubmit: handleVerifyCode, register: registerVerifyCode } =
    useForm();

  const [otpCode, setOtpCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isRegisterPart, setIsRegisterPart] = useState(false);
  const [isLoginPart, setIsLoginPart] = useState(true);

  const { isLoadingPatientRegister, patientRegister } = usePatientRegister({
    onSuccess: (data) => {
      if (data?.otp) {
        setOtpCode(data.otp);
      }
    },
  });
  const { isLoadingLogin, login } = useUserLogin();

  const { isLoadingVerifyCode, verifyCode } = useVerifyCode();

  const onLoginSubmit = (data) => {
    const { phone_number, password } = data;

    login({ phone_number, password });
  };

  const onVerifyCodeSubmit = (data) => {
    const { otpCode, phoneNumber } = data;
    verifyCode({ otpCode, phoneNumber });
  };

  const onRegisterSubmit = (data) => {
    const { full_name, email, phone_number, password } = data;
    patientRegister({ full_name, email, phone_number, password });
    setPhoneNumber(phone_number);
  };

  const handleOpenRegisterPartAndCloseLoginPart = () => {
    setIsRegisterPart(true);
    setIsLoginPart(false);
  };

  const handleOpenLoginPartAndCloseRegisterPart = () => {
    setIsRegisterPart(false);
    setIsLoginPart(true);
  };

  return (
    <>
      <NavLink
        to="/"
        className="hidden md:block font-Vazirmatn-ExtraBold mr-12 mt-12"
      >
        بازگشت
      </NavLink>
      <div className="flex justify-center items-center md:flex-col lg:flex-row gap-x-10">
        <div className="hidden md:block">
          <img src={`${import.meta.env.BASE_URL}Pictures/login-images/1.png`} />
        </div>
        <div>
          {isLoginPart && (
            <div className="mx-4 md:mx-0 mt-4 md:mt-0">
              <p className="font-Vazirmatn-ExtraBold">ورود به سایت</p>
              <p className="font-Vazirmatn-ExtraLight text-gray-500 mb-3">
                برای استفاده از خدمات ابتدا وارد شوید
              </p>
              <form
                className="flex flex-col"
                onSubmit={handleSubmitLogin(onLoginSubmit)}
              >
                <input
                  placeholder="شماره موبایل"
                  className="font-Vazirmatn-Light py-3 pr-2 mb-3 border border-gray-400 rounded-xl focus:outline-none"
                  {...registerLogin("phone_number", {
                    required: "پر کردن شماره موبایل ضروری است",
                  })}
                />
                {errorsLogin.phone_number && (
                  <span className="text-red-400 font-Vazirmatn-Light">
                    {errorsLogin.phone_number.message}
                  </span>
                )}

                <input
                  type="password"
                  placeholder="رمز"
                  className="font-Vazirmatn-Light py-3 pr-2 mb-3 border border-gray-400 rounded-xl focus:outline-none"
                  {...registerLogin("password", {
                    required: "پر کردن رمز ضروری است",
                  })}
                />
                {errorsLogin.password && (
                  <span className="text-red-400 font-Vazirmatn-Light">
                    {errorsLogin.password.message}
                  </span>
                )}
                <div className="flex gap-x-10 mb-3 flex-col xs:flex-row gap-y-3">
                  <div>
                    <input type="checkbox" />
                    <span className="font-Vazirmatn-Light">
                      مرا به خاطر بسپار
                    </span>
                  </div>
                  <button className="font-Vazirmatn-Light">
                    رمز عبور خود را فراموش کرده ام
                  </button>
                </div>

                <button
                  type="submit"
                  className="font-Vazirmatn-Medium text-center bg-blue-600 text-white py-4 rounded-xl"
                >
                  {isLoadingLogin ? " در حال وارد شدن..." : "ورود"}
                </button>
              </form>

              <button
                className="py-4 w-full font-Vazirmatn-Medium text-center"
                onClick={handleOpenRegisterPartAndCloseLoginPart}
              >
                ثبت نام
              </button>
              <NavLink
                to="/"
                className="block md:hidden text-center font-Vazirmatn-ExtraBold w-full"
              >
                بازگشت
              </NavLink>
            </div>
          )}

          {isRegisterPart && (
            <div className="mx-4 md:mx-0 mt-4 md:mt-0">
              <p className="font-Vazirmatn-ExtraBold">ثبت نام</p>
              <p className="font-Vazirmatn-ExtraLight text-gray-500 mb-3">
                جهت استفاده بیشتر از خدمات سایت ما ثبت نام کنید
              </p>
              <form
                className="flex flex-col"
                onSubmit={handleSubmitRegister(onRegisterSubmit)}
              >
                <input
                  placeholder="نام و نام خانوادگی"
                  className={`font-Vazirmatn-Light py-3 pr-2 mb-3 border border-gray-400 rounded-xl focus:outline-none ${
                    isLoadingPatientRegister
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  {...registerRegister("full_name", {
                    required: "پر کردن فیلد نام و نام خانوادگی ضروری است",
                  })}
                />
                {errorsRegister.full_name && (
                  <span className="text-red-400 font-Vazirmatn-Light">
                    {errorsRegister.full_name.message}
                  </span>
                )}
                <input
                  placeholder="ایمیل"
                  className={`font-Vazirmatn-Light py-3 pr-2 mb-3 border border-gray-400 rounded-xl focus:outline-none ${
                    isLoadingPatientRegister
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  {...registerRegister("email", {
                    required: "پر کردن فیلد ایمیل ضروری است",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "ایمیل معتبر وارد کنید",
                    },
                  })}
                />
                {errorsRegister.email && (
                  <span className="text-red-400 font-Vazirmatn-Light">
                    {errorsRegister.email.message}
                  </span>
                )}
                <input
                  placeholder="شماره موبایل"
                  className={`font-Vazirmatn-Light py-3 pr-2 mb-3 border border-gray-400 rounded-xl focus:outline-none ${
                    isLoadingPatientRegister
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  {...registerRegister("phone_number", {
                    required: "پر کردن فیلد شماره همراه ضروری است",
                    pattern: {
                      value: /^09\d{9}$/,
                      message: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
                    },
                  })}
                />
                {errorsRegister.phone_number && (
                  <span className="text-red-400 font-Vazirmatn-Light">
                    {errorsRegister.phone_number.message}
                  </span>
                )}
                <input
                  type="password"
                  placeholder="رمز"
                  className={`font-Vazirmatn-Light py-3 pr-2 mb-3 border border-gray-400 rounded-xl focus:outline-none ${
                    isLoadingPatientRegister
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  {...registerRegister("password", {
                    required: "پر کردن فیلد رمز ضروری است",
                  })}
                />
                {errorsRegister.password && (
                  <span className="text-red-400 font-Vazirmatn-Light">
                    {errorsRegister.password.message}
                  </span>
                )}
                <button
                  type="submit"
                  className="font-Vazirmatn-Medium text-center bg-blue-600 text-white py-4 rounded-xl"
                >
                  {isLoadingPatientRegister
                    ? "در حال ثبت نام شدن ..."
                    : "ثبت نام"}
                </button>
              </form>
              <button
                className="py-4 w-full font-Vazirmatn-Medium text-center"
                onClick={handleOpenLoginPartAndCloseRegisterPart}
              >
                بازگشت به ورود
              </button>
              <NavLink
                to="/"
                className="block md:hidden text-center font-Vazirmatn-ExtraBold w-full"
              >
                بازگشت
              </NavLink>
            </div>
          )}
        </div>
        {otpCode && (
          <form
            onSubmit={handleVerifyCode(onVerifyCodeSubmit)}
            className="flex flex-col gap-y-4 absolute bg-white rounded-3xl p-10 border border-gray-600"
          >
            <input
              className={`border border-blue-200 rounded-xl pr-2 focus:outline-0 ${
                isLoadingVerifyCode
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
              }`}
              {...registerVerifyCode("otpCode")}
              value={otpCode}
              readOnly
            />
            <input
              className={`border border-blue-200 rounded-xl pr-2 focus:outline-0 ${
                isLoadingVerifyCode
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
              }`}
              {...registerVerifyCode("phoneNumber")}
              value={phoneNumber}
              readOnly
            />
            <button
              type="submit"
              className="font-Vazirmatn-Medium p-1 rounded-xl bg-blue-400"
            >
              ارسال کد
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default PatientLoginAndRegister;

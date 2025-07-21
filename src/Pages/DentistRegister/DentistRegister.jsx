import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useDentistRegister from "./useDentistRegister";
import Spinner from "../../Ui/Spinner";

function DentistRegister() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [captchaValue, setCaptchaValue] = useState(null);

  const { isLoadingDentistRegister, dentistRegister } = useDentistRegister();

  const onSubmit = (data) => {
    if (!captchaValue) toast.error("لطفا تایید کنید که ربات نیستید");
    const formData = { ...data, captcha_response: captchaValue };

    const {
      full_name,
      email,
      phone_number,
      password,
      Medical_system_code,
      specialty,
      captcha_response,
      experience_years,
    } = formData;

    dentistRegister({
      full_name,
      email,
      phone_number,
      password,
      Medical_system_code,
      specialty,
      captcha_response,
      experience_years,
    });
  };

  if (isLoadingDentistRegister) return <Spinner />;

  return (
    <div className="flex flex-col-reverse sm:flex-row">
      <form
        className="flex flex-col gap-y-10 p-5 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-Vazirmatn-ExtraBold pt-7">
          برای عضویت در سایت دندانپزشکان ایران، لطفا فرم زیر را تکمیل نمایید.
          کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
        </p>

        <div className="flex flex-col">
          <label htmlFor="full_name" className="font-Vazirmatn-Medium">
            نام و نام خانوادگی
          </label>
          <input
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("full_name", {
              required: "پر کردن فیلد نام و نام خانوادگی ضروری است",
            })}
            id="full_name"
            placeholder="کیبورد در حالت تایپ فارسی باشد"
          />
          {errors.full_name && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.full_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-Vazirmatn-Medium">
            ایمیل
          </label>
          <input
            type="email"
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("email", {
              required: "پر کردن فیلد ایمیل اجباری است",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "ایمیل معتبر وارد کنید",
              },
            })}
            id="email"
            placeholder="example@mail.com"
          />
          {errors.email && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone_number" className="font-Vazirmatn-Medium">
            شماره موبایل
          </label>
          <input
            type="tel"
            maxLength={11}
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("phone_number", {
              maxLength: 11,
              required: "پر کردن فیلد شماره همراه ضروری است",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
              },
            })}
            id="phone_number"
          />
          {errors.phone_number && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.phone_number.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-Vazirmatn-Medium">
            رمز عبور
          </label>
          <input
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("password", {
              required: "پر کردن فیلد رمز عبور ضروری است",
            })}
            id="password"
          />
          {errors.password && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="Medical_system_code"
            className="font-Vazirmatn-Medium"
          >
            کد نظام پزشکی
          </label>
          <input
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("Medical_system_code", {
              required: "پر کردن فیلد کد نظام پزشکی ضروری است",
            })}
            id="Medical_system_code"
            placeholder="کدنظام پزشکی بین 6 الی 12 رقم باشد"
          />
          {errors.Medical_system_code && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.Medical_system_code.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="specialty" className="font-Vazirmatn-Medium">
            زمینه فعالیت
          </label>

          <select
            id="specialty"
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("specialty", {
              required: "پر کردن فیلد زمینه فعالیت ضروری است",
            })}
          >
            <option value="">انتخاب کنید...</option>
            <option value="ORTHO">ارتودانتیکس</option>
            <option value="PERIO">پریودانتیکس</option>
            <option value="ENDO">اندودانتیکس</option>
            <option value="PROS">پروتزهای دندانی</option>
            <option value="OMFS">جراحی فک و صورت</option>
            <option value="PED">دندانپزشکی کودکان</option>
            <option value="REST">دندانپزشکی ترمیمی و زیبایی</option>
            <option value="OMFR">رادیولوژی فک و صورت</option>
            <option value="OMFP">آسیب‌شناسی فک و صورت</option>
            <option value="DPH">بهداشت عمومی دندان</option>
            <option value="IMPL">ایمپلنتولوژی</option>
          </select>

          {errors.specialty && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.specialty.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="experience_years" className="font-Vazirmatn-Medium">
            سابقه کاری
          </label>
          <input
            type="number"
            className="font-Vazirmatn-ExtraLight border border-gray-300 rounded-md w-2xs h-10"
            {...register("experience_years", {
              required: "پر کردن فیلد سابقه کاری ضروری است",
            })}
            id="experience_years"
          />
          {errors.experience_years && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.experience_years.message}
            </span>
          )}
        </div>

        <ReCAPTCHA
          sitekey="6Lfj-i4rAAAAAMvYgQtyrJwu2H6vfuLEKE5LOKq3"
          onChange={(value) => setCaptchaValue(value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-500 font-Vazirmatn-Medium rounded-sm px-8 py-2"
        >
          ثبت نام
        </button>
      </form>
      <div>
        <img src="/Pictures/register-dentist-images/1.png" />
      </div>
    </div>
  );
}

export default DentistRegister;

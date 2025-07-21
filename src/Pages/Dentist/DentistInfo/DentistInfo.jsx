import { useForm } from "react-hook-form";
import DentistDashboardHeader from "../../../Features/DentistDashboard/DentistDashboardHeader";
import { specialtyLabels } from "../../../helper/specialtyLabels";
import useUserInfo from "../../PatientLoginAndRegister/useUserInfo";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import useSendDentistInfo from "./useSendDentistInfo";

function DentistInfo() {
  const role = localStorage.getItem("role");
  const { userInfo } = useUserInfo(role);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendDentistInfo } = useSendDentistInfo();

  const onSubmit = (data) => {
    const {
      Medical_system_code,
      about_me,
      address,
      avatar,
      brithday,
      experience_years,
      national_code,
    } = data;

    const convertedBirthday = new DateObject({
      date: brithday,
      format: "YYYY-MM-DD",
      locale: persian_fa,
      calendar: persian,
    })
      .convert(gregorian)
      .setCalendar(gregorian)
      .setLocale(gregorian_en)
      .format("YYYY-MM-DD");

    const formData = new FormData();

    formData.append("avatar", avatar[0]);
    formData.append("national_code", national_code);
    formData.append("brithday", convertedBirthday);
    formData.append("about_me", about_me);
    formData.append("address", address);
    formData.append("Medical_system_code", Medical_system_code);
    formData.append("specialty", userInfo.specialty);
    formData.append("experience_years", Number(experience_years));

    sendDentistInfo(formData);
  };
  return (
    <div className="flex flex-col basis-4xl lg:basis-2/3">
      <DentistDashboardHeader />
      <div className="flex flex-col xs:flex-row mx-4 lg:mx-0 items-center justify-around py-3 border border-gray-400 mt-10 rounded-2xl">
        <div className="max-w-40 max-h-40 rounded-2xl overflow-hidden">
          <img src={userInfo.avatar} />
        </div>
        <div>
          <p className="font-Vazirmatn-Medium mb-2">
            نام و نام خانوادگی:
            <span className="font-Vazirmatn-ExtraLight">
              {userInfo.user.full_name}
            </span>
          </p>
          <p className="font-Vazirmatn-Medium mb-2">
            شماره همراه:
            <span className="font-Vazirmatn-ExtraLight">
              {userInfo.user.phone_number}
            </span>
          </p>
          <p className="font-Vazirmatn-Medium mb-2">
            ایمیل:
            <span className="font-Vazirmatn-ExtraLight">
              {userInfo.user.email}
            </span>
          </p>
        </div>
      </div>
      <form
        className="grid sm:grid-cols-4 gap-4 mt-5 mx-4 lg:mx-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="national_code" className="font-Vazirmatn-Medium">
            کدملی:
          </label>
          <input
            className="focus:outline-none border border-gray-300 rounded-xl"
            {...register("national_code", {
              required: "پر کردن کد ملی ضروری است",
            })}
            defaultValue={userInfo.national_code}
            id="national_code"
          />
          {errors.national_code && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.national_code.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="brithday" className="font-Vazirmatn-Medium">
            تاریخ تولد:
          </label>
          <input
            className="focus:outline-none border border-gray-300 rounded-xl"
            {...register("brithday", {
              required: "پر کردن تاریخ تولد ضروری است",
            })}
            defaultValue={new DateObject({
              date: userInfo.brithday,
              calendar: gregorian,
              locale: gregorian_en,
            })
              .convert(persian)
              .setCalendar(persian)
              .setLocale(persian_fa)
              .format("YYYY-MM-DD")}
            id="brithday"
            placeholder="1370-01-01"
          />
          {errors.brithday && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.brithday.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Medical_system_code"
            className="font-Vazirmatn-Medium"
          >
            کد نظام پزشکی:
          </label>
          <input
            className="focus:outline-none border border-gray-300 rounded-xl"
            {...register("Medical_system_code", {
              required: "پر کردن کد نظام پزشکی ضروری است",
            })}
            defaultValue={userInfo.Medical_system_code}
            id="Medical_system_code"
          />
          {errors.Medical_system_code && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.Medical_system_code.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="specialty" className="font-Vazirmatn-Medium">
            تخصص:
          </label>
          <input
            readOnly
            className="focus:outline-none border border-gray-300 rounded-xl"
            {...register("specialty", {
              required: "فیلد تخصص غیر قایل تغییر است",
            })}
            defaultValue={
              specialtyLabels[userInfo.specialty] || userInfo.specialty
            }
            id="specialty"
          />
          {errors.specialty && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.specialty.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="experience_years" className="font-Vazirmatn-Medium">
            سابقه کاری:
          </label>
          <input
            className="focus:outline-none border border-gray-300 rounded-xl"
            {...register("experience_years", {
              required: "پر کردن فیلد سابقه کاری ضروری است",
            })}
            defaultValue={userInfo.experience_years}
            id="experience_years"
          />
          {errors.experience_years && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.experience_years.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="font-Vazirmatn-Medium">
            آدرس:
          </label>
          <input
            className="focus:outline-none border border-gray-300 rounded-xl h-20"
            {...register("address", {
              required: "پر کردن فیلد آدرس ضروری است",
            })}
            defaultValue={userInfo.address}
            id="address"
          />
          {errors.address && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.address.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="about_me" className="font-Vazirmatn-Medium">
            درباره من:
          </label>
          <input
            className="focus:outline-none border border-gray-300 rounded-xl h-20"
            {...register("about_me", {
              required: "پر کردن فیلد درباره من ضروری است",
            })}
            defaultValue={userInfo.about_me}
            id="about_me"
          />
          {errors.about_me && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.about_me.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            style={{ display: "none" }}
            {...register("avatar", {
              required: "آپلود کردن عکس پروفایل اجباری است",
            })}
          />
          <label htmlFor="avatar">
            <span className="font-Vazirmatn-Light">
              برای تغییر عکس روی آیکن دوربین کلیک کنید
            </span>
            <svg className="w-12 h-12">
              <use href="#camera"></use>
            </svg>
          </label>
          {errors.avatar && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.avatar.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="font-Vazirmatn-Medium bg-blue-500 rounded-2xl text-white py-3 mb-3"
        >
          ذخیره
        </button>
      </form>
    </div>
  );
}

export default DentistInfo;

import { NavLink } from "react-router-dom";
import { specialtyLabels } from "../../helper/specialtyLabels";
import Spinner from "../../Ui/Spinner";
import useDentists from "./useDentists";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Dentists() {
  const { register, handleSubmit } = useForm();

  const [search, setSearch] = useState();

  const { isLoadingDentists, dentistsList } = useDentists(search);

  const onSubmit = (data) => {
    setSearch(data.search);
  };

  if (isLoadingDentists) return <Spinner />;

  return (
    <>
      <form
        className="relative w-[90%] md:w-1/2 mx-auto mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("search")}
          placeholder="جستجو دندانپزشک..."
          className="bg-cyan-100 w-full rounded-lg overflow-hidden font-Vazirmatn-Light py-6 pr-2 focus:outline-0"
        />
        <button type="submit">
          <svg className="absolute -top-1 left-0 translate-y-1/2 translate-x-1/2 w-10 h-10">
            <use href="#magnifying-glass"></use>
          </svg>
        </button>
      </form>

      <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-7 mt-20 mx-10">
        {dentistsList.map((item, index) => (
          <NavLink
            to="/profile-dentist"
            state={{ dentistInfo: item }}
            key={index}
            className="flex flex-col gap-y-5 lg:flex-row items-center justify-evenly xl:justify-between gap-x-3 border border-gray-300 p-2 rounded-bl-xl rounded-tr-xl"
          >
            <div className="w-28 xl:w-20 h-28 xl:h-20 rounded-full overflow-hidden">
              <img
                src={
                  item.avatar ||
                  "/Pictures/info-dentist-images/defaultImage.png"
                }
                onError={(e) => {
                  e.target.onerror = null; // جلوگیری از لوپ بی نهایت
                  e.target.src =
                    "/Pictures/info-dentist-images/defaultImage.png";
                }}
                className="w-full h-full"
              />
            </div>
            <div>
              <p className="font-Vazirmatn-Medium mb-3">
                {item.user.full_name}
              </p>
              <div className="border-r border-r-gray-400 mb-3 pr-1">
                <p className="text-sm lg:text-base xl:text-sm font-Vazirmatn-ExtraLight text-gray-500">
                  متخصص {specialtyLabels[item.specialty] || item.specialty}
                </p>
                <p className="text-sm lg:text-base xl:text-sm font-Vazirmatn-ExtraLight text-gray-500">
                  {item.experience_years} سال سابقه
                </p>
              </div>
              <div className="flex gap-x-2 items-center md:justify-center lg:justify-start">
                <svg className="w-5 h-5">
                  <use href="#map-pin"></use>
                </svg>
                <p className="font-Vazirmatn-Light text-xs">{item.address}</p>
              </div>
            </div>
            <button className="text-xs font-Vazirmatn-Medium bg-cyan-300 rounded-bl-xl rounded-tr-xl px-4 py-2">
              دریافت نوبت
            </button>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Dentists;

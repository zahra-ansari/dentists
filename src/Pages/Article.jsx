import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { useLocation } from "react-router-dom";

function Article() {
  const { state } = useLocation();

  const date = new DateObject({
    date: state?.articleDetailes?.update_at,
    calendar: gregorian,
    locale: gregorian_en,
  })
    .convert(persian)
    .setCalendar(persian)
    .setLocale(persian_fa)
    .format("YYYY/MM/DD");

  return (
    <div className=" m-2 xs:m-10">
      <div className="border border-gray-300 rounded-4xl w-full sm:w-2/3 overflow-hidden">
        <div>
          <img src={state?.articleDetailes?.image} />
        </div>
        <div className="flex justify-center gap-x-5 mx-auto my-3 sm:hidden">
          <div className="border border-gray-300 p-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img
                src={state?.articleDetailes?.author?.avatar}
                className="w-full h-full"
              />
            </div>
            <span className="font-Vazirmatn-Light ">
              {state?.articleDetailes?.author?.full_name}
            </span>
          </div>
          <div className="border border-gray-300 p-2">
            <p className="font-Vazirmatn-Light mb-3 ">بروز رسانی {date}</p>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-1">
                <svg className="w-5 h-5">
                  <use href="#eye"></use>
                </svg>
                <span className="text-xs xs:text-base">70 بازدید</span>
              </div>
              <svg className="w-5 h-5">
                <use href="#bookmark"></use>
              </svg>
            </div>
          </div>
        </div>
        <p className="font-Vazirmatn-Light p-4 text-justify">
          {state?.articleDetailes?.content}
        </p>
      </div>
      <div className="hidden absolute sm:flex top-24 sm:left-3 md:left-3 lg:left-12 xl:left-32 gap-x-2 md:gap-x-3 lg:gap-x-7 z-20">
        <div className="flex flex-col items-center border border-gray-300 p-1 rounded-xl">
          <div className="sm:w-10 md:w-16 sm:h-10 md:h-16 rounded-xl md:rounded-3xl overflow-hidden">
            <img
              src={state?.articleDetailes?.author?.avatar}
              className="w-full h-full"
            />
          </div>
          <p className="font-Vazirmatn-Medium text-xs lg:text-base max-w-16 text-center">
            {state?.articleDetailes?.author?.full_name}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="font-Vazirmatn-Light border border-gray-300 p-1 rounded-xl text-xs md:text-base mb-4">
            بروز رسانی {date}
          </p>
          <div className="flex items-center justify-between border border-gray-300 p-1 rounded-xl">
            <div className="flex gap-x-1">
              <svg className="sm:w-4 md:w-5 sm:h-4 md:h-5">
                <use href="#eye"></use>
              </svg>
              <span className="font-Vazirmatn-Light text-xs md:text-base">
                70 بازدید
              </span>
            </div>
            <svg className="w-5 h-5">
              <use href="#bookmark"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;

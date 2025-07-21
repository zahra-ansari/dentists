import { NavLink } from "react-router-dom";
import useDentists from "./../../Pages/Dentists/useDentists";
import Spinner from "../../Ui/Spinner";
import { specialtyLabels } from "../../helper/specialtyLabels";
import useArticles from "../../Pages/Articles/useArticles";

function LandingMain() {
  const { isLoadingDentists, dentistsList } = useDentists();
  const { isLoadingArticles, articlesList } = useArticles();

  if (isLoadingDentists) return <Spinner />;
  if (isLoadingArticles) return <Spinner />;

  return (
    <>
      <div className="flex justify-between items-center w-[90%] mx-auto mb-10 mt-14">
        <span className="font-Vazirmatn-Medium text-gray-500">
          لیست دندانپزشکان
        </span>
        <span className="block h-px xs:w-[50%] sm:w-[60%] md:w-[70%] xl:w-[80%] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
        <NavLink to="/dentists" className="font-Vazirmatn-Medium text-gray-500">
          مشاهده همه
        </NavLink>
      </div>

      <div className="w-full overflow-x-auto px-3">
        <div className="grid grid-cols-5 place-items-center gap-x-3 w-max mx-auto mb-10">
          {dentistsList.map((item, index) => (
            <NavLink
              to="/profile-dentist"
              state={{ dentistInfo: item }}
              key={index}
              className="border border-gray-200 rounded-3xl px-8 py-6 w-48 xl:w-full"
            >
              <div className="rounded-full overflow-auto justify-self-center w-20 h-20 mb-6">
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
              <p className="font-Vazirmatn-Medium text-center text-gray-700">
                {item.user.full_name}
              </p>
              <p className="font-Vazirmatn-Light text-center text-gray-500 mb-4">
                متخصص {specialtyLabels[item.specialty] || item.specialty}
              </p>
              <svg className="w-7 h-7 justify-self-center">
                <use href="#map-pin"></use>
              </svg>
              <p className="font-Vazirmatn-ExtraLight text-center text-gray-400">
                {item.address}
              </p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center w-[90%] mx-auto mb-10 mt-14">
        <span className="font-Vazirmatn-Medium text-gray-500">لیست مقالات</span>
        <span className="block h-px xs:w-[50%] sm:w-[60%] md:w-[70%] xl:w-[80%] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
        <NavLink to="/articles" className="font-Vazirmatn-Medium text-gray-500">
          مشاهده همه
        </NavLink>
      </div>

      <div className="w-full overflow-x-auto px-3">
        <div className="grid grid-cols-4 place-items-center gap-x-3 w-4xl lg:w-5xl xl:w-6xl mx-auto mb-10">
          {articlesList.map((item, index) => (
            <NavLink
              to="/article"
              state={{ articleDetailes: item }}
              key={index}
              className="border border-gray-200 rounded-3xl px-5 py-3 w-full"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-x-2 items-center">
                  <div className="w-7 h-7 rounded-full overflow-hidden">
                    <img src={item.author.avatar} className="w-full h-full" />
                  </div>
                  <span className="font-Vazirmatn-Light text-xs">
                    {item.author.full_name}
                  </span>
                </div>
                <p className="font-Vazirmatn-Light text-xs">
                  {item.time_since_created}
                </p>
              </div>
              <div className="w-full h-32 rounded-4xl mb-2">
                <img src={item.image} className="w-full h-full" />
              </div>
              <p className="font-Vazirmatn-Medium mb-3 max-h-12 line-clamp-2">
                {item.title}
              </p>
              <div className="flex justify-between">
                <div className="flex gap-x-2 items-center">
                  <svg className="w-5 h-5">
                    <use href="#eye"></use>
                  </svg>
                  <p className="font-Vazirmatn-Light text-xs">70 بازدید</p>
                </div>
                <svg className="w-5 h-5">
                  <use href="#bookmark"></use>
                </svg>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default LandingMain;

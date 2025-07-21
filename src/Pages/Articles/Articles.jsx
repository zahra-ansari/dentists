import { NavLink } from "react-router-dom";
import useArticles from "./useArticles";
import Spinner from "../../Ui/Spinner";

function Articles() {
  const { isLoadingArticles, articlesList } = useArticles();
  if (isLoadingArticles) return <Spinner />;

  return (
    <>
      <div className="relative w-[90%] md:w-1/2 mx-auto mt-5">
        <input
          placeholder="جستجو در مطالب دندانپزشکی..."
          className="bg-cyan-100 w-full rounded-lg overflow-hidden font-Vazirmatn-Light py-6 pr-2 focus:outline-0"
        />
        <svg className="absolute -top-1 left-0 translate-y-1/2 translate-x-1/2 w-10 h-10">
          <use href="#magnifying-glass"></use>
        </svg>
      </div>

      <div className="grid lg:grid-cols-2 gap-y-10 mt-20 md:mx-10">
        {articlesList.map((item, index) => (
          <NavLink
            to="/article"
            state={{ articleDetailes: item }}
            key={index}
            className="flex flex-col xs:flex-row justify-center items-center gap-x-4 border xs:border-none border-gray-200 p-3 xs:p-0 m-3 xs:m-0 rounded-3xl xs:rounded-none"
          >
            <div className="w-[80%] xs:w-52 h-40 mb-4 lg:mb-0 rounded-4xl overflow-hidden">
              <img src={item.image} className="w-full h-full" />
            </div>

            <div className="flex flex-col ">
              <p className="font-Vazirmatn-Medium mb-2 w-[230px] xs:w-[200px] sm:w-[300px] md:w-[400px] lg:w-[300px] xl:w-[400px]">
                {item.title}
              </p>

              <div className="flex items-center gap-x-2 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img src={item.author.avatar} className="w-full h-full" />
                </div>
                <p className="font-Vazirmatn-Light">{item.author.full_name}</p>
              </div>

              <div className="flex gap-x-4">
                <p className="font-Vazirmatn-Light text-gray-500 text-sm sm:text-base">
                  {item.time_since_created}
                </p>
                <div className="flex gap-x-1 items-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500">
                    <use href="#eye"></use>
                  </svg>
                  <p className="font-Vazirmatn-Light text-gray-500 text-sm sm:text-base">
                    84 بازدید
                  </p>
                </div>
                <div className="flex gap-x-1 items-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500">
                    <use href="#chat-bubble-oval-left"></use>
                  </svg>
                  <p className="font-Vazirmatn-Light text-gray-500 text-sm sm:text-base">
                    4 نظر
                  </p>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Articles;

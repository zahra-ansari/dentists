import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-y-12 items-center justify-evenly border-t rounded-4xl border-gray-300 mx-5 mt-20 pt-6">
        <div>
          <ul className="grid grid-cols-2 gap-x-16 gap-y-4 list-disc pr-5 font-Vazirmatn-Light text-neutral-600">
            <li>
              <NavLink to="/landing">صفحه اصلی</NavLink>
            </li>
            <li>
              <NavLink>تماس با ما</NavLink>
            </li>
            <li>
              <NavLink to="/dentist-register">ثبت نام دندانپزشکان</NavLink>
            </li>
            <li>
              <NavLink to="/patient-login-and-register">
                ورود به حساب کاربری
              </NavLink>
            </li>
            <li>
              <NavLink to="/dentists">لیست دندانپزشکان</NavLink>
            </li>
            <li>
              <NavLink to="/articles">مجله دندانپزشکی</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-Vazirmatn-ExtraBold">شبکه های اجتماعی ما</p>
          <div className="flex gap-x-5 mt-5">
            <img
              src={`${
                import.meta.env.BASE_URL
              }Pictures/social-media-icons/1.png`}
              className="w-10 h-10"
            />
            <img
              src={`${
                import.meta.env.BASE_URL
              }Pictures/social-media-icons/2.png`}
              className="w-10 h-10"
            />
            <img
              src={`${
                import.meta.env.BASE_URL
              }Pictures/social-media-icons/3.png`}
              className="w-10 h-10"
            />
            <img
              src={`${
                import.meta.env.BASE_URL
              }Pictures/social-media-icons/4.png`}
              className="w-10 h-10"
            />
            <img
              src={`${
                import.meta.env.BASE_URL
              }Pictures/social-media-icons/5.png`}
              className="w-10 h-10"
            />
          </div>
          <p className="font-Vazirmatn-ExtraBold mt-10">عضویت در خبرنامه</p>
          <form className="relative">
            <input
              className="pr-2 font-Vazirmatn-ExtraLight py-3 rounded-4xl focus:outline-0 border border-gray-300 w-full"
              placeholder="شماره موبایل خود را وار کنید..."
            />
            <button
              type="submit"
              className="absolute top-0 left-0 h-[50px] font-Vazirmatn-Light bg-cyan-400 px-4 text-white rounded-2xl"
            >
              تایید
            </button>
          </form>
        </div>
      </div>
      <div className="relative flex flex-col sm:flex-row items-center justify-evenly bg-cyan-100 mt-16 pb-40 overflow-hidden">
        <div className="mt-7">
          <p className="font-Vazirmatn-ExtraBold mb-4">درباره ما</p>
          <p className="font-Vazirmatn-Light text-justify px-4 sm:px-0 xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
        <div className="flex flex-row sm:flex-col gap-y-8 lg:flex-row gap-x-10 mt-20">
          <img
            src={`${import.meta.env.BASE_URL}Pictures/license-icons/1.png`}
            className="w-20 h-28"
          />
          <img
            src={`${import.meta.env.BASE_URL}Pictures/license-icons/2.png`}
            className="w-20 h-28"
          />
          <img
            src={`${import.meta.env.BASE_URL}Pictures/license-icons/3.png`}
            className="w-20 h-28"
          />
        </div>
        <p className="absolute left-20 top-[82%] xs:top-[660px] sm:top-[510px] md:top-[500px] lg:top-80 h-52 bg-blue-400 rounded-t-4xl rotate-3 text-center text-xs sm:text-base font-Vazirmatn-Medium text-white p-8 xs:p-10">
          مسئولیت صحت آگهی های درج شده در این سایت به عهده آگهی دهنده میباشد.
          تمام حقوق و محتویات این سایت متعلق به شرکت پیک نوین میباشد و هرگونه
          کپی برداری بدون ذکر منبع پیگرد قانونی دارد ©
        </p>
      </div>
    </>
  );
}

export default Footer;

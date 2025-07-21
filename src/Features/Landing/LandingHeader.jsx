function LandingHeader() {
  return (
    <div className="flex flex-col-reverse md:flex-row max-w-6xl mx-auto justify-between">
      <div className="flex flex-col pt-24 m-4">
        <span className="font-Vazirmatn-Medium text-lg text-gray-400 pb-3">
          سامانه آنلاین
        </span>
        <span className="font-Vazirmatn-ExtraBold text-3xl pb-5">
          نوبت دهی اینترنتی دندانپزشکان ایران
        </span>
        <span className="text-gray-400 font-Vazirmatn-Light pb-9">
          سایت دندانپزشکان ایران ، مرجع نوبت دهی و معرفی بهترین دندانپزشکان در
          ایران می باشد. <br />
          از دندانپزشکان معتبر نوبت بگیرید و از تخفیف خدمات دندانپزشکی بهره مند
          شوید.
        </span>
        <span className="text-blue-500 font-Vazirmatn-Medium">
          برای مشاهده دندانپزشکان، نام تخصص، نام دندانپزشک، شهر یا محله را جستجو
          کنید
        </span>
        <div className="flex items-center w-full">
          <input
            className="rounded-l-none rounded-r-lg font-Vazirmatn-Medium grow focus:outline-none pr-4 border border-blue-400 h-14"
            placeholder="جستجوی دندانپزشکان..."
          />
          <button className="px-4 rounded-l-lg bg-blue-400 text-white h-14">
            <svg className="w-6 h-6">
              <use href="#magnifying-glass"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="max-w-full pt-10 self-center">
        <img src="/public/Pictures/home-images/1.png" />
      </div>
    </div>
  );
}

export default LandingHeader;

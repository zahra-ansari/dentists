import { useForm } from "react-hook-form";
import DentistDashboardHeader from "../../../Features/DentistDashboard/DentistDashboardHeader";
import useGetCategoryArticle from "./useGetCategoryArticle";
import useCreateArticle from "./useCreateArticle";

function ManageArticles() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { categoryArticle } = useGetCategoryArticle();
  const { createArticle } = useCreateArticle();

  const onSubmit = (data) => {
    const { title, category, image, content } = data;

    const findedCategory = categoryArticle.find(
      (item) => item.name === category
    );

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", findedCategory.id);
    formData.append("content", content);
    formData.append("image", image[0]);

    createArticle(formData);
  };

  return (
    <div className="flex flex-col basis-4xl lg:basis-2/3">
      <DentistDashboardHeader />
      <form className="mt-10 mx-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="font-Vazirmatn-Medium ml-3">
            عنوان مجله:
          </label>
          <input
            className="font-Vazirmatn-Light border border-gray-300 rounded-lg focus:outline-none"
            {...register("title", {
              required: "پر کردن عنوان مقاله ضروری است",
            })}
            id="title"
          />
          {errors.title && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.title.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="font-Vazirmatn-Medium ml-3">
            نوع دسته بندی مقاله را انتخاب کنید:
          </label>
          <select
            className="font-Vazirmatn-Light border border-gray-300 rounded-lg"
            {...register("category", {
              required: "انتخاب یکی از دسته بندی ها ضروری است",
            })}
            id="category"
          >
            <option value="">انتخاب کنید:</option>
            {categoryArticle.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.category.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="font-Vazirmatn-Medium ml-3">
            متن مقاله:
          </label>
          <textarea
            id="content"
            className="w-full h-80 resize-none font-Vazirmatn-Light border border-gray-300 rounded-lg focus:outline-none"
            {...register("content", {
              required: "پر کردن متن مقاله ضروری است",
            })}
          ></textarea>
          {errors.content && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.content.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            style={{ display: "none" }}
            {...register("image", {
              required: "آپلود کردن عکس مقاله ضروری است",
            })}
          />
          <label htmlFor="image" className="flex items-center gap-x-2">
            <span className="font-Vazirmatn-Light">
              برای درج عکس مقاله روی آیکن دوربین کلیک کنید
            </span>
            <svg className="w-12 h-12">
              <use href="#camera"></use>
            </svg>
          </label>
          {errors.image && (
            <span className="text-red-400 font-Vazirmatn-Light">
              {errors.image.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="font-Vazirmatn-Medium bg-blue-400 text-white rounded-xl py-3 px-7"
        >
          ثبت مقاله
        </button>
      </form>
    </div>
  );
}

export default ManageArticles;

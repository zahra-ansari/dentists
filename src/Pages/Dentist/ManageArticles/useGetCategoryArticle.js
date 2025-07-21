import { useQuery } from "@tanstack/react-query";
import { getCategoryArticle } from "../../../services/ApiArticles";

function useGetCategoryArticle() {
  const { isLoading: isLoadingCategoryArticle, data: categoryArticle } =
    useQuery({
      queryKey: ["categoryArticle"],
      queryFn: getCategoryArticle,
    });

  return { isLoadingCategoryArticle, categoryArticle };
}

export default useGetCategoryArticle;

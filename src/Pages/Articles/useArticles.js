import { useQuery } from "@tanstack/react-query";
import { getArticlesList } from "../../services/ApiArticles";

function useArticles() {
  const { isLoading: isLoadingArticles, data: articlesList } = useQuery({
    queryKey: ["articlesList"],
    queryFn: getArticlesList,
  });

  return { isLoadingArticles, articlesList };
}

export default useArticles;

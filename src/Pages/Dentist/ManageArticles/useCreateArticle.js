import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticleApi } from "../../../services/ApiArticles";
import toast from "react-hot-toast";

function useCreateArticle() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingCreateArticle, mutate: createArticle } =
    useMutation({
      mutationFn: (formData) => createArticleApi(formData),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["article"] });
        toast.success("مقاله با موفقیت ثبت شد");
      },
    });

  return { isLoadingCreateArticle, createArticle };
}

export default useCreateArticle;

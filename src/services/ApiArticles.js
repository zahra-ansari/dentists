export async function getCategoryArticle() {
  try {
    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/blogs/category_list/",
      { method: "GET" }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createArticleApi(formData) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/blogs/create/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getArticlesList() {
  try {
    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/blogs/",
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error);
  }
}

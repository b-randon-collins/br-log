// src/articlesListPage.js
import { handleClick } from "../../index.js";

async function loadArticlesListPage() {
  try {
    const response = await fetch("http://localhost:3041/articles"); // Fetch articles
    const articles = await response.json();
    const container = document.getElementById("content-container");
    container.innerHTML = "";

    const h1PageTitle = document.createElement("h1");
    h1PageTitle.textContent = "Articles";
    container.appendChild(h1PageTitle);

    const div = document.createElement("div");
    div.className = "articles-page";

    articles.forEach((article) => {
      const wrapper = document.createElement("div");
      wrapper.className = "article-wrapper";

      const listItem = document.createElement("div");
      listItem.className = "articles-list-card";

      const link = document.createElement("a");
      link.href = `/articles/?id=${article.id}`;
      link.className = "title";
      link.textContent = article.title;
      link.addEventListener("click", handleClick);
      listItem.appendChild(link);

      const techTagsContainer = document.createElement("span");
      techTagsContainer.className = "technology-tag";
      techTagsContainer.textContent = `${article.technologyTags.join(", ")}`;
      listItem.appendChild(techTagsContainer);

      const description = document.createElement("p");
      description.textContent = article.description;
      listItem.appendChild(description);

      const metaTagsContainer = document.createElement("div");
      metaTagsContainer.className = "meta-tags-container";

      article.metaTags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag";
        tagSpan.textContent = tag;
        metaTagsContainer.appendChild(tagSpan);
      });

      listItem.appendChild(metaTagsContainer);

      wrapper.appendChild(listItem);
      div.appendChild(wrapper);
    });

    container.appendChild(div);
  } catch (error) {
    console.error("Failed to load articles:", error);
  }
}

export { loadArticlesListPage };

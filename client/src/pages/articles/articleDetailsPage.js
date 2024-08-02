// src/articlesListPage.js
import { handleClick } from "../../index.js";

async function loadArticleDetailsPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      console.error("Article ID not found in URL");
      return;
    }

    const response = await fetch(`http://localhost:3041/articles/${id}`);
    const articleData = await response.json();
    const container = document.getElementById("content-container");
    container.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = articleData.title;

    const editButton = document.createElement("a");
    editButton.href = `/articles/edit/?id=${articleData.id}`;
    editButton.className = 'edit-button';
    editButton.textContent = "Edit";
    editButton.addEventListener("click", handleClick);

    const description = document.createElement("p");
    description.textContent = articleData.description;
    
    const body = document.createElement("p");
    body.textContent = articleData.body;

    container.appendChild(h1);
    container.appendChild(editButton);
    container.appendChild(description);
    container.appendChild(body);
  } catch (error) {
    console.error("Failed to load article details:", error);
  }
}

export { loadArticleDetailsPage };

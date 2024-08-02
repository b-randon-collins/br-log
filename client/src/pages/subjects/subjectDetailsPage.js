import { handleClick } from "../../index.js";
import { fetchAndDisplayLessons } from "./lessonHandler.js";

async function loadSubjectDetailsPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const page = parseInt(urlParams.get("page")) || 1;

    if (!id) {
      console.error("Subject ID not found in URL");
      return;
    }

    const response = await fetch(`http://localhost:3041/subjects/${id}`);
    const subjectData = await response.json();
    const container = document.getElementById("content-container");
    container.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = subjectData.title;
    container.appendChild(h1);

    const editButton = document.createElement("a");
    editButton.href = `/subjects/edit/?id=${subjectData.id}`;
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", handleClick);
    container.appendChild(editButton);

    const description = document.createElement("p");
    description.textContent = subjectData.description;
    container.appendChild(description);

    const body = document.createElement("p");
    body.textContent = subjectData.body;
    container.appendChild(body);
    
    await fetchAndDisplayLessons(id, container);

  } catch (error) {
    console.error("Failed to load subject details:", error);
  }
}


export { loadSubjectDetailsPage };

// src/subjectsListPage.js
import { handleClick } from "../../index.js";

async function loadSubjectListPage() {
  try {
    const response = await fetch("http://localhost:3041/subjects");
    const subjects = await response.json();
    const container = document.getElementById("content-container");
    container.innerHTML = "";

    const h1PageTitle = document.createElement("h1");
    h1PageTitle.textContent = "Subjects";
    container.appendChild(h1PageTitle);

    const div = document.createElement("div");
    div.className = "subjects-page";

    subjects.forEach((subject) => {
      const wrapper = document.createElement("div");
      wrapper.className = "subject-wrapper";

      const listItem = document.createElement("div");
      listItem.className = "subject-list-card";

      const a = document.createElement("a");
      a.href = `/subjects/?id=${subject.id}`;

      const img = document.createElement("img");
      img.src = subject.imageUrl;
      a.appendChild(img);
      listItem.appendChild(a);

      const h1 = document.createElement("h1");

      const link = document.createElement("a");
      link.href = `/subjects/?id=${subject.id}`;
      link.textContent = subject.title;
      link.addEventListener("click", handleClick);
      h1.appendChild(link);
      listItem.appendChild(h1);

      const description = document.createElement("p");
      description.textContent = subject.description;
      listItem.appendChild(description);

      wrapper.appendChild(listItem);
      div.appendChild(wrapper);
    });

    container.appendChild(div);
  } catch (error) {
    console.error("Failed to load subjects:", error);
  }
}

export { loadSubjectListPage };

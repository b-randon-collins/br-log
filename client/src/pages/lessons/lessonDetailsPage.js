// src/loadLessonDetailsPage.js
import { handleClick } from "../../index.js";
import { subjectNavigation } from "../../components/subjectNavigation.js";

async function loadLessonDetailsPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get("id");

    if (!lessonId) {
      console.error("Lesson ID not found in URL");
      return;
    }

    const lessonResponse = await fetch(
      `http://localhost:3041/lessons/${lessonId}`
    );
    const lessonData = await lessonResponse.json();

    if (!lessonData) {
      console.error("Lesson not found");
      return;
    }

    const parentSubjectId = lessonData.parentId;

    const subjectResponse = await fetch(
      `http://localhost:3041/subjects/${parentSubjectId}`
    );
    const subjectData = await subjectResponse.json();
    const parentSubjectName = subjectData.title;

    const container = document.getElementById("content-container");
    container.innerHTML = ""; // Clear existing content

    const lessonsPage = document.createElement("div");
    lessonsPage.className = "lessons-details-page";

    const leftColumn = document.createElement("div");
    leftColumn.className = "left-column";

    const subjectImage = document.createElement("img");
    subjectImage.src = subjectData.imageUrl;
    subjectImage.alt = parentSubjectName;

    leftColumn.appendChild(subjectImage);
    await subjectNavigation(parentSubjectId, parentSubjectName, leftColumn);

    const rightColumn = document.createElement("div");
    rightColumn.className = "right-column";

    const h1 = document.createElement("h1");
    h1.textContent = lessonData.title;
    rightColumn.appendChild(h1);

    const editButton = document.createElement("a");
    editButton.href = `/lessons/edit/?id=${lessonData.id}`;
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", handleClick);
    rightColumn.appendChild(editButton);

    const breadcrumb = document.createElement("p");
    breadcrumb.className = "breadcrumb";
    rightColumn.appendChild(breadcrumb);

    const subjectsLink = document.createElement("a");
    subjectsLink.href = "/subjects";
    subjectsLink.textContent = "Subjects";
    breadcrumb.appendChild(subjectsLink);

    const separator = document.createTextNode(" > ");
    breadcrumb.appendChild(separator);

    const subjectLink = document.createElement("a");
    subjectLink.href = `/subjects/?id=${parentSubjectId}`;
    subjectLink.textContent = parentSubjectName;
    breadcrumb.appendChild(subjectLink);

    const description = document.createElement("p");
    description.textContent = lessonData.description;
    rightColumn.appendChild(description);

    const body = document.createElement("p");
    body.textContent = lessonData.body;
    rightColumn.appendChild(body);

    const content = document.createElement("p");
    content.textContent = lessonData.content;
    rightColumn.appendChild(content);

    lessonsPage.appendChild(leftColumn);
    lessonsPage.appendChild(rightColumn);

    container.appendChild(lessonsPage);
  } catch (error) {
    console.error("Failed to load lesson details:", error);
  }
}

export { loadLessonDetailsPage };

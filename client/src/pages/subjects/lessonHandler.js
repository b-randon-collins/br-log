import { handleClick } from "../../index.js";

async function fetchAndDisplayLessons(subjectId, container) {
  try {
    const response = await fetch(
      `http://localhost:3041/lessons?parentId=${subjectId}`
    );
    const lessonsData = await response.json();
    console.log("lessonsData", lessonsData);

    if (!container) {
      console.error("Container element not found");
      return;
    }

    if (!Array.isArray(lessonsData)) {
      console.error("Lessons data is not an array");
      return;
    }

    const lessonsDiv = document.createElement("div");

    lessonsData.forEach((lesson) => {
      const lessonDiv = document.createElement("div");

      const lessonTitleLink = document.createElement("a");
      lessonTitleLink.textContent = lesson.title;
      lessonTitleLink.href = `/lessons/?id=${lesson.id}`;
      lessonTitleLink.addEventListener("click", handleClick);

      const lessonDescription = document.createElement("p");
      lessonDescription.textContent = lesson.description;

      lessonDiv.appendChild(lessonTitleLink);
      lessonDiv.appendChild(lessonDescription);
      lessonsDiv.appendChild(lessonDiv);
    });

    container.appendChild(lessonsDiv);
  } catch (error) {
    console.error("Failed to fetch and display lessons:", error);
  }
}

export { fetchAndDisplayLessons };

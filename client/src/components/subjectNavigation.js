import { handleClick } from "../../src/index.js";

async function subjectNavigation(subjectId, parentSubjectName, lessonsPage) {
  try {
    const response = await fetch(
      `http://localhost:3041/lessons/?parentId=${subjectId}`
    );
    const lessonsData = await response.json();

    if (!lessonsData || lessonsData.length === 0) {
      console.log("No lessons found for this subject.");
      return;
    }

    if (!lessonsPage) {
      console.error("Lessons lessonsPage not found");
      return;
    }

    const div = document.createElement("div");
    div.className = "sibling-lesson-nav";

    const h2 = document.createElement("h2");
    console.log(parentSubjectName);
    h2.textContent = parentSubjectName;
    div.appendChild(h2);

    const ul = document.createElement("ul");

    lessonsData.forEach((lesson) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/lessons/?id=${lesson.id}`;
      link.textContent = lesson.title;
      link.addEventListener("click", handleClick);
      li.appendChild(link);
      ul.appendChild(li);
    });

    div.appendChild(ul);
    lessonsPage.appendChild(div);
  } catch (error) {
    console.error("Failed to load subject lessons:", error);
  }
}

export { subjectNavigation };

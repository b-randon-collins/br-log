// src/toolsListPage.js
import { handleClick } from "../../index.js";

async function loadToolListPage() {
  try {
    const response = await fetch("http://localhost:3041/tools");
    const tools = await response.json();
    const container = document.getElementById("content-container");
    container.innerHTML = "";

    const h1PageTitle = document.createElement("h1");
    h1PageTitle.textContent = "Tools";
    container.appendChild(h1PageTitle);

    const div = document.createElement("div");
    div.className = "tools-page";

    tools.forEach((tool) => {
      const wrapper = document.createElement("div");
      wrapper.className = "tool-wrapper";

      const listItem = document.createElement("div");
      listItem.className = "tool-list-card";

      const a = document.createElement("a");
      a.href = `/tools/?id=${tool.id}`;

      const img = document.createElement("img");
      img.src = tool.imageUrl;
      a.appendChild(img);
      listItem.appendChild(a);

      const h1 = document.createElement("h1");

      const link = document.createElement("a");
      link.href = `/tools/?id=${tool.id}`;
      link.textContent = tool.title;
      link.addEventListener("click", handleClick);
      h1.appendChild(link);
      listItem.appendChild(h1);

      const description = document.createElement("p");
      description.textContent = tool.description;
      listItem.appendChild(description);

      wrapper.appendChild(listItem);
      div.appendChild(wrapper);
    });

    container.appendChild(div);
  } catch (error) {
    console.error("Failed to load tools:", error);
  }
}

export { loadToolListPage };

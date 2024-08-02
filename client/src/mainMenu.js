// mainMenu.js
import { handleClick } from "./index.js";

async function fetchMenuItems() {
  try {
    const response = await fetch("http://localhost:3041/menu");
    const menuItems = await response.json();
    return menuItems;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}

function generateMenuHTML(menuItems) {
  const menu = document.createElement("nav");
  menu.id = "main-menu";

  const ul = document.createElement("ul");
  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.name;

    a.addEventListener("click", handleClick);

    li.appendChild(a);
    ul.appendChild(li);
  });

  menu.appendChild(ul);
  return menu;
}

export async function renderMainMenu() {
  const menuItems = await fetchMenuItems();
  const menu = generateMenuHTML(menuItems);

  const mainMenuDiv = document.querySelector("#main-menu");
  mainMenuDiv.innerHTML = "";

  mainMenuDiv.appendChild(menu);
}

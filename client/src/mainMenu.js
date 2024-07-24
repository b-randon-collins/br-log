// MainMenu.js

async function fetchMenuItems() {
  console.log("fetchMenuItems");
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
      console.log("generateMenuHTML");

  const menu = document.createElement("nav");
  menu.id = "main-menu";

  const ul = document.createElement("ul");
  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);
  });

  menu.appendChild(ul);
  return menu;
}

export async function renderMainMenu() {
    console.log("renderMainMenu");

  const menuItems = await fetchMenuItems();
  const menu = generateMenuHTML(menuItems);
  document.body.appendChild(menu);
}

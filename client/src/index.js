import { renderMainMenu } from "./mainMenu.js";
import { loadHomePage } from "./homePage.js";
import { loadArticlesListPage } from "./pages/articles/articlesListPage.js";
import { loadArticleDetailsPage } from "./pages/articles/articleDetailsPage.js";
import { loadAboutMePage } from "./aboutMePage.js";
import { loadArticleCreatePage } from "./pages/articles/articleCreatePage.js";
import { loadArticleEditPage } from "./pages/articles/articleEditPage.js";
import { loadSubjectListPage } from "./pages/subjects/subjectsListPage.js";
import { loadSubjectDetailsPage } from "./pages/subjects/subjectDetailsPage.js";
import { loadSubjectEditPage } from "./pages/subjects/subjectEditPage.js";
import { loadLessonDetailsPage } from "./pages/lessons/lessonDetailsPage.js";
import { loadLessonEditPage } from "./pages/lessons/lessonEditPage.js";
import { loadSubjectCreatePage } from "./pages/subjects/subjectCreatePage.js";
import { loadToolListPage } from "./pages/tools/toolListPage.js";

function addStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "../../style.css";
  document.head.appendChild(link);
}

addStylesheet();

const routes = [
  { path: "/about-me/", handler: loadAboutMePage },
  { path: "/about-me", handler: loadAboutMePage },

  { path: "/tools/", handler: loadToolListPage },
  { path: "/tools", handler: loadToolListPage },

  { path: "/subjects/create", handler: loadSubjectCreatePage },
  { path: "/subjects/create/", handler: loadSubjectCreatePage },

  { path: "/subjects/edit/?id=", handler: loadSubjectEditPage },
  { path: "/subjects/?id=", handler: loadSubjectDetailsPage },
  { path: "/subjects/", handler: loadSubjectListPage },
  { path: "/subjects", handler: loadSubjectListPage },

  { path: "/lessons/edit/?id=", handler: loadLessonEditPage },
  { path: "/lessons/?id=", handler: loadLessonDetailsPage },

  { path: "/articles/create", handler: loadArticleCreatePage },
  { path: "/articles/create/", handler: loadArticleCreatePage },
  { path: "/articles/edit/?id=", handler: loadArticleEditPage },
  { path: "/articles/?id=", handler: loadArticleDetailsPage },
  { path: "/articles/", handler: loadArticlesListPage },
  { path: "/articles", handler: loadArticlesListPage },

  { path: "/", handler: loadHomePage },
];

function handlePopStateEvent() {
  const url = window.location.pathname + window.location.search;
  const matchedRoute = routes.find((route) => url.startsWith(route.path));

  if (matchedRoute) {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam) {
      matchedRoute.handler(idParam);
    } else {
      matchedRoute.handler();
    }
  } else {
    console.log(`No matching route found for URL: ${url}`);
  }
}

window.addEventListener("popstate", handlePopStateEvent);

handlePopStateEvent();

export function handleClick(event) {
  event.preventDefault();
  // console.log("Link clicked:", event.target.href);
  const url = event.target.getAttribute("href").replace(/\/+$/, ""); // Remove trailing slashes
  history.pushState(null, null, url);

  const container = document.getElementById("content-container");
  container.innerHTML = "";

  const route = routes.find((route) => url.startsWith(route.path));

  if (route) {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    route.handler(idParam);
  } else {
    // console.log(`No matching route found for URL: ${url}`);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderMainMenu(handleClick);
  // console.log("Current URL:", window.location.href);

  const simplifiedUrl = `${window.location.pathname}${window.location.search}`;
  // console.log(`Simplified URL: ${simplifiedUrl}`);

  for (const { path, handler } of routes) {
    // console.log(`Checking route: ${path} vs. ${simplifiedUrl}`);

    if (simplifiedUrl.startsWith(path)) {
      // console.log(`Matched route: ${path}`);
      handler();
      break;
    }
  }

  if (!routes.some((route) => simplifiedUrl.startsWith(route.path))) {
    console.log(`Initial handler for ${simplifiedUrl} not found`);
  }
});

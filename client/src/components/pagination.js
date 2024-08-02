// src/components/pagination.js

export function createStaticPagination() {
  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Prev";
  prevButton.disabled = true; // Static button, no previous page

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = true; // Static button, no next page

  const pageInfo = document.createElement("span");
  pageInfo.textContent = "Page 1 of 1"; // Static page info

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}


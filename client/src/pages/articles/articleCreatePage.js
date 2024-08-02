// Import saveNewArticle if it's in a different module
async function saveNewArticle(article) {
  try {
    const safeArticle = {
      ...article,
      __quill: undefined,
    };

    const response = await fetch("http://localhost:3041/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(safeArticle),
    });

    if (!response.ok) {
      throw new Error("Failed to save the article");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving article:", error);
    throw error;
  }
}

async function loadArticleCreatePage() {
  try {
    const container = document.getElementById("content-container");
    container.innerHTML = `
      <h1>Create New Article</h1>
      <form id="create-article-form">
        <label for="title">Title:</label>
        <input type="text" id="title" required><br>
        <label for="description">Description:</label>
        <textarea id="description" rows="4" cols="50" required></textarea><br>
        <label for="body">Body:</label>
        <textarea id="body" rows="4" cols="50" required></textarea><br>
        <label for="content">Content:</label>
        <textarea id="content" rows="4" cols="50" required></textarea><br>
        <button type="submit">Submit</button>
      </form>
    `;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../../../quill.snow.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "../../../quill.js";
    script.onload = function () {
      var quill = new Quill("#content", {
        theme: "snow",
      });
    };
    document.body.appendChild(script);


    
    const form = document.getElementById("create-article-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;

      try {
        const newArticle = await saveNewArticle({ title, description, body, content });

        if (newArticle && newArticle.id) {
          window.location.href = `/articles/?id=${newArticle.id}`;
        } else {
          console.error("Failed to get the new article ID");
        }
      } catch (error) {
        console.error("Failed to save the new article:", error);
      }
    });
  } catch (error) {
    console.error("Failed to load create article page:", error);
  }
}

export { loadArticleCreatePage };

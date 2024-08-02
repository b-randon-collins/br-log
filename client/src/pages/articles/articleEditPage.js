

async function loadArticleEditPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const response = await fetch(`http://localhost:3041/articles/${id}`); // Fetch the article to edit
    const articleData = await response.json();

    const container = document.getElementById("content-container");
    container.innerHTML = `
            <h1>Edit Article</h1>
            <form id="edit-article-form">
                <label for="title">Title:</label>
                <input type="text" id="title" value="${articleData.title}" required><br>
                <label >Description:</label>
                <textarea id="description" rows="4" cols="50">${articleData.description}</textarea><br>
                <label for="body">Body:</label>
                <div id="body">${articleData.body}</div><br>
                <button type="submit">Update</button>
            </form>
        `;

    // Dynamically load Quill's CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../../quill.snow.css';
    document.head.appendChild(link);

    // Dynamically load Quill's JavaScript
    const script = document.createElement('script');
    script.src = '../../../quill.js';
    script.onload = function() {
      var quill = new Quill("#body", {
        theme: "snow",
      });
    };
    document.body.appendChild(script);

    async function updateArticle(id, updatedData) {
      try {
        const response = await fetch(`http://localhost:3041/articles/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Article updated successfully");
      } catch (error) {
        console.error("Failed to update article:", error);
      }
    }

    const form = document.getElementById("edit-article-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value; // Get the edited content from the textarea
      const body = quill.root.innerHTML; // Get the edited content from the Quill editor

      // Convert HTML to plain text if needed
      const plainTextBody = body.replace(/<[^>]*>?/gm, ""); // Simple regex to remove HTML tags

      await updateArticle(id, { title, description, body: plainTextBody }); // Send plain text body if necessary
      const updatedArticleUrl = `/articles/?id=${id}`;
      window.location.href = updatedArticleUrl;
    });

  } catch (error) {
    console.error("Failed to load article data or update article:", error);
  }
}

export { loadArticleEditPage };

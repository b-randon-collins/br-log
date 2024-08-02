// Import saveNewTool if it's in a different module
async function saveNewTool(Tool) {
  try {
    const response = await fetch("http://localhost:3041/tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Tool),
    });

    if (!response.ok) {
      throw new Error("Failed to save the Tool");
    }

    return await response.json(); // Ensure this returns the created Tool including its ID
  } catch (error) {
    console.error("Error saving Tool:", error);
    throw error; // Re-throw error to be handled in the caller
  }
}

async function loadToolCreatePage() {
  try {
    const container = document.getElementById("content-container");
    container.innerHTML = `
      <h1>Create New Tool</h1>
      <form id="create-Tool-form">
        <label for="title">Title:</label>
        <input type="text" id="title" required><br>
        <label for="description">Description:</label>
        <textarea id="description" rows="4" cols="50" required></textarea><br>
        <button type="submit">Submit</button>
      </form>
    `;

    const form = document.getElementById("create-Tool-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;

      try {
        const newTool = await saveNewTool({ title, description });

        if (newTool && newTool.id) {
          window.location.href = `/tools/?id=${newTool.id}`;
        } else {
          console.error("Failed to get the new Tool ID");
        }
      } catch (error) {
        console.error("Failed to save the new Tool:", error);
      }
    });
  } catch (error) {
    console.error("Failed to load create Tool page:", error);
  }
}

export { loadToolCreatePage };

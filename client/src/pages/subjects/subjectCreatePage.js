// Import saveNewSubject if it's in a different module
async function saveNewSubject(Subject) {
  try {
    const response = await fetch("http://localhost:3041/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Subject),
    });

    if (!response.ok) {
      throw new Error("Failed to save the Subject");
    }

    return await response.json(); // Ensure this returns the created Subject including its ID
  } catch (error) {
    console.error("Error saving Subject:", error);
    throw error; // Re-throw error to be handled in the caller
  }
}

async function loadSubjectCreatePage() {
  try {
    const container = document.getElementById("content-container");
    container.innerHTML = `
      <h1>Create New Subject</h1>
      <form id="create-Subject-form">
        <label for="title">Title:</label>
        <input type="text" id="title" required><br>
        <label for="description">Description:</label>
        <textarea id="description" rows="4" cols="50" required></textarea><br>
        <button type="submit">Submit</button>
      </form>
    `;

    const form = document.getElementById("create-Subject-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;

      try {
        const newSubject = await saveNewSubject({ title, description });

        if (newSubject && newSubject.id) {
          window.location.href = `/subjects/?id=${newSubject.id}`;
        } else {
          console.error("Failed to get the new Subject ID");
        }
      } catch (error) {
        console.error("Failed to save the new Subject:", error);
      }
    });
  } catch (error) {
    console.error("Failed to load create Subject page:", error);
  }
}

export { loadSubjectCreatePage };

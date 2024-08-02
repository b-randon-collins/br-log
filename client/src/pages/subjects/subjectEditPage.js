// src/subjectEditPage.js

async function loadSubjectEditPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const response = await fetch(`http://localhost:3041/subjects/${id}`); // Fetch the subject to edit
    const subjectData = await response.json();

    const container = document.getElementById("content-container");
    container.innerHTML = `
      <h1>Edit Subject</h1>
      <form id="edit-subject-form">
        <label for="title">Title:</label>
        <input type="text" id="title" value="${subjectData.title}" required><br>
        <label for="description">Description:</label>
        <textarea id="description" rows="4" cols="50" value="${subjectData.description}" required>${subjectData.description}</textarea><br>
        <button type="submit">Update</button>
      </form>
    `;

    async function updateSubject(id, updatedData) {
      try {
        const response = await fetch(`http://localhost:3041/subjects/${id}`, {
          method: "PUT", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Set the content type header
          },
          body: JSON.stringify(updatedData), // Send the updated data as JSON
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Optionally, handle successful updates here (e.g., show a success message)
        console.log("Subject updated successfully");
      } catch (error) {
        console.error("Failed to update subject:", error);
      }
    }

    const form = document.getElementById("edit-subject-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;

      // Call the updateSubject function with the subject ID and updated data
      await updateSubject(id, { title, description });
      const updatedSubjectUrl = `/subjects/?id=${id}`;

      // Redirect back to the subjects list or show a success message
      window.location.href = updatedSubjectUrl;
    });
  } catch (error) {
    console.error("Failed to load subject data or update subject:", error);
  }
}

export { loadSubjectEditPage };

// exportJson.js

function setupExportListeners() {
  const exportJsonButton = document.getElementById("export-json");
  if (!exportJsonButton) return;

  exportJsonButton.addEventListener("click", () => {
    console.log("⬇️ Exporting JSON...");

    const title = document.getElementById("doc-title").value.trim() || "Untitled";
    const author = document.getElementById("doc-author").value.trim() || "Author";
    const date = document.getElementById("doc-date").value || new Date().toISOString().split("T")[0];

    const questions = [];
    const grouped = {};

    ckeditors.forEach(entry => {
      const id = entry.container.dataset.qid || entry.container;
      if (!grouped[id]) grouped[id] = { options: [], container: entry.container };

      const data = entry.editor.getData().trim();
      if (entry.type === 'question') {
        grouped[id].question = data;
      } else {
        grouped[id].options[entry.index] = data;
      }
    });

    Object.values(grouped).forEach((q, index) => {
      const difficulty = q.container.querySelector('.difficulty')?.value || 'medium';
      questions.push({
        question_number: index + 1,
        question_type: difficulty,
        question: q.question || "",
        options: q.options
      });
    });

    const jsonData = {
      document_name: title,
      author: author,
      date: date,
      questions: questions,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 4)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = generateFileName("json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showStatusMessage("✅ JSON exported successfully!");
  });
}
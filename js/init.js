document.addEventListener("DOMContentLoaded", function () {
  if (window.scriptLoaded) return;
  window.scriptLoaded = true;

  console.log("✅ App Initialized");

  // Load previously saved questions
  loadSavedQuestions();

  // Add one default question block if none exist
  const questionContainer = document.getElementById("question-container");
  if (questionContainer.children.length === 0) {
    createQuestionBlock();
  }

  // Button actions
  document.getElementById("add-question")?.addEventListener("click", () => {
    createQuestionBlock();
    showStatusMessage("✅ Question added!");
  });

  document.getElementById("undo-action")?.addEventListener("click", () => {
    undoLastAction();
  });

  document.getElementById("save-progress")?.addEventListener("click", () => {
    saveQuestionsToLocal();
    alert("✅ Progress Saved!");
  });

  document.getElementById("reset-page")?.addEventListener("click", () => {
    if (confirm("⚠️ Are you sure you want to reset everything?")) {
      resetAll();
    }
  });

  // ✅ Initialize export functions
  setupExportListeners();   // JSON
  setupLatexExport();       // LaTeX
  setupPdfExport();         // PDF
});

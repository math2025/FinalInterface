// init.js

document.addEventListener("DOMContentLoaded", async function () {
  if (window.scriptLoaded) return;
  window.scriptLoaded = true;

  console.log("✅ App Initialized");

  // Element references
  const questionContainer = document.getElementById("question-container");
  const addQuestionButton = document.getElementById("add-question");
  const undoActionButton = document.getElementById("undo-action");
  const saveButton = document.getElementById("save-progress");
  const resetButton = document.getElementById("reset-page");

  // Load saved questions
  loadSavedQuestions();

  // Add default question if none loaded
  if (questionContainer.children.length === 0) {
    createQuestionBlock();
  }

  // Add new question
  addQuestionButton?.addEventListener("click", () => {
    createQuestionBlock();
    showStatusMessage("✅ Question added!");
  });

  // Undo delete
  undoActionButton?.addEventListener("click", () => {
    undoLastAction();
  });

  // Save progress
  saveButton?.addEventListener("click", () => {
    saveQuestionsToLocal();
    alert("✅ Progress Saved!");
  });

  // Reset everything
  resetButton?.addEventListener("click", () => {
    if (confirm("⚠️ Are you sure you want to reset everything?")) {
      resetAll();
    }
  });

  // Export bindings
  setupExportListeners();
});
function saveQuestionsToLocal() {
  const title = document.getElementById("doc-title").value.trim();
  const author = document.getElementById("doc-author").value.trim();
  const date = document.getElementById("doc-date").value;

  const questions = [];

  document.querySelectorAll(".question-box").forEach((box, index) => {
    const questionEditorEl = box.querySelector(".tiptap-question");
    const question = questionEditorEl?.editor?.getJSON?.() || {};

    const difficulty = box.querySelector(".difficulty").value;

    const options = [];
    box.querySelectorAll(".option-block").forEach((optionDiv) => {
      const optionEditorEl = optionDiv.querySelector(".tiptap-option");
      const optionJSON = optionEditorEl?.editor?.getJSON?.() || {};
      options.push(optionJSON);
    });

    questions.push({
      question_number: index + 1,
      question,
      difficulty,
      options
    });
  });

  const dataToSave = { title, author, date, questions };
  localStorage.setItem("savedQuestions", JSON.stringify(dataToSave));
  showStatusMessage("✅ Progress saved successfully!");
}

function loadSavedQuestions() {
  const savedData = JSON.parse(localStorage.getItem("savedQuestions"));
  if (!savedData) return;

  document.getElementById("doc-title").value = savedData.title || "";
  document.getElementById("doc-author").value = savedData.author || "";
  document.getElementById("doc-date").value = savedData.date || "";

  savedData.questions.forEach((q) => createQuestionBlock(q));
}

function resetAll() {
  localStorage.removeItem("savedQuestions");
  document.getElementById("doc-title").value = "";
  document.getElementById("doc-author").value = "";
  document.getElementById("doc-date").value = "";
  document.getElementById("question-container").innerHTML = "";
  createQuestionBlock();
  showStatusMessage("🔄 Page reset successfully!", "success");
}

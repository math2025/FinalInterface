// storage.js

function saveQuestionsToLocal() {
  const title = document.getElementById("doc-title").value.trim();
  const author = document.getElementById("doc-author").value.trim();
  const date = document.getElementById("doc-date").value;

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

  const dataToSave = { title, author, date, questions };
  localStorage.setItem("savedQuestions", JSON.stringify(dataToSave));
}

function loadSavedQuestions() {
  const savedData = JSON.parse(localStorage.getItem("savedQuestions"));
  if (!savedData || !savedData.questions) return;

  document.getElementById("doc-title").value = savedData.title || "";
  document.getElementById("doc-author").value = savedData.author || "";
  document.getElementById("doc-date").value = savedData.date || "";

  savedData.questions.forEach(q => createQuestionBlock(q));
}

function resetAll() {
  localStorage.removeItem("savedQuestions");

  document.getElementById("doc-title").value = "";
  document.getElementById("doc-author").value = "";
  document.getElementById("doc-date").value = "";

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  createQuestionBlock();
  showStatusMessage("🔄 Page reset successfully!", "success");
}
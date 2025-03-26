// questionManager.js

let questionHistory = []; // For undo support
let ckeditors = []; // Global CKEditor instances

function createQuestionBlock(questionData = null) {
  const questionContainer = document.getElementById("question-container");

  const questionBox = document.createElement("div");
  questionBox.classList.add("question-box", "bg-gray-50", "p-4", "rounded-lg", "shadow-sm", "mt-4", "relative");

  questionBox.innerHTML = `
    <button class="delete-question absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">🗑️</button>

    <label class="block text-gray-700 font-medium mt-2">🧮 Math Editor:</label>
    <div class="math-field border border-gray-300 rounded-md p-2 bg-white mt-1"></div>

    <div class="mt-2">
      <input type="file" class="question-image hidden" accept="image/*">
      <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
      <div class="question-image-preview mt-2"></div>
    </div>

    <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
    <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
      <option value="easy">Easy</option>
      <option value="medium" selected>Medium</option>
      <option value="hard">Hard</option>
    </select>

    <label class="block text-gray-700 font-medium mt-2">Options:</label>
    <div class="options-container mt-2 space-y-2">
      <div class="flex items-center space-x-2">
        <input type="text" class="option-input ck-option w-full p-2 border border-gray-300 rounded-md" placeholder="Option A">
        <input type="file" class="option-image hidden" accept="image/*">
        <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
        <div class="option-image-preview"></div>
        <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
      </div>
    </div>

    <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
  `;

  // Delete Question
  questionBox.querySelector(".delete-question").addEventListener("click", () => {
    questionHistory.push(questionBox.outerHTML);
    questionBox.remove();
    showStatusMessage("❌ Question deleted! Click 'Undo' to restore.", "error");
  });

  // Upload Image (Question)
  questionBox.querySelector(".upload-question-image").addEventListener("click", () => {
    questionBox.querySelector(".question-image").click();
  });
  questionBox.querySelector(".question-image").addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = function (evt) {
      questionBox.querySelector(".question-image-preview").innerHTML =
        `<img src="${evt.target.result}" class="w-24 h-24 object-cover">`;
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  // Add Option Button
  questionBox.querySelector(".add-option").addEventListener("click", () => {
    const optionsContainer = questionBox.querySelector(".options-container");

    const optionDiv = document.createElement("div");
    optionDiv.classList.add("flex", "items-center", "space-x-2", "mt-2");

    optionDiv.innerHTML = `
      <input type="text" class="option-input ck-option w-full p-2 border border-gray-300 rounded-md" placeholder="New Option">
      <input type="file" class="option-image hidden" accept="image/*">
      <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
      <div class="option-image-preview"></div>
      <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
    `;

    optionsContainer.appendChild(optionDiv);

    optionDiv.querySelector(".upload-option-image").addEventListener("click", () => {
      optionDiv.querySelector(".option-image").click();
    });

    optionDiv.querySelector(".option-image").addEventListener("change", (event) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        optionDiv.querySelector(".option-image-preview").innerHTML =
          `<img src="${e.target.result}" class="w-16 h-16 object-cover">`;
      };
      reader.readAsDataURL(event.target.files[0]);
    });

    optionDiv.querySelector(".remove-option").addEventListener("click", () => {
      optionDiv.remove();
    });
  });

  // Attach CKEditor and MathQuill (defer to editor.js)
  initializeMathQuill(questionBox.querySelector(".math-field"));
  initializeCKEditors(questionBox);

  // Append to DOM
  questionContainer.appendChild(questionBox);
}

function undoLastAction() {
  const questionContainer = document.getElementById("question-container");
  if (questionHistory.length > 0) {
    const lastDeletedHTML = questionHistory.pop();
    questionContainer.insertAdjacentHTML("beforeend", lastDeletedHTML);
    showStatusMessage("🔄 Last action undone!");
  } else {
    showStatusMessage("⚠️ No action to undo!", "error");
  }
}
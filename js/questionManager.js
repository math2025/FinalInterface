let questionHistory = [];
let tiptapEditors = [];

function createEditor(element, type, container, index = null) {
  const editor = new Tiptap.Editor({
    element,
    extensions: [
      Tiptap.StarterKit,
      Tiptap.Underline,
      Tiptap.Link,
      Tiptap.Math.create({
        mathInlineClass: 'math-inline',
        mathBlockClass: 'math-block',
        katexOptions: { throwOnError: false }
      })
    ],
    content: element.innerHTML,
    onUpdate: () => {
      element.setAttribute('data-html', editor.getHTML());
    }
  });

  tiptapEditors.push({ type, editor, container, index });
}

function createQuestionBlock(questionData = null) {
  const questionBox = document.createElement("div");
  questionBox.classList.add("question-box", "bg-gray-50", "p-4", "rounded-lg", "shadow-sm", "mt-4", "relative");

  questionBox.innerHTML = `
    <button class="delete-question absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">🗑️</button>

    <label class="block text-gray-700 font-medium">Enter Question:</label>
    <div class="question-input tiptap-question" contenteditable="true">${questionData?.question || ""}</div>

    <div class="mt-2">
      <input type="file" class="question-image hidden" accept="image/*">
      <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
      <div class="question-image-preview mt-2">
        ${questionData?.image ? `<img src="${questionData.image}" class="w-24 h-24 object-cover">` : ""}
      </div>
    </div>

    <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
    <select class="difficulty w-full p-2 border border-gray-300 rounded-md mt-1">
      <option value="easy" ${questionData?.difficulty === "easy" ? "selected" : ""}>Easy</option>
      <option value="medium" ${questionData?.difficulty === "medium" ? "selected" : ""}>Medium</option>
      <option value="hard" ${questionData?.difficulty === "hard" ? "selected" : ""}>Hard</option>
    </select>

    <label class="block text-gray-700 font-medium mt-2">Options:</label>
    <div class="options-container mt-2">
      ${(questionData?.options || ["", ""]).map((option, i) => `
        <div class="flex items-start space-x-2 option-block">
          <div class="option-input tiptap-option w-full" contenteditable="true">${option}</div>
          <div class="flex flex-col space-y-1">
            <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
            <button class="upload-option-image bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 text-xs">📷</button>
            <input type="file" class="option-image hidden" accept="image/*">
            <div class="option-image-preview mt-1"></div>
          </div>
        </div>
      `).join("")}
    </div>

    <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
  `;

  // Add to DOM
  document.getElementById("question-container").appendChild(questionBox);

  // Tiptap Init
  createEditor(questionBox.querySelector(".tiptap-question"), "question", questionBox);
  questionBox.querySelectorAll(".tiptap-option").forEach((optEl, i) => {
    createEditor(optEl, "option", questionBox, i);
  });

  // Question Image Logic
  questionBox.querySelector(".upload-question-image").addEventListener("click", () => {
    questionBox.querySelector(".question-image").click();
  });

  questionBox.querySelector(".question-image").addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      questionBox.querySelector(".question-image-preview").innerHTML = `<img src="${e.target.result}" class="w-24 h-24 object-cover">`;
    };
    reader.readAsDataURL(event.target.files[0]);
  });

  // Delete Question
  questionBox.querySelector(".delete-question").addEventListener("click", () => {
    questionBox.remove();
    showStatusMessage("❌ Question deleted!", "error");
  });

  // Add Option Logic
  questionBox.querySelector(".add-option").addEventListener("click", () => {
    const optionsContainer = questionBox.querySelector(".options-container");
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("flex", "items-start", "space-x-2", "option-block");
    optionDiv.innerHTML = `
      <div class="option-input tiptap-option w-full" contenteditable="true"></div>
      <div class="flex flex-col space-y-1">
        <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
        <button class="upload-option-image bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 text-xs">📷</button>
        <input type="file" class="option-image hidden" accept="image/*">
        <div class="option-image-preview mt-1"></div>
      </div>
    `;
    optionsContainer.appendChild(optionDiv);

    optionDiv.querySelector(".remove-option").addEventListener("click", () => optionDiv.remove());

    optionDiv.querySelector(".upload-option-image").addEventListener("click", () => {
      optionDiv.querySelector(".option-image").click();
    });

    optionDiv.querySelector(".option-image").addEventListener("change", (event) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        optionDiv.querySelector(".option-image-preview").innerHTML = `<img src="${e.target.result}" class="w-16 h-16 object-cover">`;
      };
      reader.readAsDataURL(event.target.files[0]);
    });

    createEditor(optionDiv.querySelector(".tiptap-option"), "option", questionBox, optionsContainer.querySelectorAll(".tiptap-option").length - 1);
  });
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

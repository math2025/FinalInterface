function generateFileName(fileType) {
  // Fetch document details
  let title =
    document.getElementById("doc-title").value.trim() || "Math Questions";
  let author =
    document.getElementById("doc-author").value.trim() || "Unknown Author";
  let date =
    document.getElementById("doc-date").value ||
    new Date().toISOString().split("T")[0];

  // Convert to camel case (remove spaces, capitalize words)
  function toCamelCase(str) {
    return str
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  }

  title = toCamelCase(title);
  author = toCamelCase(author);

  return `${title}_${author}_${date}.${fileType}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  if (window.scriptLoaded) return; // 🔥 Prevents duplicate execution
  window.scriptLoaded = true;

  console.log("Script Loaded Successfully! ✅");

  const questionContainer = document.getElementById("question-container");
  const addQuestionButton = document.getElementById("add-question");
  const undoActionButton = document.getElementById("undo-action");
  const exportJsonButton = document.getElementById("export-json");
  const exportLatexButton = document.getElementById("export-latex");
  const exportPdfButton = document.getElementById("export-pdf");
  const statusMessage = document.getElementById("status-message");

  let questionHistory = []; // Stores deleted questions for undo
  let ckeditors = []; // Global list to track CKEditor instances



  // 🟢 Function to show status messages
  function showStatusMessage(message, type = "success") {
    statusMessage.textContent = message;
    statusMessage.className = `text-center mt-4 p-2 rounded-lg ${
      type === "success"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`;
    statusMessage.classList.remove("hidden");
    setTimeout(() => statusMessage.classList.add("hidden"), 3000);
  }

  function createQuestionBlock(questionData = null) {
    const questionBox = document.createElement("div");
    questionBox.classList.add(
      "question-box",
      "bg-gray-50",
      "p-4",
      "rounded-lg",
      "shadow-sm",
      "mt-4",
      "relative"
    );
  
    questionBox.innerHTML = `
          <!-- 🗑️ Delete Question Button -->
          <button class="delete-question absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition">
              🗑️
          </button>


  
          <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX & Images):</label>
          <div class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input ck-question">${
            questionData ? questionData.question : ""
          }</div>
  
          <div class="mt-2">
              <input type="file" class="question-image hidden" accept="image/*">
              <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
              <div class="question-image-preview mt-2"></div>
          </div>
  
          <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
          <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
              <option value="easy" ${
                questionData && questionData.difficulty === "easy" ? "selected" : ""
              }>Easy</option>
              <option value="medium" ${
                questionData && questionData.difficulty === "medium" ? "selected" : ""
              }>Medium</option>
              <option value="hard" ${
                questionData && questionData.difficulty === "hard" ? "selected" : ""
              }>Hard</option>
          </select>
  
          <label class="block text-gray-700 font-medium mt-2">Options (Text or Image):</label>
  
          <div class="options-container mt-2 space-y-2">
              ${
                questionData
                  ? questionData.options
                      .map(
                        (option, i) => `
                  <div class="flex items-center space-x-2">
                      <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input ck-option w-full" value="${
                        option.text || ""
                      }">
                      <input type="file" class="option-image hidden" accept="image/*">
                      <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
                      <div class="option-image-preview">${
                        option.image
                          ? `<img src="${option.image}" class="w-16 h-16 object-cover">
                             <button class="remove-option-image bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">🗑️</button>`
                          : ""
                      }</div>
                      <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
                  </div>`
                      )
                      .join("")
                  : `
                  <div class="flex items-center space-x-2">
                      <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input ck-option w-full" placeholder="Option A">
                      <input type="file" class="option-image hidden" accept="image/*">
                      <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
                      <div class="option-image-preview"></div>
                      <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
                  </div>
                  <div class="flex items-center space-x-2">
                      <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input ck-option w-full" placeholder="Option B">
                      <input type="file" class="option-image hidden" accept="image/*">
                      <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
                      <div class="option-image-preview"></div>
                      <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
                  </div>
              `
              }
          </div>
  
          <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
      `;


// // 🟢 FIX: Ensure MathQuill is loaded before initializing
// setTimeout(() => {
//   if (typeof MathQuill !== "undefined") {
//       console.log("✅ Initializing MathQuill...");
//       const MQ = MathQuill.getInterface(2);
//       const mathFieldElement = questionBox.querySelector(".math-field");
//       MQ.MathField(mathFieldElement, {
//           spaceBehavesLikeTab: true,
//           handlers: {
//               edit: function () {
//                   console.log("User input equation:", mathFieldElement.textContent);
//               }
//           }
//       });
//   } else {
//       console.error("❌ MathQuill failed to initialize.");
//   }
// }, 200); // Short delay to avoid race conditions
  
    // 🟢 Attach Delete Question Button Event
    questionBox.querySelector(".delete-question").addEventListener("click", function () {
      questionHistory.push(questionBox.outerHTML);
      questionBox.remove();
      showStatusMessage("❌ Question deleted! Click 'Undo' to restore.", "error");
    });
  
    // 🟢 Handle image upload for questions
    questionBox.querySelector(".upload-question-image").addEventListener("click", function () {
      questionBox.querySelector(".question-image").click();
    });
  
    questionBox.querySelector(".question-image").addEventListener("change", function (event) {
      const reader = new FileReader();
      reader.onload = function (e) {
        questionBox.querySelector(".question-image-preview").innerHTML = `<img src="${e.target.result}" class="w-24 h-24 object-cover">`;
      };
      reader.readAsDataURL(event.target.files[0]);
    });
  
    // 🟢 Add Option Button Functionality
    questionBox.querySelector(".add-option").addEventListener("click", function () {
      const optionsContainer = questionBox.querySelector(".options-container");
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("flex", "items-center", "space-x-2", "mt-2");
      optionDiv.innerHTML = `
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
        <input type="file" class="option-image hidden" accept="image/*">
        <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
        <div class="option-image-preview"></div>
        <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
      `;
      optionsContainer.appendChild(optionDiv);
  
      // 🟢 Attach Remove Option event
      optionDiv.querySelector(".remove-option").addEventListener("click", function () {
        optionDiv.remove();
      });
  
      // 🟢 Attach image upload event
      optionDiv.querySelector(".upload-option-image").addEventListener("click", function () {
        optionDiv.querySelector(".option-image").click();
      });
  
      optionDiv.querySelector(".option-image").addEventListener("change", function (event) {
        const reader = new FileReader();
        reader.onload = function (e) {
          optionDiv.querySelector(".option-image-preview").innerHTML = `
            <img src="${e.target.result}" class="w-16 h-16 object-cover">
            <button class="remove-option-image bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">🗑️</button>
          `;
  
          // 🟢 Attach event listener to remove image
          optionDiv.querySelector(".remove-option-image").addEventListener("click", function () {
            optionDiv.querySelector(".option-image-preview").innerHTML = "";
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      });
    });


  
    document.getElementById("question-container").appendChild(questionBox);

    

    setTimeout(() => {
      ClassicEditor
        .create(questionBox.querySelector('.ck-question'), {
          toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'math', 'undo', 'redo'],
          math: {
            engine: 'mathjax',
            outputType: 'span',
            forceOutputType: false
          }
        })
        .then(editor => {
          ckeditors.push({ type: 'question', editor, container: questionBox });
        })
        .catch(error => console.error(error));
    
      questionBox.querySelectorAll('.ck-option').forEach((optionDiv, i) => {
        ClassicEditor
          .create(optionDiv, {
            toolbar: ['bold', 'italic', 'link', '|', 'math', 'undo', 'redo'],
            math: {
              engine: 'mathjax',
              outputType: 'span',
            }
          })
          .then(editor => {
            ckeditors.push({ type: 'option', editor, container: questionBox, index: i });
          })
          .catch(error => console.error(error));
      });
    }, 100);
    
    
  }


  
  
  
  const savedData = JSON.parse(localStorage.getItem("savedQuestions"));
  if (savedData && savedData.questions.length > 0) {
    document.getElementById("doc-title").value = savedData.title || "";
    document.getElementById("doc-author").value = savedData.author || "";
    document.getElementById("doc-date").value = savedData.date || "";
    savedData.questions.forEach((questionData) =>
      createQuestionBlock(questionData)
    );
  } else {
    questionContainer.innerHTML = "";
    createQuestionBlock();
  }

  // 🟢 Add question button functionality
  if (addQuestionButton) {
    addQuestionButton.addEventListener("click", function () {
      console.log("Adding new question..."); // Debugging log
      createQuestionBlock(); // Ensure function exists
      showStatusMessage("✅ Question added!");
    });
  } else {
    console.error("❌ 'Add Question' button not found!");
  }

  // 🟢 Undo Last Action (Fixed)
  undoActionButton.addEventListener("click", function () {
    if (questionHistory.length > 0) {
      const lastDeletedQuestionHTML = questionHistory.pop();
      questionContainer.insertAdjacentHTML(
        "beforeend",
        lastDeletedQuestionHTML
      );
      showStatusMessage("🔄 Last action undone!");

      // Re-bind event listeners for the newly added question
      document.querySelectorAll(".remove-question").forEach((btn) =>
        btn.addEventListener("click", function () {
          this.parentElement.remove();
          showStatusMessage(
            "❌ Question deleted! Click 'Undo' to restore.",
            "error"
          );
        })
      );
    } else {
      showStatusMessage("⚠️ No action to undo!", "error");
    }
  });

  // 🟢 Fix for Export Buttons (Prevent Double Clicks)
  function removeExistingEventListeners(buttonId) {
    const oldButton = document.getElementById(buttonId);
    const newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);
    return newButton;
  }

  removeExistingEventListeners("export-json").addEventListener(
    "click",
    function () {
      console.log("Exporting JSON...");

      const title =
        document.getElementById("doc-title").value.trim() ||
        "Untitled Document";
      const author =
        document.getElementById("doc-author").value.trim() || "Unknown Author";
      const date =
        document.getElementById("doc-date").value ||
        new Date().toISOString().split("T")[0];

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
          const difficulty = q.container.querySelector('.difficulty').value || 'medium';
          questions.push({
            question_number: index + 1,
            question_type: difficulty,
            question: q.question,
            options: q.options
          });
        });
        

      const jsonData = {
        document_name: title,
        author: author,
        date: date,
        questions: questions,
      };

      console.log("Generated JSON:", jsonData); // Debugging
      const blob = new Blob([JSON.stringify(jsonData, null, 4)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}_${author}_${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  );

  removeExistingEventListeners("export-latex").addEventListener(
    "click",
    function () {
      console.log("Exporting LaTeX...");

      const title =
        document.getElementById("doc-title").value.trim() || "Math Questions";
      const author =
        document.getElementById("doc-author").value.trim() || "Unknown Author";
      const date =
        document.getElementById("doc-date").value ||
        new Date().toISOString().split("T")[0];

      let latexContent = `
  \\documentclass[12pt]{article}
  \\usepackage{amsmath}
  \\usepackage{amssymb}
  \\usepackage{enumitem}
  \\usepackage[margin=1in]{geometry}
  \\title{${title}}
  \\author{${author}}
  \\date{${date}}
  \\begin{document}
  \\maketitle
  \\begin{enumerate}
  `;

      document
        .querySelectorAll(".question-box")
        .forEach((questionBox, index) => {
          let questionText = questionBox
            .querySelector(".question-input")
            .value.trim();
          let difficulty = questionBox.querySelector(".difficulty").value;
          let options = [];

          questionBox.querySelectorAll(".option-input").forEach((input) => {
            let optionValue = input.value.trim();
            if (optionValue) options.push(optionValue);
          });

          if (questionText !== "") {
            latexContent += `
          \\item \\textbf{Question:} ${questionText} \\textbf{(${difficulty.toUpperCase()})}
          \\begin{enumerate}[label=(\\alph*)]
          `;
            options.forEach((option) => {
              latexContent += `\\item ${option}\n`;
            });
            latexContent += `\\end{enumerate}\n`;
          }
        });

      latexContent += `\\end{enumerate}\\end{document}`;
      console.log("Generated LaTeX Content:", latexContent); // Debugging
      const blob = new Blob([latexContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}_${author}_${date}.tex`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  );

 
  removeExistingEventListeners("export-pdf").addEventListener(
    "click",
    async function () {
      console.log("Exporting PDF...");
      try {
        const { PDFDocument, rgb } = PDFLib; // Use PDF-Lib instead of jsPDF
  
        // Load the existing PDF template
        const templateBytes = await fetch("template.pdf").then((res) =>
          res.arrayBuffer()
        );
        const pdfDoc = await PDFDocument.create();
        const templateDoc = await PDFDocument.load(templateBytes);
  
        // Embed the first page of the template
        const [embeddedPage] = await pdfDoc.embedPages(templateDoc.getPages());
  
        // Get page dimensions
        const pageWidth = embeddedPage.width;
        const pageHeight = embeddedPage.height;
  
        // Retrieve document metadata
        const docTitle = document.getElementById("doc-title").value.trim() || "Untitled Document";
        const docAuthor = document.getElementById("doc-author").value.trim() || "Unknown Author";
        const docDate = document.getElementById("doc-date").value || new Date().toISOString().split("T")[0];
  
        // First Page - Create a new page using the template
        let newPage = pdfDoc.addPage([pageWidth, pageHeight]);
        newPage.drawPage(embeddedPage, { x: 0, y: 0 });
  
        // Centered positions
        const centerX = pageWidth / 2;
        let textY = pageHeight - 100; // Adjusted for template padding
  
        // Draw the document title, author, and date centered
        newPage.drawText(docTitle, {
          x: centerX - (docTitle.length * 3), // Approximate centering
          y: textY,
          size: 16,
          color: rgb(0, 0, 0),
        });
  
        textY -= 25; // Move down for author
        newPage.drawText(`Author: ${docAuthor}`, {
          x: centerX - (docAuthor.length * 3),
          y: textY,
          size: 12,
          color: rgb(0, 0, 0),
        });
  
        textY -= 25; // Move down for date
        newPage.drawText(`Date: ${docDate}`, {
          x: centerX - (docDate.length * 3),
          y: textY,
          size: 12,
          color: rgb(0, 0, 0),
        });
  
        // Adjust Y position for first question
        let y = textY - 50;
  
        // Iterate through questions
        document.querySelectorAll(".question-box").forEach((questionBox, index) => {
          const questionText = questionBox.querySelector(".question-input").value.trim();
          const difficulty = questionBox.querySelector(".difficulty").value;
          const options = [];
  
          questionBox.querySelectorAll(".option-input").forEach((input) => {
            let optionValue = input.value.trim();
            if (optionValue) options.push(optionValue);
          });
  
          // Add a new page if needed
          if (y < 100) {
            newPage = pdfDoc.addPage([pageWidth, pageHeight]);
            newPage.drawPage(embeddedPage, { x: 0, y: 0 });
            y = pageHeight - 150;
          }
  
          // Draw question text
          newPage.drawText(`${index + 1}. ${questionText} (${difficulty.toUpperCase()})`, {
            x: 50,
            y: y,
            size: 12,
            color: rgb(0, 0, 0),
          });
  
          y -= 20;
  
          // Draw options
          options.forEach((option, i) => {
            newPage.drawText(`(${String.fromCharCode(97 + i)}) ${option}`, {
              x: 70,
              y: y,
              size: 10,
              color: rgb(0, 0, 0),
            });
            y -= 15;
          });
  
          y -= 10;
        });
  
        // Save and download the PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${docTitle}_${docAuthor}_${docDate}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("❌ Failed to generate PDF.");
      }
    }
  );
  
  
  
  document
    .getElementById("save-progress")
    .addEventListener("click", async function () {
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
  const difficulty = q.container.querySelector('.difficulty').value || 'medium';
  questions.push({
    question_number: index + 1,
    question_type: difficulty,
    question: q.question,
    options: q.options
  });
});


     
      const dataToSave = {
        title,
        author,
        date,
        questions,
      };

      localStorage.setItem("savedQuestions", JSON.stringify(dataToSave));
      alert("✅ Progress Saved!");
    });

  document
    .getElementById("reset-page")
    .addEventListener("click", async function () {
      if (
        confirm(
          "⚠️ Are you sure you want to reset everything? This action cannot be undone."
        )
      ) {
        localStorage.removeItem("savedQuestions"); // Clear saved progress
        document.getElementById("doc-title").value = "";
        document.getElementById("doc-author").value = "";
        document.getElementById("doc-date").value = "";

        // Remove all question boxes
        const questionContainer = document.getElementById("question-container");
        questionContainer.innerHTML = "";

        // Add a single default question
        createQuestionBlock();

        showStatusMessage("🔄 Page reset successfully!", "success");
      }
    });
});

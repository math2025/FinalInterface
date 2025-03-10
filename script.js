
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
  
  function createQuestionBlock(questionData = null) {
    const questionBox = document.createElement("div");
    questionBox.classList.add(
      "question-box",
      "bg-gray-50",
      "p-4",
      "rounded-lg",
      "shadow-sm",
      "mt-4"
    );
  
    questionBox.innerHTML = `
          <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX):</label>
          <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
            questionData ? questionData.question : ""
          }</textarea>
  
          <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
          <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
              <option value="easy" ${
                questionData && questionData.difficulty === "easy"
                  ? "selected"
                  : ""
              }>Easy</option>
              <option value="medium" ${
                questionData && questionData.difficulty === "medium"
                  ? "selected"
                  : ""
              }>Medium</option>
              <option value="hard" ${
                questionData && questionData.difficulty === "hard"
                  ? "selected"
                  : ""
              }>Hard</option>
          </select>
  
          <label class="block text-gray-700 font-medium mt-2">Options:</label>
          <div class="options-container mt-2 space-y-2">
              ${
                questionData
                  ? questionData.options
                      .map(
                        (option) => `
                  <div class="flex">
                      <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" value="${option}">
                      <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
                  </div>`
                      )
                      .join("")
                  : `
                  <div class="flex">
                      <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option A">
                      <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
                  </div>
                  <div class="flex">
                      <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option B">
                      <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
                  </div>
              `
              }
          </div>
  
          <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">
              + Add Option
          </button>
      `;
  
    // Remove Option functionality
    questionBox.querySelectorAll(".remove-option").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.parentElement.remove();
      });
    });
  
    // Add Option functionality
    questionBox
      .querySelector(".add-option")
      .addEventListener("click", function () {
        const optionsContainer = questionBox.querySelector(".options-container");
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("flex", "mt-2");
        optionDiv.innerHTML = `
              <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
              <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
          `;
        optionsContainer.appendChild(optionDiv);
  
        optionDiv
          .querySelector(".remove-option")
          .addEventListener("click", function () {
            optionDiv.remove();
          });
      });
  
    document.getElementById("question-container").appendChild(questionBox);
  }


document.addEventListener("DOMContentLoaded", async function () {
  const questionContainer = document.getElementById("question-container");
  const addQuestionButton = document.getElementById("add-question");
  const undoActionButton = document.getElementById("undo-action");
  const statusMessage = document.getElementById("status-message");

  let questionHistory = []; // Stores deleted questions for undo

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

  // 🟢 Function to create a new question block
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
            <label class="block text-gray-700 font-medium">📝 Question:</label>
            <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
              questionData ? questionData.question : ""
            }</textarea>

            <label class="block text-gray-700 font-medium mt-2">🔹 Difficulty Level:</label>
            <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
                <option value="easy" ${
                  questionData && questionData.difficulty === "easy"
                    ? "selected"
                    : ""
                }>Easy</option>
                <option value="medium" ${
                  questionData && questionData.difficulty === "medium"
                    ? "selected"
                    : ""
                }>Medium</option>
                <option value="hard" ${
                  questionData && questionData.difficulty === "hard"
                    ? "selected"
                    : ""
                }>Hard</option>
            </select>

            <label class="block text-gray-700 font-medium mt-2">🔹 Options:</label>
            <div class="options-container mt-2 space-y-2">
                ${
                  questionData
                    ? questionData.options
                        .map(
                          (option) => `
                    <div class="flex">
                        <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" value="${option}">
                        <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">❌</button>
                    </div>`
                        )
                        .join("")
                    : `
                    <div class="flex">
                        <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option A">
                        <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">❌</button>
                    </div>
                    <div class="flex">
                        <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option B">
                        <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">❌</button>
                    </div>
                `
                }
            </div>

            <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">➕ Add Option</button>
            <button class="remove-question bg-danger text-white px-4 py-2 mt-3 rounded hover:bg-red-600 absolute top-2 right-2">🗑️ Delete</button>
        `;

    // 🟢 Attach Event Listeners
    // Remove option dynamically
    questionBox.querySelectorAll(".remove-option").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.parentElement.remove();
      });
    });

    // Add option dynamically
    questionBox
      .querySelector(".add-option")
      .addEventListener("click", function () {
        const optionsContainer =
          questionBox.querySelector(".options-container");
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("flex", "mt-2");
        optionDiv.innerHTML = `
                <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
                <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">❌</button>
            `;
        optionsContainer.appendChild(optionDiv);

        optionDiv
          .querySelector(".remove-option")
          .addEventListener("click", function () {
            optionDiv.remove();
          });
      });

    // 🟢 Remove question dynamically
    questionBox
      .querySelector(".remove-question")
      .addEventListener("click", function () {
        questionHistory.push(questionBox.outerHTML); // Store for undo
        questionBox.remove();
        showStatusMessage(
          "❌ Question deleted! Click 'Undo' to restore.",
          "error"
        );
      });

    questionContainer.appendChild(questionBox);
  }

  // 🟢 Add question button functionality
  addQuestionButton.addEventListener("click", function () {
    createQuestionBlock();
    showStatusMessage("✅ Question added!");
  });

  // 🟢 Undo Last Action
  undoActionButton.addEventListener("click", function () {
    if (questionHistory.length > 0) {
      const lastDeletedQuestion = questionHistory.pop();
      questionContainer.insertAdjacentHTML("beforeend", lastDeletedQuestion);
      showStatusMessage("🔄 Last action undone!");
    } else {
      showStatusMessage("⚠️ No action to undo!", "error");
    }
  });

  // 🟢 Load saved progress
  // const savedData = JSON.parse(localStorage.getItem("savedQuestions"));
  // if (savedData) {
  //     document.getElementById("doc-title").value = savedData.title || "";
  //     document.getElementById("doc-author").value = savedData.author || "";
  //     document.getElementById("doc-date").value = savedData.date || "";
  //     savedData.questions.forEach((questionData) => createQuestionBlock(questionData));
  // } else {
  //     // 🟢 Ensure only ONE default question on first load
  //     if (document.querySelectorAll(".question-box").length === 0) {
  //         createQuestionBlock();
  //     }
  // }
  const savedData = JSON.parse(localStorage.getItem("savedQuestions"));
  if (savedData && savedData.questions.length > 0) {
    // Load saved questions only if they exist
    document.getElementById("doc-title").value = savedData.title || "";
    document.getElementById("doc-author").value = savedData.author || "";
    document.getElementById("doc-date").value = savedData.date || "";
    savedData.questions.forEach((questionData) =>
      createQuestionBlock(questionData)
    );
  } else {
    // Ensure only ONE default question appears
    questionContainer.innerHTML = ""; // Remove all existing elements
    createQuestionBlock();
  }
});

document.getElementById("save-progress").addEventListener("click", async function () {
  const title = document.getElementById("doc-title").value.trim();
  const author = document.getElementById("doc-author").value.trim();
  const date = document.getElementById("doc-date").value;

  const questions = [];
  document.querySelectorAll(".question-box").forEach((questionBox) => {
    const questionText = questionBox
      .querySelector(".question-input")
      .value.trim();
    const difficulty = questionBox.querySelector(".difficulty").value;
    const options = [];

    questionBox.querySelectorAll(".option-input").forEach((input) => {
      options.push(input.value.trim());
    });

    questions.push({ question: questionText, difficulty, options });
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

// 📌 Load saved progress when page loads
// document.addEventListener("DOMContentLoaded", async function () {
//   const savedData = JSON.parse(localStorage.getItem("savedQuestions"));

//   if (savedData) {
//     document.getElementById("doc-title").value = savedData.title || "";
//     document.getElementById("doc-author").value = savedData.author || "";
//     document.getElementById("doc-date").value = savedData.date || "";

//     savedData.questions.forEach((questionData) => {
//       createQuestionBlock(questionData);
//     });
//   } else {
//     createQuestionBlock(); // Add one question by default
//   }
// });

document.getElementById("reset-page").addEventListener("click", async function () {
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

// 📌 Export LaTeX
document.getElementById("export-latex").addEventListener("click", async function () {
  console.log("Exporting LaTeX..."); // Debugging
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
\\usepackage[margin=1in]{geometry} % Set margins to 1 inch
\\usepackage{tikz}
\\usepackage{everypage} % Allows drawing on every page
\\usepackage[a4paper, margin=1in]{geometry} % Adjust margins if needed

% Define padding (adjust this value to change the padding)
\\newcommand{\\borderpadding}{1cm} % Increase this value for more padding

% Apply border to all pages
\\AddEverypageHook{%
    \\begin{tikzpicture}[remember picture, overlay]
        \\draw[line width=1pt] 
            ([xshift=\\borderpadding, yshift=\\borderpadding] current page.south west) 
            rectangle 
            ([xshift=-\\borderpadding, yshift=-\\borderpadding] current page.north east);
    \\end{tikzpicture}
}

\\title{${title}}
\\author{${author}}
\\date{${date}}
\\begin{document}
\\maketitle
\\begin{enumerate}
`;

  // Find all question boxes dynamically
  const questionBoxes = document.querySelectorAll(".question-box");

  console.log("Found question boxes:", questionBoxes.length); // Debugging

  questionBoxes.forEach((questionBox, index) => {
    let questionText = questionBox
      .querySelector(".question-input")
      .value.trim();
    let difficulty = questionBox.querySelector(".difficulty").value;
    let options = [];

    questionBox.querySelectorAll(".option-input").forEach((input) => {
      let optionValue = input.value.trim();
      if (optionValue) options.push(optionValue);
    });

    console.log(`Question ${index + 1}:`, questionText, "Options:", options); // Debugging

    if (questionText !== "") {
      latexContent += `
    \\item \\textbf{Question:} ${questionText} \\textbf{(${difficulty.toUpperCase()})}

    \\textbf{Options:}
    \\begin{enumerate}[label=(\\alph*)]
`;

      options.forEach((option) => {
        latexContent += `        \\item ${option}\n`;
      });

      latexContent += `    \\end{enumerate}\n`;

      //             // Example Solution Section
      //             latexContent += `
      //     \\textbf{Solution:}
      //     \\begin{itemize}
      //         \\item Add your solution steps here...
      //     \\end{itemize}
      // `;
    }
  });

  latexContent += `
\\end{enumerate}
\\end{document}
`;

  console.log("Generated LaTeX Content:", latexContent); // Debugging

  // Create and download .tex file
  const blob = new Blob([latexContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = generateFileName("tex");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// 📌 Export PDF
document.getElementById("export-pdf").addEventListener("click", async function () {
    try {
      // Load the PDF template
      const templateUrl = "template.pdf"; // Ensure template.pdf is in the same directory
      const existingPdfBytes = await fetch(templateUrl).then((res) =>
        res.arrayBuffer()
      );

      // Load the PDF using pdf-lib
      const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
      const firstPage = pdfDoc.getPages()[0]; // Modify the first page

      // Define starting positions for writing
      let y = 700; // Y-position (top-down coordinate system)

      // Set font
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      firstPage.setFont(font);
      firstPage.setFontSize(12);

      // Fetch document metadata (Title, Author, Date)
      const title =
        document.getElementById("doc-title").value.trim() || "Math Questions";
      const author =
        document.getElementById("doc-author").value.trim() || "Unknown Author";
      const date =
        document.getElementById("doc-date").value ||
        new Date().toISOString().split("T")[0];

      // Add metadata to the PDF
      firstPage.drawText(`Title: ${title}`, { x: 50, y: y });
      firstPage.drawText(`Author: ${author}`, { x: 50, y: y - 20 });
      firstPage.drawText(`Date: ${date}`, { x: 50, y: y - 40 });
      y -= 80;

      // Loop through questions
      document
        .querySelectorAll(".question-box")
        .forEach((questionBox, index) => {
          const questionText = questionBox
            .querySelector(".question-input")
            .value.trim();
          const difficulty = questionBox.querySelector(".difficulty").value;
          const options = [];

          questionBox.querySelectorAll(".option-input").forEach((input) => {
            let optionValue = input.value.trim();
            if (optionValue) options.push(optionValue);
          });

          if (questionText !== "") {
            // Write question
            firstPage.drawText(
              `${index + 1}. ${questionText} (${difficulty.toUpperCase()})`,
              { x: 50, y: y }
            );

            y -= 20;
            options.forEach((option, i) => {
              firstPage.drawText(`(${String.fromCharCode(97 + i)}) ${option}`, {
                x: 70,
                y: y,
              });
              y -= 15;
            });

            y -= 20;

            // Add a new page if space is running out
            if (y < 50) {
              const newPage = pdfDoc.addPage([595, 842]); // A4 size
              y = 750;
            }
          }
        });

      // Save & download the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = generateFileName("pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("❌ Failed to generate PDF. Please check the template file.");
    }
  });

// 📌 Export json
document.getElementById("export-json").addEventListener("click", async function () {
  // Get document metadata (title, author, date)
  const title =
    document.getElementById("doc-title").value.trim() || "Untitled Document";
  const author =
    document.getElementById("doc-author").value.trim() || "Unknown Author";
  const date =
    document.getElementById("doc-date").value ||
    new Date().toISOString().split("T")[0];

  // Collect all questions
  const questions = [];
  document.querySelectorAll(".question-box").forEach((questionBox, index) => {
    const questionText = questionBox
      .querySelector(".question-input")
      .value.trim();
    const difficulty = questionBox.querySelector(".difficulty").value;
    const options = [];

    questionBox.querySelectorAll(".option-input").forEach((input) => {
      let optionValue = input.value.trim();
      if (optionValue) options.push(optionValue);
    });

    // Add question to JSON only if it has text
    if (questionText !== "") {
      questions.push({
        question_number: index + 1,
        question_type: difficulty,
        question: questionText,
        options: options,
      });
    }
  });

  // Prepare final JSON structure
  const jsonData = {
    document_name: title,
    author: author,
    date: date,
    questions: questions,
  };

  console.log("Generated JSON:", jsonData); // Debugging

  // Convert JSON to file and trigger download
  const blob = new Blob([JSON.stringify(jsonData, null, 4)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = generateFileName("json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// 📌 Export PDF using jsPDF
// document.getElementById("export-pdf").addEventListener("click", async function () {

//     console.log("Exporting PDF...   1"); // Debugging
//     const { jsPDF } = window.jspdf;

//     // Load the pre-existing PDF template
//     const templateUrl = "template.pdf"; // Make sure "template.pdf" is in the same directory
//     const templateArrayBuffer = await fetch(templateUrl).then((res) =>
//       res.arrayBuffer()
//     );

//     // Load the template using pdf-lib
//     const pdfDoc = await PDFLib.PDFDocument.load(templateArrayBuffer);
//     const pages = pdfDoc.getPages();
//     const firstPage = pages[0]; // Assuming we want to modify the first page

//     // Set up jsPDF to overlay text
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });

//     const templateBytes = await pdfDoc.save();
//     const templateBase64 = btoa(
//       String.fromCharCode(...new Uint8Array(templateBytes))
//     );
//     const templateDataUri = `data:application/pdf;base64,${templateBase64}`;

//     pdf.addImage(templateDataUri, "PDF", 0, 0, 210, 297);

//     let y = 50; // Start writing below the template's header

//     // Loop through all questions
//     document.querySelectorAll(".question-box").forEach((questionBox, index) => {
//       const questionText = questionBox.querySelector("textarea").value;
//       const difficulty = questionBox.querySelector("select").value;
//       const options = [];

//       questionBox
//         .querySelectorAll(".options-container input")
//         .forEach((input) => {
//           options.push(input.value);
//         });

//       pdf.setFontSize(12);
//       pdf.text(
//         `${index + 1}. ${questionText} (${difficulty.toUpperCase()})`,
//         10,
//         y
//       );
//       y += 10;

//       options.forEach((option, i) => {
//         pdf.text(`(${String.fromCharCode(97 + i)}) ${option}`, 15, y);
//         y += 8;
//       });

//       y += 10;

//       // Add new page if content overflows
//       if (y > 270) {
//         pdf.addPage();
//         y = 20;
//       }
//     });

//     // Save final PDF
//     pdf.save("questions.pdf");
//   });
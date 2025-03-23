// function createQuestionBlock(questionData = null) {
//   const questionBox = document.createElement("div");
//   questionBox.classList.add(
//     "question-box",
//     "bg-gray-50",
//     "p-4",
//     "rounded-lg",
//     "shadow-sm",
//     "mt-4"
//   );

//   questionBox.innerHTML = `
//           <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX):</label>
//           <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
//             questionData ? questionData.question : ""
//           }</textarea>

//           <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
//           <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
//               <option value="easy" ${
//                 questionData && questionData.difficulty === "easy"
//                   ? "selected"
//                   : ""
//               }>Easy</option>
//               <option value="medium" ${
//                 questionData && questionData.difficulty === "medium"
//                   ? "selected"
//                   : ""
//               }>Medium</option>
//               <option value="hard" ${
//                 questionData && questionData.difficulty === "hard"
//                   ? "selected"
//                   : ""
//               }>Hard</option>
//           </select>

//           <label class="block text-gray-700 font-medium mt-2">Options:</label>
//           <div class="options-container mt-2 space-y-2">
//               ${
//                 questionData
//                   ? questionData.options
//                       .map(
//                         (option) => `
//                   <div class="flex">
//                       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" value="${option}">
//                       <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
//                   </div>`
//                       )
//                       .join("")
//                   : `
//                   <div class="flex">
//                       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option A">
//                       <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
//                   </div>
//                   <div class="flex">
//                       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option B">
//                       <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
//                   </div>
//               `
//               }
//           </div>

//           <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">
//               + Add Option
//           </button>
//       `;

//   // Remove Option functionality
//   questionBox.querySelectorAll(".remove-option").forEach((btn) => {
//     btn.addEventListener("click", function () {
//       this.parentElement.remove();
//     });
//   });

//   // Add Option functionality
//   questionBox
//     .querySelector(".add-option")
//     .addEventListener("click", function () {
//       const optionsContainer = questionBox.querySelector(".options-container");
//       const optionDiv = document.createElement("div");
//       optionDiv.classList.add("flex", "mt-2");
//       optionDiv.innerHTML = `
//               <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
//               <button class="remove-option bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">X</button>
//           `;
//       optionsContainer.appendChild(optionDiv);

//       optionDiv
//         .querySelector(".remove-option")
//         .addEventListener("click", function () {
//           optionDiv.remove();
//         });
//     });

//   document.getElementById("question-container").appendChild(questionBox);
// }








// function createQuestionBlock(questionData = null) {
  //   const questionBox = document.createElement("div");
  //   questionBox.classList.add(
  //     "question-box",
  //     "bg-gray-50",
  //     "p-4",
  //     "rounded-lg",
  //     "shadow-sm",
  //     "mt-4"
  //   );

  //   questionBox.innerHTML = `
  //           <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX & Images):</label>
  //           <div class="flex">
  //               <div class="mathquill-editor w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2"></div>
  //               <input type="hidden" class="question-input" value="${
  //                 questionData ? questionData.question : ""
  //               }">
  //           </div>

  //           <div class="mt-2">
  //               <input type="file" class="question-image hidden" accept="image/*">
  //               <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
  //               <div class="question-image-preview mt-2">${
  //                 questionData?.image
  //                   ? `<img src="${questionData.image}" class="w-24 h-24 object-cover">`
  //                   : ""
  //               }</div>
  //           </div>

  //           <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
  //           <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
  //               <option value="easy" ${
  //                 questionData?.difficulty === "easy" ? "selected" : ""
  //               }>Easy</option>
  //               <option value="medium" ${
  //                 questionData?.difficulty === "medium" ? "selected" : ""
  //               }>Medium</option>
  //               <option value="hard" ${
  //                 questionData?.difficulty === "hard" ? "selected" : ""
  //               }>Hard</option>
  //           </select>

  //           <label class="block text-gray-700 font-medium mt-2">Options (Text, Math, or Image):</label>
  //           <div class="options-container mt-2 space-y-2">
  //               ${
  //                 questionData
  //                   ? questionData.options
  //                       .map(
  //                         (option, i) => `
  //                   <div class="flex items-center space-x-2">
  //                       <div class="mathquill-editor w-full p-2 border border-gray-300 rounded-md option-math"></div>
  //                       <input type="hidden" class="option-input" value="${
  //                         option.text || ""
  //                       }">
  //                       <input type="file" class="option-image hidden" accept="image/*">
  //                       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //                       <div class="option-image-preview">${
  //                         option.image
  //                           ? `<img src="${option.image}" class="w-16 h-16 object-cover">`
  //                           : ""
  //                       }</div>
  //                       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //                   </div>`
  //                       )
  //                       .join("")
  //                   : `
  //                   <div class="flex items-center space-x-2">
  //                       <div class="mathquill-editor w-full p-2 border border-gray-300 rounded-md option-math"></div>
  //                       <input type="hidden" class="option-input">
  //                       <input type="file" class="option-image hidden" accept="image/*">
  //                       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //                       <div class="option-image-preview"></div>
  //                       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //                   </div>
  //               `
  //               }
  //           </div>

  //           <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
  //       `;

  //   // 🟢 Initialize MathQuill
  //   const MQ = MathQuill.getInterface(2);
  //   const questionField = MQ.MathField(
  //     questionBox.querySelector(".mathquill-editor"),
  //     {
  //       handlers: {
  //         edit: function () {
  //           questionBox.querySelector(".question-input").value =
  //             questionField.latex();
  //         },
  //       },
  //     }
  //   );

  //   questionBox
  //     .querySelectorAll(".option-math")
  //     .forEach((optionField, index) => {
  //       const mathField = MQ.MathField(optionField, {
  //         handlers: {
  //           edit: function () {
  //             questionBox.querySelectorAll(".option-input")[index].value =
  //               mathField.latex();
  //           },
  //         },
  //       });
  //     });

  //   // 🟢 Attach Image Upload Listeners
  //   questionBox
  //     .querySelector(".upload-question-image")
  //     .addEventListener("click", function () {
  //       questionBox.querySelector(".question-image").click();
  //     });

  //   questionBox
  //     .querySelector(".question-image")
  //     .addEventListener("change", function (event) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         questionBox.querySelector(
  //           ".question-image-preview"
  //         ).innerHTML = `<img src="${e.target.result}" class="w-24 h-24 object-cover">`;
  //       };
  //       reader.readAsDataURL(event.target.files[0]);
  //     });

  //   // 🟢 Add Option Button Functionality
  //   questionBox
  //     .querySelector(".add-option")
  //     .addEventListener("click", function () {
  //       const optionsContainer =
  //         questionBox.querySelector(".options-container");
  //       const optionDiv = document.createElement("div");
  //       optionDiv.classList.add("flex", "items-center", "space-x-2", "mt-2");
  //       optionDiv.innerHTML = `
  //         <div class="mathquill-editor w-full p-2 border border-gray-300 rounded-md option-math"></div>
  //         <input type="hidden" class="option-input">
  //         <input type="file" class="option-image hidden" accept="image/*">
  //         <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //         <div class="option-image-preview"></div>
  //         <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //     `;
  //       optionsContainer.appendChild(optionDiv);

  //       // 🟢 Initialize MathQuill for new option
  //       const mathField = MQ.MathField(
  //         optionDiv.querySelector(".mathquill-editor"),
  //         {
  //           handlers: {
  //             edit: function () {
  //               optionDiv.querySelector(".option-input").value =
  //                 mathField.latex();
  //             },
  //           },
  //         }
  //       );

  //       optionDiv
  //         .querySelector(".upload-option-image")
  //         .addEventListener("click", function () {
  //           optionDiv.querySelector(".option-image").click();
  //         });

  //       optionDiv
  //         .querySelector(".option-image")
  //         .addEventListener("change", function (event) {
  //           const reader = new FileReader();
  //           reader.onload = function (e) {
  //             optionDiv.querySelector(
  //               ".option-image-preview"
  //             ).innerHTML = `<img src="${e.target.result}" class="w-16 h-16 object-cover">`;
  //           };
  //           reader.readAsDataURL(event.target.files[0]);
  //         });

  //       optionDiv
  //         .querySelector(".remove-option")
  //         .addEventListener("click", function () {
  //           optionDiv.remove();
  //         });
  //     });

  //   document.getElementById("question-container").appendChild(questionBox);
  // }

   // removeExistingEventListeners("export-pdf").addEventListener(
  //   "click",
  //   async function () {
  //     console.log("Exporting PDF...");
  //     try {
  //       const { jsPDF } = window.jspdf;
  //       const pdf = new jsPDF();

  //       pdf.setFontSize(16);
  //       pdf.text("Math Questions", 10, 10);

  //       let y = 20;
  //       document
  //         .querySelectorAll(".question-box")
  //         .forEach((questionBox, index) => {
  //           const questionText = questionBox
  //             .querySelector(".question-input")
  //             .value.trim();
  //           const difficulty = questionBox.querySelector(".difficulty").value;
  //           const options = [];

  //           questionBox.querySelectorAll(".option-input").forEach((input) => {
  //             let optionValue = input.value.trim();
  //             if (optionValue) options.push(optionValue);
  //           });

  //           pdf.setFontSize(12);
  //           pdf.text(
  //             `${index + 1}. ${questionText} (${difficulty.toUpperCase()})`,
  //             10,
  //             y
  //           );
  //           y += 10;

  //           options.forEach((option, i) => {
  //             pdf.text(`(${String.fromCharCode(97 + i)}) ${option}`, 15, y);
  //             y += 8;
  //           });

  //           y += 10;
  //           if (y > 270) {
  //             pdf.addPage();
  //             y = 20;
  //           }
  //         });

  //       pdf.save(
  //         `${document.getElementById("doc-title").value.trim()}_${document
  //           .getElementById("doc-author")
  //           .value.trim()}_${document.getElementById("doc-date").value}.pdf`
  //       );
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //       alert("❌ Failed to generate PDF.");
  //     }
  //   }
  // );


    // 🟢 Function to create a new question block
  // function createQuestionBlock(questionData = null) {
  //   const questionBox = document.createElement("div");
  //   questionBox.classList.add(
  //     "question-box",
  //     "bg-gray-50",
  //     "p-4",
  //     "rounded-lg",
  //     "shadow-sm",
  //     "mt-4"
  //   );

  //   questionBox.innerHTML = `
  //           <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX & Images):</label>
  //           <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
  //             questionData ? questionData.question : ""
  //           }</textarea>

  //           <div class="mt-2">
  //               <input type="file" class="question-image hidden" accept="image/*">
  //               <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
  //               <div class="question-image-preview mt-2"></div>
  //           </div>

  //           <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
  //           <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
  //               <option value="easy" ${
  //                 questionData && questionData.difficulty === "easy"
  //                   ? "selected"
  //                   : ""
  //               }>Easy</option>
  //               <option value="medium" ${
  //                 questionData && questionData.difficulty === "medium"
  //                   ? "selected"
  //                   : ""
  //               }>Medium</option>
  //               <option value="hard" ${
  //                 questionData && questionData.difficulty === "hard"
  //                   ? "selected"
  //                   : ""
  //               }>Hard</option>
  //           </select>
            
  //           <label class="block text-gray-700 font-medium mt-2">Options (Text or Image):</label>
            
  //           <div class="options-container mt-2 space-y-2">
  //               ${
  //                 questionData
  //                   ? questionData.options
  //                       .map(
  //                         (option, i) => `
  //                   <div class="flex items-center space-x-2">
  //                       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" value="${
  //                         option.text || ""
  //                       }">
  //                       <input type="file" class="option-image hidden" accept="image/*">
  //                       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //                       <div class="option-image-preview">${
  //                         option.image
  //                           ? `<img src="${option.image}" class="w-16 h-16 object-cover">`
  //                           : ""
  //                       }</div>
  //                       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //                   </div>`
  //                       )
  //                       .join("")
  //                   : `removeButton 
  //                   <div class="flex items-center space-x-2">
  //                       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option A">
  //                       <input type="file" class="option-image hidden" accept="image/*">
  //                       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //                       <div class="option-image-preview"></div>
  //                       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //                   </div>
  //                   <div class="flex items-center space-x-2">
  //                       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option B">
  //                       <input type="file" class="option-image hidden" accept="image/*">
  //                       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //                       <div class="option-image-preview"></div>
  //                       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //                   </div>
  //               `
  //               }
  //           </div>

  //           <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
  //       `;

  //   // 🟢 Attach Image Upload Event Listeners
  //   questionBox
  //     .querySelector(".upload-question-image")
  //     .addEventListener("click", function () {
  //       questionBox.querySelector(".question-image").click();
  //     });

  //   questionBox
  //     .querySelector(".question-image")
  //     .addEventListener("change", function (event) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         questionBox.querySelector(
  //           ".question-image-preview"
  //         ).innerHTML = `<img src="${e.target.result}" class="w-24 h-24 object-cover">`;
  //       };
  //       reader.readAsDataURL(event.target.files[0]);
  //     });

  //   // 🟢 Add Option Button Functionality
  //   questionBox
  //     .querySelector(".add-option")
  //     .addEventListener("click", function () {
  //       const optionsContainer =
  //         questionBox.querySelector(".options-container");
  //       const optionDiv = document.createElement("div");
  //       optionDiv.classList.add("flex", "items-center", "space-x-2", "mt-2");
  //       optionDiv.innerHTML = `
  //         <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
  //         <input type="file" class="option-image hidden" accept="image/*">
  //         <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
  //         <div class="option-image-preview"></div>
  //         <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
  //     `;
  //       optionsContainer.appendChild(optionDiv);

  //       optionDiv
  //         .querySelector(".upload-option-image")
  //         .addEventListener("click", function () {
  //           optionDiv.querySelector(".option-image").click();
  //         });

  //       optionDiv
  //         .querySelector(".option-image")
  //         .addEventListener("change", function (event) {
  //           const reader = new FileReader();
  //           reader.onload = function (e) {
  //             optionDiv.querySelector(
  //               ".option-image-preview"
  //             ).innerHTML = `<img src="${e.target.result}" class="w-16 h-16 object-cover">`;
  //           };
  //           reader.readAsDataURL(event.target.files[0]);
  //         });

  //       optionDiv
  //         .querySelector(".remove-option")
  //         .addEventListener("click", function () {
  //           optionDiv.remove();
  //         });
  //     });

  //   const removeButton = questionBox.querySelector(".remove-question");
  //   if (removeButton) {
  //     removeButton.addEventListener("click", function () {
  //       questionHistory.push(questionBox.outerHTML);
  //       questionBox.remove();
  //       showStatusMessage(
  //         "❌ Question deleted! Click 'Undo' to restore.",
  //         "error"
  //       );
  //     });
  //   } else {
  //     console.warn("⚠️ 'Remove Question' button not found in question block.");
  //   }

  //   document.getElementById("question-container").appendChild(questionBox);
  // }

  // 🟢 Function to create a new question block
// function createQuestionBlock(questionData = null) {
//   const questionBox = document.createElement("div");
//   questionBox.classList.add(
//     "question-box",
//     "bg-gray-50",
//     "p-4",
//     "rounded-lg",
//     "shadow-sm",
//     "mt-4",
//     "relative"
//   );

//   questionBox.innerHTML = `
//         <!-- 🗑️ Delete Button -->
//         <button class="delete-question absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition">
//             🗑️
//         </button>

//         <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX & Images):</label>
//         <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
//           questionData ? questionData.question : ""
//         }</textarea>

//         <div class="mt-2">
//             <input type="file" class="question-image hidden" accept="image/*">
//             <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
//             <div class="question-image-preview mt-2"></div>
//         </div>

//         <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
//         <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
//             <option value="easy" ${
//               questionData && questionData.difficulty === "easy" ? "selected" : ""
//             }>Easy</option>
//             <option value="medium" ${
//               questionData && questionData.difficulty === "medium" ? "selected" : ""
//             }>Medium</option>
//             <option value="hard" ${
//               questionData && questionData.difficulty === "hard" ? "selected" : ""
//             }>Hard</option>
//         </select>

//         <label class="block text-gray-700 font-medium mt-2">Options (Text or Image):</label>

//         <div class="options-container mt-2 space-y-2">
//             ${
//               questionData
//                 ? questionData.options
//                     .map(
//                       (option, i) => `
//                 <div class="flex items-center space-x-2">
//                     <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" value="${
//                       option.text || ""
//                     }">
//                     <input type="file" class="option-image hidden" accept="image/*">
//                     <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//                     <div class="option-image-preview">${
//                       option.image
//                         ? `<img src="${option.image}" class="w-16 h-16 object-cover">`
//                         : ""
//                     }</div>
//                     <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//                 </div>`
//                     )
//                     .join("")
//                 : `
//                 <div class="flex items-center space-x-2">
//                     <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option A">
//                     <input type="file" class="option-image hidden" accept="image/*">
//                     <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//                     <div class="option-image-preview"></div>
//                     <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//                 </div>
//                 <div class="flex items-center space-x-2">
//                     <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option B">
//                     <input type="file" class="option-image hidden" accept="image/*">
//                     <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//                     <div class="option-image-preview"></div>
//                     <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//                 </div>
//             `
//             }
//         </div>

//         <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
//     `;

//   // 🟢 Attach Event Listener for Delete Button
//   questionBox.querySelector(".delete-question").addEventListener("click", function () {
//     questionHistory.push(questionBox.outerHTML);
//     questionBox.remove();
//     showStatusMessage("❌ Question deleted! Click 'Undo' to restore.", "error");
//   });

//   // 🟢 Attach Event Listener for Add Option Button
//   questionBox.querySelector(".add-option").addEventListener("click", function () {
//     const optionsContainer = questionBox.querySelector(".options-container");
//     const optionDiv = document.createElement("div");
//     optionDiv.classList.add("flex", "items-center", "space-x-2", "mt-2");
//     optionDiv.innerHTML = `
//       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
//       <input type="file" class="option-image hidden" accept="image/*">
//       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//       <div class="option-image-preview"></div>
//       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//     `;
//     optionsContainer.appendChild(optionDiv);

//     optionDiv.querySelector(".remove-option").addEventListener("click", function () {
//       optionDiv.remove();
//     });
//   });

//   document.getElementById("question-container").appendChild(questionBox);
// }


// function createQuestionBlock(questionData = null) {
//   const questionBox = document.createElement("div");
//   questionBox.classList.add(
//     "question-box",
//     "bg-gray-50",
//     "p-4",
//     "rounded-lg",
//     "shadow-sm",
//     "mt-4",
//     "relative"
//   );

//   questionBox.innerHTML = `
//         <!-- 🗑️ Delete Button -->
//         <button class="delete-question absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition">
//             🗑️
//         </button>

//         <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX & Images):</label>
//         <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
//           questionData ? questionData.question : ""
//         }</textarea>

//         <div class="mt-2">
//             <input type="file" class="question-image hidden" accept="image/*">
//             <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
//             <div class="question-image-preview mt-2"></div>
//         </div>

//         <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
//         <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
//             <option value="easy" ${
//               questionData && questionData.difficulty === "easy" ? "selected" : ""
//             }>Easy</option>
//             <option value="medium" ${
//               questionData && questionData.difficulty === "medium" ? "selected" : ""
//             }>Medium</option>
//             <option value="hard" ${
//               questionData && questionData.difficulty === "hard" ? "selected" : ""
//             }>Hard</option>
//         </select>

//         <label class="block text-gray-700 font-medium mt-2">Options (Text or Image):</label>

//         <div class="options-container mt-2 space-y-2">
//             ${
//               questionData
//                 ? questionData.options
//                     .map(
//                       (option, i) => `
//                 <div class="flex items-center space-x-2">
//                     <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" value="${
//                       option.text || ""
//                     }">
//                     <input type="file" class="option-image hidden" accept="image/*">
//                     <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//                     <div class="option-image-preview">${
//                       option.image
//                         ? `<img src="${option.image}" class="w-16 h-16 object-cover">`
//                         : ""
//                     }</div>
//                     <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//                 </div>`
//                     )
//                     .join("")
//                 : `
//                 <div class="flex items-center space-x-2">
//                     <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option A">
//                     <input type="file" class="option-image hidden" accept="image/*">
//                     <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//                     <div class="option-image-preview"></div>
//                     <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//                 </div>
//                 <div class="flex items-center space-x-2">
//                     <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="Option B">
//                     <input type="file" class="option-image hidden" accept="image/*">
//                     <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//                     <div class="option-image-preview"></div>
//                     <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//                 </div>
//             `
//             }
//         </div>

//         <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
//     `;

//   // 🟢 Attach Delete Question Button Event
//   questionBox.querySelector(".delete-question").addEventListener("click", function () {
//     questionHistory.push(questionBox.outerHTML);
//     questionBox.remove();
//     showStatusMessage("❌ Question deleted! Click 'Undo' to restore.", "error");
//   });

//   // 🟢 Attach Image Upload for Questions
//   questionBox.querySelector(".upload-question-image").addEventListener("click", function () {
//     questionBox.querySelector(".question-image").click();
//   });

//   questionBox.querySelector(".question-image").addEventListener("change", function (event) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       questionBox.querySelector(".question-image-preview").innerHTML = `<img src="${e.target.result}" class="w-24 h-24 object-cover">`;
//     };
//     reader.readAsDataURL(event.target.files[0]);
//   });

//   // 🟢 Add Option Button Functionality
//   questionBox.querySelector(".add-option").addEventListener("click", function () {
//     const optionsContainer = questionBox.querySelector(".options-container");
//     const optionDiv = document.createElement("div");
//     optionDiv.classList.add("flex", "items-center", "space-x-2", "mt-2");
//     optionDiv.innerHTML = `
//       <input type="text" class="w-full p-2 border border-gray-300 rounded-md option-input" placeholder="New Option">
//       <input type="file" class="option-image hidden" accept="image/*">
//       <button class="upload-option-image bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">📷</button>
//       <div class="option-image-preview"></div>
//       <button class="remove-option bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">❌</button>
//     `;
//     optionsContainer.appendChild(optionDiv);

//     optionDiv.querySelector(".upload-option-image").addEventListener("click", function () {
//       optionDiv.querySelector(".option-image").click();
//     });

//     optionDiv.querySelector(".option-image").addEventListener("change", function (event) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         optionDiv.querySelector(".option-image-preview").innerHTML = `<img src="${e.target.result}" class="w-16 h-16 object-cover">`;
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     });

//     optionDiv.querySelector(".remove-option").addEventListener("click", function () {
//       optionDiv.remove();
//     });
//   });

//   document.getElementById("question-container").appendChild(questionBox);
// }



  // 🟢 Load saved progress OR add one question by default



  //23rs mar

  //   function createQuestionBlock(questionData = null) {
//     const questionBox = document.createElement("div");
//     questionBox.classList.add(
//         "question-box",
//         "bg-gray-50",
//         "p-4",
//         "rounded-lg",
//         "shadow-sm",
//         "mt-4",
//         "relative"
//     );

//     questionBox.innerHTML = `
//         <!-- 🗑️ Delete Question Button -->
//         <button class="delete-question absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition">
//             🗑️
//         </button>

//         <!-- 🎯 Math Equation Input (MathQuill) -->
//         <label class="block text-gray-700 font-medium mt-2">Math Equation (WYSIWYG Editor):</label>
//         <div class="math-field w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2"></div>
        
//         <label class="block text-gray-700 font-medium">Enter Question (Supports LaTeX & Images):</label>
//         <textarea class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mt-2 question-input">${
//             questionData ? questionData.question : ""
//         }</textarea>

//         <div class="mt-2">
//             <input type="file" class="question-image hidden" accept="image/*">
//             <button class="upload-question-image bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">📷 Upload Image</button>
//             <div class="question-image-preview mt-2"></div>
//         </div>

//         <label class="block text-gray-700 font-medium mt-2">Difficulty Level:</label>
//         <select class="w-full p-2 border border-gray-300 rounded-md mt-1 difficulty">
//             <option value="easy" ${questionData && questionData.difficulty === "easy" ? "selected" : ""}>Easy</option>
//             <option value="medium" ${questionData && questionData.difficulty === "medium" ? "selected" : ""}>Medium</option>
//             <option value="hard" ${questionData && questionData.difficulty === "hard" ? "selected" : ""}>Hard</option>
//         </select>

//         <label class="block text-gray-700 font-medium mt-2">Options (Text or Image):</label>
//         <div class="options-container mt-2 space-y-2"></div>

//         <button class="add-option bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600">+ Add Option</button>
//     `;

//     // 🟢 FIX: Ensure MathQuill is loaded before initializing
//     if (typeof MathQuill !== "undefined") {
//       setTimeout(() => {
//           const MQ = MathQuill.getInterface(2);
//           const mathFieldElement = questionBox.querySelector(".math-field");
//           MQ.MathField(mathFieldElement, {
//               spaceBehavesLikeTab: true,
//               handlers: {
//                   edit: function () {
//                       console.log("User input equation:", mathFieldElement.textContent);
//                   }
//               }
//           });
//       }, 100); // Delay initialization to avoid issues
//   } else {
//       console.error("❌ MathQuill not found! Make sure it's loaded before script.js.");
//   }
//     // 🟢 Delete Question Button
//     questionBox.querySelector(".delete-question").addEventListener("click", function () {
//         questionHistory.push(questionBox.outerHTML);
//         questionBox.remove();
//         showStatusMessage("❌ Question deleted! Click 'Undo' to restore.", "error");
//     });

//     // 🟢 Handle Image Upload for Questions
//     questionBox.querySelector(".upload-question-image").addEventListener("click", function () {
//         questionBox.querySelector(".question-image").click();
//     });

//     questionBox.querySelector(".question-image").addEventListener("change", function (event) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             questionBox.querySelector(".question-image-preview").innerHTML = `<img src="${e.target.result}" class="w-24 h-24 object-cover">`;
//         };
//         reader.readAsDataURL(event.target.files[0]);
//     });

//     document.getElementById("question-container").appendChild(questionBox);
// }


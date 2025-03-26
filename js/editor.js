// editor.js

function initializeMathQuill(mathFieldElement) {
  if (typeof MathQuill === "undefined") {
    console.error("❌ MathQuill is not loaded!");
    return;
  }

  const MQ = MathQuill.getInterface(2);

  const mathField = MQ.MathField(mathFieldElement, {
    spaceBehavesLikeTab: true,
    handlers: {
      edit: () => {
        const latex = mathField.latex();
        mathFieldElement.setAttribute("data-latex", latex);
      },
    },
  });
}

function initializeCKEditors(questionBox) {
  // Question editor (if you add ck-question textarea in the future)
  // const questionInput = questionBox.querySelector('.ck-question');
  // if (questionInput) {
  //   ClassicEditor.create(questionInput)
  //     .then(editor => ckeditors.push({ type: 'question', editor, container: questionBox }))
  //     .catch(error => console.error(error));
  // }

  // Option editors
  questionBox.querySelectorAll(".ck-option").forEach((optionEl, index) => {
    ClassicEditor.create(optionEl, {
      toolbar: ["bold", "italic", "link", "undo", "redo"],
    })
      .then((editor) => {
        ckeditors.push({ type: "option", editor, container: questionBox, index });
      })
      .catch((error) => console.error(error));
  });
}
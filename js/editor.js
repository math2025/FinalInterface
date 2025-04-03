// editor.js

let tiptapEditors = [];

function initializeTiptapEditor(targetElement, type, container, index = null) {
  const { Editor } = window['@tiptap/core'];
  const StarterKit = window['@tiptap/starter-kit'].StarterKit;
  const Placeholder = window['@tiptap/extension-placeholder'].Placeholder;

  const editor = new Editor({
    element: targetElement,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: type === 'question' ? 'Write your question...' : 'Write an option...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap',
      },
    },
    onUpdate: () => {
      renderMathInElement(targetElement, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false,
      });
    }
  });

  tiptapEditors.push({ type, editor, container, index });
}

function initializeCKEditors(questionBox) {
  const questionEl = questionBox.querySelector(".ck-question");
  if (questionEl) {
    initializeTiptapEditor(questionEl, "question", questionBox);
  }

  questionBox.querySelectorAll(".ck-option").forEach((optionEl, i) => {
    initializeTiptapEditor(optionEl, "option", questionBox, i);
  });
}

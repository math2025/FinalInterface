// exportLatex.js

function setupLatexExport() {
  const exportLatexButton = document.getElementById("export-latex");
  if (!exportLatexButton) return;

  exportLatexButton.addEventListener("click", () => {
    console.log("📜 Exporting LaTeX...");

    const title = document.getElementById("doc-title").value.trim() || "Math Questions";
    const author = document.getElementById("doc-author").value.trim() || "Unknown Author";
    const date = document.getElementById("doc-date").value || new Date().toISOString().split("T")[0];

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
      const question = q.question || "";
      const options = q.options || [];

      latexContent += `
\\item \\textbf{Question:} ${question} \\textbf{(${difficulty.toUpperCase()})}
\\begin{enumerate}[label=(\\alph*)]
`;

      options.forEach((opt) => {
        latexContent += `\\item ${opt}\n`;
      });

      latexContent += `\\end{enumerate}\n`;
    });

    latexContent += `\\end{enumerate}\n\\end{document}`;

    const blob = new Blob([latexContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = generateFileName("tex");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showStatusMessage("✅ LaTeX file exported!");
  });
}

// Call this inside init.js after DOM load
setupLatexExport();
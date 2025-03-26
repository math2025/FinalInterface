// exportPdf.js

function setupPdfExport() {
  const exportPdfButton = document.getElementById("export-pdf");
  if (!exportPdfButton) return;

  exportPdfButton.addEventListener("click", async () => {
    console.log("📄 Exporting PDF...");

    try {
      const { PDFDocument, rgb } = PDFLib;

      // Create a new PDF
      const pdfDoc = await PDFDocument.create();

      const docTitle = document.getElementById("doc-title").value.trim() || "Untitled";
      const docAuthor = document.getElementById("doc-author").value.trim() || "Unknown";
      const docDate = document.getElementById("doc-date").value || new Date().toISOString().split("T")[0];

      const page = pdfDoc.addPage([595, 842]); // A4 page size
      let y = 800;

      // Title block
      page.drawText(docTitle, { x: 50, y, size: 18, color: rgb(0, 0, 0) });
      y -= 25;
      page.drawText(`Author: ${docAuthor}`, { x: 50, y, size: 12, color: rgb(0, 0, 0) });
      y -= 20;
      page.drawText(`Date: ${docDate}`, { x: 50, y, size: 12, color: rgb(0, 0, 0) });
      y -= 30;

      const grouped = {};

      ckeditors.forEach(entry => {
        const id = entry.container.dataset.qid || entry.container;
        if (!grouped[id]) grouped[id] = { options: [], container: entry.container };

        const data = entry.editor.getData().trim().replace(/<[^>]+>/g, ''); // Remove HTML tags
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

        if (y < 100) {
          const newPage = pdfDoc.addPage([595, 842]);
          y = 800;
        }

        page.drawText(`${index + 1}. ${question} (${difficulty})`, {
          x: 50,
          y,
          size: 12,
          color: rgb(0, 0, 0),
        });
        y -= 20;

        options.forEach((opt, i) => {
          const label = String.fromCharCode(97 + i);
          page.drawText(`   (${label}) ${opt}`, {
            x: 70,
            y,
            size: 10,
            color: rgb(0, 0, 0),
          });
          y -= 15;
        });

        y -= 10;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = generateFileName("pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showStatusMessage("✅ PDF exported!");

    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("❌ Failed to export PDF");
    }
  });
}

// Call this in init.js
setupPdfExport();
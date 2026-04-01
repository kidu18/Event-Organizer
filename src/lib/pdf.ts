import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * 📄 PDF GENERATION UTILITY
 * From zero to done: Captures a hidden HTML element and renders it into a high-quality PDF ticket.
 */
export async function generateTicketPDF(elementId: string, fileName: string = "ticket.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
     console.error("Ticket element not found!");
     return;
  }

  try {
    // 🟠 STEP 1: Capture the element as a high-quality canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 2x scale for premium crispness
      useCORS: true, // Crucial for loading Unsplash/External images
      logging: false,
      backgroundColor: "#020617", // Match the dark theme
    });

    // 🟠 STEP 2: Configure the PDF layout
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    // 🟠 STEP 3: Add the image and save
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error("PDF generation failed:", error);
    return false;
  }
}

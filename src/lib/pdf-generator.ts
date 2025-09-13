import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a transaction receipt PDF
 * 
 * @param transactionData Transaction data to include in the receipt
 * @returns Blob containing the PDF data
 */
export const generateTransactionReceipt = (transactionData) => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add logo/header
  doc.setFontSize(20);
  doc.setTextColor(34, 139, 34); // Green color for CarbonIQ
  doc.text("CarbonIQ", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Transaction Receipt", pageWidth / 2, 30, { align: "center" });
  
  // Add transaction details
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 60);
  doc.text(`Transaction ID: ${transactionData.id || 'N/A'}`, 20, 70);
  
  // Add offset details
  doc.setFontSize(14);
  doc.text("Offset Details", 20, 90);
  
  // Create a table with transaction details
  const tableColumn = ["Item", "Details"];
  const tableRows = [
    ["Project", transactionData.project_name || 'N/A'],
    ["Credits Used", transactionData.credits_amount?.toString() || 'N/A'],
    ["Quantity", transactionData.quantity?.toString() || 'N/A'],
    ["Method", transactionData.method || 'N/A'],
    ["Status", transactionData.status || 'Pending Verification']
  ];

  // If there are blockchain transaction details, add them
  if (transactionData.royalty_address || transactionData.seller_address) {
    tableRows.push(["Royalty Address", transactionData.royalty_address || 'N/A']);
    tableRows.push(["Seller Address", transactionData.seller_address || 'N/A']);
  }
  
  // Add the table
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 100,
    theme: 'grid',
    headStyles: {
      fillColor: [34, 139, 34],
      textColor: [255, 255, 255]
    },
    styles: {
      halign: 'left'
    }
  });
  
  // Add carbon impact details if available
  if (transactionData.impact) {
    const finalY = (doc.lastAutoTable.finalY || 150) + 10;
    doc.setFontSize(14);
    doc.text("Environmental Impact", 20, finalY);
    doc.setFontSize(12);
    doc.text(transactionData.impact, 20, finalY + 10);
  }
  
  // Add footer
  doc.setFontSize(10);
  const finalY = doc.internal.pageSize.height - 10;
  doc.text("CarbonIQ - Measure. Manage. Minimize.", pageWidth / 2, finalY, { align: "center" });
  
  // Return the PDF as a blob
  return doc.output('blob');
};

/**
 * Download a transaction receipt PDF
 * 
 * @param transactionData Transaction data to include in the receipt
 */
export const downloadTransactionReceipt = (transactionData) => {
  const pdfBlob = generateTransactionReceipt(transactionData);
  const transactionId = transactionData.id || new Date().getTime();
  
  // Create a download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(pdfBlob);
  link.download = `transaction-receipt-${transactionId}.pdf`;
  
  // Append to body, click and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePayslip = async (payroll, staff) => {
  const filename = `payslip-${staff._id}-${payroll.month}.pdf`;
  const filePath = path.join('public/payslips', filename);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text('AWS Legal Payslip', { align: 'center' });
  doc.moveDown().fontSize(12).text(`Staff: ${staff.name}`);
  doc.text(`Month: ${payroll.month}`);
  doc.text(`Salary: AED ${payroll.salary}`);
  doc.text(`ROI: ${payroll.roi.toFixed(2)}%`);
  doc.end();

  return `/payslips/${filename}`;
};

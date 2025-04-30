import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePayslip = (payroll, user, path) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(path);
    doc.pipe(stream);

    doc
      .fontSize(20)
      .text('Payslip', { align: 'center' })
      .moveDown()
      .fontSize(12)
      .text(`Name: ${user.name}`)
      .text(`Role: ${user.role}`)
      .text(`Month: ${payroll.month}`)
      .text(`Salary: AED ${payroll.salary}`)
      .text(`Bonus: AED ${payroll.bonus}`)
      .text(`Deductions: AED ${payroll.deductions}`)
      .text(`Total Paid: AED ${payroll.total_paid}`);

    doc.end();
    stream.on('finish', () => resolve(path));
    stream.on('error', reject);
  });
};

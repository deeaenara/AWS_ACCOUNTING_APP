# 🏛️ AWS Legal Accounting System

A full-stack, AI-enhanced accounting + payroll + invoice system built for law firms in the UAE.  
Includes VAT compliance 🇦🇪, staff ROI tracking, OneSignal push, Outlook email integration, and WhatsApp automation.

---

## 📦 Features

✅ JWT Auth (Admin / Staff / Clients)  
✅ Invoice Generator (PDF, VAT auto-calc)  
✅ Payslip PDF + ROI for each staff  
✅ Weekly report cron to firm owner  
✅ Email Alerts (via Outlook SMTP)  
✅ WhatsApp Alerts (CallMeBot API)  
✅ Push Notifications (OneSignal)  
✅ Fully Dockerized + Render-ready  
✅ UAE VAT Ready (5% default)  
✅ PWA-ready frontend supported

---

## 🧱 Folder Structure

```txt
/backend
├── ai/                    ← AI bots (reminder, etc.)
├── config/                ← SMTP, Push, WhatsApp clients
├── controllers/           ← Logic for routes
├── jobs/                  ← Weekly report bot
├── models/                ← Mongoose schemas (User, Invoice, Payroll, etc.)
├── pdf/                   ← PDFKit generators (Payslip, Invoice)
├── routes/                ← API routes
├── public/payslips/       ← Auto-generated PDFs
├── server.js              ← Express bootstrap
├── Dockerfile             ← Container config
├── .env.example           ← Sample ENV file

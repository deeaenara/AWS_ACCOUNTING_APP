from datetime import datetime, timedelta
import smtplib

def send_reminder(email, due_date):
    today = datetime.now().date()
    if due_date - today <= timedelta(days=3):
        # send email or WhatsApp via Twilio here
        print(f"⚠️ Reminder sent to {email} - Invoice due on {due_date}")

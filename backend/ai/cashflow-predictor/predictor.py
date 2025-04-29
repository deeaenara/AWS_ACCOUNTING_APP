def predict_cashflow(invoices):
    from datetime import datetime, timedelta
    future = sum(inv['amount'] for inv in invoices if inv['due_date'] > datetime.now())
    return {"predicted_next_30_days": future}

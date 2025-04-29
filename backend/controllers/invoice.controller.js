import {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} from '../services/invoice.service.js';

export const addInvoice = async (req, res) => {
    try {
        const Invoice = await createInvoice(req.body);
        res.status(201).json(Invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add Invoice' });
    }
};

export const fetchInvoices = async (req, res) => {
    try {
        const Invoices = await getAllInvoices();
        res.json(Invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Invoices' });
    }
};

export const fetchInvoiceById = async (req, res) => {
    try {
        const Invoice = await getInvoiceById(req.params.id);
        if (!Invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json(Invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Invoice' });
    }
};

export const editInvoice = async (req, res) => {
    try {
        const Invoice = await updateInvoice(req.params.id, req.body);
        res.json(Invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Invoice' });
    }
};

export const removeInvoice = async (req, res) => {
    try {
        await deleteInvoice(req.params.id);
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Invoice' });
    }
};

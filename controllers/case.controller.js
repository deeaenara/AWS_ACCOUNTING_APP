import {
    createCase,
    getAllCases,
    getCaseById,
    updateCase,
    deleteCase
} from '../services/case.service.js';

export const addCase = async (req, res) => {
    try {
        const Case = await createCase(req.body);
        res.status(201).json(Case);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add Case' });
    }
};

export const fetchCases = async (req, res) => {
    try {
        const Cases = await getAllCases();
        res.json(Cases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Cases' });
    }
};

export const fetchCaseById = async (req, res) => {
    try {
        const Case = await getCaseById(req.params.id);
        if (!Case) return res.status(404).json({ message: 'Case not found' });
        res.json(Case);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Case' });
    }
};

export const editCase = async (req, res) => {
    try {
        const Case = await updateCase(req.params.id, req.body);
        res.json(Case);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Case' });
    }
};

export const removeCase = async (req, res) => {
    try {
        await deleteCase(req.params.id);
        res.json({ message: 'Case deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Case' });
    }
};

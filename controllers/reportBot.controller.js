import {
    createRetainer,
    getAllRetainers,
    getRetainerById,
    updateRetainer,
    deleteRetainer
} from '../services/retainer.service.js';

export const addRetainer = async (req, res) => {
    try {
        const Retainer = await createRetainer(req.body);
        res.status(201).json(Retainer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add Retainer' });
    }
};

export const fetchRetainers = async (req, res) => {
    try {
        const Retainers = await getAllRetainers();
        res.json(Retainers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Retainers' });
    }
};

export const fetchRetainerById = async (req, res) => {
    try {
        const Retainer = await getRetainerById(req.params.id);
        if (!Retainer) return res.status(404).json({ message: 'Retainer not found' });
        res.json(Retainer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Retainer' });
    }
};

export const editRetainer = async (req, res) => {
    try {
        const Retainer = await updateRetainer(req.params.id, req.body);
        res.json(Retainer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Retainer' });
    }
};

export const removeRetainer = async (req, res) => {
    try {
        await deleteRetainer(req.params.id);
        res.json({ message: 'Retainer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Retainer' });
    }
};

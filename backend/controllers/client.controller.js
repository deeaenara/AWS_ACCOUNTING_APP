import {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
} from '../services/client.service.js';

export const addClient = async (req, res) => {
    try {
        const client = await createClient(req.body);
        res.status(201).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add client' });
    }
};

export const fetchClients = async (req, res) => {
    try {
        const clients = await getAllClients();
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch clients' });
    }
};

export const fetchClientById = async (req, res) => {
    try {
        const client = await getClientById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch client' });
    }
};

export const editClient = async (req, res) => {
    try {
        const client = await updateClient(req.params.id, req.body);
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update client' });
    }
};

export const removeClient = async (req, res) => {
    try {
        await deleteClient(req.params.id);
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete client' });
    }
};

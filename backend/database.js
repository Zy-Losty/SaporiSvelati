const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, '..', 'data', 'database.json');

// Initialize database file if it doesn't exist
async function initDb() {
    try {
        await fs.access(DB_FILE);
    } catch {
        // File doesn't exist, create it with initial structure
        const initialData = {
            subscribers: [],
            campaigns: []
        };
        await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Helper to read DB
async function readDb() {
    await initDb();
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper to write DB
async function writeDb(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

const db = {
    // Subscribers
    async addSubscriber(email) {
        const data = await readDb();
        const existing = data.subscribers.find(s => s.email === email);
        if (existing) {
            if (existing.status === 'unsubscribed') {
                existing.status = 'active';
                await writeDb(data);
                return existing;
            }
            throw new Error('Email already subscribed');
        }
        
        const newSubscriber = {
            id: uuidv4(),
            email: email,
            token: uuidv4(), // For one-click unsubscribe
            status: 'active',
            createdAt: new Date().toISOString()
        };
        data.subscribers.push(newSubscriber);
        await writeDb(data);
        return newSubscriber;
    },

    async unsubscribe(token) {
        const data = await readDb();
        const sub = data.subscribers.find(s => s.token === token);
        if (sub) {
            sub.status = 'unsubscribed';
            await writeDb(data);
            return true;
        }
        return false;
    },

    async getActiveSubscribers() {
        const data = await readDb();
        return data.subscribers.filter(s => s.status === 'active');
    },

    async getAllSubscribers() {
        const data = await readDb();
        return data.subscribers;
    },

    async deleteSubscriber(id) {
        const data = await readDb();
        data.subscribers = data.subscribers.filter(s => s.id !== id);
        await writeDb(data);
    },

    // Campaigns (Archivio)
    async trackCampaign(subject, htmlContent, sentCount) {
        const data = await readDb();
        const campaign = {
            id: uuidv4(),
            subject,
            htmlContent,
            sentCount,
            sentAt: new Date().toISOString()
        };
        data.campaigns.push(campaign);
        await writeDb(data);
        return campaign;
    },

    async getCampaigns() {
        const data = await readDb();
        // Return sorted by mostly recent
        return data.campaigns.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
    }
};

module.exports = db;

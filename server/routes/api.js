import express from 'express';
import FieldLog from '../models/FieldLog.js';
import YieldAnalytics from '../models/YieldAnalytics.js';

const router = express.Router();

// Get Latest Field Log (Pulse)
router.get('/field-logs/latest', async (req, res) => {
    try {
        const latestLog = await FieldLog.findOne().sort({ timestamp: -1 });
        res.json(latestLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get History (Trends)
router.get('/field-logs/history', async (req, res) => {
    try {
        // Get last 30 entries for trends, or filter by query
        const limit = parseInt(req.query.limit) || 30;
        const history = await FieldLog.find().sort({ timestamp: -1 }).limit(limit);
        // Reverse to show oldest first in charts if needed, or handle in frontend
        res.json(history.reverse());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Yield Data
router.get('/yield-analytics', async (req, res) => {
    try {
        const data = await YieldAnalytics.find().sort({ year: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Proxy to Flask Prediction API
router.post('/predict', async (req, res) => {
    try {
        const response = await fetch('https://gee-live-flask-25082025-1.onrender.com/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

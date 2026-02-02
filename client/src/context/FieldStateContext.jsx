import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FieldStateContext = createContext();

export const useFieldState = () => useContext(FieldStateContext);

export const FieldStateProvider = ({ children }) => {
    const [pulseData, setPulseData] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [yieldData, setYieldData] = useState([]);
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [predictionLoading, setPredictionLoading] = useState(false);
    const [error, setError] = useState(null);

    // Flask Prediction API (CORS enabled)
    const FLASK_API_URL = 'https://gee-live-flask-25082025-1.onrender.com';

    // Default input parameters for prediction
    const defaultInput = {
        "ARI": -0.0850317776203156,
        "CAI": 0.0938499927997589,
        "CIRE": 0.203984573483467,
        "DWSI": 1.47289931774139,
        "EVI": 0.589215472633198,
        "GCVI": 0.169555217027664,
        "MCARI": 0.0114944481809844,
        "NDVI": 0.10628417134285,
        "PS": 97.77,
        "RH2M": 77.57,
        "T2M": 13.79,
        "k1": 17.2,
        "n1": 8.9,
        "p1": 6
    };

    const fetchData = async () => {
        try {
            setLoading(true);

            // Use mock data for dashboard (no backend needed)
            setPulseData({ nitrogen: 142, phosphorus: 45, potassium: 88 });

            // Generate last 12 days history
            const mockHistory = Array.from({ length: 12 }).map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (11 - i));
                return {
                    timestamp: d.toISOString(),
                    nitrogen: 130 + Math.random() * 30,
                    phosphorus: 40 + Math.random() * 20,
                    potassium: 80 + Math.random() * 30
                };
            });
            setHistoryData(mockHistory);

            setYieldData([
                { cropType: 'Rice', year: 2023, yieldAmount: 4.2 },
                { cropType: 'Wheat', year: 2023, yieldAmount: 3.5 },
                { cropType: 'Rice', year: 2024, yieldAmount: 4.8 },
                { cropType: 'Wheat', year: 2024, yieldAmount: 4.1 },
            ]);

            // Allow main UI to load
            setLoading(false);

            // Fetch Prediction from Flask API directly (CORS enabled)
            setPredictionLoading(true);
            try {
                const predictRes = await axios.post(`${FLASK_API_URL}/predict`, defaultInput);
                setPredictionData(predictRes.data);
            } catch (predErr) {
                console.warn("Prediction API failed", predErr);
                // Set mock prediction data as fallback
                setPredictionData({
                    "Input_Features": defaultInput,
                    "Prediction (NPK)": {
                        "K": 44.39,
                        "N": 443.17,
                        "P": 31.26
                    }
                });
            } finally {
                setPredictionLoading(false);
            }

            setError(null);
        } catch (err) {
            console.error("Error loading data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Optional: Polling every 30s
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <FieldStateContext.Provider value={{ pulseData, historyData, yieldData, predictionData, loading, predictionLoading, error, refreshData: fetchData }}>
            {children}
        </FieldStateContext.Provider>
    );
};

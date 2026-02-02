import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Upload, CheckCircle, AlertTriangle } from 'lucide-react';

const DiseaseScanner = () => {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleScan = () => {
        setScanning(true);
        setResult(null);
        // Simulate scan API
        setTimeout(() => {
            setScanning(false);
            setResult({
                disease: "Late Blight",
                confidence: 88,
                status: "danger"
            });
        }, 2500);
    };

    return (
        <div className="h-full bg-rose-50/90 border border-rose-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">Disease Scanner</h3>
                <Scan className="text-gray-500" size={20} />
            </div>

            <div
                onClick={handleScan}
                className="flex-1 h-[140px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative"
            >
                <AnimatePresence mode="wait">
                    {!scanning && !result && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-gray-500"
                        >
                            <Upload size={32} className="mb-2 text-gray-400" />
                            <span className="text-xs font-medium">Upload Leaf Photo</span>
                        </motion.div>
                    )}

                    {scanning && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-green-500/10 animate-pulse" />
                            <motion.div
                                animate={{ y: [-20, 20, -20] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-full h-1 bg-green-400 box-shadow-[0_0_10px_#4ade80]"
                            />
                            <span className="text-sm font-mono text-white mt-12">Analyzing...</span>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            {result.status === 'danger' ? <AlertTriangle className="text-red-400 mb-1" size={32} /> : <CheckCircle className="text-green-400 mb-1" size={32} />}
                            <h4 className="text-lg font-bold text-white">{result.disease}</h4>
                            <span className="text-xs text-white/70">{result.confidence}% Confidence</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DiseaseScanner;

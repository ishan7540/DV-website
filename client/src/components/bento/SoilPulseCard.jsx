import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Thermometer } from 'lucide-react';
import { useFieldState } from '../../context/FieldStateContext';

const Gauge = ({ label, value, max, color, unit, icon: Icon }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDasharray: 251, strokeDashoffset: 251 }}
                        animate={{ strokeDashoffset: 251 - (251 * percentage) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        className="drop-shadow-lg"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <Icon size={20} className="text-gray-600 mb-1" />
                    <span className="text-xl font-bold text-gray-800">{Math.round(value)}</span>
                    <span className="text-xs text-gray-600">{unit}</span>
                </div>
            </div>
            <span className="text-sm font-bold text-gray-700">{label}</span>
            <div className="text-xs text-gray-700 font-medium bg-white/40 px-2 py-0.5 rounded-full border border-gray-200">
                {percentage < 30 ? 'Low' : percentage > 70 ? 'High' : 'Optimal'}
            </div>
        </div>
    );
};

const SoilPulseCard = () => {
    const { pulseData, predictionData, loading } = useFieldState();
    const [showDetails, setShowDetails] = React.useState(false);

    if (loading) return <div className="h-full flex items-center justify-center text-gray-500 animate-pulse">Loading Soil Data...</div>;

    // Use Prediction Data if available, otherwise fallback to pulseData or zeros
    let currentData = { n: 0, p: 0, k: 0 };
    let predictedData = null;
    let paramsList = [];

    if (predictionData && predictionData['Prediction (NPK)']) {
        // Use the PREDICTED values as the main display
        predictedData = predictionData['Prediction (NPK)'];
        currentData = {
            n: predictedData.N,
            p: predictedData.P,
            k: predictedData.K
        };

        // Create 14 params list from Input Features
        if (predictionData.Input_Features) {
            const inputs = predictionData.Input_Features;
            paramsList = Object.entries(inputs).map(([key, value]) => ({
                name: key,
                value: typeof value === 'number' ? value.toFixed(4) : value,
                unit: '' // Units not specified in input JSON, keeping empty or generic
            }));
        }
    } else if (pulseData) {
        currentData = {
            n: pulseData.nitrogen,
            p: pulseData.phosphorus,
            k: pulseData.potassium
        };
    }

    return (
        <div className="relative h-full bg-white/80 border border-gray-300 rounded-3xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-rural-green animate-pulse" />
                    <h3 className="text-xl font-bold text-gray-800 tracking-wide">Live Soil Pulse</h3>
                </div>
                {!showDetails && <span className="text-xs font-bold font-mono text-rural-green bg-green-100 px-2 py-1 rounded">REAL-TIME</span>}
            </div>

            {/* Main Gauges vs Detailed List */}
            {!showDetails ? (
                <>
                    <div className="flex flex-col h-[calc(100%-4rem)]">
                        <div className="grid grid-cols-3 gap-2 items-center flex-1">
                            <Gauge
                                label="Nitrogen"
                                value={currentData.n}
                                max={500}
                                color="#4ade80"
                                unit="Predicted"
                                icon={Leaf}
                            />
                            <Gauge
                                label="Phosphorus"
                                value={currentData.p}
                                max={100}
                                color="#facc15"
                                unit="Predicted"
                                icon={Droplets}
                            />
                            <Gauge
                                label="Potassium"
                                value={currentData.k}
                                max={100}
                                color="#f87171"
                                unit="Predicted"
                                icon={Thermometer}
                            />
                        </div>

                        {/* Loading State for Prediction */}
                        {!predictedData && (
                            <div className="mt-2 p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex flex-col items-center justify-center space-y-2">
                                <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                                <span className="text-xs font-medium text-gray-500 animate-pulse">Running AI Model...</span>
                            </div>
                        )}

                        <button
                            onClick={() => setShowDetails(true)}
                            className="w-full mt-auto py-2 bg-rural-green/10 hover:bg-rural-green/20 text-rural-green font-bold rounded-xl text-sm transition-colors"
                        >
                            View Input Parameters
                        </button>
                    </div>
                </>
            ) : (
                <div className="h-[calc(100%-3rem)] flex flex-col">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200">
                        {paramsList.map((param, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 bg-white/50 rounded-lg border border-gray-100">
                                <span className="text-sm font-medium text-gray-700 uppercase">{param.name}</span>
                                <span className="text-sm font-bold text-gray-900">{param.value} <span className="text-xs font-normal text-gray-500">{param.unit}</span></span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowDetails(false)}
                        className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors"
                    >
                        Back to Pulse
                    </button>
                </div>
            )}

            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-green-400/20 transition-all duration-500" />
        </div>
    );
};

export default SoilPulseCard;

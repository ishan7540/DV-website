import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sprout } from 'lucide-react';
import { useFieldState } from '../../context/FieldStateContext';
import { calculateFertilizerNeeds } from '../../utils/fertilizerCalc';

const FertilizerPredictor = () => {
    const { pulseData, loading } = useFieldState();
    const [selectedCrop, setSelectedCrop] = useState('Wheat');

    if (loading) return <div className="h-full bg-white/60 rounded-3xl animate-pulse" />;

    const currentNPK = pulseData || { nitrogen: 0, phosphorus: 0, potassium: 0 };
    const { bags, gap } = calculateFertilizerNeeds(currentNPK, selectedCrop);

    // Animation variants for Zero-G effect
    const floatAnim = {
        hidden: { y: 20, opacity: 0 },
        visible: (i) => ({
            y: [0, -5, 0], // Gentle float
            opacity: 1,
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 3 + i,
                    ease: "easeInOut"
                },
                opacity: {
                    duration: 1,
                    delay: i * 0.1
                }
            }
        })
    };

    return (
        <div className="h-full flex flex-col bg-white/80 border border-white/50 rounded-3xl p-6 relative overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 z-10">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Smart Fertilizer</h3>
                    <p className="text-xs text-gray-500 font-medium">AI-driven Prescription</p>
                </div>
                <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                    {['Wheat', 'Rice'].map(crop => (
                        <button
                            key={crop}
                            onClick={() => setSelectedCrop(crop)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedCrop === crop ? 'bg-rural-green text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            {crop}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gap Analysis */}
            <div className="mb-4 text-sm text-white/80 z-10">
                Deficit:
                <span className="font-mono ml-2 text-yellow-200">
                    N:-{Math.round(gap.n)} P:-{Math.round(gap.p)} K:-{Math.round(gap.k)}
                </span>
            </div>

            {/* Recommendations (Bags) */}
            <div className="flex-1 grid grid-cols-3 gap-3 z-10 items-end pb-2">
                {/* Urea */}
                <motion.div custom={1} variants={floatAnim} initial="hidden" animate="visible"
                    className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[100px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <span className="text-2xl font-black text-black mb-1">{bags.urea}</span>
                    <span className="text-xs text-blue-700 font-bold">Bags</span>
                    <span className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider font-semibold">Urea</span>
                </motion.div>

                {/* DAP */}
                <motion.div custom={2} variants={floatAnim} initial="hidden" animate="visible"
                    className="bg-purple-50 border border-purple-200 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[100px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <span className="text-2xl font-black text-black mb-1">{bags.dap}</span>
                    <span className="text-xs text-purple-700 font-bold">Bags</span>
                    <span className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider font-semibold">DAP</span>
                </motion.div>

                {/* MOP */}
                <motion.div custom={3} variants={floatAnim} initial="hidden" animate="visible"
                    className="bg-red-50 border border-red-200 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[100px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <span className="text-2xl font-black text-black mb-1">{bags.mop}</span>
                    <span className="text-xs text-red-700 font-bold">Bags</span>
                    <span className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider font-semibold">MOP</span>
                </motion.div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-auto bg-earth-brown hover:bg-earth-brown/80 text-white rounded-xl py-3 flex items-center justify-center space-x-2 transition-colors z-10 shadow-lg">
                <span className="text-sm font-medium">Order Fertilizer</span>
                <ArrowRight size={16} />
            </button>

            {/* Decorative Elements */}
            <Sprout size={120} className="absolute -bottom-4 -right-4 text-green-800/5 rotate-12 z-0" />
        </div>
    );
};

export default FertilizerPredictor;

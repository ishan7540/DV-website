import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle } from 'lucide-react';

const steps = [
    { crop: 'Rice', season: 'July-Nov', color: 'bg-green-500', status: 'completed' },
    { crop: 'Mustard', season: 'Nov-Feb', color: 'bg-yellow-500', status: 'current' },
    { crop: 'Moong', season: 'Mar-June', color: 'bg-emerald-500', status: 'upcoming' },
];

const CropRotationGuide = () => {
    return (
        <div className="h-full bg-blue-50/60 border border-blue-100 rounded-3xl p-4 shadow-sm overflow-hidden flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-3">
                <Recycle className="text-rural-green" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Rotation Cycle</h3>
            </div>

            <div className="flex items-center justify-between relative px-2">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-200/50 -z-0 rounded-full" />

                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center relative z-10 w-1/3">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: step.status === 'current' ? 1.1 : 1 }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md border-2 ${step.status === 'current' ? 'border-white bg-rural-green text-white ring-2 ring-rural-green/20' : step.status === 'completed' ? 'border-blue-200 bg-blue-100 text-gray-600' : 'border-blue-100 bg-white text-gray-400'}`}
                        >
                            {index + 1}
                        </motion.div>
                        <div className="text-center mt-2">
                            <p className={`font-bold text-sm ${step.status === 'current' ? 'text-gray-900' : 'text-gray-500'}`}>{step.crop}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{step.season}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-2.5 bg-white/60 rounded-xl text-xs text-blue-900 border border-blue-100 flex items-start">
                <span className="mr-2">💡</span>
                <span>
                    <span className="font-bold text-blue-800">Tip:</span> Rotate with <span className="font-bold text-rural-green">Mustard</span> to naturally replenish soil Nitrogen after Rice harvest.
                </span>
            </div>
        </div>
    );
};

export default CropRotationGuide;

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Megaphone } from 'lucide-react';

const schemes = [
    { title: "PM-Kisan Samman Nidhi", desc: "Get ₹6000/year income support." },
    { title: "Soil Health Card", desc: "Free soil testing every 2 years." },
    { title: "Kisan Credit Card", desc: "Low interest loans up to ₹3L." },
    { title: "PM Fasal Bima Yojana", desc: "Crop insurance @ 2% premium." },
];

const YojanaTicker = () => {
    return (
        <div className="h-full bg-earth-brown/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col overflow-hidden">
            <div className="flex items-center space-x-2 mb-4 text-white">
                <Megaphone size={20} className="animate-bounce" />
                <h3 className="text-lg font-bold">Government Schemes</h3>
            </div>

            <div className="flex-1 overflow-hidden relative">
                {/* Vertical Marquee */}
                <motion.div
                    animate={{ y: [0, -200] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="space-y-4"
                >
                    {[...schemes, ...schemes, ...schemes].map((scheme, i) => (
                        <div key={i} className="bg-white/10 p-3 rounded-xl border border-white/5 hover:bg-white/20 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-white text-sm">{scheme.title}</h4>
                                <ExternalLink size={12} className="text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-white/70 mt-1">{scheme.desc}</p>
                            <button className="mt-2 text-[10px] bg-rural-green px-2 py-1 rounded text-white shadow-sm hover:bg-green-700 w-full">Apply Now</button>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-earth-brown to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-earth-brown to-transparent z-10" />
            </div>
        </div>
    );
};

export default YojanaTicker;

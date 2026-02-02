import React from 'react';
import { Map, MapPin } from 'lucide-react';

const SatelliteInsights = () => {
    return (
        <div className="h-full bg-slate-50/80 border border-slate-300 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="text-lg font-bold text-gray-100 drop-shadow-md">Satellite View</h3>
                <Map className="text-white/80 drop-shadow-md" size={20} />
            </div>

            <div className="absolute inset-0 z-0">
                {/* Simulated Map Image - Using a farm field satellite view */}
                <img
                    src="https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?q=80&w=1500&auto=format&fit=crop"
                    alt="Satellite Map"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex items-end">
                <div className="text-xs text-white/90 bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/10 w-full flex justify-between items-center">
                    <div>
                        <p className="font-bold">NDVI: 0.72</p>
                        <p className="opacity-80">Good crop health</p>
                    </div>
                    <MapPin size={16} className="text-green-400" />
                </div>
            </div>
        </div>
    );
};

export default SatelliteInsights;

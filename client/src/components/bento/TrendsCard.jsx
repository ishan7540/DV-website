import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useFieldState } from '../../context/FieldStateContext';

const TrendsCard = () => {
    const { historyData, yieldData, loading } = useFieldState();
    const [view, setView] = useState('soil'); // 'soil' | 'yield'
    const [nutrientIndex, setNutrientIndex] = useState(0); // 0=N, 1=P, 2=K

    if (loading) return <div className="h-full bg-white/20 rounded-3xl animate-pulse" />;

    // Format data for chart
    const soilChartData = historyData.slice(0, 12).map(log => ({
        name: new Date(log.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        N: Math.round(log.nitrogen),
        P: Math.round(log.phosphorus),
        K: Math.round(log.potassium),
    })).reverse();

    const yieldChartData = yieldData.map(y => ({
        name: `${y.cropType} '${y.year.toString().slice(-2)}`,
        yield: y.yieldAmount,
    }));

    const nutrients = [
        { key: 'N', label: 'Nitrogen (N)', color: '#4ade80', id: 'colorN' },
        { key: 'P', label: 'Phosphorus (P)', color: '#facc15', id: 'colorP' },
        { key: 'K', label: 'Potassium (K)', color: '#f87171', id: 'colorK' }
    ];

    const currentNutrient = nutrients[nutrientIndex];

    const nextNutrient = () => setNutrientIndex((prev) => (prev + 1) % nutrients.length);

    return (
        <div className="h-full bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 shadow-sm flex flex-col transition-all">
            <div className="flex justify-between items-center mb-4">
                <div onClick={nextNutrient} className="cursor-pointer group flex items-center space-x-2 select-none">
                    <h3 className="text-xl font-bold text-gray-800">
                        {view === 'soil' ? currentNutrient.label : 'Yield History'}
                    </h3>
                    {view === 'soil' && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded group-hover:bg-gray-200">Tap to Switch</span>}
                </div>

                <div className="bg-gray-100 p-1 rounded-lg flex">
                    <button
                        onClick={() => setView('soil')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${view === 'soil' ? 'bg-white text-rural-green shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        Soil
                    </button>
                    <button
                        onClick={() => setView('yield')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${view === 'yield' ? 'bg-white text-rural-green shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        Yield
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    {view === 'soil' ? (
                        <AreaChart data={soilChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id={currentNutrient.id} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={currentNutrient.color} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={currentNutrient.color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#4b5563', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                label={{ value: 'Date', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#9ca3af' }}
                            />
                            <YAxis
                                tick={{ fill: '#4b5563', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                label={{ value: 'kg/ha', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: '#9ca3af' }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#374151', fontSize: '12px', fontWeight: 'bold' }}
                            />
                            <Area
                                type="monotone"
                                dataKey={currentNutrient.key}
                                stroke={currentNutrient.color}
                                fillOpacity={1}
                                fill={`url(#${currentNutrient.id})`}
                                strokeWidth={3}
                                animationDuration={1000}
                                key={currentNutrient.key} // Forces re-render on switch
                            />
                        </AreaChart>
                    ) : (
                        <BarChart data={yieldChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6' }}
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="yield" fill="#fcd34d" radius={[4, 4, 0, 0]} name="Yield (Ton/Ha)" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrendsCard;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { useFieldState } from '../../context/FieldStateContext';

const KisanGPT = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Namaste! I am Kisan-GPT. Ask me about your soil health or schemes.' }
    ]);
    const [input, setInput] = useState('');
    const { pulseData } = useFieldState();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add User Message
        const newMessages = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Simulate Thinking
        setTimeout(() => {
            const reply = generateReply(input, pulseData);
            setMessages(prev => [...prev, { role: 'bot', text: reply }]);
        }, 1000);
    };

    const generateReply = (query, data) => {
        const q = query.toLowerCase();

        // Context-aware logic
        if (q.includes('nitrogen') || q.includes('urea')) {
            const val = Math.round(data?.nitrogen || 0);
            if (val < 100) return `Your Nitrogen level is low (${val} kg/ha). I recommend applying Urea based on the Fertilizer Card.`;
            if (val > 150) return `Your Nitrogen is sufficient (${val} kg/ha). No need for extra Urea right now.`;
            return `Nitrogen is optimal (${val} kg/ha). Maintain current practices.`;
        }

        if (q.includes('yield') || q.includes('wheat') || q.includes('rice')) {
            return "Check the Yield History card to compare your harvest with last year. Generally, wheat yield correlates with Potassium levels.";
        }

        if (q.includes('scheme') || q.includes('yojana') || q.includes('money')) {
            return "You can apply for PM-Kisan (₹6000/year) or KCC loans. Check the Sarkari Yojana ticker for details.";
        }

        if (q.includes('soil') || q.includes('health')) {
            return `Current Soil Health: pH ${data?.ph?.toFixed(1) || 7}, Moisture ${Math.round(data?.moisture || 0)}%. Overall condition looks good for sowing.`;
        }

        return "I can help with Soil Health, Fertilizer, and Government Schemes. Try asking 'How is my Nitrogen?'";
    };

    return (
        <>
            {/* FAB */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-rural-green text-white p-4 rounded-full shadow-2xl z-50 border border-white/20 hover:bg-green-800 transition-colors"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl flex flex-col z-40 overflow-hidden h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-rural-green/90 p-4 text-white flex items-center space-x-2">
                            <Sparkles size={18} className="text-yellow-300" />
                            <h3 className="font-bold">Kisan-GPT</h3>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/50" ref={scrollRef}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-rural-green text-white rounded-br-none'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-gray-200 flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your farm..."
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-rural-green text-white p-2 rounded-full hover:bg-green-800 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default KisanGPT;

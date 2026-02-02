import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FieldLog from '../models/FieldLog.js';
import YieldAnalytics from '../models/YieldAnalytics.js';

dotenv.config({ path: '.env' }); // Adjusted to look in current directory (server/)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data
        await FieldLog.deleteMany({});
        await YieldAnalytics.deleteMany({});
        console.log('Cleared existing data');

        // Generate 2 years of daily data
        const fieldLogs = [];
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 2);

        // Seasonal patterns (approximate)
        // Rice: July - Nov (Monsoon) -> Needs high N
        // Wheat: Nov - April (Winter)

        for (let i = 0; i < 730; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);

            // Random fluctuation with seasonal bias
            const month = date.getMonth(); // 0-11
            let baseTemp = 25;
            if (month >= 3 && month <= 5) baseTemp = 35; // Summer
            if (month >= 10 || month <= 1) baseTemp = 15; // Winter

            fieldLogs.push({
                timestamp: date,
                nitrogen: Math.max(0, 100 + Math.random() * 50 - 20), // Target ~120-150
                phosphorus: Math.max(0, 40 + Math.random() * 20 - 10),
                potassium: Math.max(0, 40 + Math.random() * 20 - 10),
                ph: 6.5 + Math.random() * 1.0 - 0.5,
                moisture: Math.max(0, 40 + Math.random() * 40),
                temperature: baseTemp + Math.random() * 5,
                ec: 0.5 + Math.random() * 0.5,
                weather: {
                    temp: baseTemp,
                    humidity: 60 + Math.random() * 20,
                    condition: Math.random() > 0.8 ? 'Rain' : 'Clear'
                },
                ndvi: 0.2 + Math.random() * 0.6
            });
        }

        await FieldLog.insertMany(fieldLogs);
        console.log(`Seeded ${fieldLogs.length} field logs`);

        // Yield Data
        const yieldData = [
            { cropType: 'Rice', year: 2024, yieldAmount: 4.5, fertilizerUsed: { urea: 150, dap: 50, mop: 30 } },
            { cropType: 'Wheat', year: 2024, yieldAmount: 3.8, fertilizerUsed: { urea: 120, dap: 60, mop: 40 } },
            { cropType: 'Rice', year: 2025, yieldAmount: 4.8, fertilizerUsed: { urea: 160, dap: 50, mop: 30 } },
            { cropType: 'Wheat', year: 2025, yieldAmount: 4.0, fertilizerUsed: { urea: 130, dap: 60, mop: 40 } },
        ];

        await YieldAnalytics.insertMany(yieldData);
        console.log(`Seeded ${yieldData.length} yield records`);

        console.log('Seeding Complete');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();

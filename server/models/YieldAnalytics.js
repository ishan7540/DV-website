import mongoose from 'mongoose';

const YieldAnalyticsSchema = new mongoose.Schema({
    cropType: { type: String, required: true },
    year: { type: Number, required: true },
    yieldAmount: { type: Number, required: true }, // ton/hectare or quintal/acre
    fertilizerUsed: {
        urea: Number,
        dap: Number,
        mop: Number
    }
});

export default mongoose.model('YieldAnalytics', YieldAnalyticsSchema);

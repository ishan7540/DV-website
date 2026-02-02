import mongoose from 'mongoose';

const FieldLogSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true },
    ph: { type: Number, required: true },
    moisture: { type: Number, required: true },
    temperature: { type: Number, required: true },
    ec: { type: Number, required: true }, // Electrical Conductivity
    weather: {
        temp: Number,
        humidity: Number,
        condition: String
    },
    ndvi: { type: Number }
});

export default mongoose.model('FieldLog', FieldLogSchema);

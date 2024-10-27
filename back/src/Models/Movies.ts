import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1888, max: 2025 },
    duration: { type: String, required: true },
    genre: { type: String, required: true, trim: true },
    rate: { type: Number, required: true, min: 0, max: 5 },
    director: { type: String, required: true, trim: true },
    poster: { type: String, required: true },
});

// Exportación del modelo
export const Movies = model('Movies', movieSchema);

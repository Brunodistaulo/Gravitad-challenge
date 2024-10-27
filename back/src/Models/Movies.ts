import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1888, max: 2025 },
    poster: { type: String, required: true },
});


export const Movies = model('Movies', movieSchema);

const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema(
    {
        username: {
            type: String
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: false,
            default: Date.now
        }
    }
)

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
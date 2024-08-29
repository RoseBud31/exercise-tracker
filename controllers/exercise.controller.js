const Exercise = require('../Models/exercise.model');
const User = require('../models/user.model');

const addExercise = async (req, res) => {
    const {  description, duration, date } = req.body;
    const id = req.params._id;
    try {
        const existingId = await User.findById(id);
        if (!existingId) {
            return res.status(404).json({"message": "Id does not exist"});
        }
        const username = existingId.username;
        const exerciseLog = await Exercise.create({"username": username,"description": description, "duration": duration, "date": date.toDateString()});
        res.status(200).json({exerciseLog});
    } catch (error) {
        res.status(500).json({"message": "Failed to add a new exercise log"});
    }
}

const getUserLogs = async (req, res) => {
    const id = req.params._id;
    try {
        const existingId = await User.findById(id);
        if (!existingId) {
            return res.status(404).json({"message": "Id does not exist"});
        }
        const username = existingId.username;
        const allExerciseLogs = await Exercise.find({"username": username});
        var log = [];
        for ( i=0; i<allExerciseLogs.length; i++) {
            let value = {
                "description": allExerciseLogs[i].description,
                "duration": allExerciseLogs[i].duration,
                "date": allExerciseLogs[i].date.toDateString()
            }
            log.push(value);
        };
        const formatted = {
            "username": username,
            "count": allExerciseLogs.length,
            "_id": id,
            log,
        }
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({"message": `Failed to retrieve exercises for user with id: ${id}`});
    }
}

module.exports = {
    addExercise,
    getUserLogs
}

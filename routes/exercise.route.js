const express = require('express');
const router = express.Router();
const { addExercise, getUserLogs } = require('../controllers/exercise.controller');

router.post('/:_id/exercises', addExercise);
router.get('/:_id/logs', getUserLogs);

module.exports = router;
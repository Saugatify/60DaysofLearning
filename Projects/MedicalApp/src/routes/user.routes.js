import express from 'express';
import User from '../models/user.models.js';
import scheduleReminders from '../utils/scheduler.js';

const router = express.Router();

// Create a user and schedule reminders
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        scheduleReminders(user);
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    reminders: [{ time: String, medication: String }],
});

const User = mongoose.model('User', userSchema);

export default User;

// scheduler.js

import cron from 'node-cron';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendReminder = (user, reminder) => {
    const message = `Reminder: It's time to take your medication: ${reminder.medication}`;
    client.messages.create({
        body: message,
        to: user.phone,
        from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then(message => console.log(`Message sent: ${message.sid}`))
    .catch(err => console.error(`Failed to send message: ${err}`));
};

const scheduleReminders = (user) => {
    user.reminders.forEach(reminder => {
        const [hour, minute] = reminder.time.split(':');

        // Schedule the initial reminder
        cron.schedule(`${minute} ${hour} * * *`, () => {
            sendReminder(user, reminder);
        });
    });
};

client.messages
  .list({ limit: 20 }) // Example limit to retrieve recent 20 messages
  .then(messages => messages.forEach(m => console.log(m.sid, m.status)))
  .catch(error => console.error(error));


export default scheduleReminders;

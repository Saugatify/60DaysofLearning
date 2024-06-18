import TelegramBot from "node-telegram-bot-api";
import mongoose from 'mongoose';
import { config } from "dotenv";
import Order from './models/index.js'; // Import the Order model

config();

// Load bot token and MongoDB URI from environment variables
const token = process.env.BOT_TOKEN;
const mongoUri = process.env.MONGO_URI;

if (!token) {
  console.error("Bot token is not defined in the environment variables.");
  process.exit(1);
}

if (!mongoUri) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a new Telegram bot instance
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text ? msg.text.toString().toLowerCase() : '';
  const firstName = msg.chat.first_name;

  if (msg.location) {
    const latitude = msg.location.latitude;
    const longitude = msg.location.longitude;
    console.log(`Received location: Latitude ${latitude}, Longitude ${longitude}`);
    bot.sendMessage(chatId, `Received location: Latitude ${latitude}, Longitude ${longitude}`);
    // Handle further processing based on the received location
    // Example: Save location data to MongoDB or perform location-based actions
    return;
  }

  // Check if the message contains "hello"
  if (messageText.includes("hello" || "hi")) {
    bot.sendMessage(chatId, `Hello ${firstName}. Type 'cylinder' to proceed.`);
  }

  // Check if the message contains "cylinder"
  if (messageText.includes("cylinder")) {
    bot.sendMessage(chatId, `Do you want a cylinder? Please reply with "yes" or "no".`);

    // Listen for the user's response
    bot.once('message', async (response) => {
      const responseText = response.text.toString().toLowerCase();

      if (responseText === "yes") {
        bot.sendMessage(chatId, `Great! Please provide the number of cylinders you want.`);
        
        // Listen for the user's response regarding the number of cylinders
        bot.once('message', async (numberResponse) => {
          const number = parseInt(numberResponse.text, 10);
          if (!isNaN(number) && number > 0) {
            bot.sendMessage(chatId, `Please provide your phone number for order confirmation.`);
            
            // Listen for the user's phone number
            bot.once('message', async (phoneResponse) => {
              const phoneNumber = phoneResponse.text.toString();
              
              if (/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) { // Basic phone number validation
                try {
                  // Create and save the order to MongoDB
                  const order = new Order({
                    chatId: chatId,
                    user: firstName,
                    cylinders: number,
                    phoneNumber: phoneNumber
                  });
                  await order.save();
                  bot.sendMessage(chatId, `You have requested ${number} cylinders. Your order has been placed.`);
                  console.log(`Order saved: ${order}`);
                } catch (err) {
                  bot.sendMessage(chatId, `There was an error saving your order. Please try again later.`);
                  console.error('Error saving order:', err);
                }
              } else {
                bot.sendMessage(chatId, `Please provide a valid phone number.`);
              }
            });
          } else {
            bot.sendMessage(chatId, `Please provide a valid number.`);
          }
        });
      } else if (responseText === "no") {
        bot.sendMessage(chatId, `Alright, let us know if you need anything else.`);
      }
    });
  }

  // Log the chat ID and first name
  console.log(chatId, firstName);
  console.log(msg);
});

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code}`, error.message);
});

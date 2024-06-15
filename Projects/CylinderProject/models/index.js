import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  chatId: { type: Number, required: true },
  user: { type: String, required: true },
  cylinders: { type: Number, required: true },
  phoneNumber: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

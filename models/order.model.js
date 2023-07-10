const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  status: {type:String,
    require:true,
    default:"placed",
    enum:["placed", "preparing", "on the way", "delivered"]
}
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = {
    orderModel
};

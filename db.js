const mongoose = require('mongoose');
require('dotenv').config()

const connection = mongoose.connect(`mongodb+srv://sohel:nopass@cluster0.4rmgup6.mongodb.net/FoodDelivaryApp?retryWrites=true&w=majority`)

module.exports={
    connection
}

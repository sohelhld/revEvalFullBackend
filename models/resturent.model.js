const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    address: {
      street: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      country: { type: String, require: true },
      zip: { type: String, require: true },
    },
    menu: [
      {
        //   _id: ObjectId,
        name: { type: String, require: true },
        description: { type: String, require: true },
        price: { type: Number, require: true },
        image: { type: String, require: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const restaurantModel = mongoose.model("restaurant ", restaurantSchema);

module.exports = {
  restaurantModel,
};

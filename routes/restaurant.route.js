const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { restaurantModel } = require('../models/resturent.model');
require('dotenv').config()


const restaurantRouter = express.Router()

//post
restaurantRouter.post('/add', async (req, res) => {

    const payload = req.body
     
      try {
        const user = new restaurantModel(payload)
        await user.save()

        res.status(201).send({"message":"resturent  is Succesfully added"})
        
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
  });


//get
// Get all restaurants
restaurantRouter.get('/', async (req, res) => {
    try {
      const restaurants = await restaurantModel.find();
  
      res.status(200).send(restaurants)
    } catch (error) {
      res.status(400).send({ error: 'Failed to get restaurants' });
    }
  });
  


// Get restaurant by ID
restaurantRouter.get('/:id', async (req, res) => {
    const restaurantId = req.params.id;
    try {
  
      const restaurant = await restaurantModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).send({ error: 'Restaurant not found' });
      }
  
      res.status(200).send(restaurant)
    } catch (error) {
      res.status(400).send({ error: 'Failed to get restaurant' });
    }
  });



  // Get menu of a specific restaurant
  restaurantRouter.get('/:id/menu', async (req, res) => {
    const restaurantId = req.params.id;
    try {
  
      const restaurant = await restaurantModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).send({ error: 'Restaurant not found' });
      }
  
      const menu = restaurant.menu;
  
      res.status(200).send(menu)
    } catch (error) {
      res.status(400).send({ error: 'Failed to get menu' });
    }
  });
  
  
  // Add new item to restaurant's menu
  restaurantRouter.post('/:id/menu', async (req, res) => {
    try {
      const restaurantId = req.params.id;
      const { name, description, price, image } = req.body;
  
      const restaurant = await restaurantModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).send({ error: 'Restaurant not found' });
      }
  
      const newItem = {name,description,price,image,};
  
      restaurant.menu.push(newItem);
  
      await restaurant.save();
  
      res.status(201).send({ message: 'Item added to menu successfully', newItem });
    } catch (error) {
      res.status(400).send({ error: 'Failed to add item to menu' });
    }
  });


 // Delete menu item from a specific restaurant
 restaurantRouter.delete('/:id/menu/:itemId', async (req, res) => {
    try {
      const restaurantId = req.params.id;
      const itemId = req.params.itemId;
  
      const restaurant = await restaurantModel.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const itemIndex = restaurant.menu.findIndex(item => item._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
  
      restaurant.menu.splice(itemIndex, 1);
  
      await restaurant.save();
      res.status(201).send({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete menu item' });
    }
  });
  
  
  

module.exports={
    restaurantRouter
}

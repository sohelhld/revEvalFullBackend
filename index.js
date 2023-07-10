const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.route');
const { restaurantRouter } = require('./routes/restaurant.route');
const { orderRouter } = require('./routes/order.routes');

require('dotenv').config()

const app = express()

app.use(express.json())

app.use("/api",userRouter)
app.use("/api/restaurants",restaurantRouter)
app.use("/api",orderRouter)


app.listen(8000,async()=>{

    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
    console.log("server is runing at port number 8000");
})

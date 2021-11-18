const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const authRouter = require('./routes/Auth')
const productRouter = require('./routes/Products')
const userRouter = require('./routes/Users')
const cartRouter = require('./routes/Cart')

const app = express();

// Use middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true, useUnifiedTopology : true } )
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected to the database successfully");
})


// Routes
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)


// Listen to a port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
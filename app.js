const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const productRouter = require('./routes/Products')
const userRouter = require('./routes/Users')

const app = express();
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

app.use('/products', productRouter)
app.use('/users', userRouter)

// Listen to a port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`running on port ${port}`))
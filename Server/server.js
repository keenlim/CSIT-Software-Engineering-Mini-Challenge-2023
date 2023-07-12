require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

//Flight Router - To get the cheapest Flights
const flightRouter = require('./routes/flights');
app.use('/',flightRouter);

//Hotel Router - To get the cheapest Hotels
const hotelRouter = require('./routes/hotel');
app.use('/',hotelRouter);

app.get('/',(req,res) => {
    res.send('Welcome');
})

//Connecting with database
const {MongoClient} = require('mongodb');

MongoDB_URL = process.env.DATABASE_URL;
const client= new MongoClient(MongoDB_URL);
const databaseName = 'minichallenge';
mongoose
    .connect(MongoDB_URL,{
        useNewURLParser: true,
        useUnifiedTopology: true,
}).then(async()=>{ //Once connected to database --> show connected to database
    let result = await client.connect();
    db = result.db(databaseName);
    console.log("Connected to Database");
}).catch((e) => console.log(e));


//Server Setup - Setting REST API Server to Port 8080
app.listen(8080,() => {
    console.log('Server Started at PORT 8080')});


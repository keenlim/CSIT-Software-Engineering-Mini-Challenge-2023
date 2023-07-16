const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

app.get('/',(req,res) => {
    res.send('Welcome');
})

//Connecting with database
const {MongoClient} = require('mongodb');

MongoDB_URL = "mongodb+srv://userReadOnly:7ZT817O8ejDfhnBM@minichallenge.q4nve1r.mongodb.net/";
const client= new MongoClient(MongoDB_URL);
const databaseName = 'minichallenge';

async function connectToMongoDB(){
    try {
        let result = await client.connect();
        db = result.db(databaseName)
        console.log("Connected to MongoDB.");
    }catch(error){
        console.log('Error connecting to database: ', error);
    }
}

//Call the connectToMongoDB function to establish connection with database
connectToMongoDB();

//Flight Endpoint
app.get('/flight', async(req,res) => {

    //Get the information from the request parameter
    const {departureDate, returnDate, destination } = req.query;
    //console.log(departureDate, returnDate, destination);
    
    //Format the dates
    const formatDepartureDate = new Date(departureDate);
    const formatReturnDate = new Date(returnDate);
    console.log(formatDepartureDate, formatReturnDate, destination);

    //Check for query parameters
    if(isNaN(formatDepartureDate) || isNaN(formatReturnDate) || !destination || formatDepartureDate > formatReturnDate){
        return res.status(400).json({error : 'Invalid Query Parameters'});
    }

    //Find data from the database
    try{
        //Accessing Database
        const flightsCollection = db.collection('flights');
        const departureCity = "Singapore";

        // Find cheapest departure flight
        const cheapestDeparture = await flightsCollection
        .find({date:formatDepartureDate,
               destcity:destination,
               srccity:departureCity})
            .sort({price : 1})
            .limit(1)
            .toArray();

        console.log(cheapestDeparture);
        
        // Find cheapest return flight
        const cheapestReturn = await flightsCollection
        .find({date:formatReturnDate,
            destcity : departureCity,
            srccity : destination})
            .sort({price : 1})
            .limit(1)
            .toArray();
        console.log(cheapestReturn);

        res.status(200).json(cheapestDeparture.length && cheapestReturn.length ? [{
            "City" : destination,
            "Departure Date": departureDate,
            "Departure Airline": cheapestDeparture[0].airlinename,
            "Departure Price": cheapestDeparture[0].price,
            "Return Date" : returnDate,
            "Return Airline" : cheapestReturn[0].airlinename,
            "Return Price" : cheapestReturn[0].price
        }] : []);
    }catch(error){
        console.error('Error retrieving flights: ', error);
        res.status(500).json({error: 'Error retrieving flights.'});
    }
});

//Hotel Endpoint
app.get('/hotel',async(req,res) => {
    //Get all the parameters from the request query
    const { checkInDate, checkOutDate, destination } = req.query;
    const formatCheckInDate = new Date(checkInDate);
    const formatCheckOutDate = new Date(checkOutDate);
    const dayAfterCheckOut = new Date(checkOutDate);
    dayAfterCheckOut.setDate(formatCheckOutDate.getDate() + 1);

    //Validate Query Parameters
    if(isNaN(formatCheckInDate) || isNaN(formatCheckOutDate) || !destination || formatCheckInDate > formatCheckOutDate){
        return res.status(400).json({ error : 'Invalid query parameters.'});
    }

    try{
        //Accessing the database
        const hotelsCollection = db.collection('hotels');

        //Create an object to add in all the hotel prices
        const hotelPrices = {};

        //Retrieve the cheapest hotel from database based on the parameters
        var currentIteration = new Date(checkInDate);

        //Do a while loop to calculate price of hotel from check in date to check out date
        while(currentIteration.toDateString() !== dayAfterCheckOut.toDateString()){
            const hotels = await hotelsCollection
            .find({
                date : currentIteration,
                city : destination,
            })
            .sort({price:1})
            .toArray();

            console.log(hotels);
            for(let i = 0; i<hotels.length; i++){
                const hotel = hotels[i];
                if(hotelPrices[hotel.hotelName] !== undefined){
                    hotelPrices[hotel.hotelName] = hotelPrices[hotel.hotelName] + hotel.price;
                }
                else{
                    hotelPrices[hotel.hotelName] = hotel.price;
                }
            }
            currentIteration.setDate(currentIteration.getDate() + 1);
        }

        //Convert hotelPrices object into array to sort the object
        let sortable = [];
        for (var prices in hotelPrices) {
            sortable.push([prices, hotelPrices[prices]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        //Once you have the array, you could rebuild the object from the array in the order you like, 
        //thus achieving exactly what you set out to do. 

        let sortedhotelPrices = {};
        sortable.forEach(function(item){
            sortedhotelPrices[item[0]] = item[1];
        })


        //Form the cheapest hotel object
        const cheapestHotel = Object.keys(sortedhotelPrices)[0];
        console.log(cheapestHotel);

        //if cheapest hotel is found then provide the result, if not, return an empty array
        res.status(200).json(cheapestHotel ? [{
            "City" : destination,
            "Check In Date": checkInDate,
            "Check Out Date" : checkOutDate,
            "Hotel" : cheapestHotel,
            "Price" : sortedhotelPrices[cheapestHotel],
        }] : []);
       
    }catch(error){
        console.error('Error retrieving hotels: ',error);
        res.status(500).json({error : 'Error retrieving hotels.'});
    }
})
    

//Server Setup - Setting REST API Server to Port 8080
app.listen(8080,'0.0.0.0',() => {
    console.log('Server Started at PORT 8080')});


const express = require('express');
const port = 8080;
const app = express();
app.use(express.json());
//MongoDB Function 
const { connectToMongoDB } = require('./Routes/mongoConnection');
const { flightEndpoint } = require('./Routes/flightRoute');

connectToMongoDB();
app.get('/',(req,res) => {
   res.send("Hello World");
})

app.get('/flight', async(req,res) => {
    const { departureDate, returnDate, destination } = req.query;
    const result = await flightEndpoint(departureDate, returnDate, destination);
    console.log(result);
    if(result === -1){
        res.status(400).json({error : 'Invalid Query Parameters'});
    }
    else if(result === -2){
        res.status(500).json({error: 'Error retrieving flights.'});
    }
    else{
        //console.log(result);
        res.status(200).json(result);
    }

})

// Server Setup - Seeting REST API Server to Port 8080
app.listen(8080,'0.0.0.0', () => {
    console.log('Server started at PORT 8080');
})
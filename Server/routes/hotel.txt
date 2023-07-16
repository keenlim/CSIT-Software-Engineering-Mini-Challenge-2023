const express = require('express');
const router = express.Router();

//Find ALL Hotels
router.get('/allHotels',async(req,res) => {
    try{
        collection = db.collection('hotels');
        let data = await collection.find({city:"Abu Dhabi"}).toArray();
        /*if(data){
            console.log("Successful Data");
        }*/
        //data = JSON.stringify(data);
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

//Find Hotels According to Query
router.get('/hotel?:checkInDate?:checkOutDate?:destination', async(req,res) => {
    try{
        collection = db.collection('hotels');

        //Get Check In Date
        let checkInDate = req.query.checkInDate;
        let InDate = new Date(checkInDate);

        //Get Destination
        let destination = req.query.destination;

        //Get Check Out Date
        let checkOutDate = req.query.checkOutDate;
        let OutDate = new Date(checkOutDate);

        //Find all the hotels available for Check In Date
        let list_of_hotels = [];
        let checkIn_hotel = await collection.find({date : InDate, city : destination}).toArray();
        for(let i = 0; i<checkIn_hotel.length; i++){
            let hotel_prices = {
                "Hotel" : checkIn_hotel[i].hotelName,
                "Price": checkIn_hotel[i].price
            }
            list_of_hotels.push(hotel_prices);
        }

        let tomorrow = InDate;
        tomorrow.setDate(tomorrow.getDate()+1);
        //console.log(tomorrow);
        while(tomorrow <= OutDate){
            for(let i = 0; i<list_of_hotels.length; i++){
                let hotel = await collection.find({date : tomorrow, city : destination, hotelName : list_of_hotels[i].Hotel}).toArray();
                //console.log(hotel);
                if(hotel){
                    list_of_hotels[i].Price = hotel[0].price + list_of_hotels[i].Price;
                }
                else{
                    list_of_hotels[i].Hotel = "Not Available";
                }
            }
            tomorrow.setDate(tomorrow.getDate()+1);
        }

        list_of_hotels.sort((a,b) => (a.Price - b.Price));
        let i = 0;
        let cheapest_hotel = []
        while(list_of_hotels[i].Hotel == "Not Available"){
            i++;
        }
        let cheap_hotel_object = {
            "City" : destination,
            "Check In Date" : checkInDate,
            "Check Out Date" : checkOutDate,
            "Hotel" : list_of_hotels[i].Hotel,
            "Price" : list_of_hotels[i].Price
        }
        cheapest_hotel.push(cheap_hotel_object);
        res.send(cheapest_hotel);



    }catch(error){
        res.status(400)//.json({message: error.message});
    }
})



module.exports = router;
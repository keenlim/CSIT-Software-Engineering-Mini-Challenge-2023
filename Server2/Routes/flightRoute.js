const flightEndpoint = async(departureDate, returnDate, destination) => {
    console.log(departureDate, returnDate, destination);

     //Format the dates
     const formatDepartureDate = new Date(departureDate);
     const formatReturnDate = new Date(returnDate);
     console.log(formatDepartureDate, formatReturnDate, destination);
 
     //Check for query parameters
     if(isNaN(formatDepartureDate) || isNaN(formatReturnDate) || !destination || formatDepartureDate > formatReturnDate){
         return -1;
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

        //console.log(cheapestDeparture);
        
        // Find cheapest return flight
        const cheapestReturn = await flightsCollection
        .find({date:formatReturnDate,
            destcity : departureCity,
            srccity : destination})
            .sort({price : 1})
            .limit(1)
            .toArray();
        //console.log(cheapestReturn);

        let result = [];
        if(cheapestDeparture.length && cheapestReturn.length){
            result = [{
                "City" : destination,
                "Departure Date": departureDate,
                "Departure Airline": cheapestDeparture[0].airlinename,
                "Departure Price": cheapestDeparture[0].price,
                "Return Date" : returnDate,
                "Return Airline" : cheapestReturn[0].airlinename,
                "Return Price" : cheapestReturn[0].price
            }];
        }
        console.log(result);

        return result;

    }catch(error){
        console.error('Error retrieving flights: ', error);
        return -2 //Error
    }



}

module.exports = { flightEndpoint };
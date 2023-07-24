const hotelEndpoint = async (checkInDate, checkOutDate, destination) => {
    const formatCheckInDate = new Date(checkInDate);
    const formatCheckOutDate = new Date(checkOutDate);
    const dayAfterCheckOut = new Date(checkOutDate);
    dayAfterCheckOut.setDate(formatCheckOutDate.getDate() + 1);

    //Validate Query Parameters
    if(isNaN(formatCheckInDate) || isNaN(formatCheckOutDate) || !destination || formatCheckInDate > formatCheckOutDate){
        return -1;
        
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
        let result = cheapestHotel ? [{
            "City" : destination,
            "Check In Date": checkInDate,
            "Check Out Date" : checkOutDate,
            "Hotel" : cheapestHotel,
            "Price" : sortedhotelPrices[cheapestHotel],
        }] : [];

        return result;
       
    }catch(error){
        console.error('Error retrieving hotels: ',error);
        return -2;
    }

}

module.exports = { hotelEndpoint };
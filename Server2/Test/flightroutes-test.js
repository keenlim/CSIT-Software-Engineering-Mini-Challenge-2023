var assert = require('assert');
const { flightEndpoint } = require('../Routes/flightRoute.js');
const {connectToMongoDB} = require('../Routes/mongoConnection.js');

describe('FlightEndpoint', () => {
    describe('.flights', () => {
        it('return -1 for incorrect format of dates', async () => {
            //setup
            const expected = -1;
            const departureDate = '22-07-2023';
            const returnDate = '23-07-2023';
            const destination = 'Frankfurt';

            //Exercise
            const result = await flightEndpoint(departureDate,returnDate,destination);

            //Verify
            assert.strictEqual(result,expected);
        });

        it('return -1 for invalid dates', async () => {
            //setup
            const expected = -1;
            const departureDate = '2023-07-23';
            const returnDate = '2023-07-22';
            const destination = 'Frankfurt';

            //Exercise
            const result = await flightEndpoint(departureDate,returnDate,destination);

            //Verify
            assert.strictEqual(result,expected);
        }); 

        it('return -1 for missing destination parameters', async () => {
            //setup
            const expected = -1;
            const departureDate = '2023-07-23';
            const returnDate = '2023-07-22';
            const destination = '';

            //Exercise
            const result = await flightEndpoint(departureDate,returnDate,destination);

            //Verify
            assert.strictEqual(result,expected);
        });

        it('return -2 if there are no flight found', async () => {
            //setup
            const expected = -2;
            const departureDate = '2023-07-22';
            const returnDate = '2023-07-23';
            const destination = 'abc';

            //Exercise 
            const result = await flightEndpoint(departureDate,returnDate,destination);

            //Verify
            assert.strictEqual(result,expected);
        })

        /*it('return result where successful flight is found', async () => {
            //setup
            const expected = [
                {
                  "City": "Frankfurt",
                  "Departure Date": "2023-12-10",
                  "Departure Airline": "US Airways",
                  "Departure Price": 1766,
                  "Return Date": "2023-12-16",
                  "Return Airline": "US Airways",
                  "Return Price": 716
                }
              ];
              const departureDate = '2023-12-10';
              const returnDate = '2023-12-16';
              const destination = 'Frankfurt';

              //Exercise
              const result = await flightEndpoint(departureDate, returnDate, destination);

              //Verify
              assert.strictEqual(result,expected);
        })*/
        
    })
})

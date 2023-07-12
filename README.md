# CSIT-Software-Engineering-Mini-Challenge-2023

### Problem Statement: 
As a travel enthusiast, Mighty Saver Rabbit is on the lookout for the cheapest flights and hotels for an upcoming trip with his friends.

Due to his extensive research, he had a plethora of information scattered across his computer, notebook, and smartphone. He needed a way to consolidate the data and make it accessible to his friends so that they can decide on the flight and accommodation for their trip.

To solve this problem, Mighty Saver Rabbit decided to populate all the information into a database for consolidation. However, he still needs YOUR help to make the information accessible to his friends.

### Endpoints: 
1. GET / flight
Get a list of return flights at the cheapest price, given the destination city, departure date, and arrival date.

- Query Parameter

```
{
    "departureDate":"<departuredate>",
    "returnDate":"<returndate>",
    "destination":"<destination>",
}

```

- Responses
    - 200 OK - Query Succesful
    
    Returns when there are 0 or more results in the returned array. 
    ```
    [
        {
        "City": "Frankfurt",
        "Departure Date": "2023-12-10",
        "Departure Airline": "US Airways",
        "Departure Price": 1766,
        "Return Date": "2023-12-16",
        "Return Airline": "US Airways",
        "Return Price": 716
        }
    ]
    ```

    - 400 Bad Request
    Returns when there are missing query paramters or date format is incorrect

2. GET /hotel
Get a list of hotels providing the cheapest price, given the destination city, check-in date, and check-out date.

- Query Parameter
    ```
    {
        "departureDate":"<departuredate>",
        "returnDate":"<returndate>",
        "destination":"<destination>",
    }
    ```

- Responses
    - 200 OK - Query succesful
    
    Returns when there are 0 or more results in the returned array

    ```
    [
        {
            "City": "Frankfurt",
            "Check In Date": "2023-12-10",
            "Check Out Date": "2023-12-16",
            "Hotel": "Hotel J",
            "Price": 2959
        }
    ]

    ```

    - 400 Bad Input 
    Returns when there are missing query parameters or date format is incorrect

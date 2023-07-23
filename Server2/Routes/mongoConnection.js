//Connecting with the database
const { MongoClient } = require('mongodb');

//Setting up the MongoDB
MongoDB_URL = "mongodb+srv://userReadOnly:7ZT817O8ejDfhnBM@minichallenge.q4nve1r.mongodb.net/";
const client = new MongoClient(MongoDB_URL);
const databaseName = 'minichallenge';

const connectToMongoDB = async() => {
    try{
        let result = await client.connect();
        db = result.db(databaseName);
        console.log("Connected to database");
    }catch(error){
        console.log('Error connecting to database: ', error);
    }
}

module.exports = { connectToMongoDB };
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: {
        required: true,
        type: String
    },
    airlineid : {
        required: true,
        type: Number
    },
    srcairport: {
        required: true,
        type: String
    },
    srcairportid: {
        required: true,
        type: Number
    },
    destairport: {
        required: true,
        type: String
    },
    dsetairportid: {
        required: true,
        type: Number
    },
    codeshare: {
        required: true,
        type: String
    },
    stop: {
        required: true,
        type: Number
    },
    eq: {
        required: true,
        type: String
    },
    airlinename: {
        required: true,
        type: String
    },
    srcairportname: {
        required: true,
        type: String
    },
    srccity: {
        required: true,
        type: String
    },
    srccountry: {
        required: true,
        type: String
    },
    destairportname: {
        required: true,
        type: String
    },
    destcity: {
        required: true,
        type: String
    },
    destcountry: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Date
    },
}, {collection : 'flights'});

const Flights = mongoose.model('flights',flightSchema);
module.exports = Flights;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertySchema = new Schema({

    //property information

    //client email
    Email:{
        type: String,
        required: true,
    },
    
    //lising title
    Title:{
        type: String,
        required: true,
    },

    //property type
    PropertyType:{
        type: String,
        required: true,
    },

    //Listing type
    ListingType:{
        type: String,
        required: true,
    },

    //location
    Location:{
        type: String,
        required: true,
    },

    //Number of bathrooms
    Bathrooms:{
        type: Number,
        required: true,
    },

    //number of bedrooms
    Bedrooms:{
        type: Number,
        required: true,
    },

    //Listing price
    ListingPrice:{
        type: String,
        required: true,
    },

    //parking
    Parking:{
        type: String,
        required: true,
    },

    //building sqft
    BuildingSqft:{
        type: Number,
        required: true,
    },

    //land sqft
    LandSqft:{
        type: Number,
        required: true,
    },

    //Listing description
    ListingDescription:{
        type: String,
        required: true,
    },

    //amenities
    Amenities:{
        Outdoor:{
            type: Boolean
        },

        Pool:{
            type: Boolean
        },

        Vigilance:{
            type: Boolean
        },

        Laundry:{
            type: Boolean
        },

        SecurityCameras:{
            type: Boolean
        },

        Pets:{
            type: Boolean
        },

        DishWasher:{
            type: Boolean
        },

        Internet:{
            type: Boolean
        },

        Elevator:{
            type: Boolean
        },

        Jacuzzi:{
            type: Boolean
        },

        Solar:{
            type: Boolean
        },

        Garage:{
            type: Boolean
        },
    }
})

const Model = mongoose.model("property", PropertySchema);
module.exports = Model;
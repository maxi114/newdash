const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({

    //client email
    Email:{
        type: String,
        required: true
    },

    //property title
    PropertyTile:{
        type: String,
        required: true,
    },

    //path on the server
    Path:{
        type: String,
        required: true,
    },

    //name of the file
    Filename:{
        type: String,
        required: true,
        unique: true,
    }

})

const Model = mongoose.model("image", ImageSchema);
module.exports = Model;
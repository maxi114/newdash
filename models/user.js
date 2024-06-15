const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    //User info

    //full name
    Name: {
        type: String,
        required: true,
    },

    //Email:{
    Email: {
        type: String,
        required: true,
        unique: true,
    },

    //phone
    Password: {
        type: String,
    },

    //Registration date
    RegistrationDate: {
        type: String
    },

})

const Model = mongoose.model("user", UserSchema);
module.exports = Model;
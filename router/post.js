//require express
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');//store the secret 
const mongoose = require('mongoose');
const multer = require('multer');

//require path
const path = require('path')

//require fs to delete uploaded files
const fs = require('fs');

//require the client, image & property models
const Client = require("../models/user");
const Property = require("../models/property");
const Image = require("../models/image");
const { error } = require("console");

//get the router 
const router = express.Router({ caseSensitive: true })

// Multer configuration
const storage = multer.diskStorage({
    // Destination to store image     
    destination: './public/property',
    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname));
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});

const upload = multer({ storage: storage });

//route to get the property thats clicked by the user
router.post("/propertty", ((req, res) => {

    //array to store the data and images path
    const dat = [];

    //function to get all the images path
    const images = async (email, title, dataa, length, p) => {

        //store the data along with its pictures
        const datta = {
            dataaa: {},
            filepath: [],
        }

        //find images with the same email and title
        Image.find({ Email: email, PropertyTile: title })
            .then(data => {

                //loop through the data
                for (var i = 0; i < data.length; i++) {

                    datta.dataaa = dataa;
                    datta.filepath.push(data[i].Path)

                }

                //push the datta to dat
                dat.push(datta);

                if (p + 1 == length) {
                    res.send(dat)
                }
            })

    }


    //find the clicked property
    Property.find({ _id: req.body.id })
        .then(data => {
            if (data && data.length > 0) {
                const getdata = async () => {
                    // Loop through the data
                    for (let i = 0; i < data.length; i++) {
                        await images(data[i].Email, data[i].Title, data[i], data.length, i);
                    }
                };
                getdata();
            } else {
                res.send("nothing");
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the findOne operation
            res.send("nothing")
        });


}))

//route to filter the properties 2
router.post('/filter2', ((req, res) => {

    //array to store the data and images path
    const dat = [];

    //function to get all the images path
    const images = async (email, title, dataa, length, p) => {

        //store the data along with its pictures
        const datta = {
            dataaa: {},
            filepath: [],
        }

        //find images with the same email and title
        Image.find({ Email: email, PropertyTile: title })
            .then(data => {

                //loop through the data
                for (var i = 0; i < data.length; i++) {

                    datta.dataaa = dataa;
                    datta.filepath.push(data[i].Path)

                }

                //push the datta to dat
                dat.push(datta);

                if (p + 1 == length) {
                    res.send(dat)
                }
            })

    }

    Property.find({ PropertyType: req.body.fil, ListingType: req.body.fil2 })
        .then(data => {

            if (data.length > 0) {
                const getdata = async () => {
                    //loop through the data
                    for (var i = 0; i < data.length; i++) {
                        //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
                        await images(data[i].Email, data[i].Title, data[i], data.length, i)

                    }
                }
                getdata()
            }

            else {
                res.send("nothing")
            }

        })

}))

//route to filter the properties
router.post('/filterr', ((req, res) => {

    //array to store the data and images path
    const dat = [];

    //function to get all the images path
    const images = async (email, title, dataa, length, p) => {

        //store the data along with its pictures
        const datta = {
            dataaa: {},
            filepath: [],
        }

        //find images with the same email and title
        Image.find({ Email: email, PropertyTile: title })
            .then(data => {

                //loop through the data
                for (var i = 0; i < data.length; i++) {

                    datta.dataaa = dataa;
                    datta.filepath.push(data[i].Path)

                }

                //push the datta to dat
                dat.push(datta);

                if (p + 1 == length) {
                    res.send(dat)
                }
            })

    }

    Property.find({ ListingType: req.body.fil })
        .then(data => {

            if (data.length > 0) {
                const getdata = async () => {
                    //loop through the data
                    for (var i = 0; i < data.length; i++) {
                        //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
                        await images(data[i].Email, data[i].Title, data[i], data.length, i)

                    }
                }
                getdata()
            }

            else {
                res.send("nothing");
            }

        })

}))

//route to filter the properties
router.post('/filter', ((req, res) => {

    //array to store the data and images path
    const dat = [];

    //function to get all the images path
    const images = async (email, title, dataa, length, p) => {

        //store the data along with its pictures
        const datta = {
            dataaa: {},
            filepath: [],
        }

        //find images with the same email and title
        Image.find({ Email: email, PropertyTile: title })
            .then(data => {

                //loop through the data
                for (var i = 0; i < data.length; i++) {

                    datta.dataaa = dataa;
                    datta.filepath.push(data[i].Path)

                }

                //push the datta to dat
                dat.push(datta);

                if (p + 1 == length) {
                    res.send(dat)
                }
            })

    }

    Property.find({ PropertyType: req.body.fil })
        .then(data => {

            if (data.length > 0) {
                const getdata = async () => {
                    //loop through the data
                    for (var i = 0; i < data.length; i++) {
                        //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
                        await images(data[i].Email, data[i].Title, data[i], data.length, i)

                    }
                }
                getdata()
            }

            else {
                res.send("nothing")
            }

        })

}))

//route to fetch all the uploaded properties
router.post("/properties", ((req, res) => {


    //array to store the data and images path
    const dat = [];

    //function to get all the images path
    const images = async (email, title, dataa, length, p) => {

        //store the data along with its pictures
        const datta = {
            dataaa: {},
            filepath: [],
        }

        //find images with the same email and title
        Image.find({ Email: email, PropertyTile: title })
            .then(data => {

                //loop through the data
                for (var i = 0; i < data.length; i++) {

                    datta.dataaa = dataa;
                    datta.filepath.push(data[i].Path)

                }

                //push the datta to dat
                dat.push(datta);

                if (p + 1 == length) {
                    res.send(dat)
                }

            })


    }

    //get all the properties from the data base
    Property.find({})
        .then(data => {

            const getdata = async () => {
                //loop through the data
                for (var i = 0; i < data.length; i++) {
                    //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
                    await images(data[i].Email, data[i].Title, data[i], data.length, i)


                }



            }

            getdata()
        })

}))

//route to upload the property information
router.post("/upload", upload.any(), ((req, res) => {


    // Access the uploaded files using req.files
    const uploadedFiles = req.files;

    // Access other data
    const client = JSON.parse(req.body.client);
    const property = JSON.parse(req.body.property);
    const amenities = JSON.parse(req.body.amenities);

    //store the path of the uploaded files in case of deletion
    var upfiles = []

    //loop through the uploaded files and get their path
    for (var i = 0; i < uploadedFiles.length; i++) {

        var filepath = uploadedFiles[i].path.split("\\").slice(1).join("/")

        upfiles.push(filepath)

    }

    //function to delete the uploaded files
    const delfile = (file) => {

        //loop through the uploaded files path
        for (var i = 0; i < file.length; i++) {

            fs.unlink(file[i], (err) => {
            })
        }

    }

    //get the property schema
    const propertyy = new Property();

    //function to save property info
    const PropertyInfo = (propertyy) => {


        //upload the property info to the database
        propertyy.Email = client.Email;
        propertyy.Title = property.Title;
        propertyy.PropertyType = property.PropertyType;
        propertyy.ListingType = property.ListingType;
        propertyy.Location = property.Location;
        propertyy.Bathrooms = property.Bathrooms;
        propertyy.Bedrooms = property.Bedrooms;
        propertyy.ListingPrice = property.ListingPrice;
        propertyy.Parking = property.Parking;
        propertyy.BuildingSqft = property.BuildingSqft;
        propertyy.LandSqft = property.LandSqft;
        propertyy.ListingDescription = property.description;

        //check if property provides amenities
        if (amenities.outdoor) {
            propertyy.Amenities.Outdoor = true
        }
        else {
            propertyy.Amenities.Outdoor = false
        }

        //if statement for pool
        if (amenities.pool) {
            propertyy.Amenities.Pool = true
        }
        else {
            propertyy.Amenities.Pool = false
        }

        //if statement for vigilance
        if (amenities.vigilance) {
            propertyy.Amenities.Vigilance = true
        }
        else {
            propertyy.Amenities.Vigilance = false
        }

        //if statement for laundry
        if (amenities.Laundry) {
            propertyy.Amenities.Laundry = true
        }
        else {
            propertyy.Amenities.Laundry = false
        }

        //if statement for security cameras
        if (amenities.SecurityCameras) {
            propertyy.Amenities.SecurityCamera = true
        }
        else {
            propertyy.Amenities.SecurityCamera = false
        }

        //if statement for pets
        if (amenities.Pets) {
            propertyy.Amenities.Pets = true
        }
        else {
            propertyy.Amenities.Pets = false
        }

        //if statement for dishwasher
        if (amenities.DishWasher) {
            propertyy.Amenities.DishWasher = true
        }
        else {
            propertyy.Amenities.DishWasher = false
        }

        //if statement for Internet
        if (amenities.Internet) {
            propertyy.Amenities.Internet = true
        }
        else {
            propertyy.Amenities.Internet = false
        }

        //if statement for Elevator
        if (amenities.Elevator) {
            propertyy.Amenities.Elevator = true
        }
        else {
            propertyy.Amenities.Elevator = false
        }

        //if statement for Jacuzzi
        if (amenities.Jacuzzi) {
            propertyy.Amenities.Jacuzzi = true
        }
        else {
            propertyy.Amenities.Jacuzzi = false
        }

        //if statement for solar
        if (amenities.solar) {
            propertyy.Amenities.Solar = true
        }
        else {
            propertyy.Amenities.Solar = false
        }

        //if statement for garage
        if (amenities.garage) {
            propertyy.Amenities.Garage = true
        }
        else {
            propertyy.Amenities.Garage = false
        }

    }

    //function to save the images information
    const imageinfo = () => {

        //loop through the uploaded images
        for (var i = 0; i < uploadedFiles.length; i++) {
            //new image upload schema
            const image = new Image();

            image.Email = client.Email
            image.PropertyTile = property.Title
            image.Path = upfiles[i];
            image.Filename = uploadedFiles[i].filename

            image.save()
        }
    }

    //check if client exists
    Client.find({ Email: client.Email })
        .then(data => {

            //if client does not exists
            if (data.length == 0) {


                //get the client schema
                const clientt = new Client();

                //upload client info to database
                clientt.Name = client.Name;
                clientt.Email = client.Email;
                clientt.Phone = client.Phone;

                //call the function to input the property information
                PropertyInfo(propertyy)

                //save the client info
                clientt.save()
                    .then(document => {

                        //call the funtion to saave the image info
                        imageinfo()

                        //save the property info
                        propertyy.save()

                        res.send("success")

                    })


            }

            //if client exists
            else {

                //check if property exists

                Property.find({ Email: client.Email, Title: property.Title })
                    .then(data => {

                        //if client does not have the property
                        if (data.length == 0) {

                            //call the funtion to saave the image info
                            imageinfo()

                            //call the function to input the property information
                            PropertyInfo(propertyy)

                            //save the property
                            propertyy.save();

                            res.send("success")
                        }
                        //if client already has the property
                        else {
                            //call the delete files function
                            delfile(upfiles)
                            res.send("property already exists for this client")
                        }

                    })

            }
        })

}))

module.exports = router

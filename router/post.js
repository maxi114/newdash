//require express
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); //store the secret
const mongoose = require("mongoose");
const multer = require("multer");

//require path
const path = require("path");

//require fs to delete uploaded files
const fs = require("fs").promises;

//require the client, image & property models
const Client = require("../models/user");
const Property = require("../models/property");
const Image = require("../models/image");
const { error } = require("console");

//get the router
const router = express.Router({ caseSensitive: true });

// Multer configuration
const storage = multer.diskStorage({
  // Destination to store image
  destination: "./public/property",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const upload = multer({ storage: storage });

//edit router
router.post("/edit", (req, res) => {
  Property.find({ _id: req.body.id }).then((data) => {
    res.send(data);
  });
});

//delete route
router.post("/delete", (req, res) => {

  //function to delete the uploaded files
  async function processAndDeleteFiles(data) {
    try {
      // Create an array to hold promises
      let deletePromises = [];

      // Loop through the uploaded files path
      for (var i = 0; i < data.length; i++) {
        const filePath = "public/" + data[i].Path;
        const deletePromise = new Promise((resolve, reject) => {
          fs.unlink(filePath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });

        // Add the promise to the array
        deletePromises.push(deletePromise);
      }

      // Call the delete function after all files have been deleted
      dele(data);
    } catch (error) {
      res.send(error + " ererer");
    }
  }

  // Delete function
  async function dele(data) {
    try {
      for (var i = 0; i < data.length; i++) {
        // Delete data from the database
        await Image.deleteOne({
          Email: data[i].Email,
          PropertyTile: data[i].PropertyTile,
        }).then((data)=>{
        })

      }

      // Delete the listing from the database
      Property.deleteOne({ _id: req.body.id }).then((data) => {
        res.send("done " + data);
      });
    } catch (error) {
      res.send(error + " ffefef");
    }
  }

  //find the clicked property
  Property.find({ _id: req.body.id })
    .then((data) => {
      if (data && data.length > 0) {
        //find images with the same email and title
        Image.find({ Email: data[0].Email, PropertyTile: data[0].Title }).then(
          (data) => {
            //delte the file path
            processAndDeleteFiles(data);
          }
        );
      } else {
        res.send("nothing");
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the findOne operation
      res.send("nothing");
    });
});

//route to get the property thats clicked by the user
router.post("/propertty", (req, res) => {
  //array to store the data and images path
  const dat = [];

  //function to get all the images path
  const images = async (email, title, dataa, length, p) => {
    //store the data along with its pictures
    const datta = {
      dataaa: {},
      filepath: [],
    };

    //find images with the same email and title
    Image.find({ Email: email, PropertyTile: title }).then((data) => {
      //loop through the data
      for (var i = 0; i < data.length; i++) {
        datta.dataaa = dataa;
        datta.filepath.push(data[i].Path);
      }

      //push the datta to dat
      dat.push(datta);

      if (p + 1 == length) {
        res.send(dat);
      }
    });
  };

  //find the clicked property
  Property.find({ _id: req.body.id })
    .then((data) => {
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
    .catch((error) => {
      // Handle any errors that occurred during the findOne operation
      res.send("nothing");
    });
});

//route to filter the properties 2
router.post("/filter2", (req, res) => {
  //array to store the data and images path
  const dat = [];

  //function to get all the images path
  const images = async (email, title, dataa, length, p) => {
    //store the data along with its pictures
    const datta = {
      dataaa: {},
      filepath: [],
    };

    //find images with the same email and title
    Image.find({ Email: email, PropertyTile: title }).then((data) => {
      //loop through the data
      for (var i = 0; i < data.length; i++) {
        datta.dataaa = dataa;
        datta.filepath.push(data[i].Path);
      }

      //push the datta to dat
      dat.push(datta);

      if (p + 1 == length) {
        res.send(dat);
      }
    });
  };

  Property.find({
    PropertyType: req.body.fil,
    ListingType: req.body.fil2,
  }).then((data) => {
    if (data.length > 0) {
      const getdata = async () => {
        //loop through the data
        for (var i = 0; i < data.length; i++) {
          //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
          await images(data[i].Email, data[i].Title, data[i], data.length, i);
        }
      };
      getdata();
    } else {
      res.send("nothing");
    }
  });
});

//route to filter the properties
router.post("/filterr", (req, res) => {
  //array to store the data and images path
  const dat = [];

  //function to get all the images path
  const images = async (email, title, dataa, length, p) => {
    //store the data along with its pictures
    const datta = {
      dataaa: {},
      filepath: [],
    };

    //find images with the same email and title
    Image.find({ Email: email, PropertyTile: title }).then((data) => {
      //loop through the data
      for (var i = 0; i < data.length; i++) {
        datta.dataaa = dataa;
        datta.filepath.push(data[i].Path);
      }

      //push the datta to dat
      dat.push(datta);

      if (p + 1 == length) {
        res.send(dat);
      }
    });
  };

  Property.find({ ListingType: req.body.fil }).then((data) => {
    if (data.length > 0) {
      const getdata = async () => {
        //loop through the data
        for (var i = 0; i < data.length; i++) {
          //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
          await images(data[i].Email, data[i].Title, data[i], data.length, i);
        }
      };
      getdata();
    } else {
      res.send("nothing");
    }
  });
});

//route to filter the properties
router.post("/filter", (req, res) => {
  //array to store the data and images path
  const dat = [];

  //function to get all the images path
  const images = async (email, title, dataa, length, p) => {
    //store the data along with its pictures
    const datta = {
      dataaa: {},
      filepath: [],
    };

    //find images with the same email and title
    Image.find({ Email: email, PropertyTile: title }).then((data) => {
      //loop through the data
      for (var i = 0; i < data.length; i++) {
        datta.dataaa = dataa;
        datta.filepath.push(data[i].Path);
      }

      //push the datta to dat
      dat.push(datta);

      if (p + 1 == length) {
        res.send(dat);
      }
    });
  };

  Property.find({ PropertyType: req.body.fil }).then((data) => {
    if (data.length > 0) {
      const getdata = async () => {
        //loop through the data
        for (var i = 0; i < data.length; i++) {
          //console.log("Emiail: " + data[i].Email + " PropertyTitlte: " + data[i].Title)
          await images(data[i].Email, data[i].Title, data[i], data.length, i);
        }
      };
      getdata();
    } else {
      res.send("nothing");
    }
  });
});

// route to fetch all the uploaded properties
router.post("/properties", (req, res) => {
  // function to get all the images path
  const getImages = async (email, title) => {
    const datta = {
      dataaa: {},
      filepath: [],
    };

    // find images with the same email and title
    const images = await Image.find({ Email: email, PropertyTile: title });

    images.forEach(image => {
      datta.filepath.push(image.Path);
    });

    return datta;
  };

  // get all the properties from the database
  Property.find({}).then(async (properties) => {
    if (properties.length === 0) {
      return res.send("nothing");
    }

    const dat = [];

    // create an array of promises to get all images for each property
    const promises = properties.map(async (property) => {
      const datta = await getImages(property.Email, property.Title);
      datta.dataaa = property;
      dat.push(datta);
    });

    // wait for all promises to resolve
    await Promise.all(promises);

    // send the response after all promises have resolved
    res.send(dat);
  }).catch((err) => {
    res.status(500).send(err.message);
  });
});


//route to update the page
router.post("/update", upload.any(), (req, res) => {
  const dt = JSON.parse(req.body.property);
  const am = JSON.parse(req.body.amenities);
  const user = JSON.parse(req.body.user);
  const tl = JSON.parse(req.body.tl);
  const title = dt.Title;

  //function to save the images information
  const imageinfo = async () => {
    // Access the uploaded files using req.files
    const uploadedFiles = req.files;

    // Store the path of the uploaded files in case of deletion
    var upfiles = [];

    // Loop through the uploaded files and get their path
    for (var i = 0; i < uploadedFiles.length; i++) {
      var filepath = uploadedFiles[i].path.split("\\").slice(1).join("/");
      upfiles.push(filepath);
    }

    // Find images to delete
    const data = await Image.find({ Email: user, PropertyTile: tl });

    // Delete the images' files from the file system
    await Promise.all(
      data.map(async (image) => {
        try {
          await fs.unlink("public/" + image.Path);
        } catch (err) {
          console.error(`Error deleting image file ${image.Path}:`, err);
        }
      })
    );

    // Delete the image records from the database
    await Image.deleteMany({ Email: user, PropertyTile: tl })
    .then((data)=>{
      console.log(data)
    })

    // Loop through the uploaded images and save new records
    const imagePromises = uploadedFiles.map((file, i) => {
      const image = new Image({
        Email: user,
        PropertyTile: title,
        Path: upfiles[i],
        Filename: file.filename,
      });

      image.save();
    });

    await Promise.all(imagePromises);

    res.send("done");
  };

  //object to set the new values
  const newValues = {};
  newValues.Amenities = {};

  newValues.Title = dt.Title;
  newValues.PropertyType = dt.PropertyType;
  newValues.ListingType = dt.ListingType;
  newValues.Location = dt.Location;
  newValues.Bahrooms = dt.Bathrooms;
  newValues.Bedrooms = dt.Bedrooms;
  newValues.ListingPrice = dt.ListingPrice;
  newValues.Parking = dt.Parking;
  newValues.BuildingSqft = dt.BuildingSqft;
  newValues.ListingDescription = dt.description;

  //check if property provides amenities
  if (am.outdoor) {
    newValues.Amenities.OutdoorArea = true;
  } else {
    newValues.Amenities.OutdoorArea = false;
  }

  //if statement for pool
  if (am.pool) {
    newValues.Amenities.Pool = true;
  } else {
    newValues.Amenities.Pool = false;
  }

  //if statement for vigilance
  if (am.vigilance) {
    newValues.Amenities.Vigilance = true;
  } else {
    newValues.Amenities.Vigilance = false;
  }

  //if statement for laundry
  if (am.Laundry) {
    newValues.Amenities.Laundry = true;
  } else {
    newValues.Amenities.Laundry = false;
  }

  //if statement for security cameras
  if (am.SecurityCameras) {
    newValues.Amenities.SecurityCameras = true;
  } else {
    newValues.Amenities.SecurityCameras = false;
  }

  //if statement for pets
  if (am.Pets) {
    newValues.Amenities.Pets = true;
  } else {
    newValues.Amenities.Pets = false;
  }

  //if statement for dishwasher
  if (am.DishWasher) {
    newValues.Amenities.DishWasher = true;
  } else {
    newValues.Amenities.DishWasher = false;
  }

  //if statement for Internet
  if (am.Internet) {
    newValues.Amenities.Internet = true;
  } else {
    newValues.Amenities.Internet = false;
  }

  //if statement for Elevator
  if (am.Elevator) {
    newValues.Amenities.Elevator = true;
  } else {
    newValues.Amenities.Elevator = false;
  }

  //if statement for Jacuzzi
  if (am.Jacuzzi) {
    newValues.Amenities.Jacuzzi = true;
  } else {
    newValues.Amenities.Jacuzzi = false;
  }

  //if statement for solar
  if (am.solar) {
    newValues.Amenities.Solar = true;
  } else {
    newValues.Amenities.Solar = false;
  }

  //if statement for garage
  if (am.garage) {
    newValues.Amenities.Garage = true;
  } else {
    newValues.Amenities.Garage = false;
  }

  //find the property
  Property.find({ Email: user, Title: tl })
    .then((data) => {
      //chek to see if the tiles match
      if (data[0].Title == title) {
        //call the update function
        Property.findOneAndUpdate(
          { Email: user, Title: tl },
          { $set: newValues },
          { new: true, runValidators: true }
        ).then((updatedListing) => {
          imageinfo();
        });
      } else {
        //check it the new title already exists
        Property.find({ Email: user, Title: title }).then((data) => {
          //if there is data
          if (data.length !== 0) {
            res.send("Property with this title already exists");
          } else {
            //call the update function
            Property.findOneAndUpdate(
              { Email: user, Title: tl },
              { $set: newValues },
              { new: true, runValidators: true }
            ).then((updatedListing) => {
              imageinfo();
            });
          }
        });
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the find operation
      console.error("Error finding property:", error);
      res
        .status(500)
        .send({ error: "An error occurred while finding the property" });
    });
});

//route to upload the property information
router.post("/upload", upload.any(), (req, res) => {
  // Access the uploaded files using req.files
  const uploadedFiles = req.files;

  // Access other data
  const client = JSON.parse(req.body.user);
  const property = JSON.parse(req.body.property);
  const amenities = JSON.parse(req.body.amenities);

  //store the path of the uploaded files in case of deletion
  var upfiles = [];

  //loop through the uploaded files and get their path
  for (var i = 0; i < uploadedFiles.length; i++) {
    var filepath = uploadedFiles[i].path.split("\\").slice(1).join("/");

    upfiles.push(filepath);
  }

  //function to delete the uploaded files
  const delfile = (file) => {
    //loop through the uploaded files path
    for (var i = 0; i < file.length; i++) {
      fs.unlink(file[i], (err) => {});
    }
  };

  //get the property schema
  const propertyy = new Property();

  //function to save property info
  const PropertyInfo = (propertyy) => {
    //upload the property info to the database
    propertyy.Email = client;
    propertyy.Title = property.Title;
    propertyy.PropertyType = property.PropertyType;
    propertyy.ListingType = property.ListingType;
    propertyy.Location = property.Location;
    propertyy.Bathrooms = property.Bathrooms;
    propertyy.Bedrooms = property.Bedrooms;
    propertyy.ListingPrice = property.ListingPrice;
    propertyy.Parking = property.Parking;
    propertyy.BuildingSqft = property.BuildingSqft;
    propertyy.ListingDescription = property.description;

    //check if property provides amenities
    if (amenities.outdoor) {
      propertyy.Amenities.OutdoorArea = true;
    } else {
      propertyy.Amenities.OutdoorArea = false;
    }

    //if statement for pool
    if (amenities.pool) {
      propertyy.Amenities.Pool = true;
    } else {
      propertyy.Amenities.Pool = false;
    }

    //if statement for vigilance
    if (amenities.vigilance) {
      propertyy.Amenities.Vigilance = true;
    } else {
      propertyy.Amenities.Vigilance = false;
    }

    //if statement for laundry
    if (amenities.Laundry) {
      propertyy.Amenities.Laundry = true;
    } else {
      propertyy.Amenities.Laundry = false;
    }

    //if statement for security cameras
    if (amenities.SecurityCameras) {
      propertyy.Amenities.SecurityCameras = true;
    } else {
      propertyy.Amenities.SecurityCameras = false;
    }

    //if statement for pets
    if (amenities.Pets) {
      propertyy.Amenities.Pets = true;
    } else {
      propertyy.Amenities.Pets = false;
    }

    //if statement for dishwasher
    if (amenities.DishWasher) {
      propertyy.Amenities.DishWasher = true;
    } else {
      propertyy.Amenities.DishWasher = false;
    }

    //if statement for Internet
    if (amenities.Internet) {
      propertyy.Amenities.Internet = true;
    } else {
      propertyy.Amenities.Internet = false;
    }

    //if statement for Elevator
    if (amenities.Elevator) {
      propertyy.Amenities.Elevator = true;
    } else {
      propertyy.Amenities.Elevator = false;
    }

    //if statement for Jacuzzi
    if (amenities.Jacuzzi) {
      propertyy.Amenities.Jacuzzi = true;
    } else {
      propertyy.Amenities.Jacuzzi = false;
    }

    //if statement for solar
    if (amenities.solar) {
      propertyy.Amenities.Solar = true;
    } else {
      propertyy.Amenities.Solar = false;
    }

    //if statement for garage
    if (amenities.garage) {
      propertyy.Amenities.Garage = true;
    } else {
      propertyy.Amenities.Garage = false;
    }
  };

  //function to save the images information
  const imageinfo = () => {
    //loop through the uploaded images
    for (var i = 0; i < uploadedFiles.length; i++) {
      //new image upload schema
      const image = new Image();

      image.Email = client;
      image.PropertyTile = property.Title;
      image.Path = upfiles[i];
      image.Filename = uploadedFiles[i].filename;

      image.save();
    }
  };

  //check if property exists

  Property.find({ Email: client.Email, Title: property.Title }).then((data) => {
    //if client does not have the property
    if (data.length == 0) {
      //call the funtion to saave the image info
      imageinfo();

      //call the function to input the property information
      PropertyInfo(propertyy);

      //save the property
      propertyy.save();

      res.send("success");
    }
    //if client already has the property
    else {
      //call the delete files function
      delfile(upfiles);
      res.send("property already exists for this client");
    }
  });
});

module.exports = router;

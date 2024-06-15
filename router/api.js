//require express
const express = require("express");
const router = express.Router({ caseSensitive: true });
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); //store the secret
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//require the user model
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

//load in secret variable
dotenv.config({ vaerbose: true });

//sign up route
router.post("/signup", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  email = email.toLowerCase();
  var password = req.body.password;

  //check to see if the user already exists
  User.find({ Email: email }).then((data) => {
    //if user exixts
    if (data.length !== 0) {
      res.send("user exists");
      return;
    }

    //esle if user does not exist
    else {
      //get date
      var currentdate = new Date();

      //get current date
      var datetime =
        currentdate.getMonth() +
        1 +
        "/" +
        currentdate.getDate() +
        "/" +
        currentdate.getFullYear();

      //create a new user in the database
      const user = new User();

      user.Email = email;
      user.Name = name;
      user.Password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      user.RegistrationDate = datetime;

      //save user in the database
      user
        .save()
        .then((savedUser) => {
          var token = jwt.sign(
            {
              data: savedUser,
            },
            process.env.secret,
            { expiresIn: 60 }
          );

          res.status(201).send("successfull");
        })
        .catch((err) => {
          res.status(500).send(`Error saving user: ${err}`);
        });
    }
  });
});

//login route
router.post("/login", (req, res) => {

  var email = req.body.email;
  email = email.toLowerCase();

  //check to see if the user already exists
  User.find({ Email: email })
  .then((data)=>{
    if(data.length == 0){
        res.send("user does not exists")
    }
    else{
        if (bcrypt.compareSync(req.body.password, data[0].Password)) {
            const token = jwt.sign({
                data: data[0]
            }, process.env.secret, { expiresIn: 36000 })
            return res.status(200).send(token);
        }
        else{
            res.send("wrong password or email")
        }
    }
  })
});

module.exports = router;

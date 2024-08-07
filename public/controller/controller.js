(function () {
  //define the controller and set the
  const app = angular.module("app", ["ngRoute", "angular-jwt"]);

  //prevent user from login into restricted pages without a valid token
  app.run(function ($http, $rootScope, $window, $location, jwtHelper) {
    $http.defaults.headers.common.Authorization =
      "Bearer " + $window.localStorage.token;
    $rootScope.$on(
      "$routeChangeStart",
      function (event, nextRoute, currentRoute) {
        if (
          nextRoute.access !== undefined &&
          nextRoute.access.restricted === true &&
          !window.localStorage.token
        ) {
          event.preventDefault();
          $location.path("/");
        }
        if (
          $window.localStorage.token &&
          nextRoute.access.restricted === true
        ) {
          $http.post("/api/verify", { token: $window.localStorage.token }).then(
            function (response) {},
            function (err) {
              delete $window.localStorage.token;
              $location.path("/");
            }
          );
        }
      }
    );
  });

  //include cross domains
  app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    //home page
    $routeProvider.when("/", {
      templateUrl: "./signlogin.html",
      controller: "signloginController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    });

    //about page
    $routeProvider.when("/about", {
      templateUrl: "./about.html",
      controller: "AboutController",
      controllerAs: "vm",
    });

    //post page
    $routeProvider.when("/post", {
      templateUrl: "./post.html",
      controller: "PostController",
      controllerAs: "vm",
      access: {
        restricted: true,
      },
    });

    //properties page
    $routeProvider.when("/properties", {
      templateUrl: "./property.html",
      controller: "PropertyController",
      controllerAs: "vm",
      access: {
        restricted: true,
      },
    });

    //property page
    $routeProvider.when("/propertty/:token", {
      templateUrl: "./propertty.html",
      controller: "ProperttyController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    });

    //edit page
    $routeProvider.when("/edit/:token", {
      templateUrl: "./edit.html",
      controller: "EditController",
      controllerAs: "vm",
      access: {
        restricted: true,
      },
    });
  });

  //function to post the properties

  const propertiess = (response, $http) => {
    const data = response.data;

    //array to store images
    var images = [];

    //loop through the data
    for (var i = 0; i < data.length; i++) {
      //loop through the images
      for (var p = 0; p < data[i].filepath.length; p++) {
        if (p == 0) {
          //store the images in an array
          images.push(
            '<div class="carousel-item active" w-100 id="imggg" style="background-image: url(\'./' + data[i].filepath[p] + '\'); background-size: cover; background-position: center;">' +
              
              '</div>'

          );
        } else {
          //store the images in an array
          images.push(
             '<div class="carousel-item w-100" id="imggg" style="background-image: url(\'./' + data[i].filepath[p] + '\'); background-size: cover; background-position: center;">' +
              
              '</div>'
          );
        }

        //store the images in an array
      }

      images = images.join("");

      //Send the data to client side for viewing
      $(
        '<div class = "hld" id=' +
          data[i].dataaa._id +
          ">" +
          '<div class ="card" style ="width: 100%; border: none; " >' +
          '<div id="carouselExampleIndicators' +
          i +
          '" class="carousel slide">' +
          '<div class="card-img-top carousel-inner" id="imgt" >' +
          images +
          "</div>" +
          "</div>" +
          ' <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators' +
          i +
          '" data-bs-slide="prev">' +
          '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
          '<span class="visually-hidden">Previous</span>' +
          "</button>" +
          '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators' +
          i +
          '" data-bs-slide="next">' +
          '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
          '<span class="visually-hidden">Next</span>' +
          "</button>" +
          "</div>" +
          ' <div class="card-body">' +
          "<br>" +
          '<div class="line2" ></div>' +
          '<h5 class="card-title">$ ' +
          data[i].dataaa.ListingPrice +
          "</h5>" +
          '<p class="card-text">Home in ' +
          data[i].dataaa.Location +
          "</p>" +
          '<div class="line3"></div>' +
          "<br>" +
          ' <div class="card-body row align-items-center" id = "idem" style = "" >' +
          ' <div class="card-body row align-items-center" id = "idem" style = "" >' +
          '<div class="card-link crdde3" >' +
          '<p class = "linktxt previ"> Preview </p>' +
          "</div>" +
          '<div class="card-link crdde " style="">' +
          '<p class = "linktxt dele"> Delete </p>' +
          "</div>" +
          '<div class="card-link " id="edi">' +
          '<img src="./images/edit.png" class = "linkimg linkimg1" alt="" srcset="">' +
          '<p class = "linktxt editt"> Edit </p>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>"
      ).appendTo(".divpr");

      images = [];
    }

    //when user clicks the properties
    $(".previ").click(function () {
      var pr = $(this).parents("div")[4].id;

      location.href = "propertty/" + pr;
    });

    //when user clicks delete
    $(".dele").click(function () {
      var bt2 = $(this).parents("div")[0]
      var bt = $(this)
      $(bt).html("");
      $(bt).css("color: white");
      $(
        '<div class="spinner-border" role="status" >' +
          '<span class="sr-only">Loading...</span>' +
          "</div>"
      ).appendTo(bt);
      
      var pr2 = $(this).parents("div")[4]
      var pr = $(this).parents("div")[4].id;
      $http
        .post("/post/delete", {
          id: pr,
        })
        .then((res) => {
          $(bt).html("");
          $(bt).css("color: white");
          $(bt2).css({
            "background-color": "green"
        });
          $(bt).html("Done");

          setTimeout(function() {
            $(pr2).remove()
            // Code to execute after the delay
        }, 1000);

        
        });
    });

    //when user clicks edit
    $(".editt").click(function () {
      var pr = $(this).parents("div")[4].id;
      location.href = "edit/" + pr;
    });
  };

  //signlogin controller
  app.controller("signloginController", signloginController);
  function signloginController($location, $scope, $window, $http) {
    var vm = this;

    //when user clicks signup
    $(".signupp").on("click", () => {
      if (!vm.sign) {
        return;
      }

      if (!vm.sign.name) {
        console.log("no name");
        return;
      }

      if (!vm.sign.email) {
        console.log("no email");
        return;
      }

      if (!vm.sign.password) {
        console.log("no password");
        return;
      }

      $http.post("/api/signup", vm.sign).then((res) => {
        //if successful
        if (res.data == "successfull") {
          console.log(res.data);
        } else {
        }
      });
    });

    //when user clicks login
    $(".loginn").click(function () {
      $(".erro").html("")

      if(!vm.login){
        console.log("nothing")
        return;
      }
      if (!vm.login.email) {
        console.log("no email");
        return;
      }

      if (!vm.login.password) {
        console.log("no password");
        return;
      }

      var bt = $(this)
      $(bt).html("");
      $(bt).css("color: white");
      $(
        '<div class="spinner-border" role="status" >' +
          '<span class="sr-only">Loading...</span>' +
          "</div>"
      ).appendTo(bt)

      $http.post("/api/login", vm.login).then((res) => {
        //if successful
        if (res.data == "wrong password or email") {
          $(bt).html("");
          $(bt).html("Login");
          $(".erro").html("wrong password or email")
        }

        if (res.data == "user does not exists") {
          $(bt).html("");
          $(bt).html("Login");
          $(".erro").html("wrong password or email")
        } else {
          $window.localStorage.token = res.data;
          $location.path("/post");
        }
      });
    });
  }

  //Edit controller
  app.controller("EditController", EditController);
  function EditController($location, $scope, $window, $http,jwtHelper) {
    var vm = this;

    //retrive token from the url
    const url = window.location.pathname.split("/");
    const url2 = url[2];

    //var array to store the images
    var myFiles = [];

    //store the original title
    var tl ;

    //route to retrieve the property
    $http
      .post("/post/propertty", {
        id: url2,
      })
      .then((res) => {
        var dt = res.data[0];
        var am = res.data[0].dataaa.Amenities;
        var pic = res.data[0].filepath;

        vm.property = dt
        vm.amenities = am
       
        //display the images
        //preview pictures before uploading
        if (window.File && window.FileList && window.FileReader) {
          //loop throuth the images
          async function processImages() {
            for (var p = 0; p < pic.length; p++) {
                //hide the videos may take longer to load text
                $("#imgt").hide();
        
                //split contentytpe
                var pic2 = pic[p].split("/");
                var pic23 = pic2[1].split(".");
                var pic33 = pic2[1];
        
                async function getImageFileFromUrl(url) {
                    let response = await fetch(url);
                    let data = await response.blob();
                    let metadata = {
                        type: "image/" + pic23[1],
                    };
                    var file = new File([data], pic33, metadata);
                    myFiles.push(file);
                }
        
                // Await the asynchronous function to ensure it completes before continuing
                await getImageFileFromUrl(pic[p]);
        
                $(
                    '<div class="imgpreview">' +
                    '<img id="img" src="' +
                    pic[p] +
                    '" title="' +
                    pic33 +
                    '"/>' +
                    '<br/><a class="remove">x</a>' +
                    "</div>"
                ).appendTo(".images");
        
                $(".remove").click(function () {
                    $(this).parent("div").remove();
                    var name = $(this).parents("div")[0].children[0].title;
        
                    for (var i = 0; i < myFiles.length; i++) {
                        if (myFiles[i].name == name) {
                            myFiles.splice(i, 1);
                        }
                    }
                });
            }
        }
        
        // Call the async function
        processImages();
        

          $("#file").on("change", function (e) {
            var files = e.target.files,
              filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
              var f = files[i];

              if (files[i].type.includes("image")) {
                myFiles.push(f);
              } else {
                //alert
                alert("Upload images only. Video uploads not supported .");
                return;
              }

              //if there is a video show the loading circle
              /*if (f.type.includes("video")) {
                            //show the div holding the loading circle
                            document.querySelector('.iver').style.display = 'flex';
                        }*/

              (function (file) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                  //to acces the file name and file typre of the files
                  var filename = file.name;
                  var filetype = file.type;

                  //image file
                  if (filetype.includes("image")) {
                    //hide the videos may take longer to load text
                    $("#imgt").hide();

                    $(
                      '<div class="imgpreview">' +
                        '<img id="img" src="' +
                        e.target.result +
                        '" title="' +
                        filename +
                        '"/>' +
                        '<br/><a class="remove">x</a>' +
                        "</div>"
                    ).appendTo(".images");
                  }

                  $(".remove").click(function () {
                    $(this).parent("div").remove();
                    var name = $(this).parents("div")[0].children[0].title;

                    for (var i = 0; i < myFiles.length; i++) {
                      if (myFiles[i].name == name) {
                        myFiles.splice(i, 1);
                      }
                    }
                  });
                };

                fileReader.readAsDataURL(f);
              })(files[i]);
            }
          });

        } else {
          alert("Your browser doesn't support to File API");
        }

        //store the original title
        tl = dt.dataaa.Title

        //display the title
        $("#title").val(dt.dataaa.Title);
        vm.property.Title = dt.dataaa.Title

        //display the property type
        $("#PropertyType").val(dt.dataaa.PropertyType);
        vm.property.PropertyType = dt.dataaa.PropertyType

        //display the listing type
        $("#inputState").val(dt.dataaa.ListingType);
        vm.property.ListingType = dt.dataaa.ListingType

        //display the location
        $("#location").val(dt.dataaa.Location);
        vm.property.Location = dt.dataaa.Location

        //display th bathrooms
        $("#bth").val(dt.dataaa.Bathrooms);
        vm.property.Bathrooms = dt.dataaa.Bathrooms

        //display the bedrooms
        $("#bedrooms").val(dt.dataaa.Bedrooms);
        vm.property.Bedrooms = dt.dataaa.Bedrooms

        //display the rent price
        $("#rent").val(dt.dataaa.ListingPrice);
        vm.property.ListingPrice = dt.dataaa.ListingPrice

        //display the parking
        $("#parking").val(dt.dataaa.Parking);
        vm.property.Parking = dt.dataaa.Parking

        //display the apartment square foot
        $("#sqft").val(dt.dataaa.BuildingSqft);
        vm.property.BuildingSqft = dt.dataaa.BuildingSqft

        //display the listing description
        $("#exampleFormControlTextarea1").val(dt.dataaa.ListingDescription);
        vm.property.description = dt.dataaa.ListingDescription

        //check for amenities
        if (am.DishWasher) {
          $("#d").prop("checked", true);
          vm.amenities.DishWasher = am.DishWasher
        }

        if(am.SecurityCameras){
          $("#sc").prop("checked", true);
          vm.amenities.SecurityCameras = am.SecurityCameras
        }
        if (am.Elevetor) {
          $("#e").prop("checked", true);
          vm.amenities.Elevator = am.Elevetor
        }
        if (am.Garage) {
          $("#g").prop("checked", true);
          vm.amenities.garage = am.Garage
        }
        if (am.Internet) {
          $("#i").prop("checked", true);
          vm.amenities.Internet = am.Internet
        }
        if (am.Jacuzzi) {
          $("#j").prop("checked", true);
          vm.amenities.Jacuzzi = am.Jacuzzi
        }
        if (am.Laundry) {
          $("#l").prop("checked", true);
          vm.amenities.Laundry = am.Laundry
        }
        if (am.Outdoor) {
          $("#o").prop("checked", true);
          vm.amenities.outdoor = am.Outdoor
        }
        if (am.Pets) {
          $("#p").prop("checked", true);
          vm.amenities.Pets = am.Pets
        }
        if (am.Pool) {
          $("#po").prop("checked", true);
          vm.amenities.pool = am.Pool
        }
        if (am.Solar) {
          $("#so").prop("checked", true);
          vm.amenities.solar = am.Solar
        }
        if (am.Vigilance) {
          $("#v").prop("checked", true);
          vm.amenities.vigilance = am.Vigilance
        }
      });


      //when user clicks update this listing
       //when user clicks submit my property
    $("#sbtf").on("click", () => {
      $(".error").html("");
      $(".error2").html("");
      $(".error1").html("");

      //------------------validate property info-------------

      //check to see if property info is filled out
      if (!vm.property) {
        $(".error2").html("Please fill out your property information below.");
        return;
      }

      //if property title is not filled out
      if (!vm.property.Title) {
        $(".error2").html("Please fill out your property title below.");
        return;
      }

      //if property type is not filled
      if (!vm.property.PropertyType) {
        $(".error2").html("Please select your property type below.");
        return;
      }

      //if property listing is not selected
      if (!vm.property.ListingType) {
        $(".error2").html("Please select your listing type below.");
        return;
      }

      //if property location is not filled
      if (!vm.property.Location) {
        $(".error2").html("Please fill out your property Location below.");
        return;
      }

      //if number of bathrooms is not filled
      if (!vm.property.Bathrooms) {
        $(".error2").html(
          "Fill out the number of bathrooms in the property below."
        );
        return;
      }

      //if number of bedrooms is not filled
      if (!vm.property.Bedrooms) {
        $(".error2").html("Please fill out the number of bedrooms below.");
        return;
      }

      //if listing price is missing
      if (!vm.property.ListingPrice) {
        $(".error2").html("Please fill out your Listing price below.");
        return;
      }

      //if parking info is missing
      if (!vm.property.Parking) {
        $(".error2").html("Please fill out the parking information below.");
        return;
      }

      //if building sqft is missing
      if (!vm.property.BuildingSqft) {
        $(".error2").html(
          "Please fill out your property SQFT information below."
        );
        return;
      }

      //if property description is missing
      if (!vm.property.description) {
        $(".error2").html("Please fill out the property description below.");
        return;
      }

      //chek if there are images
      if (myFiles.length == 0) {
        $(".error1").html("Please upload images of your property.");
        return;
      }

      $("#sbtf").html("");
      $("#sbtf").css("color: white");
      $(
        '<div class="spinner-border" role="status" >' +
          '<span class="sr-only">Loading...</span>' +
          "</div>"
      ).appendTo("#sbtf");

      var formData = new FormData();

      const token = $window.localStorage.token;
      const payload = jwtHelper.decodeToken(token).data;
      var email = payload.Email;

      // Append each file to the FormData object
      for (var i = 0; i < myFiles.length; i++) {
        formData.append(email + "," + vm.property.Title, myFiles[i]);
      }

      // Append other data to the FormData object
      formData.append("tl", JSON.stringify(tl));
      formData.append("user", JSON.stringify(email));
      formData.append("property", JSON.stringify(vm.property));
      formData.append("amenities", JSON.stringify(vm.amenities));

      //send the data to the server
      $http
        .post("/post/update", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(function (response) {

          //if property is succesfully posted
          if (response.data == "done") {
            $("#sbtf").css("background-color", "green");
            $("#sbtf").css("border", "none");
            $(".spinner-border").remove();
            $("#sbtf").html("Success");

            setTimeout(function () {
              location.href = "/properties";
            }, 1000);
          }

          //if thei property already exists
          if (response.data == "Property with this title already exists") {
            $("#sbtf").css("background-color", "red");
            $("#sbtf").css("border", "none");
            $(".spinner-border").remove();
            $("#sbtf").html("Error");
            $(".error1").html("Property with the abpve title already exists.");

            setTimeout(function () {
              $("#sbtf").html("Update this listing");
              $(".error").html("");
              $(".error2").html("");
              $(".error1").html("");
            }, 1000);
          }
        })
        .catch(function (error) {
          // Handle the error
        });
    });
  }

  //about controller
  app.controller("AboutController", AboutController);
  function AboutController($location, $scope, $window, $http) {
    var vm = this;
  }

  //propertty controller
  app.controller("ProperttyController", ProperttyController);
  function ProperttyController($location, $scope, $window, $http) {
    var vm = this;

    //retrive token from the url
    const url = window.location.pathname.split("/");
    const url2 = url[2];

    //route to retrieve the property
    $http
      .post("/post/propertty", {
        id: url2,
      })
      .then((response) => {
        if (response.data == "nothing") {
          $location.path("/error");
        } else {
          //var to store the data
          var dat = response.data[0];

          //store the pictures
          var pics = dat.filepath;

          //render the picture
          $(".image1").css("background-image", "url(" + pics[0] + ")");

          //render the price on the picture
          $(".price").html(
            "$ " + parseInt(dat.dataaa.ListingPrice).toLocaleString()
          );

          //render the listing type
          $(".type").html(dat.dataaa.ListingType);

          //check if its a home or office
          if (dat.dataaa.PropertyType.includes("Home")) {
            $(".title").html("" + dat.dataaa.Location);
          } else {
            $(".title").html("" + dat.dataaa.Location);
          }

          //render the sqft
          $(".ki").html(dat.dataaa.BuildingSqft.toLocaleString() + " sqft");

          //render the number of bedrooms
          $(".k2").html(dat.dataaa.Bedrooms + " bedrooms");

          //render the bathrooms
          $(".k3").html(dat.dataaa.Bathrooms + " bathrooms");

          //render the property descriptions
          $(".description").html(dat.dataaa.ListingDescription);

          //render the price on the property rate
          $(".mn").html(
            "$ " + parseInt(dat.dataaa.ListingPrice).toLocaleString()
          );

          //var to store the property amenities
          var amenities = Object.keys(dat.dataaa.Amenities).filter(function (
            key
          ) {
            return dat.dataaa.Amenities[key];
          });

          //loop through the property amenities
          for (var i = 0; i < amenities.length; i++) {
            //render the property amenities
            $(
              '<li class="amm">' +
                '<span class = "chemi"></span>' +
                '<p class="amp">' +
                amenities[i] +
                "</p>" +
                "</li>"
            ).appendTo(".am");
          }

          //loop through the gallery
          for (var p = 0; p < dat.filepath.length; p++) {
            if (p == 2) {
              $(
                '<div class = "tall" >' +
                  "<img src = " +
                  dat.filepath[p] +
                  ">" +
                  "</div>"
              ).appendTo(".grid-wrapper");
            }

            if (p == 4) {
              $(
                '<div class = "wide">' +
                  "<img src = " +
                  dat.filepath[p] +
                  ">" +
                  "</div>"
              ).appendTo(".grid-wrapper");
            } else {
              $(
                "<div>" + "<img src = " + dat.filepath[p] + ">" + "</div>"
              ).appendTo(".grid-wrapper");
            }
          }
        }
      });
  }

  //properties controller
  app.controller("PropertyController", PropertyController);
  function PropertyController($location, $scope, $window, $http) {
    var vm = this;

    //route to get all the properties from the database
    $http
      .post("/post/properties", {
        DataSend: "get posted properties",
      })
      .then((response) => {
        if (response.data !== "nothing") {
          $(".spinner-border").hide();
          $(".hld").remove();
          //showcase the properties
          propertiess(response, $http);
        } else {
          $(".spinner-border").hide();
         $(".hld").remove();
          $(".nodd").html("Your listings will be shown here");
        }
      });
  }

  //post controller
  app.controller("PostController", PostController);
  function PostController($location, $scope, $window, $http, jwtHelper) {
    var vm = this;

    //to store files that are being previewd
    var myFiles = [];

    //preview pictures before uploading

    if (window.File && window.FileList && window.FileReader) {
      $("#file").on("change", function (e) {
        var files = e.target.files,
          filesLength = files.length;
        for (var i = 0; i < filesLength; i++) {
          var f = files[i];

          if (files[i].type.includes("image")) {
            myFiles.push(f);
          } else {
            //alert
            alert("Upload images only. Video uploads not supported yet.");
            return;
          }

          //if there is a video show the loading circle
          /*if (f.type.includes("video")) {
                        //show the div holding the loading circle
                        document.querySelector('.iver').style.display = 'flex';
                    }*/

          (function (file) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              //to acces the file name and file typre of the files
              var filename = file.name;
              var filetype = file.type;

              //image file
              if (filetype.includes("image")) {
                //hide the videos may take longer to load text
                $("#imgt").hide();

                $(
                  '<div class="imgpreview">' +
                    '<img id="img" src="' +
                    e.target.result +
                    '" title="' +
                    filename +
                    '"/>' +
                    '<br/><a class="remove">x</a>' +
                    "</div>"
                ).appendTo(".images");
              }

              //video file
              /*if (filetype.includes("video")) {

                                //hide the videos may take longer to load text
                                $("#imgt").hide();

                                $("<div class = \"imgpreview\">" + "<video src=\"" + e.target.result + "\"  title=\"" + filename + "\" width=\"100%\" height=\"100%\" controls>" +
                                    "</video>" + "<br/><button class=\"remove\">x</button>" + "</div>"
                                ).appendTo(".images");

                                //hide the div holding loading cirlce
                                $('.iver').hide();
                            }*/

              $(".remove").click(function () {
                $(this).parent("div").remove();
                var name = $(this).parents("div")[0].children[0].title;

                for (var i = 0; i < myFiles.length; i++) {
                  if (myFiles[i].name == name) {
                    myFiles.splice(i, 1);
                  }
                }
              });
            };

            fileReader.readAsDataURL(f);
          })(files[i]);
        }
      });
    } else {
      alert("Your browser doesn't support to File API");
    }

    //when user clicks submit my property
    $("#sbtf").on("click", () => {
      $(".error").html("");
      $(".error2").html("");
      $(".error1").html("");

      //------------------validate property info-------------

      //check to see if property info is filled out
      if (!vm.property) {
        $(".error2").html("Please fill out your property information below.");
        return;
      }

      //if property title is not filled out
      if (!vm.property.Title) {
        $(".error2").html("Please fill out your property title below.");
        return;
      }

      //if property type is not filled
      if (!vm.property.PropertyType) {
        $(".error2").html("Please select your property type below.");
        return;
      }

      //if property listing is not selected
      if (!vm.property.ListingType) {
        $(".error2").html("Please select your listing type below.");
        return;
      }

      //if property location is not filled
      if (!vm.property.Location) {
        $(".error2").html("Please fill out your property Location below.");
        return;
      }

      //if number of bathrooms is not filled
      if (!vm.property.Bathrooms) {
        $(".error2").html(
          "Fill out the number of bathrooms in the property below."
        );
        return;
      }

      //if number of bedrooms is not filled
      if (!vm.property.Bedrooms) {
        $(".error2").html("Please fill out the number of bedrooms below.");
        return;
      }

      //if listing price is missing
      if (!vm.property.ListingPrice) {
        $(".error2").html("Please fill out your Listing price below.");
        return;
      }

      //if parking info is missing
      if (!vm.property.Parking) {
        $(".error2").html("Please fill out the parking information below.");
        return;
      }

      //if building sqft is missing
      if (!vm.property.BuildingSqft) {
        $(".error2").html(
          "Please fill out your property SQFT information below."
        );
        return;
      }

      //if property description is missing
      if (!vm.property.description) {
        $(".error2").html("Please fill out the property description below.");
        return;
      }

      //chek if there are images
      if (myFiles.length == 0) {
        $(".error1").html("Please upload images of your property.");
        return;
      }

      $("#sbtf").html("");
      $("#sbtf").css("color: white");
      $(
        '<div class="spinner-border" role="status" >' +
          '<span class="sr-only">Loading...</span>' +
          "</div>"
      ).appendTo("#sbtf");

      var formData = new FormData();

      const token = $window.localStorage.token;
      const payload = jwtHelper.decodeToken(token).data;
      var email = payload.Email;

      // Append each file to the FormData object
      for (var i = 0; i < myFiles.length; i++) {
        formData.append(email + "," + vm.property.Title, myFiles[i]);
      }

      if(!vm.amenities){
        vm.amenities = "none"
      }

      // Append other data to the FormData object
      formData.append("user", JSON.stringify(email));
      formData.append("property", JSON.stringify(vm.property));
      formData.append("amenities", JSON.stringify(vm.amenities));

      //send the data to the server
      $http
        .post("/post/upload", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(function (response) {
          // Handle the response

          //if property is succesfully posted
          if (response.data == "success") {
            $("#sbtf").css("background-color", "green");
            $("#sbtf").css("border", "none");
            $(".spinner-border").remove();
            $("#sbtf").html("Success");

            setTimeout(function () {
              location.href = "/properties";
            }, 1000);
          }

          //if thei property already exists
          if (response.data == "property already exists for this client") {
            $("#sbtf").css("background-color", "red");
            $("#sbtf").css("border", "none");
            $(".spinner-border").remove();
            $("#sbtf").html("Error");
            $(".error1").html("This property already exists.");

            setTimeout(function () {
              $("#sbtf").html("Submit my Property");
              $(".error").html("");
              $(".error2").html("");
              $(".error1").html("");
            }, 3000);
          }
        })
        .catch(function (error) {
          // Handle the error
        });
    });
  }
})();

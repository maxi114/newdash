(function () {
  //define the controller and set the
  const app = angular.module("app", ["ngRoute", "angular-jwt"]);

   //prevent user from login into restricted pages without a valid token
   app.run(function ($http, $rootScope, $window, $location, jwtHelper) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $window.localStorage.token;
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted === true && !window.localStorage.token) {
            event.preventDefault();
            $location.path('/');
        }
        if ($window.localStorage.token && nextRoute.access.restricted === true) {
            $http.post('/api/verify', { token: $window.localStorage.token })
                .then(function (response) {

                }, function (err) {
                    delete $window.localStorage.token;
                    $location.path('/');
                })
        }


    })
});

  //include cross domains
  app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    //home page
    $routeProvider.when("/", {
      templateUrl: "./signlogin.html",
      controller: "signloginController",
      controllerAs: "vm",
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
        restricted: true
    }
    });

    //properties page
    $routeProvider.when("/properties", {
      templateUrl: "./property.html",
      controller: "PropertyController",
      controllerAs: "vm",
    });

    //property page
    $routeProvider.when("/propertty/:token", {
      templateUrl: "./propertty.html",
      controller: "ProperttyController",
      controllerAs: "vm",
    });

    //our agents page
    $routeProvider.when("/agent", {
      templateUrl: "./agent.html",
      controller: "AgentController",
      controllerAs: "vm",
    });

    //toms page
    $routeProvider.when("/tom/001", {
      templateUrl: "./tom.html",
      controller: "TomController",
      controllerAs: "vm",
    });

    //chris page
    $routeProvider.when("/chris/002", {
      templateUrl: "./chris.html",
      controller: "ChrisController",
      controllerAs: "vm",
    });

    //sam page
    $routeProvider.when("/sam/003", {
      templateUrl: "./sam.html",
      controller: "SamController",
      controllerAs: "vm",
    });

    //scarlett page
    $routeProvider.when("/scarlett/004", {
      templateUrl: "./scarlett.html",
      controller: "ScarlettController",
      controllerAs: "vm",
    });

    //steve page
    $routeProvider.when("/steve/005", {
      templateUrl: "./steve.html",
      controller: "SteveController",
      controllerAs: "vm",
    });

    //will page
    $routeProvider.when("/will/006", {
      templateUrl: "./will.html",
      controller: "WillController",
      controllerAs: "vm",
    });

    //conact page
    $routeProvider.when("/contact", {
      templateUrl: "./contact.html",
      controller: "ContactController",
      controllerAs: "vm",
    });

    //404 page
    $routeProvider.when("/error", {
      templateUrl: "./404.html",
      controller: "ErrorController",
      controllerAs: "vm",
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
            '<div class="carousel-item active">' +
              '<img src="./' +
              data[i].filepath[p] +
              '" class="d-block w-100" alt="...">' +
              "</div>"
          );
        } else {
          //store the images in an array
          images.push(
            '<div class="carousel-item">' +
              '<img src="./' +
              data[i].filepath[p] +
              '" class="d-block w-100" alt="...">' +
              "</div>"
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
          '<div class ="card" style ="width: 100%; border: none;" >' +
          '<div id="carouselExampleIndicators' +
          i +
          '" class="carousel slide">' +
          '<div class="card-img-top carousel-inner">' +
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
          ' <div class="card-body row align-items-center" id = "idem" style = "margin-left: 3px" >' +
          
          '<div class="card-link crdde3" style=" margin-right: 30px">' +
          '<p class = "linktxt previ"> Preview </p>' +
          "</div>" +
          ' <div class="card-body row align-items-center" id = "idem" style = "margin-left: 3px" >' +
          
          '<div class="card-link crdde" style=" margin-right: 30px">' +
          '<p class = "linktxt dele"> Delete </p>' +
          "</div>" +
          '<div class="card-link " id="edi>' +
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
      var pr = $(this).parents("div")[3].id;
      location.href = "propertty/" + pr;
    });

    //when user clicks delete
    $(".dele").click(function (){
      var pr = $(this).parents("div")[4].id;
      $http.post("/post/delete",{
        id: pr
      }).then((res) => {
       console.log(res.data)
      });
     
    })

    //when user clicks edit
    $(".editt").click(function (){
      var pr = $(this).parents("div")[4].id;
      console.log(pr)
    })
    
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
    $(".loginn").on("click", () => {
      if (!vm.login.email) {
        console.log("no email");
        return;
      }

      if (!vm.login.password) {
        console.log("no password");
        return;
      }
      $http.post("/api/login", vm.login).then((res) => {
        //if successful
        if (res.data == "wrong password or email") {
        }

        if (res.data == "user does not exists") {
        } else {
          $window.localStorage.token = res.data;
          $location.path("/post");
        }
      });
    });
  }

  //about controller
  app.controller("AboutController", AboutController);
  function AboutController($location, $scope, $window, $http) {
    var vm = this;
  }

  //contact controller
  app.controller("ContactController", ContactController);
  function ContactController($location, $scope, $window, $http) {
    var vm = this;
  }

  //Error controller
  app.controller("ErrorController", ErrorController);
  function ErrorController($location, $scope, $window, $http) {
    var vm = this;
  }

  //agent controller
  app.controller("AgentController", AgentController);
  function AgentController($location, $scope, $window, $http) {
    var vm = this;
  }

  //chris controller
  app.controller("ChrisController", ChrisController);
  function ChrisController($location, $scope, $window, $http) {
    var vm = this;
  }

  //Sam controller
  app.controller("SamController", SamController);
  function SamController($location, $scope, $window, $http) {
    var vm = this;
  }

  //Scarlett controller
  app.controller("ScarlettController", ScarlettController);
  function ScarlettController($location, $scope, $window, $http) {
    var vm = this;
  }

  //steve controller
  app.controller("SteveController", SteveController);
  function SteveController($location, $scope, $window, $http) {
    var vm = this;
  }

  //will controller
  app.controller("WillController", WillController);
  function WillController($location, $scope, $window, $http) {
    var vm = this;
  }

  //Tom controller
  app.controller("TomController", TomController);
  function TomController($location, $scope, $window, $http) {
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
        console.log(response.data);
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
            $(".title").html("Home In " + dat.dataaa.Location);
          } else {
            $(".title").html("Office In " + dat.dataaa.Location);
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

    //when user clicks the property filter
    $(".pll").on("change", function () {
      $(".spinner-border").show();
      $(".hld").remove();
      $("#nod").hide();
      var pr = this.value;

      var pr2 = $(".pl").val();

      if (pr2 == "") {
        $http
          .post("/post/filter", {
            fil: pr,
          })
          .then((response) => {
            if (response.data == "nothing") {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").show();
            } else {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").hide();
              //showcase the properties
              propertiess(response, $http);
            }
          });
      } else {
        $http
          .post("/post/filter2", {
            fil: pr,
            fil2: pr2,
          })
          .then((response) => {
            if (response.data == "nothing") {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").show();
            } else {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").hide();
              //showcase the properties
              propertiess(response, $http);
            }
          });
      }
    });

    //when user clicks the listing type filter
    $(".pl").on("change", function () {
      $(".spinner-border").show();
      $(".hld").remove();
      $("#nod").hide();

      var ch = this.value;

      var ch2 = $(".pll").val();

      if (ch2 == "") {
        $http
          .post("/post/filterr", {
            fil: ch,
          })
          .then((response) => {
            if (response.data == "nothing") {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").show();
            } else {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").hide();
              //showcase the properties
              propertiess(response, $http);
            }
          });
      } else {
        $http
          .post("/post/filter2", {
            fil: ch2,
            fil2: ch,
          })
          .then((response) => {
            if (response.data == "nothing") {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").show();
            } else {
              $(".spinner-border").hide();
              $(".hld").remove();
              $("#nod").hide();
              //showcase the properties
              propertiess(response, $http);
            }
          });
      }
    });

    //route to get all the properties from the database
    $http
      .post("/post/properties", {
        DataSend: "get posted properties",
      })
      .then((response) => {
        if (response.data.length > 0) {
          $(".spinner-border").hide();
          $(".hld").remove();
          //showcase the properties
          propertiess(response, $http);
        } else {
          $(".hld").remove();
          $("#nod").show();
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
      var email = payload.Email

      // Append each file to the FormData object
      for (var i = 0; i < myFiles.length; i++) {
        formData.append(email + "," + vm.property.Title, myFiles[i]);
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
            }, 3000);
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
          console.error(error);
        });
    });
  }
})();

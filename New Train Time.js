'use strict'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAc-T02gX6g0c1jEd4bWEcUS81yklHFR20",
  authDomain: "myfirstproject-68441.firebaseapp.com",
  databaseURL: "https://myfirstproject-68441.firebaseio.com",
  projectId: "myfirstproject-68441",
  storageBucket: "myfirstproject-68441.appspot.com",
  messagingSenderId: "247363885714"
};

firebase.initializeApp(config);
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();



firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

});
 

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var destination = $("#role-input").val().trim();
var frequency = $("#rate-input").val().trim();

var firstTime = $("#start-input").val().trim();
moment().fromNow();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var frequency = $("#rate-input").val().trim();
  //added some data inputs that are a bit sloppy, TBH

  if(isNaN(frequency)){
alert("Enter a number in 'Frequency'-field!");
  }
  var firstTime = $("#start-input").val().trim();
  if(isNaN(firstTime)){
    alert("Not a number in 'Frequency'-field!");
      }
  console.log("First time:");
  console.log(firstTime);

  var firstTimeConverted = moment(firstTime, "HH:mm");

  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var minutes = moment(firstTimeConverted).format("mm");
  moment().fromNow();
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var dateFormat = "HH:mm";
  var convertedDate = moment(firstTime, dateFormat);

  console.log("Minutes" + minutes);
  console.log("first time: " + firstTime);
  console.log("First time converted: " + firstTimeConverted);
  console.log("The converted time is: " + convertedDate);
  console.log("frequency" + frequency);
  console.log("minutes" + minutes);

  var frequency = $("#rate-input").val().trim();

  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
 
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log("tRemainder" + tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var timeNextTrain = moment().add(tMinutesTillTrain, 'm').format("HH:mm");

  console.log("Time of next train"+ timeNextTrain);
  // Creates local "temporary" object for holding employee data
  //had to stringify otherwise the system wouldn't allow the moment.js conversions in the object
  var newTrain = {
    name: trainName,
    destination: destination,
    ft: JSON.stringify(firstTimeConverted),
    frequency: frequency,
    time: JSON.stringify(currentTime),
    minutesAway: diffTime
  };



  database.ref("/trains").push(newTrain);
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + timeNextTrain + "</td><td>" + tMinutesTillTrain + "</td>" + "<td><button class= 'btn btn-primary btn-sm'>Delete</button></td>" + "<td><button class= 'btn btn-primary btn-sm'>Edit</button></td></tr>");
    var button = $("<button>");
    button.addClass("btn btn-primary btn-sm");
  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
  
//this should delete or edit the table if the user wants to click the edit or submit buttons
$("#train-table").on("click", ".btn.btn-primary.btn-sm",  function (event){
    event.preventDefault();
    console.log("Does this work?")
 

  });
});

  
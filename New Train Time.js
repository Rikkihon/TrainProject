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

// Grabs user input
var trainName = $("#employee-name-input").val().trim();
var destination = $("#role-input").val().trim();
var frequency = $("#rate-input").val().trim();

var firstTime = $("#start-input").val().trim();
moment().fromNow();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  var trainName = $("#employee-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var frequency = $("#rate-input").val().trim();
  if(isNaN(frequency)){
alert("Not a number in 'Frequency'-field!");
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

  // Time is 3:30 AM
  // var firstTime = "03:30";

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
  var newTrain = {
    name: trainName,
    destination: destination,
    ft: JSON.stringify(firstTimeConverted),
    frequency: frequency,
    //convertedDate: convertedDate,
    time: JSON.stringify(currentTime),
    minutesAway: diffTime
  };

  console.log(newTrain);


  database.ref("/trains").push(newTrain);
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + timeNextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");


  //database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  //database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot) {
  //console.log(childSnapshot.val());


});

  //switch to UNIX times and then calculate 
  //use moment.js

    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

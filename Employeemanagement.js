$(document).ready(function () {


    $(".jumbotron").on("click", ".btn.btn-primary.btn-sm",  function (event) 

var tFrequency = 3;

    // Time is 3:30 AM
    var employeeName = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startDate = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(startDate);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var salary = diffTime % tFrequency;
    console.log(salary);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
}
}

    
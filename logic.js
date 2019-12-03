var config = {
    apiKey: "AIzaSyAh8uGTuz9I-TWsDy5LxMS4Nhmni4T1i58",
    authDomain: "trainschedule-60628.firebaseapp.com",
    databaseURL: "https://trainschedule-60628.firebaseio.com",
    storageBucket: "my-first-project-16ade.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var trainInputs = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(trainInputs);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
    var timeRemaining = timeDiff % trainFrequency;
    var minutesAway = trainFrequency - timeRemaining;
    var nextArrival = moment().add(minutesAway, "minutes");
    
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(moment(nextArrival).format("HH:mm"));
    console.log(minutesAway);

    var newRow = $(".col").append(
        $("<div>").html(trainName),
        $("<div>").html(trainDestination),
        $("<div>").html(trainFrequency),
        $("<div>").html(moment(nextArrival).format("HH:mm")),
        $("<div>").html(minutesAway)
    )

    // var newRow = $("<div>");
    // newRow.addClass("row");
    // newRow.attr("id", "the-result");
    // var nameDiv = $("<div>" + trainName + "</div>");
    // nameDiv.addClass("col");
    // var trainDestDiv = $("<div>" + trainDestination + "</div>");
    // trainDestDiv.addClass("col");
    // var frequencyDiv = $("<div>" + trainFrequency + "</div>");
    // frequencyDiv.addClass("col");
    // var arrivalDiv = $("<div>" + (moment(nextArrival).format("HH:mm")) + "</div>");
    // arrivalDiv.addClass("col");
    // var timeDiv = $("<div>" + minutesAway + "</div>");
    // timeDiv.addClass("col");

    // $("#the-header").append(newRow);
    // // $("#the-result").html(nameDiv);
    // // $("#the-result").html(trainDestDiv);
    // // $("#the-result").html(frequencyDiv);
    // // $("#the-result").html(arrivalDiv);
    // // $("#the-result").html(timeDiv);

    // console.log(nameDiv);
    // console.log(trainDestDiv);
    // console.log(frequencyDiv);
    // console.log(arrivalDiv);
    // console.log(timeDiv);

    

});
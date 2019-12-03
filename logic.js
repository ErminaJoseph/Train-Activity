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

    var addRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextArrival).format("HH:mm")),
        $("<td>").text(minutesAway)
    );

    $("#train-table > tbody").append(addRow);

});
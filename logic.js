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

    var trainName = $("name-input").val().trim();
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
    $("#role-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;


    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
    var timeRemaining = timeDiff % trainFrequency;
    var minutesAway = trainFrequency - timeRemaining;
    var nextArrival = moment().add(minutesAway, "minutes");

    var addRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextArrival).format("hh:mm")),
        $("<td>").text(minutesAway),
    )
    


    // var newLi = $("<li>");
    // newLi.addClass("list-group-item");
    // var rowOne = $("<div>");
    // rowOne.addClass("row");
    // var nameDiv = $("<div>" + snapshot.val().newEmployee.name + "</div>");
    // nameDiv.addClass("col employee-tabl-two");
    // var roleDiv = $("<div>" + snapshot.val().newEmployee.role + "</div>");
    // roleDiv.addClass("col role-table-two");
    // var startDateDiv = $("<div>" + snapshot.val().newEmployee.startDate + "</div>");
    // startDateDiv.addClass("col start-date-table-two");
    // var monthlyRateDiv = $("<div>" + snapshot.val().newEmployee.monthlyRate + "<div>");
    // monthlyRateDiv.addClass("col monthly-rate-table-two");
    // var monthWorkedDiv = $("<div>");
    // monthWorkedDiv.addClass("col months-worked-table-two");
    // var totalBilledDiv = $("<div>");
    // totalBilledDiv.addClass("col total-billed-table-two");
          
    // rowOne.append(nameDiv);
    // rowOne.append(roleDiv);
    // rowOne.append(startDateDiv);
    // rowOne.append(monthlyRateDiv);
    // rowOne.append(monthWorkedDiv);
    // rowOne.append(totalBilledDiv);
    // newLi.append(rowOne);
    // $("ul").append(newLi);

});
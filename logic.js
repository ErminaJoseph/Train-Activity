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
    $("frequency-input").val("");


    console.log(snapshot.val().trainInputs.name);
    console.log(snapshot.val().trainInputs.destination);
    console.log(snapshot.val().trainInputs.time);
    console.log(snapshot.val().trainInputs.frequency);

    var newLi = $("<li>");
    newLi.addClass("list-group-item");
    var rowOne = $("<div>");
    rowOne.addClass("row");
    var nameDiv = $("<div>" + snapshot.val().newEmployee.name + "</div>");
    nameDiv.addClass("col employee-tabl-two");
    var roleDiv = $("<div>" + snapshot.val().newEmployee.role + "</div>");
    roleDiv.addClass("col role-table-two");
    var startDateDiv = $("<div>" + snapshot.val().newEmployee.startDate + "</div>");
    startDateDiv.addClass("col start-date-table-two");
    var monthlyRateDiv = $("<div>" + snapshot.val().newEmployee.monthlyRate + "<div>");
    monthlyRateDiv.addClass("col monthly-rate-table-two");
    var monthWorkedDiv = $("<div>");
    monthWorkedDiv.addClass("col months-worked-table-two");
    var totalBilledDiv = $("<div>");
    totalBilledDiv.addClass("col total-billed-table-two");
          
    rowOne.append(nameDiv);
    rowOne.append(roleDiv);
    rowOne.append(startDateDiv);
    rowOne.append(monthlyRateDiv);
    rowOne.append(monthWorkedDiv);
    rowOne.append(totalBilledDiv);
    newLi.append(rowOne);
    $("ul").append(newLi);

      });
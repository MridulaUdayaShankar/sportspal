$(function () {

    $('#login-submit').on('click', function (event) {
        var userLoginInfo = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };

        $.ajax({
            type: 'POST',
            url: '/user',
            data: userLoginInfo
        }).then(function (data) {
            window.location.pathname = '/home';

        });
    });

    $('#register-submit').on('click', function (event) {
        var userRegisterInfo = {
            usernamesignup: $('#usernamesignup').val().trim(),
            emailsignup: $("#emailsignup").val().trim(),
            passwordsignup: $("#passwordsignup").val().trim()
        };

        $.ajax({
            type: 'POST',
            url: "/user/create",
            data: userRegisterInfo
        }).then(function (data) {
            // window.location.pathname = '/home'
        });
    });

    //hide when Document loads, and show only when the respective buttons are clicked
    // $("#create-game-form").hide();
    $("#card-live-stats").hide();
    $("#table-your-games").hide();

    //create game - on click handler
    $("#createGame").on("click", function (event) {
        $("#create-game-form").show();
    });
    //submit form handler
    $("#create-game-button").on("click", function (event) {
        event.preventDefault();
        var createGameForm = {
            name: $("#game-name").val().trim(),
            date: $("#game-date").val().trim(),
            venue: $("#game-venue").val().trim(),
            team: $('#game-team').val().trim()
        };
        $.post("/api/games/", createGameForm, function (data) {
            console.log('created game',data);
        });

    });
 //function to display all the entries made using create game in a table , for "your games"
 function displayResults(data) {
    // Then, for each entry of that json...
    data.forEach(function (element) {
        // Append each of the animal's properties to the table
        $("tbody").append("<tr><td>" + element.name + "</td>" +
            "<td>" + element.date + "</td>" +
            "<td>" + element.venue + "</td>" +
            "<td>" + element.team + "</td></tr>");
    });
}
    //your games - on click handler
    $("#yourGames").on("click", function (event) {
        event.preventDefault();
        $("#table-your-games").show();

        $.ajax("/api/users/games/", {
            type: 'GET',
        }).then(function (data) {

            //call the function displayResults to get all the data displayed on the table
            displayResults(data);
            console.log('data received', data);
        });
    });

    //edit game - on click handler
    $("#editGames").on("click", function (event) {
        event.preventDefault();

        $.ajax("/api/users/games/" + id, {
            type: "PUT",
        }).then(
            function () {
                console.log("all games");
                location.reload();
            }
        );
    });
    //delete game - on click handler
    $("#deleteGame").on("click", function (event) {
        event.preventDefault();
        $.ajax("/api/games/" + id, {
            type: "DELETE",
        }).then(
            function () {
                console.log("all games");
                location.reload();
            }
        );
    });
    //live stats on click handler
    $("#liveStats").on("click", function (event) {
        event.preventDefault();
        $("#card-live-stats").show();
        $.ajax("/api/live", {

        }).then(function (data) {
            console.log("live stats data received", data);
        });
    });

});

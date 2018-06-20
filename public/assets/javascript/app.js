$(function () {
//login button click handler
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
//register button click handler
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
            window.location.pathname = '/';
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
            console.log('created game', data);
        });

    });
    //function to display all the entries made using create game in a table , for "your games"
    function displayResults(data) {
        // Then, for each entry of that json...
        data.forEach(function (element) {
            // Append each of the animal's properties to the table
            $("tbody").append("<tr class='table-info'><td>" + element.name + "</td>" +
                "<td>" + element.date + "</td>" +
                "<td>" + element.venue + "</td>" +
                "<td>" + element.team + "</td></tr>").append("<button type='button' id='editGames' class='btn btn-primary'>Edit</button>");
        });
    }
    //your games - on click handler
    $("#yourGames").on("click", function (event) {
        event.preventDefault();
        $("#table-your-games").show();

        $.ajax("/api/users/games/", {
            type: 'GET',
        }).then(function (data) {
            $("tbody").empty();
            //call the function displayResults to get all the data displayed on the table
            displayResults(data);
            console.log('data received', data);
        });
    });

    //edit game - on click handler
    $("#editGames").on("click", function (event) {
        event.preventDefault();
        $("#create-game-form").show();
        $.ajax("/api/users/games/", {
            type: "PUT",
        }).then(function (data) {
            var currentGame = $(this).data;
            $(this).val(currentame.date).show();
            $(this).val(currentGame.venue).show();
            $(this).val(currentGame.team).show();

            console.log("all games");
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
        // $("#card-live-stats").empty();
        $.ajax({
            url: '/api/stats',
            method: "GET"
        }).then(function (data) {
            console.log("data........", JSON.stringify(data));

            if (data) {
                // data.results.forEach(element => {
                var element = data.results[0];

                console.log("scheduled date", element.sport_event.scheduled);
                console.log("season name", element.sport_event.season.name);
                console.log("start_date", element.sport_event.season.start_date);
                console.log("end_date", element.sport_event.season.end_date);


                $('#live-stats').append('<p>' + 'Season: ', element.sport_event.season.name + '</p><br>' +
                    '<p>' + "Scheduled date: ", element.sport_event.scheduled + '</p><br>' +
                    '<p>' + "Start date: ", element.sport_event.season.start_date + '</p><br>' +
                    '<p>' + "End date: ", element.sport_event.season.end_date + '</p>');
                // });
            } else {
                console.log('error');
            }

            //on click of close button on the card, close the card
            $("#close-button").on("click", function () {
                $("#card-live-stats").hide();
            })
        });
    });
});

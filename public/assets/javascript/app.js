$(function () {

    $('#login-submit').on('click', function (event) {
        var userLoginInfo = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };
        $.ajax({
            type: 'POST',
            url: "/",
            data: userLoginInfo
        }).then(function (data) {
            console.log(data);
            location.reload();
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
            console.log(data);
            location.reload();
        });
    });



    //hide when Document loads, and show only when the respective buttons are clicked
    $("#create-game-form").hide();
    $("#card-live-stats").hide();
    $("#card-your-games").hide();

    //create game - on click handler
    $(".createGame").on("click", function (event) {
        $("#create-game-form").show();
    });
    //submit form handler
    $(".create-game-button").on("click", function (event) {

        var createGameForm = {

            name: $("#name").val().trim(),
            date: $("#date").val().trim(),
            venue: $("#venue").val().trim(),
        };
        $.post("/api/games/", createGameForm, function (data) {

            if (data) {
                $("#game-name").html(data.name);
                $("#game-date").html(data.date);
                $("#game-venue").html(data.venue);
            } else throw (err);
        });
    });
    //your games - on click handler
    $(".yourGames").on("click", function (event) {
        event.preventDefault();
        $("#card-your-games").show();

        var id = $(this).attr('data-id');

        $.ajax("/api/users/" + id, {
            type: 'GET',
        }).then(function (data) {

        });
    });
    //edit game - on click handler
    $(".editGames").on("click", function (event) {
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
    $(".deleteGame").on("click", function (event) {
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
    $(".liveStats").on("click", function (event) {
        event.preventDefault();
        $("#card-live-stats").show();
        $.ajax("/api/live", {

        }).then(function (data) {
            console.log("live stats data received", data);
        });
    });

});

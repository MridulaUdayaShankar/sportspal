$(function () {
    $(".createGame").on("click", function (event) {
        var createGameForm = $('<div class=container>');
        createGameForm.html(`<div class="container">
<div class='row' id="create-game-form">
<div class='col-md-6'>
    <h2>Create Game</h2>
    <form>
        <div class="form-group">
            <label for="game-name">Name</label>
            <input type="text" class="form-control" id="game-name" placeholder="">
        </div>
        <div class="form-group">
            <label for="game-date">Choose Date</label>
            <input type="date" class="form-control" id="game-date" placeholder="" data-pickdate="">
        </div>
        <div class="form-group">
            <label for="game-venue">Venue</label>
            <input type="text" class="form-control" id="game-venue" placeholder="">
        </div>
        <button id='create-game-button' class='btn btn-default'>Submit</button>
    </form>
    </div>
    </div>`);
        $.ajax("/api/games/", {
            type: "POST",
        }).then(
            function () {
                console.log("created game");
                location.reload();
            }
        );
    });


    $(".yourGames").on("click", function (event) {
        event.preventDefault();
        $.ajax("/api/games/user/:id'", {
            type: "GET",
        }).then(
            function () {
                console.log("all games");
                location.reload();
            }
        );
    });
    $(".liveStats").on("click", function (event) {
        event.preventDefault();

        $.ajax("", {
            type: "GET",
        }).then(
            function () {
                console.log("live stats");
                location.reload();
            }
        );
    });
});



module.exports = function(app) {
	app.get("/", function (req, res) {
		var login = false;
		res.render("index");
	});
	app.get('/api/live', function (req, res) {
		var login = true;
		res.render("index");
    });

};
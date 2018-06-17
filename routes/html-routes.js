module.exports = function(app) {
	app.get("/", function (req, res) {
		res.render("index");
	});
	app.get('/api/live', function (req, res) {

    });

};
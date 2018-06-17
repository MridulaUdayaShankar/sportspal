module.exports = function(app) {
	app.get("/", function (req, res) {
		var data = {
			login : true
		};
		res.render("index", data);
	});
	app.get('/home', function (req, res) {
		var data = { 
			login : false
		};
		res.render("index", data);
    });

};
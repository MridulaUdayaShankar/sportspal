function Html (app) {
	app.get("/", function (req, res) {
		res.render('/html/home', {});
	});
}

module.exports = Html;
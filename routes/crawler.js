module.exports = function (app) {
  app.get('/crawler', function (req, res) {
    res.render('crawler');
  });
};
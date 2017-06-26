'use strict';

module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login');
    });
};
app.post('/login', function (req, res) {
    var User = global.dbHelper.getModel('user'),
        uname = req.body.uname;
    User.findOne({ name: uname }, function (error, doc) {
        if (用户不存在) {
            req.session.error = '用户名不存在！';
            res.sendStatus(404);
        } else if (用户存在, 密码错误) {
            req.session.error = "密码错误!";
            res.sendStatus(404);
        } else {
            req.session.user = doc;
            res.sendStatus(200);
        }
    });
});
//# sourceMappingURL=login.js.map
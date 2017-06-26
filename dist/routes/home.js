'use strict';

module.exports = function (app) {
    app.get('/home', function (req, res) {
        if (req.session.user) {
            var Commodity = global.dbHelper.getModel('commodity');
            Commodity.find({}, function (error, docs) {
                //将Commoditys变量传入home模板
                res.render('home', { Commoditys: docs });
            });
        } else {
            req.session.error = "请先登录";
            res.redirect('/login');
        }
    });
    app.get('/addcommodity', function (req, res) {
        res.render('addcommodity');
    });
    app.post('./addcommodity', function (req, res) {
        var Commodity = global.dbHelper.getModel('commodity');
        Commodity.create({
            name: req.body.name,
            price: req.body.price,
            imgSrc: req.body.imgSrc
        }, function (error, doc) {
            if (doc) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    });
};
//# sourceMappingURL=home.js.map
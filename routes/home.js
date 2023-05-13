module.exports = function (app) {
    app.get('/home', function (req, res) {
        if (req.session.user) {
            let Commodity = global.dbHelper.getModel('commodity');
            Commodity.find({}, function (error, docs) {
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
    app.post('/addcommodity', function (req, res) {
        let Commodity = global.dbHelper.getModel('commodity');
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
    // 删除商品
    app.get("/delFromCommodity/:id", function (req, res) {
        let Commidity = global.dbHelper.getModel('commodity');
        Commidity.deleteOne({ "_id": req.params.id }, function (err, doc) {
            res.redirect("/home");
        });
    });
};
module.exports = function (app) {
    //查看购物车商品
    app.get('/cart', function (req, res) {
        let Cart = global.dbHelper.getModel('cart');
        if (!req.session.user) {
            req.session.error = "用户已过期，请重新登录:";
            res.redirect('/login');
        } else {
            Cart.find({ "uId": req.session.user._id, "cStatus": false }, function (error, docs) {
                res.render('cart', { carts: docs });
            });
        }
    });
    //添加购物车商品
    app.get("/addToCart/:id", function (req, res) {
        //req.params.id 获取商品ID号
        if (!req.session.user) {
            req.session.error = "用户已过期，请重新登录:";
            res.redirect('/login');
        } else {
            let Commodity = global.dbHelper.getModel('commodity'),
                Cart = global.dbHelper.getModel('cart');
            Cart.findOne({ "uId": req.session.user._id, "cId": req.params.id }, async function (error, doc) {
                //商品已存在 +1
                if (doc) {
                    Cart.updateOne({
                        "uId": req.session.user._id,
                        "cId": req.params.id
                    }, { $set: { cQuantity: doc.cQuantity + 1 } }, function (err, doc) {
                        res.redirect('/home');
                    });
                } else {
                    //商品未存在，添加
                    Commodity.findOne({ "_id": req.params.id }, function (error, doc) {
                        Cart.create({
                            uId: req.session.user._id,
                            cId: req.params.id,
                            cName: doc.name,
                            cPrice: doc.price,
                            cImgSrc: doc.imgSrc,
                            cQuantity: 1
                        }, function (error, doc) {
                            res.redirect('/home');
                        });
                    });
                }
            });
        }
    });

    //删除购物车商品
    app.get("/delFromCart/:id", function (req, res) {
        //req.params.id 获取商品ID号
        let Cart = global.dbHelper.getModel('cart');
        Cart.deleteOne({ "_id": req.params.id }, function (error, doc) {
            res.redirect('/cart');
        });
    });

    //购物车结算
    app.post("/cart/clearing", function (req, res) {
        let Cart = global.dbHelper.getModel('cart');
        Cart.updateOne({ "_id": req.body.cid }, { $set: { cQuantity: req.body.cnum, cStatus: true } }, function (error, doc) {
            res.sendStatus(200);
        });
    });
};


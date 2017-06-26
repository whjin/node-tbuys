var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var path = require('path');
var ejs = require('ejs');
var app = express();
var mongodb = require('connect-mongo');
var mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
//调用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer());
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    },
    resave: true,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;//保存用户信息
    var err = req.session.error;//保存结果响应信息
    res.locals.message = '';//保存html标签
    if (err) {
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color: red;">' + err + '</div>'
    } else {
        next();
    }
});

app.get('/', function (req, res) {
    res.render('register');
});
app.listen(80);
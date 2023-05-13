const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');

global.dbHelper = require('./common/dbHelper');

global.db = mongoose.connect("mongodb://127.0.0.1:27017/tbuysdb");

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: __dirname + 'public' }).any());

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    let err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});


require('./routes')(app);

app.get('/', function (req, res) {
    res.render('login');
});

app.listen(3000);
console.log("Server is running on http://localhost:3000");



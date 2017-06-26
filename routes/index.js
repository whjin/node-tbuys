require('./routes')(app);//app:express对象
require('./login')(app);
require('./home')(app);

module.exports = function (app) {
    require('./register')(app);
};
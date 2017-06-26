'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');
global.dbHelper = require('./common/dbHelper');

for (var m in models) {
    mongoose.model(m, new Schema(models[m]));
}
module.exports = {
    getModel: function getModel(type) {
        return _getModel(type);
    }
};
var _getModel = function _getModel(type) {
    return mongoose.model(type);
};
//# sourceMappingURL=dbHelper.js.map
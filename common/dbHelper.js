let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');

for (let m in models) {
    mongoose.model(m, new Schema(models[m]));
}
module.exports = {
    getModel: type => {
        return mongoose.model(type);
    }
};

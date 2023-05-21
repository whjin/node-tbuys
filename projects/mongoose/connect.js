const mongoose = require("mongoose");

global.dbModels = require("./schema");

global.db = mongoose.connect("mongodb://127.0.0.1:27017/oceandb");

global.db.then(() => {
  console.log("数据库连接成功");
});

const Article = global.dbModels.getModel("article");

Article.findOne({ "title": "node.js" }, async function (err, doc) {
  if (err) {
    return new Error(err);
  }
  if (doc) {
    await Article.updateOne({}, {
      content: "node.js is excellent",
      publishTime: new Date().getTime()
    });
  } else {
    await Article.create({
      title: "node.js",
      author: "node",
      content: "node.js is great",
      publishTime: new Date().getTime()
    });
  }
});

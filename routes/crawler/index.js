const request = require("request");
const path = require("path");
const config = require("./config");
const analyze = require("./analyze");
const fs = require("fs");

function start (callback) {
  request(config.target, async function (err, res, body) {
    if (err) {
      return new Error(err);
    }
    if (res) {
      let count = await analyze.findImg(config.site, body, downLoad);
      callback(count);
    }
  });
}

function downLoad (site, imgUrl, i) {
  if (imgUrl.includes(".")) {
    let url = site + imgUrl;
    let ext = imgUrl.split(".").pop();
    request(url).pipe(fs.createWriteStream(path.join(config.imgDir, `${i}.${ext}`)));
  }
}

module.exports = function (app) {
  app.get('/crawler', function (req, res) {
    start(count => {
      let Crawler = global.dbHelper.getModel('crawler');
      Crawler.findOne({}, async function (err, doc) {
        if (err) {
          res.sendStatus(500);
        } else {
          if (doc) {
            if (doc.uCount != count) {
              await Crawler.updateOne({}, { $set: { uCount: count } });
            }
          } else {
            await Crawler.create({ uCount: count });
          }
          res.render('crawler', { count });
        }
      });
    });
  });
};
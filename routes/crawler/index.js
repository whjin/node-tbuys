const request = require("request");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

const imgDir = 'public/crawlerImg';
const site = "https://www.szu.edu.cn";

function start (callback) {
  request(site, async function (err, res, body) {
    if (err) {
      return new Error(err);
    }
    if (res) {
      let list = await findImg(site, body, downLoad);
      callback(list);
    }
  });
}

function findImg (site, dom, callback) {
  let $ = cheerio.load(dom);
  const imgList = [];
  $('img').each(function (i, elem) {
    let imgSrc = $(this).attr('src');
    if (imgSrc.includes(".")) {
      imgSrc = imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`;
      let url = site + imgSrc;
      let ext = imgSrc.split(".").pop();
      let filename = `${i}.${ext}`;
      imgList.push(url);
      callback(url, filename);
    }
  });
  return imgList;
}

function downLoad (url, filename) {
  request(url).pipe(fs.createWriteStream(path.join(imgDir, filename)));
}

module.exports = function (app) {
  app.get('/crawler', function (req, res) {
    start(list => {
      let Crawler = global.dbHelper.getModel('crawler');
      Crawler.findOne({}, async function (err, doc) {
        if (err) {
          res.sendStatus(500);
        } else {
          const { type } = req.query;
          switch (type) {
            case "start":
              if (doc) {
                await Crawler.updateOne({}, { $set: { cList: list } });
              } else {
                await Crawler.create({ cList: list });
              }
              res.render('crawler', { list });
              break;
            case "reset":
              await Crawler.updateOne({}, { $set: { cList: [] } });
              res.render('crawler', { list: [] });
              break;
            default:
              res.render('crawler', { list });
              break;
          }
        }
      });
    });
  });
};
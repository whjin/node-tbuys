const request = require("request");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const url = require("url");

const imgDir = 'public/crawlerImg';

function start (site, callback) {
  request(site, async function (err, res, body) {
    if (err) {
      return new Error(err);
    }
    if (res) {
      // console.log(JSON.parse(JSON.stringify(res.request.uri)));
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
      let srcItem;
      if (imgSrc.includes("//")) {
        let protocol = site.split("//").shift();
        srcItem = imgSrc.startsWith(protocol) ? imgSrc : `${protocol}${imgSrc}`;
      } else {
        imgSrc = imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`;
        srcItem = site + imgSrc;
      }
      let ext = imgSrc.split(".").pop();
      let filename = `${i}.${ext}`;
      imgList.push(srcItem);
      callback(srcItem, filename);
    }
  });
  return imgList;
}

function downLoad (site, filename) {
  request(site).pipe(fs.createWriteStream(path.join(imgDir, filename)));
}

module.exports = function (app) {
  app.get('/crawler', function (req, res) {
    const { type, site } = req.query;
    let Crawler = global.dbHelper.getModel('crawler');
    if (type == "reset") {
      res.render("crawler", { list: [] });
    } else {
      Crawler.findOne({}, async function (err, doc) {
        if (err) {
          res.sendStatus(500);
        } else {
          if (doc) {
            start(doc.site, async list => {
              await Crawler.updateOne({}, {
                $set: {
                  cSite: doc.site,
                  cList: list
                }
              });
              res.render("crawler", { list });
            });
          } else {
            start(site, async list => {
              await Crawler.create({
                cSite: site,
                cList: list
              });
              res.render("crawler", { list });
            });
          }
        }
      });
    }
  });
};
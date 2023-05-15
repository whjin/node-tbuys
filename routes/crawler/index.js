const request = require("request");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const url = require("url");

const imgDir = 'public/crawlerImg';

module.exports = function (app) {
  app.get('/crawler', function (req, res) {
    res.render('crawler', { list: [] });
    let Crawler = global.dbHelper.getModel('crawler');
    console.log(req.query);
    // Crawler.findOne({})
    // const site = "https://www.szu.edu.cn";
    const site = "https://www.scut.edu.cn/new";
    // const site = "https://www.baidu.com";

    function start (callback) {
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

    function downLoad (url, filename) {
      // request(url).pipe(fs.createWriteStream(path.join(imgDir, filename)));
    }
    // start(list => {
    //   Crawler.findOne({}, async function (err, doc) {
    //     if (err) {
    //       res.sendStatus(500);
    //     } else {
    //       const { type } = req.query;
    //       switch (type) {
    //         case "start":
    //           // if (doc) {
    //           //   await Crawler.updateOne({}, { $set: { cList: list } });
    //           // } else {
    //           //   await Crawler.create({ cList: list });
    //           // }
    //           // res.render('crawler', { list });
    //           res.render('crawler', { list: [] });
    //           break;
    //         case "reset":
    //           await Crawler.updateOne({}, { $set: { cList: [] } });
    //           res.render('crawler', { list: [] });
    //           break;
    //         default:
    //           res.render('crawler', { list });
    //           break;
    //       }
    //     }
    //   });
    // });
  });
};
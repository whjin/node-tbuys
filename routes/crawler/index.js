const request = require("request");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const clean = require("./clean");

const imgDir = "public/crawlerImg";

module.exports = function (app) {
  app.get("/crawler", async function (req, res) {
    try {
      clean.cleanImg(imgDir);
      if (Object.keys(req.query).length) {
        const { type, siteUrl, imgUrl } = req.query;
        let Crawler = global.dbHelper.getModel("crawler");
        if (type == "start") {
          Crawler.findOne({}, async function (err, doc) {
            if (err) {
              res.render("crawler");
            } else {
              if (!fs.existsSync(imgDir)) {
                fs.mkdirSync(imgDir);
              }
              start(siteUrl, imgUrl, async (list) => {
                if (doc) {
                  await Crawler.updateOne({}, {
                    $set: {
                      cSiteUrl: siteUrl,
                      cImgUrl: imgUrl,
                      cList: list,
                    },
                  });
                } else {
                  await Crawler.create({
                    cSiteUrl: siteUrl,
                    cImgUrl: imgUrl,
                    cList: list,
                  });
                }
                res.render("crawler", { list });
              });
            }
          });
        } else {
          await Crawler.updateOne({}, {
            $set: {
              cSiteUrl: "",
              cImgUrl: "",
              cList: [],
            }
          });
          res.render("crawler", { list: [] });
        }
      } else {
        res.render("crawler", { list: [] });
      }
    } catch (err) {
      res.redirect("/login");
    }
  });

  function start (siteUrl, imgUrl, callback) {
    request(siteUrl, async function (err, res, body) {
      if (err) {
        return new Error(err);
      }
      if (res) {
        let list = await findImg(imgUrl, body, downLoad);
        callback(list);
      }
    });
  }

  function findImg (site, dom, callback) {
    let $ = cheerio.load(dom);
    const imgList = [];
    $("img").each(function (i, elem) {
      let imgSrc = $(this).attr("src");
      if (imgSrc && imgSrc.includes(".")) {
        let srcItem;
        if (imgSrc.includes("//")) {
          if (imgSrc.startsWith("http")) {
            srcItem = imgSrc;
          } else {
            const { protocol } = new URL(site);
            srcItem = protocol + imgSrc;
          }
        } else {
          imgSrc = imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`;
          srcItem = site + imgSrc;
        }
        let filename;
        if (path.extname(imgSrc)) {
          let ext = imgSrc.split(".").pop();
          filename = `${i}.${ext}`;
        } else {
          filename = `${i}.png`;
        }
        imgList.push(srcItem);
      }
    });
    return imgList;
  }

  function downLoad (url, filename) {
    request(url).pipe(fs.createWriteStream(path.join(imgDir, filename)));
  }
};

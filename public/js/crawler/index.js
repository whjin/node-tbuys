const request = require("request");
const path = require("path");
const config = require("./config");
const analyze = require("./analyze");
const fs = require("fs");

function start () {
  request(config.target, function (err, res, body) {
    if (err) {
      return new Error(err);
    }
    if (res) {
      analyze.findImg(config.site, body, downLoad);
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

start();
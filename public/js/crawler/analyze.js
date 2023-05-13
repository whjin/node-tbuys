const cheerio = require("cheerio");

function findImg (site, dom, callback) {
  let $ = cheerio.load(dom);
  $('img').each(function (i, elem) {
    let imgSrc = $(this).attr('src');
    callback(site, imgSrc, i);
  });
}

module.exports.findImg = findImg;
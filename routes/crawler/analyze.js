const cheerio = require("cheerio");

function findImg (site, dom, callback) {
  let $ = cheerio.load(dom);
  let count = 0;
  $('img').each(function (i, elem) {
    let imgSrc = $(this).attr('src');
    count = i;
    callback(site, imgSrc, i);
  });
  return count;
}

module.exports.findImg = findImg;
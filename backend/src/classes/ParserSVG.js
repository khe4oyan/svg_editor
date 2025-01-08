const Layer = require("./Layer.js");

class ParserSVG {
  constructor() { throw new Error("cant create instance of ParserSVG"); }

  static dividedAtTags(svgAtStr) {
    const tags = [];
    let tag = '';
    let appendingTag = false;

    for (let i = 0; i < svgAtStr.length; ++i) {
      if (svgAtStr[i] === '<') {
        appendingTag = true;
      }

      if (appendingTag) {
        tag += svgAtStr[i];
      }

      if (svgAtStr[i] === '>') {
        appendingTag = false;
        tags.push(new Layer(tag));
        tag = '';
      }
    }

    return tags;
  }
}

module.exports = ParserSVG;
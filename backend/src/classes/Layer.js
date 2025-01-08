class Layer {
  static layersTypes = {
    shape: "shape__layersTypes",
    style: "style__layersTypes",
    alwaysRender: "alwaysRender__layersTypes",
  };

  type;
  isVisible;
  tag;
  isSelected;
  shapeData;

  constructor(tag) {
    this.type = Layer.#getTagDataType(tag);
    this.isVisible = true;
    this.tag = tag;
    this.isSelected = false;
    this.shapeData = Layer.#createShapeData(tag);
  }

  static #getTagDataType(tag) {
    const controllableShapeNames = [
      "<rect",
      "<circle",
      "<ellipse",
      "<line",
      "<polyline",
      "<polygon",
      "<path",
      // TODO: should be updated
    ];

    for (let i = 0; i < controllableShapeNames.length; ++i) {
      if (tag.includes(controllableShapeNames[i])) {
        return Layer.layersTypes.shape;
      }
    }

    if (tag.includes("<style")) {
      return Layer.layersTypes.style;
    }

    return Layer.layersTypes.alwaysRender;
  }

  static #createShapeData(tag) {
    if (tag.includes("svg")) {
      return;
    }

    const shapeData = {};
    const arrTag = tag.split('="');

    let key = arrTag[0].split(" ")[1];
    for (let i = 1; i < arrTag.length - 1; ++i) {
      const [value, nextKey] = arrTag[i].split('" ');
      if (value.includes(">")) {
        value.split("").filter(char => {
          return char !== ">"
        }).join("");
      }

      shapeData[key] = value;
      key = nextKey;
    }

    shapeData[key] = arrTag[arrTag.length - 1].split('" ')[0].trim();

    return shapeData;
  }
}

module.exports = Layer;

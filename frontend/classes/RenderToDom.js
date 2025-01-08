import EventsHandlers from "./EventsHandlers.js";

const layersTypes = {
  shape: "shape__layersTypes",
  style: "style__layersTypes",
  alwaysRender: "alwaysRender__layersTypes",
};


class RenderToDom {
  constructor() {
    throw new Error("cant create instance of ParserSVG");
  }

  static svg(tags) {
    const uploadedFileBox = document.querySelector(".uploadedFileBox_svg");

    let joinedTags = "";
    for (let i = 0; i < tags.length; ++i) {
      const { isVisible, tag } = tags[i];
      if (isVisible) {
        joinedTags += tag;
      }
    }

    uploadedFileBox.innerHTML = joinedTags;
  }

  static layers(tags, showHideButtonHandler, selectButtonHandler) {
    const layersBox = document.querySelector(".layersBox");
    layersBox.innerHTML = "";

    for (let i = 0; i < tags.length; ++i) {
      const {
        type,
        // isVisible,
        // tag
      } = tags[i];

      if (type !== layersTypes.shape) {
        continue;
      }

      const layerData = RenderToDom.#createLayer(tags[i], i);
      const [layerBox, button, selectButton] = layerData;

      EventsHandlers.addNewEventHandler(button, "click", () => {
        showHideButtonHandler(i);
      });

      EventsHandlers.addNewEventHandler(selectButton, "click", () => {
        if (selectButton.innerText === "select") {
          selectButton.innerText = "selected";
        } else {
          selectButton.innerText = "select";
          document.querySelector('.layerControlPanel').innerHTML = "";
        }

        selectButtonHandler(i);
      });

      layersBox.appendChild(layerBox);
    }
  }

  static controlPanel(tagData, rerender) {
    const {tag, shapeData} = tagData;
    // static #eventListeners cleared
    const layerControlPanel = document.querySelector('.layerControlPanel');
    layerControlPanel.innerHTML = "";

    // add keys
    const shapeDataKeys = Object.keys(shapeData);

    const joinShapeDataForTag = () => {
      let newTag = tag.split(" ")[0];
      for (let i = 0; i < shapeDataKeys.length; ++i) { 
        newTag += ` ${shapeDataKeys[i]}="${shapeData[shapeDataKeys[i]]}"`;
      }
      newTag += ' />';
      tagData.tag = newTag;
    }

    for (let i = 0; i < shapeDataKeys.length; ++i) {
      const panelDOM = document.createElement('div');
      panelDOM.classList.add("panel");

      const p = document.createElement('p');
      p.innerText = shapeDataKeys[i];

      const input = document.createElement('input');
      input.type = RenderToDom.#setInputType(shapeDataKeys[i]);
      input.placeholder = 'value';
      input.value = shapeData[shapeDataKeys[i]];
      input.addEventListener("change", (e) => {
        const elemNewValue = e.target.value;
        shapeData[shapeDataKeys[i]] = elemNewValue;
        joinShapeDataForTag();
        rerender();
      });

      // add input and set input type
      panelDOM.appendChild(p);
      panelDOM.appendChild(input);
      layerControlPanel.appendChild(panelDOM);
    }
  }

  static #setInputType(svgElemTag) {
    const colorTags = [
      'fill',
      'stroke',
    ];

    for (let i = 0; i < colorTags.length; ++i) {
      if (svgElemTag === colorTags[i]) {
        return 'color';
      }
    }

    return 'text';
  }

  static #createLayer(tag, ind) {
    const layerBox = document.createElement("div");
    layerBox.classList.add("layer");

    const p = document.createElement("p");
    p.innerText = `Layer ${ind + 1}: ${tag.isVisible ? "showed" : "hidden"}`;

    const button = document.createElement("button");
    button.innerText = "toggle";

    const selectButton = document.createElement("button");
    selectButton.innerText = tag.isSelected ? "selected" : "select";

    layerBox.appendChild(p);
    layerBox.appendChild(button);
    layerBox.appendChild(selectButton);

    return [layerBox, button, selectButton];
  }
}

export default RenderToDom;

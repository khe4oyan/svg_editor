import EventsHandlers from "./EventsHandlers.js";
import RenderToDom from "./RenderToDom.js";
import API from "./API.js";

class EditorSVG {
  static #tags = [];
  static #selectedFigureId = null;

  constructor() {
    throw new Error("cant create instance of EditorSVG");
  }

  // main public static method
  static async loadSVG(file) {
    EditorSVG.#tags = await API.svgParsePOST(file.split("\n").join(' '));
    console.log(EditorSVG.#tags);
    const [showHideButtonHandler, selectButtonHandler] = EditorSVG.#createLayerButtonsHandlers();
    document.querySelector(".svg_save_button").removeAttribute("disabled");
    EditorSVG.#rerender(showHideButtonHandler, selectButtonHandler);
  }

  static closeActiveSvg() {
    EditorSVG.#tags = [];
    EditorSVG.#selectedFigureId = null;

    // save button disabled
    document.querySelector(".svg_save_button").setAttribute("disabled", true);

    // reset all DOM elements
    document.querySelector('.uploadedFileBox_svg').innerHTML = "";
    document.querySelector('.uploadedFileBox_points').innerHTML = "";
    document.querySelector('.layersBox').innerHTML = "";
    document.querySelector('.layerControlPanel').innerHTML = "";
  }

  // helper static methods
  static #rerender(showHideButtonHandler, selectButtonHandler) {
    EventsHandlers.clearEventsHandlers();
    RenderToDom.svg(EditorSVG.#tags);
    RenderToDom.layers(
      EditorSVG.#tags,
      showHideButtonHandler,
      selectButtonHandler
    );
    
    if (EditorSVG.#selectedFigureId) {
      RenderToDom.controlPanel(EditorSVG.#tags[EditorSVG.#selectedFigureId], () => {EditorSVG.#rerender(showHideButtonHandler, selectButtonHandler)});
    }
  }

  static #createLayerButtonsHandlers() {
    let selectButtonHandler = null;
    let showHideButtonHandler = null;

    selectButtonHandler = (i) => {
      if (EditorSVG.#selectedFigureId === null) {
        EditorSVG.#selectedFigureId = i;  
        EditorSVG.#tags[i].isSelected = true;
      } else {
        if (EditorSVG.#selectedFigureId === i) {
          EditorSVG.#tags[i].isSelected = false;
          EditorSVG.#selectedFigureId = null;
        } else {
          EditorSVG.#tags[EditorSVG.#selectedFigureId].isSelected = false;
          EditorSVG.#selectedFigureId = i;  
          EditorSVG.#tags[i].isSelected = true;
        }
      }

      EditorSVG.#rerender(showHideButtonHandler, selectButtonHandler);
    };

    showHideButtonHandler = (i) => {
      EditorSVG.#tags[i].isVisible = !EditorSVG.#tags[i].isVisible;
      EditorSVG.#rerender(showHideButtonHandler, selectButtonHandler);
    };

    return [showHideButtonHandler, selectButtonHandler];
  }
}

export default EditorSVG;
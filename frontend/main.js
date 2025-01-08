import EditorSVG from './classes/EditorSVG.js';

const uploadInput = document.getElementById("uploadInput");
const saveAsSvgButton = document.querySelector('.svg_save_button');
saveAsSvgButton.addEventListener("click", async () => {
  const a = document.createElement("a");
  a.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(document.querySelector(".uploadedFileBox_svg").innerHTML));
  a.setAttribute('download', 'svg_result.svg');
  a.click();
});

uploadInput.addEventListener("change", async (e) => {
  const fileInInput = e?.target?.files[0];
  if (fileInInput) {
    const reader = new FileReader();
    reader.readAsText(fileInInput);

    reader.onload = function (e) {
      const file = e.target.result;

      EditorSVG.loadSVG(file);
    }
  } else {
    EditorSVG.closeActiveSvg();
  }
});

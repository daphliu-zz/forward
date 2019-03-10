import { get, set } from "/web_modules/idb-keyval.js";

const container = document.querySelector("#images-container");

const input = document.querySelector(`input[type="file"]`);
input.addEventListener("change", async e => {
  console.log(e.target.files);

  removeChildren(container);

  const arrFiles = Array.from(e.target.files);
  const imageUrls = await Promise.all(
    arrFiles.map(file => {
      let img = document.createElement("img");
      img.height = 100;
      container.appendChild(img);

      return readAsDataURL(file).then(dataUrl => {
        img.src = dataUrl;
        return dataUrl;
      });
    })
  );
  set(e.target.name, imageUrls);
});

async function load() {
  const images = (await get("uploadedImage")) || [];

  for (const dataUrl of images) {
    let img = document.createElement("img");
    img.height = 100;
    img.src = dataUrl;
    container.appendChild(img);
  }
}
load();

function removeChildren(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}

import { get, set, keys } from "./web_modules/idb-keyval.js";

async function load() {
  const inputNames = await keys();

  const data = await Promise.all([
    get("first-name"),
    get("last-name"),
    get("ethnicity"),
    get("sex"),
    get("phone")
  ]);

  document.getElementById("first-name").textContent = data[0];
  document.getElementById("last-name").textContent = data[1];
  document.getElementById("ethnicity").textContent = data[2];
  if (data[3] == "M") {
    document.getElementById("male").textContent = "X";
    document.getElementById("female").textContent = "";
  } else {
    document.getElementById("male").textContent = "";
    document.getElementById("female").textContent = "X";
  }
  window.print();
}
load();

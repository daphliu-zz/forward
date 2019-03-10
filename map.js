import { set } from "./web_modules/idb-keyval.js";

/**
 * @returns {Promise<Position>}
 */
function getCurrentPosition(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

/**
 * @returns {Promise<Array<{ formatted_address: string }>>}
 */
function geocode(options) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(options, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(new Error());
      }
    });
  });
}

const addressResults = document.getElementById("addressResults");
const iframe = document.querySelector("iframe");
iframe.onload = () => {
  const input = iframe.contentDocument.getElementById("pac-input");
  input.addEventListener("change", evt => {
    console.log("Change", evt.target.value);
    addressResults.textContent = evt.target.value;
    set("where", evt.target.value);
  });
};

async function main() {
  const pos = await getCurrentPosition();
  console.log(pos.coords);

  const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  const addressResults = await geocode({ location: latlng });
  console.log(addressResults);
  document.getElementById("addressResults").innerHTML =
    addressResults[1].formatted_address;
}

main();

// @ts-check

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

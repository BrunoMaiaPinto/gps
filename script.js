const KEY = "379fab09c36a4bbd88652d784b68d450";
const btn = document.querySelector(".btn");

async function getCodigoPostal(cp) {
  try {
    const res = await fetch(
      `https://www.cttcodigopostal.pt/api/v1/${KEY}/${cp}`
    );
    const data = await res.json();

    console.log(data);
    if (data.length === 0) {
      document.querySelector(
        ".localizacao"
      ).innerHTML = `<p class='erro'>Código Postal Inválido</p>`;
      return;
    } else {
      data.map(
        ({ morada, freguesia, concelho, distrito, latitude, longitude }) => {
          const link = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          const coords = [latitude, longitude];
          console.log(coords);
          document.querySelector(
            ".localizacao"
          ).innerHTML += `<p>${morada}, ${freguesia}, ${concelho}, ${distrito}. <a class='gps' href=${link} target="_blank">Google Maps</a></p>`;

          const mapContainer = document.getElementById("map");
          if (mapContainer._leaflet_id) {
            mapContainer._leaflet_id = null;
            mapContainer.innerHTML = "";
          }

          const map = L.map("map").setView(coords, 16);

          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          L.marker(coords).addTo(map).bindPopup(morada).openPopup();
        }
      );
    }
  } catch (error) {
    document.querySelector(
      ".localizacao"
    ).innerHTML = `<p class='erro'>Formato Inválido</p>`;
    console.error(error);
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  // document.querySelector(".form").reportValidity();
  document.querySelector(".localizacao").innerHTML = "";
  getCodigoPostal(document.querySelector(".input").value);
});

document.querySelector(".year").innerHTML = `${new Date().getFullYear()}`;

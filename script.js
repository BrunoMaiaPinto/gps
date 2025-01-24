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
          document.querySelector(
            ".localizacao"
          ).innerHTML += `<p>${morada}, ${freguesia}, ${concelho}, ${distrito}. <a class='gps' href=${link} target="_blank">Google Maps</a></p>`;
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
  document.querySelector(".localizacao").innerHTML = "";
  getCodigoPostal(document.querySelector(".input").value);
});

document.querySelector(".year").innerHTML = `${new Date().getFullYear()}`;

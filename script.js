const KEY = "379fab09c36a4bbd88652d784b68d450";
const btn = document.querySelector(".btn");

async function getCodigoPostal(cp) {
  const res = await fetch(`https://www.cttcodigopostal.pt/api/v1/${KEY}/${cp}`);
  const data = await res.json();
  console.log(data);
  data.map(({ morada, freguesia, concelho, distrito, latitude, longitude }) => {
    document.querySelector(
      ".localizacao"
    ).innerHTML = `${morada}, ${freguesia}, ${concelho}, ${distrito},`;

    const link = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    document.querySelector(".gps").setAttribute("href", link);
    document.querySelector(".gps").innerHTML = "Google Maps";
  });
  return data;
}

btn.addEventListener("click", () => {
  getCodigoPostal(document.getElementById("input").value);
});

document.getElementById("year").innerHTML = `${new Date().getFullYear()}`;

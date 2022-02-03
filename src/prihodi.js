import {
  ukupniRashodCifra,
  procenatRashodCifra,
  ukupniRashod,
} from "./rashodi.js";

export let prihodiNiz = [];

const ukupniPrihodCifra = document.querySelector("#ukupniPrihodCifra");
const balans = document.querySelector("#balans");
console.log(balans);

export let ukupniPrihod = 0;
export function izracunajUkupniPrihod() {
  if (prihodiNiz.length == 0) {
    ukupniPrihodCifra.textContent = 0;
    balans.textContent = "- " + ukupniRashod.toLocaleString("en-US");
    procenatRashodCifra.textContent = 100 + "%";
  } else {
    ukupniPrihod = 0;
    prihodiNiz.forEach(function (jedanPrihod) {
      ukupniPrihod += jedanPrihod.iznos;
    });
    ukupniPrihodCifra.textContent = ukupniPrihod.toLocaleString("en-US");
    ukupniRashodCifra.textContent = ukupniRashod.toLocaleString("en-US");
    procenatRashodCifra.textContent =
      Math.round((ukupniRashod / ukupniPrihod) * 100) + "%";
    balans.textContent =
      ukupniPrihod - ukupniRashod >= 0
        ? "+ " + (ukupniPrihod - ukupniRashod).toLocaleString("en-US")
        : (ukupniPrihod - ukupniRashod).toLocaleString("en-US");
  }
  return ukupniPrihod;
}

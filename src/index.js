// importi
import { prihodiNiz, izracunajUkupniPrihod, ukupniPrihod } from "./prihodi.js";
import { rashodiNiz, izracunajUkupniRashod} from "./rashodi.js";
import { dodajTransakcijuNaDom } from "./DodajNaDom.js";

// DOM elementi
export const form = document.querySelector(".form");
export const tipTransakcije = document.querySelector("#tip");
export const opisTransakcije = document.querySelector("#opis");
export const iznos = document.querySelector("#iznos");
export const submitBtn = document.querySelector(".submit");
export const listaPrihoda = document.querySelector(".lista_prihoda");
export const listaRashoda = document.querySelector(".lista_rashoda");
export const alertText = document.querySelector("#alert-text")

// brojaci id-jeva za niz prihoda i niz rashoda
let prihodiCount = 0;
let rashodiCount = 0;

// event listener za submit dugme/formu
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // validacija
  // // ako je unos ispravan
  if (
    tipTransakcije.value != "" &&
    opisTransakcije.value != "" &&
    iznos.value != "" &&
    iznos.value > 0
  ) {
    // objekat transakcija
    let transakcija = {
      id: tipTransakcije.value === "Prihod" ? prihodiCount++ : rashodiCount++,
      tip: tipTransakcije.value,
      opis: opisTransakcije.value,
      iznos: Number(iznos.value),
      procenat: 0,
    };

    // resetovanje forme za unos
    tipTransakcije.value = "";
    opisTransakcije.value = "";
    iznos.value = "";

    // ako je uneta transakcija prihod
    if (transakcija.tip === "Prihod") {
      prihodiNiz.push(transakcija);
      izracunajUkupniPrihod();
      // unos svih prihoda u listu
      listaPrihoda.innerHTML = "";
      prihodiNiz.forEach(function (prihod) {
        dodajTransakcijuNaDom(prihod, listaPrihoda);
      });
      // racunanje procenata za sve rashode
      rashodiNiz.forEach(function (rashod) {
        rashod.procenat = Math.round((rashod.iznos / ukupniPrihod) * 100) + "%";
      });
      // unos svih rashoda u listu
      listaRashoda.innerHTML = "";
      rashodiNiz.forEach(function (rashod) {
        dodajTransakcijuNaDom(rashod, listaRashoda);
      });
    } else {
      // ako je uneta transakcija rashod
      rashodiNiz.push(transakcija);
      izracunajUkupniRashod();
      // unos svih prihoda u listu
      listaPrihoda.innerHTML = "";
      prihodiNiz.forEach(function (prihod) {
        dodajTransakcijuNaDom(prihod, listaPrihoda);
      });
      // racunanje procenata za sve rashode
      rashodiNiz.forEach(function (rashod) {
        rashod.procenat =
          prihodiNiz.length === 0
            ? 100 + "%"
            : Math.round((rashod.iznos / ukupniPrihod) * 100) + "%";
      });
      // unos svih rashoda u listu
      listaRashoda.innerHTML = "";
      rashodiNiz.forEach(function (rashod) {
        dodajTransakcijuNaDom(rashod, listaRashoda);
      });
    }
  } else {
    // ako je unos podataka neispravan
    alertText.textContent = "Neispravan unos. Polje za iznos prima samo brojeve vece od nule.";
    setTimeout(function(){
      alertText.textContent = ""
    }, 5000)
  }
});

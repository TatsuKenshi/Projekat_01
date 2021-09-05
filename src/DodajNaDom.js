// importi
import { prihodiNiz, izracunajUkupniPrihod, ukupniPrihod } from "./prihodi.js";
import { rashodiNiz, izracunajUkupniRashod } from "./rashodi.js";
import { listaPrihoda, listaRashoda } from "./index.js";

// dodaj transakcije na DOM
export function dodajTransakcijuNaDom(transakcija, lista) {
  // ako je transakcija prihod
  if (transakcija.tip === "Prihod") {
    // DOM elementi i unos podataka
    const jedanUnos = document.createElement("div");
    jedanUnos.classList.add("jedanUnos");

    const obrisi = document.createElement("button");
    obrisi.classList.add("obrisi");
    obrisi.textContent = "Obrisi";

    const opisUnosa = document.createElement("p");
    opisUnosa.classList.add("opisUnosa");
    opisUnosa.textContent = transakcija.opis;

    const uDinarima = document.createElement("div");
    uDinarima.classList.add("uDinarima");
    uDinarima.textContent = "+ " + transakcija.iznos.toLocaleString("en-US");

    const linija = document.createElement("hr");

    jedanUnos.append(opisUnosa, obrisi, uDinarima);
    lista.append(jedanUnos, linija);

    // hover eventovi za dugme za brisanje
    jedanUnos.addEventListener("mouseenter", function (e) {
      obrisi.style.display = "inline";
    });
    jedanUnos.addEventListener("mouseleave", function (e) {
      obrisi.style.display = "none";
    });

    // click event za brisanje pojedinacnog unosa
    obrisi.addEventListener("click", function (e) {
      e.preventDefault();
      jedanUnos.remove();
      linija.remove();
      let index = prihodiNiz.findIndex((ajtem) => ajtem.id == transakcija.id);
      prihodiNiz.splice(index, 1);
      console.log(prihodiNiz);

      izracunajUkupniPrihod();
      listaPrihoda.innerHTML = "";
      prihodiNiz.forEach(function (prihod) {
        dodajTransakcijuNaDom(prihod, listaPrihoda);
      });
      console.log(prihodiNiz);
      rashodiNiz.forEach(function (rashod) {
        rashod.procenat = Math.round((rashod.iznos / ukupniPrihod) * 100) + "%";
      });
      listaRashoda.innerHTML = "";
      rashodiNiz.forEach(function (rashod) {
        dodajTransakcijuNaDom(rashod, listaRashoda);
      });
    });
  } else {
    // ako je transakcija rashod
    // DOM elementi i unos podataka
    const jedanUnos = document.createElement("div");
    jedanUnos.classList.add("jedanUnos");

    const obrisi = document.createElement("button");
    obrisi.classList.add("obrisi");
    obrisi.textContent = "Obrisi";

    const opisUnosa = document.createElement("p");
    opisUnosa.classList.add("opisUnosa");
    opisUnosa.textContent = transakcija.opis;

    const uDinarima = document.createElement("div");
    uDinarima.classList.add("uDinarima");
    uDinarima.textContent = "- " + transakcija.iznos.toLocaleString("en-US");

    const uProcentima = document.createElement("div");
    uProcentima.classList.add("uProcentima");
    uProcentima.textContent = transakcija.procenat;

    const linija = document.createElement("hr");

    jedanUnos.append(opisUnosa, obrisi, uDinarima, uProcentima);
    lista.append(jedanUnos, linija);

    // hover eventovi za dugme za brisanje
    jedanUnos.addEventListener("mouseenter", function (e) {
      obrisi.style.display = "inline";
    });
    jedanUnos.addEventListener("mouseleave", function (e) {
      obrisi.style.display = "none";
    });

    // click event za brisanje pojedinacnog unosa
    obrisi.addEventListener("click", function (e) {
      e.preventDefault();
      jedanUnos.remove();
      linija.remove();
      let index = rashodiNiz.findIndex((ajtem) => ajtem.id == transakcija.id);
      rashodiNiz.splice(index, 1);
      console.log(rashodiNiz);

      izracunajUkupniRashod();
      listaPrihoda.innerHTML = "";
      prihodiNiz.forEach(function (prihod) {
        dodajTransakcijuNaDom(prihod, listaPrihoda);
      });
      console.log(rashodiNiz);
      rashodiNiz.forEach(function (rashod) {
        rashod.procenat =
          ukupniPrihod === 0
            ? 100 + "%"
            : Math.round((rashod.iznos / ukupniPrihod) * 100) + "%";
      });
      listaRashoda.innerHTML = "";
      rashodiNiz.forEach(function (rashod) {
        dodajTransakcijuNaDom(rashod, listaRashoda);
      });
    });
  }
}


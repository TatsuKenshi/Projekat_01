import {prihodiNiz, ukupniPrihod} from "./prihodi.js"

export let rashodiNiz = [];

export const ukupniRashodCifra = document.querySelector("#ukupniRashodCifra")
export const procenatRashodCifra = document.querySelector(".procenat_rashod_cifra")
const balans = document.querySelector("#balans")

export let ukupniRashod = 0;
export function izracunajUkupniRashod(){
    ukupniRashod = 0;
    rashodiNiz.forEach(function (jedanRashod){
        ukupniRashod += jedanRashod.iznos
    })

    if(rashodiNiz.length === 0 && prihodiNiz.length !==0 ){
        ukupniRashodCifra.textContent = 0;
        procenatRashodCifra.textContent = 0 + "%"
        balans.textContent = "+ " + ukupniPrihod.toLocaleString("en-US")
    } else if (rashodiNiz.length !== 0 && prihodiNiz.length === 0){
        ukupniRashodCifra.textContent = ukupniRashod.toLocaleString("en-US");
        procenatRashodCifra.textContent = 100 + "%"
        balans.textContent = "- " + ukupniRashod.toLocaleString("en-US")
    } else if (rashodiNiz.length !==0 && prihodiNiz.length !== 0){
        ukupniRashodCifra.textContent = ukupniRashod.toLocaleString("en-US");
        procenatRashodCifra.textContent = Math.round((ukupniRashod / ukupniPrihod) * 100) + "%"
        balans.textContent = (ukupniPrihod - ukupniRashod >=0)? "+ " + (ukupniPrihod - ukupniRashod).toLocaleString("en-US"): (ukupniPrihod - ukupniRashod).toLocaleString("en-US")
    } else if (rashodiNiz.length === 0 && prihodiNiz.length === 0){
        ukupniRashodCifra.textContent = 0;
        procenatRashodCifra.textContent = 0 + "%"
        balans.textContent = "+ " + 0;
    }
    return ukupniRashod;
}
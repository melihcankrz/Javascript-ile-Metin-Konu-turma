const metin = document.querySelector("textarea");
const sesListe = document.querySelector("select");
const donusBtn = document.querySelector("button");

let uret = speechSynthesis;
let konusma = true;

sesler();

function sesler() {
    for(let ses of uret.getVoices()) {
        let secili = ses.name === "Google US English" ? "selected" : "";
        let secenek = `<option value="${ses.name}" ${secili}>${ses.name} (${ses.lang})</option>`;
        sesListe.insertAdjacentHTML("beforeend", secenek);
    }
}

uret.addEventListener("voiceschanged", sesler);

function cevir(text){
    let ifade = new SpeechSynthesisUtterance(text);
    for(let ses of uret.getVoices()){
        if(ses.name === sesListe.value ){
            ifade.voice = ses;
        }
    }
    uret.speak(ifade);
}

donusBtn.addEventListener("click", e => {
    e.preventDefault();
    if(metin.value !== ""){
        if(!uret.speaking){
            cevir(metin.value);
        }
        if(metin.value.length > 80){
            setInterval(() => {
                if(!uret.speaking && !konusma){
                    konusma = true;
                    donusBtn.innerText = "Dönüştür";
                } else{}
            }, 500);
            if(konusma){
                uret.resume();
                konusma = false;
                donusBtn.innerText = "Konuşmayı Durdur";
            } else {
                uret.pause();
                konusma = true;
                donusBtn.innerText = "Konuşmaya Devam Et";
            }
        } else {
            donusBtn.innerText = "Dönüştür";
        }
       
    }
});
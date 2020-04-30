// ==========================================================
//                       DATE & HEURE
// ==========================================================

let heureElt = document.getElementById("heure");
let minutesElt = document.getElementById("minutes");
let dateElt = document.getElementById("dateDay");
let heureReelle = setInterval(affichageHorloge, 1000);

function affichageHorloge() {
  let actualHour = new Date().getHours();
  heureElt.innerHTML = actualHour;
  let actualMinutes = new Date().getMinutes();
  if (actualMinutes < 10) {
    minutesElt.innerHTML = "0" + actualMinutes;
  } else {
    minutes.innerHTML = actualMinutes;
  }
}

const optionsDate = { weekday: "long", month: "long", day: "numeric" };
const today = new Date();
dateElt.innerHTML = today.toLocaleDateString("fr-EU", optionsDate);

// ================================================================================================
// Rappel
// ================================================================================================

// Creation des Elt
let inputRappelElt = document.getElementById("inputRappel"); // Input
let btnValidRappelElt = document.getElementById("btnValidRappel"); // BTN Rappel
let timeRappelElt = document.getElementById("timeRappel"); // p sous Rappel
let imageRappelOnOffElt = document.getElementById("imgRappelOnOff"); // Image de la cloche

// Creation des variables
let alarmOn = false; // Alarme Sonore OFF
let alarmRaz = false; // Rappel non enclenché
let timeAlarmNbr = ""; // Heure de rappel convertie en nbr
let alarmCheck = ""; // setInterval rappel
let alarmAudioOn = ""; // setInterval audio rappel
let bip = new Audio("audio/bip.mp3"); // Audio
let alarmSon = new Audio("audio/alarm.mp3"); // Audio
let timeAlarm = "";
let timeAlarmHour = "";
let timeAlarmMinutes = "";
let actualHour = "";
let actualMinutes = "";

// Declencheur click sur BTN "Rappel" pour VALIDER / RAZ RAPPEL / STOP ALARM
btnValidRappelElt.addEventListener("click", clickRappel);

function clickRappel() {
  if (alarmOn || alarmRaz) {
    razRappel();
  } else {
    testRappelValid();
  }
}

function razRappel() {
  bip.play();
  btnValidRappelElt.innerHTML = "RAPPEL";
  btnValidRappelElt.style.backgroundColor = "";
  heureElt.style.color = "";
  minutesElt.style.color = "";
  alarmOn = false;
  alarmRaz = false;
  timeRappelElt.innerHTML = "";
  imageRappelOnOffElt.innerHTML =
    '<img src="img/alarm.png" alt="Alarm" class="imgRappel">';
  clearInterval(alarmAudioOn);
}

function testRappelValid() {
  timeAlarmNbr = inputRappelElt.valueAsNumber;
  if (isNaN(timeAlarmNbr) && alarmRaz == false) {
    alert("Entrez une heure valide !");
    return;
  } else {
    validHeureRappel();
  }
}

function validHeureRappel() {
  let timeAlarmOnP = inputRappelElt.value;
  timeRappelElt.innerHTML = "Votre rappel est programmé pour: " + timeAlarmOnP;
  imageRappelOnOffElt.innerHTML =
    '<img src="img/alarmOff.png" alt="Alarm" class="imgRappel">';
  btnValidRappelElt.innerHTML = "RAZ RAPPEL";
  alarmRaz = true;
  inputRappelElt.value = "";
  enterHeuresRappelActuel();
  if (timeAlarmHour < actualHour) {
    alertHeureRappelNonValid();
  } else if (timeAlarmHour == actualHour && timeAlarmMinutes <= actualMinutes) {
    alertHeureRappelNonValid();
  } else {
    alarmCheck = setInterval(checkAlarm, 1000);
  }
}

function enterHeuresRappelActuel() {
  timeAlarm = new Date(timeAlarmNbr);
  timeAlarmHour = new Date(timeAlarm).getUTCHours();
  timeAlarmMinutes = new Date(timeAlarm).getMinutes();
  actualHour = new Date().getHours();
  actualMinutes = new Date().getMinutes();
}

function checkAlarm() {
  actualHour = new Date().getHours();
  actualMinutes = new Date().getMinutes();
  if (timeAlarmHour == actualHour && timeAlarmMinutes == actualMinutes) {
    afichageAlarmOn();
  }
}

function afichageAlarmOn() {
  btnValidRappelElt.innerHTML = "STOP ALARM";
  btnValidRappelElt.style.backgroundColor = "red";
  heureElt.style.color = "red";
  minutesElt.style.color = "red";
  timeRappelElt.innerHTML = "";
  alarmOn = true;
  clearInterval(alarmCheck);
  alarmAudioOn = setInterval(alarmMusiqueOn, 1000);
}

function alertHeureRappelNonValid() {
  alert("L'heure de rappel n'est pas valide !");
  razRappel();
}

function alarmMusiqueOn() {
  alarmSon.play();
}

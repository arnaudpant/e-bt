// ==========================================================
//                       FIA
// ==========================================================

// Selection des Elements
let btnValiderElt = document.getElementById("btnFia");
let numAvionElt = document.getElementById("input-avion");
let numFiaElt = document.getElementById("input-fia");
let hourFhElt = document.getElementById("input-fh");
let nbrAttElt = document.getElementById("input-att");
let nbrLctElt = document.getElementById("input-lct");
let hourGtrElt = document.getElementById("input-gtr");
let listFiaElt = document.getElementById("listFia");

// Déclaration des variables
let numLi = 0;
let listeMirage = [];

// Micro
btnValiderElt.addEventListener("click", clickBtnFia);

// ==========================================================
// Local Storage
// get item from localstorage
let dataFia = localStorage.getItem("FIASTORAGE");

// check if data is not empty
if (dataFia) {
  LISTFIA = JSON.parse(dataFia);
  numLi = LISTFIA.length; // set the id to the last one in the list
  loadListFia(LISTFIA); // load the list to the user interface
} else {
  // if data isn't empty
  LISTFIA = [];
  numLi = 0;
}

// load items to the user's interface
function loadListFia(arrayFia) {
  arrayFia.forEach(function (newLi) {
    createFIA(
      newLi.numLi,
      newLi.numAvion,
      newLi.numFia,
      newLi.hourFh,
      newLi.nbrAtt,
      newLi.nbrLct,
      newLi.hourGtr
    );
  });
}

// ==========================================================
// Function clic sur BTN VALIDER FIA
function clickBtnFia() {
  let numAvion = numAvionElt.value;
  let numFia = numFiaElt.value;
  let hourFh = hourFhElt.value;
  let nbrAtt = nbrAttElt.value;
  let nbrLct = nbrLctElt.value;
  let hourGtr = hourGtrElt.value;
  if (numAvion) {
    createFIA(numLi, numAvion, numFia, hourFh, nbrAtt, nbrLct, hourGtr);
    LISTFIA.push({
      numLi: numLi,
      numAvion: numAvion,
      numFia: numFia,
      hourFh: hourFh,
      nbrAtt: nbrAtt,
      nbrLct: nbrLct,
      hourGtr: hourGtr,
    });
    // add item to localstorage
    localStorage.setItem("FIASTORAGE", JSON.stringify(LISTFIA));
    numLi++;
  } else {
    alert("Entrez un numéro d'avion");
  }
  numAvionElt.value = "";
  numFiaElt.value = "";
  hourFhElt.value = "";
  nbrAttElt.value = "";
  nbrLctElt.value = "";
  hourGtrElt.value = "";
}
// Function pour création d'une nouvelle ligne Li
function createFIA(numLi, numAvion, numFia, hourFh, nbrAtt, nbrLct, hourGtr) {
  const newLi = `<li class="liCenter" id="${numLi}">
                  <div class="col-1">
                    <p class="h6">${numAvion}</p>
                  </div>
                  <div class="col-1">
                    <p class="h6">${numFia}</p>
                  </div>
                  <div class="col-2">
                    <p class="h6">${hourFh}</p>
                  </div>
                  <div class="col-1">
                    <p class="h6">${nbrAtt}</p>
                  </div>
                  <div class="col-1">
                    <p class="h6">${nbrLct}</p>
                  </div>
                  <div class="col-2">
                    <p class="h6">${hourGtr}</p>
                  </div>
                  <div class="col-2">
                    <p class="h6" id='fia'>FIA</p>
                  </div>
                  <div class="col-1" id="poubelleParent">
                    <img src="img/trash.png" id="poubelle" />
                  </div>
                </li>
  `;

  let positionLi = "beforeend";
  listFiaElt.insertAdjacentHTML(positionLi, newLi);
}

// Micro pour case FIA ou ATAMS + poubelle
listFiaElt.addEventListener("click", function (event) {
  let liFiaClick = event.target;
  let typeLiFiaClick = liFiaClick.attributes.id.value;
  if (typeLiFiaClick == "fia") {
    liFiaClick.textContent = "ATAMS";
    liFiaClick.attributes.id.value = "atams";
  }
  if (typeLiFiaClick == "atams") {
    liFiaClick.textContent = "FIA";
    liFiaClick.attributes.id.value = "fia";
  }
  if (typeLiFiaClick == "poubelle") {
    liFiaClick.parentNode.parentNode.parentNode.removeChild(
      liFiaClick.parentNode.parentNode
    );
  }
  if (typeLiFiaClick == "poubelleParent") {
    liFiaClick.parentNode.parentNode.removeChild(liFiaClick.parentNode);
  }
  localStorage.setItem("FIASTORAGE", JSON.stringify(LISTFIA));
});

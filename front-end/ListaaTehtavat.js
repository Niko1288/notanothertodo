// tässä haetaan kaikki tekemättömät tehtävät sivulle, sivun latauksen yhteydessä
$(function () {
    var $lista = $("#myUL");
    var baseurl = 'http://localhost:3000/taskit';

    function haekaikki() {
        fetch(baseurl)
            .then(function (tulokset) {
                return tulokset.json();
            })
            .then(function (taulukko) {
                for (var i = 0; i < taulukko.length; i++) {
                    var notes = taulukko[i];
                    console.log(notes);
                    newElement(notes);
                }
            })
    }
    haekaikki();
});


// funktio lähettää datan mongoon aina kun lisätään uusi tehtävä
function uusiTehtava() {
    var XHR = new XMLHttpRequest();

    var lahetettavadata = {
        title: document.getElementById('myInput').value,
        done: false
    }

    XHR.onreadystatechange = function () {
        console.log("DBG", XHR.readyState);
        if (XHR.readyState === 4) {
            console.log(XHR.statusText);
            if (XHR.status === 200) {
                console.log("vastaus", XHR.responseText);
                newElement(JSON.parse(XHR.responseText));
            }
        }
    }
    // Tapahtuu, jos tulee virhe
    XHR.addEventListener('error', function (event) {
        alert('jotain meni vikaan lähetettäessä.');
    });
    // Tehdään pyyntö
    XHR.open('POST', 'http://localhost:3000/taskit');
    // Lisää pyydetyn HTTP headerin formi tiedolle POST-pyynnön yhteydessä
    XHR.setRequestHeader('Content-Type', 'application/json');
    // Lopulta lähettää datan
    XHR.send(JSON.stringify(lahetettavadata));


}

// lisää HTML sivulle uuden tehtäväelementin
function newElement(uusi) {
    var li = document.createElement("li");
    var inputValue = uusi.title;
    var t = document.createTextNode(inputValue);
    var myUL = document.getElementById("myUL");
    var valmisteht = document.createElement("span");
    myUL.appendChild(li);
    li.appendChild(valmisteht);
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    var tieto = document.createElement("input")
    tieto.setAttribute("type", "hidden");
    tieto.value = uusi._id;
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    valmisteht.appendChild(t);

    trash.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";

    }

    span.onclick = function () {
        poistaTehtava(uusi._id);
        myUL.removeChild(li);
    }
    // tässä lisätään done t-elementtiin
    valmisteht.onclick = function (ev) {
        ev.target.classList.toggle('checked');
        merkkaaValmiiksi(uusi._id);
        console.log("onko merkattu", uusi._id);

    }

}

// luodaan funktio, joka poistaa tehtävän id:llä
function poistaTehtava(_id) {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
        console.log("DBG", XHR.readyState);
        if (XHR.readyState === 4) {
            console.log(XHR.statusText);
            if (XHR.status === 200) {
                console.log("vastaus", XHR.responseText);
            }
        }
    }
    XHR.addEventListener('error', function (event) {
        alert('jokin meni vikaan, ei voitu poistaa');
    });
    XHR.open('DELETE', 'http://localhost:3000/taskit/' + _id);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send();
}


// Luodaan "poista" button ja lisätään se jokaiseen lista-elementtiin
var lista = document.getElementsByTagName("LI");
var i;
for (i = 0; i < lista.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "trash";
    span.appendChild(txt);
    lista[i].appendChild(span);
}

// klikkaa trash nappulaa listaelementin piilottamiseksi
var trash = document.getElementsByClassName("close");
var i;
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
        poistaTehtava(_id);

    }
}


// funktio, joka merkkaa tapahtuman valmiiksi id:llä
function merkkaaValmiiksi(_id) {
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', function (event) {
        alert('Mahtavaa, homma hanskassa! Muista palkita itsesi kaljalla koska perjantai!');
    });

    var lahetettavadata2 = {
        done: true
    }
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            if (XHR.status === 200) {
            }
        }
    }
    XHR.open('PUT', 'http://localhost:3000/taskit/' + _id);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(lahetettavadata2));
}




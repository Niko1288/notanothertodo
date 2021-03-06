
// tässä haetaan kaikki sivulle onload
$(function () {
    var $lista = $("#myUL");
    var baseurl = 'http://localhost:3000/taskit/valmiit';

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
    // Define what happens on successful data submission
    XHR.addEventListener('load', function (event) {
        alert('Yeah! lähettetty on!.');
    });
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
    XHR.addEventListener('error', function (event) {
        alert('ei voitu lisätä');
    });
    // Set up our request
    XHR.open('POST', 'http://localhost:3000/taskit');
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/json');
    // Finally, send our data.
    XHR.send(JSON.stringify(lahetettavadata));


}

// lisää HTML sivulle uuden tehtäväpalkin
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
        alert('Oops! Something goes wrong.');
    });
    XHR.open('DELETE', 'http://localhost:3000/taskit/' + _id);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send();
}

var lista = document.getElementsByTagName("LI");
var i;
for (i = 0; i < lista.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "trash";
    span.appendChild(txt);
    lista[i].appendChild(span);
}

var trash = document.getElementsByClassName("close");
var i;
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
        poistaTehtava(_id);

    }
}


function merkkaaValmiiksi(_id) {
    var XHR = new XMLHttpRequest();
    var lahetettavadata2 = {
        done: true
    }
    XHR.onreadystatechange = function () {
        console.log("DBG", XHR.readyState);
        if (XHR.readyState === 4) {
            console.log(XHR.statusText);
            if (XHR.status === 200) {
                console.log("vastaus", XHR.responseText);
                // newElement(JSON.parse(XHR.responseText));
            }
        }
    }
    XHR.open('PUT', 'http://localhost:3000/taskit/' + _id);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(lahetettavadata2));
}

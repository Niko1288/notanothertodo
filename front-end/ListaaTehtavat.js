// function reqlistener () {
//     console.log(this.responseText);
// }
//
// var oreq = new XMLHttpRequest();
// oreq.addEventListener("load", reqlistener);
// oreq.open("GET", "http://localhost:3000/notes");
// oreq.send();


// tässä haetaan kaikki sivulle onload
$(function() {

    var $lista = $("#myUL");
    var baseurl = 'http://localhost:3000/notes';

    function haekaikki() {
        console.log("jotain");
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
        alert('Yeah! Data sent and response loaded.');
    });
    var lahetettavadata = {
        title: document.getElementById('myInput').value,
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
    // Define what happens in case of error
    XHR.addEventListener('error', function (event) {
        alert('Oops! Something goes wrong.');
    });
    // Set up our request
    XHR.open('POST', 'http://localhost:3000/notes');
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
    myUL.appendChild(li);
    li.appendChild(t);
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    var tieto = document.createElement("input")
    tieto.setAttribute("type", "hidden");
    tieto.value = uusi._id;
    span.className = "trash";
    span.appendChild(txt);
    li.appendChild(span);

        trash.onclick = function ()  {
            var div = this.parentElement;
            div.style.display = "none";

    }

    span.onclick = function () {
        poistaTehtava(uusi._id);
        myUL.removeChild(li);
    }

}


/////////////////////////////////////



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
    XHR.open('DELETE', 'http://localhost:3000/notes/' + _id);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send();
}


// Luodaan "poista" button and append it to each list item
var lista = document.getElementsByTagName("LI");
var i;
for (i = 0; i < lista.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "trash";
    span.appendChild(txt);
    lista[i].appendChild(span);
}

// Click on a trash button to hide the current list item
var trash = document.getElementsByClassName("trash");
var i;
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
        poistaTehtava(_id);

    }
}


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            merkkaaValmiiksi();
        }
    },
    false);


function merkkaaValmiiksi(_id) {
    // funktio joka käyttää update
    var XHR = new XMLHttpRequest();
    // Define what happens on successful data submission
    XHR.addEventListener('load', function (event) {
        alert('Yeah! Data sent and response loaded.');
    });

    var lahetettavadata2 = {
        done: true
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
    // Define what happens in case of error
    XHR.addEventListener('error', function (event) {
        alert('Oops! Something goes wrong.');
    });
    // Set up our request
    XHR.open('PUT', 'http://localhost:3000/notes/' + _id);
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/json');
    // Finally, send our data.
    XHR.send(JSON.stringify(lahetettavadata2));
}


//////////////////////////

// funktio jota kutsumalla haetaan kaikki tehtävät tietokannasta
//
// function haeKaikki() {
//     var XHR = new XMLHttpRequest();
//     XHR.onreadystatechange = function () {
//         console.log("DBG", XHR.readyState);
//         if (XHR.readyState === 4) {
//             console.log(XHR.statusText);
//             if (XHR.status === 200) {
//                 console.log("vastaus", XHR.responseText);
//                 newElement(JSON.parse(XHR.responseText));
//             }
//         }
//     }
//     XHR.open('GET', 'http://localhost:3000/notes');
//     XHR.setRequestHeader('Content-Type', 'application/json');
//     XHR.send();
//     newElement();
// }



// login formi
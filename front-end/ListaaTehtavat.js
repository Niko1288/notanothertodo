
// luodaan uusi listaelementti, aina kun klikataan lisäys nappulaa
function uusiElementti() {
        var XHR = new XMLHttpRequest();
        // Define what happens on successful data submission
        XHR.addEventListener('load', function(event) {
            alert('Yeah! Data sent and response loaded.');
            });
        var lahetettavadata = {
        title: document.getElementById('myInput').value,
        content: 'placeholder'
    }
    XHR.onreadystatechange = function() {
    console.log("DBG", XHR.readyState);
    if (XHR.readyState===4) {
        console.log(XHR.statusText);
        if(XHR.status === 200) {
            console.log("vastaus", XHR.responseText);
        }
    }
}
        // Define what happens in case of error
        XHR.addEventListener('error', function(event) {
            alert('Oops! Something goes wrong.');
        });
        // Set up our request
        XHR.open('POST', 'http://localhost:3000/notes');
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/json');
    // Finally, send our data.
        XHR.send(JSON.stringify(lahetettavadata));

}



// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
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
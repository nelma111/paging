$(document).ready(function () {
    var mainVal = localStorage.getItem("selVal"); //nimmt den Parameter der auf edit.html ausgewählt worden ist in eine Variabel
    var currentfield = 1; //Definiert welches Feld ausgewählt ist
    var numFields = JSON.parse(localStorage.getItem("Q" + mainVal)); //liest die Felder aus mit der Variabel von Oben
    textinput();
    textinput2();
    IsStartCheck();

    //Gibt den Titel des Themas an
    //Falls kein Titel vorhanden ist wird die Nummer und ". Thema" angezeigt also z.B.: 8. Thema

    function textinput() {
        var texttest = document.getElementById("textvalue");
        var valval = localStorage.getItem(mainVal);
        if (valval != null) {
            texttest.value = mainVal + ". " + valval;
        } else {
            texttest.value = mainVal + ". Thema";
        }
    }

    //Gibt den Inhalt der Ausgewählten Feld an
    //Falls kein Feld existiert kommt eine Meldung, dass es noch keine Felder zu diesem Thema gibt

    function textinput2() {
        var u = currentfield;
        var p = u - 1;
        var texttest2 = document.getElementById("textvalue2");
        if (numFields == null) {
            texttest2.value = "Es ist noch kein Inhalt unter diesem Thema :("
        } else {
            var valtest = localStorage.getItem("W" + mainVal + "N" + numFields[p]);
            texttest2.value = numFields[p] + ". " + valtest;
        }
    }

    //Wenn man ">" drückt wird das Feld neu geladen (siehe textinput2())
    //Die Gegenfunktione zu Unten

    $("#next").click(function () {
        currentfield++;
        textinput2();
        IsStartCheck();
    });

    //Wenn man ">" drückt wird das Feld neu geladen (siehe textinput2())
    //Die Gegenfunktione zu Oben
    
    $("#previous").click(function () {
        currentfield--;
        IsStartCheck();
        textinput2();
    });

    //Verwalten die einzelnen Einträge, die unter einem Thema existieren
    //Liest die Länge des Arrays von Oben und disabelt den Button, je nach zutreffenden Fall

    function IsStartCheck() {
        if (numFields == null) {
            $('#next').prop('disabled', true);
            $('#previous').prop('disabled', true);
        } else {
            var numberOfFields = numFields.length;
            if (currentfield == 1) {
                $('#previous').prop('disabled', true);
            }
            else {
                $('#previous').prop('disabled', false);
            }
            if (currentfield == numberOfFields) {
                $('#next').prop('disabled', true);
            }
            else {
                $('#next').prop('disabled', false);
            }
        }
    }

    //Der Zurück-Button bringt einen wieder auf die edit-Seite, wo man ein anderes Thema auswählen kann

    $("#backToEdit").click(function () {
            localStorage.removeItem("selVal");
            window.location.href = './edit.html';
    });
});

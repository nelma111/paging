$(document).ready(function () {
    var currentPage = 1; //definiert auf welcher Seite die Buttons sind z.B. (1 = 1-6/ 1 = 7-12)
    var activeSlot = 0;
    var ClickedButtonVal = 0;
    SetCurrentSlotActiv();
    CheckValue();
    IsStartCheck();
    textinput();

    //Wird aktiviert, wenn ein Button angechlickt wird
    //setzt die Value von "ClickedButtonVal" auf den Wert des Themas

    $(".pagingSlot").click(function () {
        ClickedButtonVal = $(this).val();
        activeSlot = ClickedButtonVal;
        $(this).addClass("clickedOnSlot2");
        CheckValue();
        SetCurrentSlotActiv();
        textinput();
    });

    //Check jeden Button Welche Bedingungen zutreffen
    //Eigentlich ist es eine Vereinfachung der Funktion die im Bearbeitungsfenster gibt

    function CheckValue() {
        $(".pagingSlot").each(function () {
            var q = $(this).val();
            var buttonVal = localStorage.getItem(q);
            var writeButtonVal = localStorage.getItem("Q" + q);

            if ((buttonVal == null) && ( writeButtonVal == null)) { //Wenn das Thema weder Inhalt noch Titel hat
               $(this)
                .removeClass("btn-success")
                .removeClass("activeBtn")

                .addClass("btn-light")

                .prop('disabled', true);
               ;
            } else {
                $(this)
                .removeClass("btn-light")

                .addClass("activeBtn")
                .addClass("btn-success")

                .prop('disabled', false);
                ;
            }
        });
    }

    //Prüft welches Feld das angechlickt wurde und ändert die Schrift auf rot
    //Bei allen andern wir die Schrift auf schwarz gesetzt

    function SetCurrentSlotActiv() {
        $(".pagingSlot2, .pagingSlot").each(function () {

            if ($(this).val() == activeSlot) {
               $(this)
                .removeClass("text-dark")

                .addClass("activeSlot")
                .addClass("text-danger")
                ;
            } else {
                $(this)
                .removeClass("activeSlot")
                .removeClass("text-danger")

                .addClass("text-dark")
                ;

            }

        });
    }

    //Gibt den Titel des Themas unterhalb der aufgeführten Nummern
    //Falls kein Titel vorhanden aber Context wird die Nummer und ". Thema" angezeigt also z.B.: 8. Thema
    //Wenn gar kein Thema ausgewählt ist, also auf 0 wird ein lehres Feld angezeigt

    function textinput() {
        var valtest = localStorage.getItem(ClickedButtonVal);
        var texttest = document.getElementById("textvalue");
        if (ClickedButtonVal == 0) {
            texttest.value = "";
        } else {
            if (valtest == null) {
                texttest.value = ClickedButtonVal + ". Thema";
            } else {
                texttest.value = valtest;
            }
        }
    }

    //wenn ein Thema ausgewählt wurde wird die Value des ausgewählten Thema in den LocalStorage gespeichert
    //Falls kein Thema ausgewählt wurde kommt eine Fehlermeldung

    $("#selectValue").click(function () {
        if (ClickedButtonVal != 0) {
            localStorage.setItem("selVal", ClickedButtonVal);
            window.location.href = './anzeige.html';
        } else {
            alert("Kein Thema ausgewählt");
        }
    });

    //Wählt mit jQuery den ">"-Button aus und führt die Funktion NextFunction() aus

    $("#next").click(function () {
        NextFunction();
    });

    //Wählt mit jQuery den "<"-Button aus und führt die Funktion NextFunction() aus

    $("#previous").click(function () {
        PrevFunction();
    });

    //Schreibt jede Zahl um, sodass die Zahl um 6 erhöht werden, um auf die nächsten Themen zugreifen zu können

    function NextFunction() {
        currentPage++;
        $(".pagingSlot").each(function () {
            var e = $(this).val();
            var numbere = Number(e);
            numbere = numbere + 6;
            e.id = e;
            $(this).text(numbere);
            $(this).val(numbere);
        });
        prevnext();
    }

    //Schreibt jede Zahl um, sodass die Zahl um 6 verringert werden, um auf die vorherigen Themen zugreifen zu können

    function PrevFunction() {
        currentPage--;
        $(".pagingSlot").each(function () {
            var e = $(this).val();
            var numbere = Number(e);
            numbere = numbere - 6;
            e.id = e;
            $(this).text(numbere);
            $(this).val(numbere);
        });
        prevnext();
    }

    //Lädt die Buttons neu, sodass die Values und Farben auf die Themen zutreffen
    //Zusätzlich wird das ausgewählte Feld auf 0 resettet

    function prevnext() {
        ClickedButtonVal = 0;
        activeSlot = ClickedButtonVal;
        textinput();
        IsStartCheck();
        CheckValue();
        SetCurrentSlotActiv();
        CheckActiveBtn();
    }

    //Verwalten die "<" und ">" Buttons
    //Deaktiviert sie, nach fünf Seiten à sechs Werte von insgesamt 30 möglichen Themen (5*6)

    function IsStartCheck() {
        if (currentPage == 1) {
            $('#previous').prop('disabled', true);
        }
        else {
            $('#previous').prop('disabled', false);
        }
        if (currentPage == 5) {
            $('#next').prop('disabled', true);
        }
        else {
            $('#next').prop('disabled', false);
        }
    }
});

    $(document).ready(function () {
        var currentPage2 = 1;
        var activeSlot2 = 1;
        var ClickedButtonVal = 1;
        var ClickedButtonVal2 = 0;
        var currentPage = 1;
        SetCurrentSlotActiv2();
        CheckValue();
        CheckActiveBtn();
        IsStartCheck();
        IsStartCheck2();
        textinput();
        textinput2();

        $(".pagingSlot2").click(function () {
            ClickedButtonVal = $(this).val();
            activeSlot2 = ClickedButtonVal;
            $(this).addClass("clickedOnSlot2");
            UpdateString();
            CheckValue();
            SetCurrentSlotActiv2();
            IsStartCheck2();
            textinput();
            CheckActiveBtn();
            ClickedButtonVal2 = 0;
            SetCurrentSlotActiv();
            hasActiveSlot();
            textinput2();
            getfocus1();
        });

        $("#textvalue").on('change keydown paste input', function(){
            var txtval = document.getElementById("textvalue");
            if (ClickedButtonVal == 0) {
                localStorage.removeItem(0);
                alert("Es ist keine Kategorie ausgewählt");
                textinput();
            } else {
                if (txtval && ClickedButtonVal) {
                    localStorage.setItem(ClickedButtonVal, txtval.value);
                }
            }
            CheckValue();
        });

        $(".pagingSlot").click(function () {
            if (ClickedButtonVal == 0) {
                alert("Es ist keine Kategorie ausgewählt 2");
                textinput2();
                SetCurrentSlotActiv();
                CheckActiveBtn();
                hasActiveSlot();
                IsStartCheck();
                getfocus2();
            } else {
                ClickedButtonVal2 = $(this).val();
                textinput2();
                SetCurrentSlotActiv();
                CheckActiveBtn();
                hasActiveSlot();
                IsStartCheck();
                getfocus2();
            }
        });

        $("#textvalue2").on('input', function(){
            var txtval2 = document.getElementById("textvalue2");
            if (ClickedButtonVal2 == 0) {
                alert("Es ist kein Feld ausgewählt");
                textinput2();
            } else {
                if (txtval2 && ClickedButtonVal && ClickedButtonVal2) {
                    localStorage.setItem("W" + ClickedButtonVal + "N" + ClickedButtonVal2, txtval2.value);
                }
                var deleteBtn = localStorage.getItem("W" + ClickedButtonVal + "N" + ClickedButtonVal2);
                if (deleteBtn == "") {
                    localStorage.removeItem("W" + ClickedButtonVal + "N" + ClickedButtonVal2);
                }
            }
            UpdateString();
            CheckActiveBtn();
            hasActiveSlot();
            CheckValue();
        });

        function UpdateString() {
            var getArry = [];
            for (var u = 1; u < 21 ; u++) {
                var getLocStore = localStorage.getItem("W" + ClickedButtonVal + "N" + u);
                if (getLocStore != null) {
                    var uNum = u.toString();
                    getArry.push(uNum);
                }
            }
            if (getArry == "") {
                localStorage.removeItem("Q" + ClickedButtonVal);
            } else {
                localStorage.setItem("Q" + ClickedButtonVal, JSON.stringify(getArry));
            }
        }

        function getfocus1() {
            document.getElementById("textvalue").focus();
          }

        function getfocus2() {
            document.getElementById("textvalue2").focus();
        }

            function textinput2() {
            var valtest2 = localStorage.getItem("W" + ClickedButtonVal + "N" + ClickedButtonVal2);
            var texttest2 = document.getElementById("textvalue2");
                texttest2.value = valtest2;
            }

        function textinput() {
            var valtest = localStorage.getItem(ClickedButtonVal);
            var texttest = document.getElementById("textvalue");
                texttest.value = valtest;
        }

        function hasActiveSlot() {
            $(".pagingSlot").each(function () {
                if (($(this).hasClass("activeSlot")) && ($(this).hasClass("isinArray"))) {
                    $(this)
                    .removeClass("btn-light")
                    .removeClass("btn-danger")

                    .addClass("text-danger")
                    ;
                } else if ($(this).hasClass("activeSlot")) {
                    $(this)
                    .removeClass("btn-light")
                    .removeClass("text-danger")

                    .addClass("btn-danger")
                    ;
                } else {
                    $(this)
                    .removeClass("btn-danger")
                    .removeClass("text-danger")
                    ;
                }
            });
        }

        function CheckActiveBtn() {
            var activeArrBtn = [];
            for (var u = 1; u < 21 ; u++) {
                var getLocStore = localStorage.getItem("W" + ClickedButtonVal + "N" + u);
                if (getLocStore != null) {
                    var uNum = u.toString();
                    activeArrBtn.push(uNum);
                }
            }
            if (activeArrBtn === null){
                $(".pagingSlot").each(function () {
                    $(this)
                    .removeClass("btn-info")
                    .removeClass("isinArray")

                    .addClass("btn-light")
                    ;
                });
            } else{
                $(".pagingSlot").each(function () {
                    if (activeArrBtn.includes($(this).val())) {
                        $(this)
                        .removeClass("btn-light")

                        .addClass("btn-info")
                        .addClass("isinArray")
                        ;
                    } else {
                        $(this)
                        .removeClass("btn-info")
                        .removeClass("isinArray")

                        .addClass("btn-light")
                        ;
                    }
                });
            }
    }

        function SetCurrentSlotActiv() {
            $(".pagingSlot").each(function () {
                if ($(this).val() == ClickedButtonVal2) {
                    if ($(this).hasClass("activeSlot")){
                        $(this)
                        .removeClass("activeSlot")
                        ;
                        ClickedButtonVal2 = 0;
                    } else {
                        $(this)
                        .addClass("activeSlot")
                        ;
                    }
                } else {
                    $(this)
                    .removeClass("activeSlot")
                    ;
                }
            });
        }

        function CheckValue() {
            $(".pagingSlot2").each(function () {
                var q = $(this).val();
                var buttonVal = localStorage.getItem(q);
                var writeButtonVal = localStorage.getItem("Q" + q);

                if (((buttonVal == null) || (buttonVal == "")) && (writeButtonVal == null)) {
                    $(this)
                    .removeClass("btn-success")
                    .removeClass("btn-primary")
                    .removeClass("btn-warning")
                    .removeClass("clickedOnSlot2")

                    .addClass("btn-light")
                    ;
                } else if (((buttonVal == null) || (buttonVal == "")) && !(writeButtonVal == null)) {
                    $(this)
                    .removeClass("btn-success")
                    .removeClass("btn-primary")
                    .removeClass("clickedOnSlot2")
                    .removeClass("btn-light")

                    .addClass("btn-warning")
                    ;
                } else if (!((buttonVal == null) || (buttonVal == "")) && (writeButtonVal == null)) {
                    $(this)
                    .removeClass("btn-light")
                    .removeClass("btn-primary")
                    .removeClass("btn-warning")

                    .addClass("clickedOnSlot2")
                    .addClass("btn-success")
                    ;
                } else if (!((buttonVal == null) || (buttonVal == "")) && !(writeButtonVal == null)) {
                    $(this)
                    .removeClass("btn-success")
                    .removeClass("btn-light")
                    .removeClass("btn-warning")

                    .addClass("clickedOnSlot2")
                    .addClass("btn-primary")
                    ;
                }                
                if (buttonVal == "") {
                    localStorage
                    .removeItem(q)
                    ;
                }
            });
        }

        function SetCurrentSlotActiv2() {
            $(".pagingSlot2").each(function () {

                if ($(this).val() == activeSlot2) {
                    $(this)
                    .removeClass("text-dark")

                    .addClass("activeSlot2")
                    .addClass("text-danger")
                    ;
                } else {
                    $(this)
                    .removeClass("activeSlot2")
                    .removeClass("text-danger")

                    .addClass("text-dark")
                    ;

                }

            });
        }

        $("#Download").click(function () {
            var filename = "notizbuch.json";

            var filetext = [];
            for(var i=0, len=localStorage.length; i<len; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                    filetext.push(key);
                    filetext.push(value);
            }
            var myJSON = JSON.stringify(filetext)

            var file = new Blob([myJSON], {type: 'text/json'});
            if (window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveOrOpenBlob(file, filename);
            else {
                var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        });

        $("#import").click(function () {
            var r = confirm("Bist du sicher?\nAlle doppelten Einträge werden überschrieben");
            if (r == true) {
                var files = document.getElementById('selectFiles').files;
                if (files.length <= 0) {
                    return false;
                }
                var fr = new FileReader();
                fr.onload = function(e) {
                var result = JSON.parse(e.target.result);
                if (result.length % 2 == 0){
                    for(var l=0, rLen=result.length; l<rLen; l += 2) {
                        var test;
                        test = l+1;
                            localStorage.setItem(result[l], result[test]);
                }
                UpdateString();
                CheckValue();
                CheckActiveBtn();
                SetCurrentSlotActiv2();
            }

          }
        
          fr.readAsText(files.item(0));
        }
        });

        $("#Clear").click(function () {
            localStorage.clear();
            CheckValue(activeSlot2);
            CheckActiveBtn();
            ClickedButtonVal2 = 0;
            SetCurrentSlotActiv();
            hasActiveSlot();
            textinput();
            textinput2();
        });

        /*
        ******************************************************************

        Switching Sites

        ******************************************************************
        */

        $("#next2").click(function () {
            NextFunction2();
        });

        $("#previous2").click(function () {
            PrevFunction2();
        });

        function NextFunction2() {
            currentPage2++;
            $(".pagingSlot2").each(function () {
                var e = $(this).val();
                var numbere = Number(e);
                numbere = numbere + 3;
                e.id = e;
                $(this).text(numbere);
                $(this).val(numbere);
            });
            prevnext2();
        }

        function PrevFunction2() {
            currentPage2--;
            $(".pagingSlot2").each(function () {
                var e = $(this).val();
                var numbere = Number(e);
                numbere = numbere - 3;
                e.id = e;
                $(this).text(numbere);
                $(this).val(numbere);
            });
            prevnext2();
        }

        function prevnext2() {
            ClickedButtonVal = 0;
            activeSlot2 = 0;
            textinput();
            IsStartCheck2();
            CheckValue();
            SetCurrentSlotActiv2();
            CheckActiveBtn();
        }

        function IsStartCheck2() {
            if (currentPage2 == 1) {
                $('#previous2').prop('disabled', true);
            }
            else {
                $('#previous2').prop('disabled', false);
            }
            if (currentPage2 == 10) {
                $('#next2').prop('disabled', true);
            }
            else {
                $('#next2').prop('disabled', false);
            }
        }

        $("#next").click(function () {
            NextFunction();
        });

        $("#previous").click(function () {
            PrevFunction();
        });

        function NextFunction() {
            currentPage++;
            $(".pagingSlot").each(function () {
                var e = $(this).val();
                var numbere = Number(e);
                numbere = numbere + 10;
                e.id = e;
                $(this).text(numbere);
                $(this).val(numbere);
            });
            prevnext();
        }

        function PrevFunction() {
            currentPage--;
            $(".pagingSlot").each(function () {
                var e = $(this).val();
                var numbere = Number(e);
                numbere = numbere - 10;
                e.id = e;
                $(this).text(numbere);
                $(this).val(numbere);
            });
            prevnext();
        }

        function prevnext() {
            IsStartCheck();
            ClickedButtonVal2 = 0;
            SetCurrentSlotActiv();
            CheckActiveBtn();
            hasActiveSlot();
            textinput2();
        }

        function IsStartCheck() {
            if (currentPage == 1) {
                $('#previous').prop('disabled', true);
            }
            else {
                $('#previous').prop('disabled', false);
            }
            if (currentPage == 2) {
                $('#next').prop('disabled', true);
            }
            else {
                $('#next').prop('disabled', false);
            }
        }
    });   
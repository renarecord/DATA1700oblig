function skjulFeilmelding(id) {
    $(`#${id}`).css("display", "none");

}

function validerInput(billett, endre) {
    let gyldigInput = true;
    if (billett.film == "Velg film her") {
        if (endre) {
            $(`#film-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#film-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!billett.film) {
        if (endre) {
            $(`#filmTomt-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#filmTomt-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (billett.antall < 1) {
        if (endre) {
            $(`#antall-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#antall-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }

    if (!billett.antall) {
        if (endre) {
            $(`#antallTomt-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#antallTomt-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!billett.fornavn) {
        if (endre) {
            $(`#fornavnTomt-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#fornavnTomt-feilmelding").css("display", "block");
            gyldigInput = false;
        }

    }
    if (!isNaN(billett.fornavn)) {
        if (endre) {
            $(`#fornavn-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#fornavn-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!billett.etternavn) {
        if (endre) {
            $(`#etternavnTomt-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#etternavnTomt-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!isNaN(billett.etternavn)) {
        if (endre) {
            $(`#etternavn-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#etternavn-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!billett.telefonnr) {
        if (endre) {
            $(`#telefonnrTomt-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#telefonnrTomt-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (billett.telefonnr.length != 8) {
        if (endre) {
            $(`#telefonnr-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#telefonnr-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!billett.epost) {
        if (endre) {
            $(`#epostTomt-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#epostTomt-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    if (!billett.epost.match(/[a-zA-Z0-9-]@[a-zA-Z0-9-]+.[a-zA-Z]/)) {
        if (endre) {
            $(`#epost-feilmelding-${billett.id}`).css("display", "block");
            gyldigInput = false;
        } else {
            $("#epost-feilmelding").css("display", "block");
            gyldigInput = false;
        }
    }
    return gyldigInput;
}
function regBillett() {
    const billett = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val(),
    };

    const gyldigInput = validerInput(billett);

    if (gyldigInput) {
        $.post("/lagre", billett, function () {
            hentAlle();

        });
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

    }
}

function oppdaterBillett(billett) {
    const gyldigInput = validerInput(billett,true);
    if (gyldigInput) {
        $.post("/oppdater", billett, function () {
            hentAlle();
        });
    }
}

function slettBillett(billett) {
    $.post("/slett", billett, function () {
        hentAlle();
    });
}

function validerFornavn() {
    const fornavn = $("#fornavn").val();
    const regexp = /^[a-zåøæA-Zåøæ. \-]{2,20}/;

    
}

function hentAlle() {
    $.get("/hentAlle", function (biletter) {
        formaterData(biletter);
    });
}

function formaterData(billetter) {
    let ut = `<table>
                        <tr>
                            <th>Film</th>
                            <th>Antall</th>
                            <th>Fornavn</th>
                            <th>Etternavn</th>
                            <th>Telefonnr</th>
                            <th>Epost</th>
                            <th></th>
                            <th></th>
                        </tr>`;
    for (const b of billetter) {
        ut += `<tr>
                 <td>
                    <select id="rediger-film-${b.id}" type="text" onfocus="skjulFeilmelding('film-feilmelding-${b.id}')" oninput="skjulFeilmelding('filmTomt-feilmelding-${b.id}'")>
                        <option ${b.film === 'Wonka' ? 'selected' : ''}>Wonka</option>
                        <option ${b.film === 'Kung Fu Panda' ? 'selected' : ''}>Kung Fu Panda</option>
                        <option ${b.film === 'Dune' ? 'selected' : ''}>Dune</option>
                        <option ${b.film === 'Ilbelin' ? 'selected' : ''}>Ilbelin</option>
                        <option ${b.film === 'Perfect Days' ? 'selected' : ''}>Perfect Days</option>
                    </select>
                    <p id="film-feilmelding-${b.id}" style="color: red; display: none">Må velg film</p>
                    <p id="filmTomt-feilmelding-${b.id}" style="color: red; display: none">Må velg film</p>
                 </td>
                 <td>
                    <input id="antall-${b.id}" type="number" value="${b.antall}" onfocus="skjulFeilmelding('antall-feilmelding-${b.id}')"
                           oninput="skjulFeilmelding('antallTomt-feilmelding-${b.id}')">               
                    <p id="antall-feilmelding-${b.id}" style="color: red; display: none">Antall må være større en null</p>
                    <p id="antallTomt-feilmelding-${b.id}" style="color: red; display: none">Må velg antall</p>
                 </td>
                 <td>
                    <input id="fornavn-${b.id}" type="text" value="${b.fornavn}" onfocus="skjulFeilmelding('fornavn-feilmelding-${b.id}')" oninput="skjulFeilmelding('fornavnTomt-feilmelding-${b.id}')">
                    <p id="fornavn-feilmelding-${b.id}" style="color: red; display: none" >Bruk kun bokstaver for fornavn</p>
                    <p id="fornavnTomt-feilmelding-${b.id}" style="color: red; display: none" >Skriv inn fornavn</p> 
                 </td>
                 <td>
                    <input id="etternavn-${b.id}" type="text" value="${b.etternavn}" onfocus="skjulFeilmelding('etternavn-feilmelding-${b.id}')" oninput="skjulFeilmelding('etternavnTomt-feilmelding-${b.id}')">
                    <p id="etternavn-feilmelding-${b.id}" style="color: red; display: none">Bruk kun bokstaver for etternavn</p>
                    <p id="etternavnTomt-feilmelding-${b.id}" style="color: red; display: none">Skriv inn etternavn</p>
                 </td>       
                 <td>
                    <input id="telefonnr-${b.id}" type="number" value="${b.telefonnr}" onfocus="skjulFeilmelding('telefonnr-feilmelding-${b.id}')" oninput="skjulFeilmelding('telefonnrTomt-feilmelding-${b.id}')">
                    <p id="telefonnr-feilmelding-${b.id}" style="color: red; display: none">Bruk kun 8 siffer tall</p>
                    <p id="telefonnrTomt-feilmelding-${b.id}" style="color: red; display: none">Skriv inn telefonnr</p>  
                 </td>
                 <td>
                    <input id="epost-${b.id}" type="text" value="${b.epost}" onfocus="skjulFeilmelding('epost-feilmelding-${b.id}')" oninput="skjulFeilmelding('epostTomt-feilmelding-${b.id}')">
                    <p id="epost-feilmelding-${b.id}" style="color: red; display: none" >Bruk glydig epost</p>
                    <p id="epostTomt-feilmelding-${b.id}" style="color: red; display: none" >Skriv inn epost</p>     
                 </td>
                 <td>
                    <button class="btn btn-primary" onclick="oppdaterBillett({
                    id: ${b.id}, 
                    film: $('#rediger-film-${b.id}').val(),
                    antall: $('#antall-${b.id}').val(),
                    fornavn: $('#fornavn-${b.id}').val(),
                    etternavn: $('#etternavn-${b.id}').val(),  
                    telefonnr: $('#telefonnr-${b.id}').val(),
                    epost: $('#epost-${b.id}').val()    
                 })">Endre</button>
                 </td><td><button class="btn btn-primary" onclick="slettBillett({
                    id: ${b.id}  
                 })">Slett</button>
                 </td>
                </tr>`;
    }
    ut += "</table></form>";
    $("#alleBilletter").html(ut);
}

function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle();
    });
}

hentAlle();




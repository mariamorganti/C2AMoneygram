var objSmistatore = null
var objSmistatoreStampa = null
var oReceivePreviewObject = null
var oReceiveObject = null
var oStatesObject = null
var objFocus = null
var lastObjFocus
var restartLevel = 0
var ESCenabled = true
var previewValues = ""
var flgCancellaMessaggio = true
var flgDdlClick = false
var flgWorking = false
var flgDatiTransWorking = false
var flgFocus = true
document.onselectstart = new Function("if(flgFocus==true){objSmistatore.Visualizza_Msg('')}; return false")
document.ondragstart = new Function("discardEvent(event);  return false;")
document.onclick = onClickDocument = new Function("discardEvent(event); return false")
function window:: onunload() {
    createCookie("SessionStatus", "", -1)
    return true
}
function discardEvent(evt) {
    evt.cancelBubble = true
    evt.returnValue = false
}
function init() {
    objSmistatore.Visualizza_Msg("restart level : " + restartLevel)
    document.frmReceive.TxtSmistatore.useService("./../../LocalServices/cReceivePreviewWebService.asmx?wsdl", "ReceivePreview")
    document.frmReceive.TxtSmistatore.useService("./../../LocalServices/cStateWebService.asmx?wsdl", "State")
    document.frmReceive.TxtSmistatore.useService("./../../LocalServices/cCountryWebServices.asmx?wsdl", "Country")
    document.frmReceive.TxtSmistatore.useService("./../../LocalServices/cReceiveWebService.asmx?wsdl", "Receive")
    document.frmReceive.TxtSmistatore.useService("./../../LocalServices/cReceiveRestartXMLWebService.asmx?wsdl", "RestartXML")
    document.frmReceive.TxtSmistatore.useService("./../../LocalServices/cPTConfirmWebService.asmx?wsdl", "PTConfirm")
    if (restartLevel > 0) {
        InputParam.style.visibility = 'hidden'
        document.getElementById("Label2").innerHTML = "Restart Ricezione MoneyGram ** Risposta dal C.N. **"
        document.getElementById("Label2").style.visibility = 'visible'
        OutputParam1.style.visibility = 'visible'
        disableFields(true)
        if (restartLevel < 4)
            objSmistatore.Visualizza_Msg("Attendere elaborazione in corso... ")
    } else {

    }
    //alert(restartLevel)
    switch (restartLevel) {
        case 0:
            frmReceive.style.display = ''
            document.getElementById("TxtCodRif").focus()

            if (isComplianceEnabled(objSmistatore, "MGRC")) {
                xmlCompliance = caricaSessionePresentatore();
                if (xmlCompliance.getElementsByTagName("Presentatore")[0] == null) { //blocco per compliance assente        
                    objSmistatore.Visualizza_Msg(MSG.mgr_presentatore_bloccante, 8);
                    window.navigate("./../../exitnok.aspx");
                }
                var tipoDoc = arrMapDocCompliance[xmlCompliance.getElementsByTagName("Presentatore")[0].getElementsByTagName("TD")[0].childNodes[0].nodeValue];
                if (tipoDoc != "") {
                    // nn fare nulla
                } else {
                    objSmistatore.Visualizza_Msg(MSG.mgr_doc_novalid, 8);
                    window.navigate("./../../exitnok.aspx");
                }
            } else {
                document.getElementById("LblPresentatore").style.visibility = 'hidden';
                document.getElementById("TxtPresentatore").style.visibility = 'hidden';
            }


            break
        case 1:
            setTimeout("invokePtReceive();", 200)
            break
        case 2:
            if (scriviDatiContabili() == true) {
                frmReceive.style.display = ''
                setTimeout("invokePTConfirm(true);", 200)
            }
            break
        case 3:
            setTimeout("ScriviGDFAndComplete();", 200)
            break
        case 4:
            frmReceive.style.display = ''
            setTimeout("invokePTConfirm(true);", 25)
            break
    }
}
function leggiDatiTransazione() {
    flgDatiTransWorking = true
    var bRCSmistatore
    try {
        bRCSmistatore = objSmistatore.Leggi_Dati_Transazione(document.getElementById("TxtSmistatore").value)
    }
    catch (exception) {
        if (exception.description != null)
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Leggi_Dati_Transazione~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante l'invocazione del metodo Leggi_Dati_Transazione")
        return false
    }
    //alert(bRCSmistatore)
    if (!bRCSmistatore) {
        objSmistatore.Leggi_Errore(objSmistatore.strXMLDocRitorno)
        document.getElementById("TxtSmistatore").value = objSmistatore.strXMLDocRitorno
        var descrErr = objSmistatore.strDescErrRitorno
        var codErr = objSmistatore.strCodErrRitorno
        descrErr = "(" + descrErr + " - " + codErr + ")"
        codErr = "S007 - Errore nel caricamento dei dati della transazione "
        objSmistatore.Visualizza_Msg(codErr + ' - ' + descrErr, 8)
        window.navigate("./../../exitnok.aspx")
        return false
    }
    document.getElementById("TxtSmistatore").value = objSmistatore.strXMLDocRitorno
    flgDatiTransWorking = false
    return true
}
function ScriviGDFAndComplete() {
    scriviGiornaleDiFondo()
    frmReceive.style.display = ''
    setTimeout("invokePTConfirm(true);", 25)
}
function DisableAlfaKeys() {
    if (FireSpecialKeys() == true) {
        discardEvent(event)
        return
    }
    if (FireFunctionKeys() == true) {
        discardEvent(event)
        return
    }
    if (event.keyCode == 46) {
        HandleCancelKey()
    }
    if (event.keyCode == 9 || event.keyCode == 35) {
        discardEvent(event)
        //20130122- Risoluzione defect SDP00103017 - INIZIO
        //commento la IF e lascio l'istruzione di focus()
        //if(document.getElementById("TxtCodRif").value != "")
        //{
        document.getElementById("txtComando").focus()
        //}
        //20130122- Risoluzione defect SDP00103017 - FINE
        return
    }
    if (event.altKey) {
        if (((event.keyCode >= 37) && (event.keyCode <= 40)) || (event.keyCode == 27)) {
            discardEvent(event)
            return
        }
    }
    if (event.keyCode > 95 && event.keyCode < 106)
        event.keyCode -= 48
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 8 && event.keyCode != 27 && event.keyCode != 37 && event.keyCode != 39) {
        discardEvent(event)
    }
}
function onKeyPressEvent() {
    if (flgWorking != false || flgDatiTransWorking != false) {
        discardEvent(event)
        return
    }
    if (event.keyCode >= 128 ||
        event.keyCode == 92 ||
        event.keyCode == 34 ||
        event.keyCode == 94 ||
        event.keyCode == 123 ||
        event.keyCode == 125 ||
        event.keyCode == 91 ||
        event.keyCode == 93 ||
        event.keyCode == 60 ||
        event.keyCode == 62) {
        discardEvent(event)
    }
    return keyToUpperCase(this, event)
}
function keyToUpperCase(field, evt) {
    if (document.all) {
        var c = event.keyCode
        var C = String.fromCharCode(c).toUpperCase().charCodeAt()
        event.keyCode = C
        return true
    }
    return true
}
function fnTrapKeys() {
    var key = event.keyCode
    if (flgWorking != false || flgDatiTransWorking != false) {
        discardEvent(event)
        return
    }
    if (FireSpecialKeys() == true) {
        discardEvent(event)
        return
    }
    if (FireFunctionKeys() == true) {
        discardEvent(event)
        return
    }
    if (event.srcElement.readOnly == true || event.srcElement.disabled == true) {
        discardEvent(event)
        return
    }
    if (event.altKey) {
        if ((key >= 37 && key <= 40) || key == 27) {
            discardEvent(event)
            return
        }
    }
    if (key == 9) {
        if (event.shiftKey) {
            if (event.srcElement.id == "TxtNumDocumento") {
                discardEvent(event)
                if (frmReceive.TxtDestAddress.readOnly == false) {
                    if (frmReceive.DdlDestState.disabled == false) {
                        frmReceive.DdlDestState.focus()
                    }
                    else {
                        frmReceive.DdlDestCountry.focus()
                    }
                }
                else {
                    document.getElementById("txtComando").focus()
                }
                return
            }
            if (event.srcElement.id == "TxtDestCodFiscale") {
                discardEvent(event)
                document.getElementById("txtComando").focus()
                return
            }
        }
    }
    if (key == 35) {
        discardEvent(event)
        document.getElementById("txtComando").focus()
    }
    if (key >= 112 && key <= 123) {
        discardEvent(event)
        lastObjFocus.focus()
    }
    if (key == 8) {
        if (event.srcElement.type != "text") {
            discardEvent(event)
            lastObjFocus.focus()
        }
    }
    if (key == 46) {
        HandleCancelKey()
    }
    if (key == 27) {
        discardEvent(event)
        if (ESCenabled == true) {
            if (objSmistatore == null)
                createSmistatore()
            var ret = objSmistatore.Visualizza_Msg("Confermi l'uscita?", 2003)
            if (ret == 1) {
                if (restartLevel != 0) {
                    try {
                        bRCSmistatore = objSmistatore.Cancella_Restart(document.getElementById("txtSmistatore").value)
                    }
                    catch (exception) {
                        if (exception.description != null)
                            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Cancella_Restart~Eccezione: " + exception.description)
                        else
                            window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante l'invocazione del metodo Cancella_Restart")
                        return false
                    }
                }
                window.navigate("./../../exitnok.aspx")
            }
            else {
                try {
                    lastObjFocus.focus()
                }
                catch (exception) {
                }
            }
        }
    }
}
function HandleCancelKey() {
    var strCtrlName = event.srcElement.name
    if (strCtrlName == 'DdlTipoDocumento' ||
        strCtrlName == 'DdlStatoRilascio' ||
        strCtrlName == 'DdlPaeseRilascio') {
        document.getElementById(strCtrlName).selectedIndex = 0
    }
    if (strCtrlName != 'DdlTipoDocumento' &&
        strCtrlName != 'UctrlDataRilascioDocum:TxtDate' &&
        strCtrlName != 'UctrlDestDataNascita:TxtDate' &&
        strCtrlName != 'DdlStatoRilascio' &&
        strCtrlName != 'DdlPaeseRilascio' &&
        strCtrlName != '' &&
        strCtrlName != null) {
        document.getElementById(strCtrlName).value = ''
    }
}
function fnTextOnBlur() {
    event.srcElement.style.backgroundColor = "white"
}
function fnTextOnFocus() {
    lastObjFocus = event.srcElement
    event.srcElement.style.backgroundColor = "yellow"
}
function fnTextDestOnFocus() {
    if (event.srcElement.readOnly == false) {
        lastObjFocus = event.srcElement
        event.srcElement.style.backgroundColor = "yellow"
    }
    else {
        focusController()
        discardEvent(event)
    }
}
function fnTextDestOnBlur() {
    if (event.srcElement.readOnly == false) {
        event.srcElement.style.backgroundColor = "white"
    }
}
function createSmistatore() {
    if (objSmistatore != null)
        return
    try {
        objSmistatore = SmistatoreContabile(false)
    }
    catch (exception) {
        window.navigate("./../../Error.aspx?err=Errore nella creazione dello Smistatore Contabile&techerr=" + exception.description)
        return false
    }
    return true
}
function txtComandoOnfocus() {
    objSmistatore.Visualizza_Msg("Comando?")
}
function txtComandoOnKeyDown() {
    if (FireSpecialKeys() == true) {
        discardEvent(event)
        return
    }
    if (FireFunctionKeys() == true) {
        discardEvent(event)
        return
    }
    if (flgWorking != false || flgDatiTransWorking != false) {
        discardEvent(event)
        return
    }
    if (event.altKey == true) {
        discardEvent(event)
    }
    if (event.keyCode >= 112 && event.keyCode <= 123) {
        discardEvent(event)
        document.getElementById("TxtComando").focus()
    }
    if (event.keyCode == 9) {
        if (oReceivePreviewObject == null)
            document.getElementById("TxtCodRif").focus()
        else {
            if (!event.shiftKey) {
                if (document.getElementById("TxtDestAddress").readOnly == false) {
                    //document.getElementById("TxtDestAddress").focus()
                    document.getElementById("TxtDestCodFiscale").focus()
                }
                else {
                    document.getElementById("TxtNumDocumento").focus()
                }
            }
            else {
                if (document.getElementById("DdlStatoRilascio").disabled == false)
                    document.getElementById("DdlStatoRilascio").focus()
                else
                    document.getElementById("DdlPaeseRilascio").focus()
            }
        }
        objSmistatore.Visualizza_Msg("")
        discardEvent(event)
    }
    if (event.keyCode == 13) {
        //alert(oReceivePreviewObject)
        flgWorking = true
        flgFocus = false
        if (oReceivePreviewObject == null) {
            if (document.getElementById("TxtCodRif").value.length == 8) {
                document.getElementById("TxtCodRif").disabled = true
                objSmistatore.Visualizza_Msg("Attendere...Operazione in corso")
                flgCancellaMessaggio = false
                if (leggiDatiTransazione()) {
                    if (CodiceFaseOK())	// fix defect SDP00110392 
                        invokePtReceivePreview()
                }
            }
            else {
                objSmistatore.Visualizza_Msg("Codice riferimento errato.", 1)
                document.getElementById("TxtCodRif").focus()
                flgWorking = false
                flgFocus = true
            }
        }
        else {
            checkAndGo()
        }
        flgCancellaMessaggio = true
    }
}


//MEV 115957 - Controllo inserimento caratteri non numerici
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


function checkAndGo() {
    objSmistatore.Visualizza_Msg("Attendere...Operazione in corso")
    if (validateForm()) {
        disableFields(true)
        frmReceive.style.display = 'none'
        invokePtReceiveRestart()
    }
}
function invokePtReceivePreview() {
    var oCall = new Object()
    oCall.funcName = "GetReceivePreviewDetails"
    oCall.timeout = 190
    var strXML = document.frmReceive.TxtSmistatore.value
    var strCodRif = document.frmReceive.TxtCodRif.value
    flgWorking = true
    document.frmReceive.TxtSmistatore.ReceivePreview.callService(showResultsReceivePreview, oCall, escape(strXML), strCodRif)
}
function invokePtCountry() {
    var oCall = new Object()
    flgCancellaMessaggio = false
    oCall.funcName = "GetCountries"
    oCall.timeout = 190
    flgWorking = true
    document.frmReceive.TxtSmistatore.Country.callService(showResultsCountry, oCall)
}
function invokePtReceive() {
    var oCall = new Object()
    flgCancellaMessaggio = false
    oCall.funcName = "GetReceiveDetails"
    oCall.timeout = 190
    var strXML = document.frmReceive.TxtSmistatore.value
    flgWorking = true
    document.frmReceive.TxtSmistatore.Receive.callService(showResultsReceive, oCall, escape(strXML),
        document.getElementById("TxtRefNumber").value, escape(frmReceive.TxtNumDocumento.value), frmReceive.DdlTipoDocumento.value, escape(frmReceive.TxtEnteEmittente.value),
        document.getElementById("UctrlDataRilascioDocum:TxtDate").value, frmReceive.DdlPaeseRilascio.value,
        frmReceive.DdlStatoRilascio.value, previewValues)
}
function invokePTState() {
    var oCall = new Object()
    oCall.funcName = "GetStateDetails"
    oCall.timeout = 190
    document.frmReceive.TxtSmistatore.State.callService(showResultsStates, oCall)
}
function invokePtReceiveRestart() {
    var xmlSmistatore = escape(document.getElementById("TxtSmistatore").value)
    var sNames = createNamesString()
    var sValues = escape(createValuesString())
    previewValues = escape(preparePreviewValues())
    var oCall = new Object()
    oCall.timeout = 120
    oCall.funcName = "GetReceiveRestartXML"
    oCall.async = "false"
    document.frmReceive.TxtSmistatore.RestartXML.callService(showResultsReceiveRestart, oCall, xmlSmistatore, sValues, sNames, previewValues)
}
function invokePTConfirm(bStatus) {
    var xmlSmistatore = escape(document.getElementById("TxtSmistatore").value)
    var oCall = new Object()
    oCall.timeout = 120
    oCall.funcName = "Confirm"
    oCall.async = "false"
    document.frmReceive.TxtSmistatore.PTConfirm.callService(showResultsPTConfirm, oCall, bStatus, restartLevel, xmlSmistatore)
}
function showResultsReceivePreview(methodResult) {
    //alert("showResultsReceivePreview")
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cReceivePreviewWebService")
    }
    else {
        oReceivePreviewObject = methodResult.value
        if (oReceivePreviewObject.ErrorType != "") {
            if (oReceivePreviewObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oReceivePreviewObject.ErrorMessage, oReceivePreviewObject.ErrorType, "invokePtReceivePreview()")
                oReceivePreviewObject = null
            }
            return
        }
    }

    if (oReceivePreviewObject.transactionStatus == "RECVD") {
        fnNotAvailable()
        return
    }

    if (oReceivePreviewObject.requiredFields == true) {
        //alert("showResultsReceivePreview1")
        frmReceive.TxtDestCity.tabIndex = "7"
        frmReceive.TxtDestCity.style.backgroundColor = "white"
        frmReceive.TxtDestCity.style.color = "black"
        frmReceive.TxtDestCity.style.borderColor = "red"
        frmReceive.TxtDestCap.tabIndex = "6"
        frmReceive.TxtDestCap.style.backgroundColor = "white"
        frmReceive.TxtDestCap.style.color = "black"
        frmReceive.TxtDestCap.style.borderColor = "red"
        frmReceive.TxtDestAddress.tabIndex = "5"
        frmReceive.TxtDestAddress.style.backgroundColor = "white"
        frmReceive.TxtDestAddress.style.color = "black"
        frmReceive.TxtDestAddress.style.borderColor = "red"

        frmReceive.TxtDestCodFiscale.tabIndex = "2"
        frmReceive.TxtDestCodFiscale.style.backgroundColor = "white"
        frmReceive.TxtDestCodFiscale.style.color = "black"
        frmReceive.TxtDestCodFiscale.style.borderColor = "red"

        //MEV 115957 VBERTO
        frmReceive.TxtTelefono.tabIndex = "10"
        frmReceive.TxtTelefono.style.backgroundColor = "white"
        frmReceive.TxtTelefono.style.color = "black"
        frmReceive.TxtTelefono.style.borderColor = "red"
    }
    else {
        //alert("showResultsReceivePreview2")
        frmReceive.TxtDestCity.readOnly = true
        frmReceive.TxtDestCap.readOnly = true
        frmReceive.TxtDestAddress.readOnly = true
        frmReceive.DdlDestCountry.readOnly = true
        frmReceive.DdlDestState.readOnly = true
        frmReceive.DdlDestState.style.color = "Blue"
        frmReceive.DdlDestCountry.disabled = true
        frmReceive.DdlDestState.disabled = true
        frmReceive.TxtDestCodFiscale.disabled = true
        frmReceive.DdlDestNazioneNascita.readOnly = true
        frmReceive.DdlDestNazioneNascita.disabled = true

        //MEV 115957 V.BERTO
        frmReceive.TxtTelefono.disabled = true
        frmReceive.DdlScopoTransazione.readOnly = true
        frmReceive.DdlRelazioneMittente.readOnly = true
        frmReceive.DdlScopoTransazione.disabled = true
        frmReceive.DdlRelazioneMittente.disabled = true
    }
    frmReceive.TxtMittente.value = oReceivePreviewObject.senderLastName + " " + oReceivePreviewObject.senderFirstName
    frmReceive.TxtDataInvio.value = oReceivePreviewObject.dateTimeSent
    frmReceive.TxtTransStatus.value = oReceivePreviewObject.transactionStatus
    frmReceive.TxtRefNumber.value = oReceivePreviewObject.referenceNumber
    if (oReceivePreviewObject.receiverLastName2 == "" || oReceivePreviewObject.receiverLastName2 == null)
        frmReceive.TxtDestinatario.value = oReceivePreviewObject.receiverLastName + " " + oReceivePreviewObject.receiverFirstName
    else
        frmReceive.TxtDestinatario.value = oReceivePreviewObject.receiverLastName + " " + oReceivePreviewObject.receiverLastName2 + " " + oReceivePreviewObject.receiverFirstName
    frmReceive.TxtDestAddress.value = oReceivePreviewObject.receiverAddress
    frmReceive.TxtDestCap.value = oReceivePreviewObject.receiverZipCode
    frmReceive.TxtDestCity.value = oReceivePreviewObject.receiverCity
    frmReceive.TxtImportoInvio.value = oReceivePreviewObject.receiveAmount
    frmReceive.TxtMessaggio.value = oReceivePreviewObject.messageField1 + " " + oReceivePreviewObject.messageField2
    for (j = 0; j < oReceivePreviewObject.LTCode.length;
        j++) {
        op = document.createElement("<option>")
        op.text = oReceivePreviewObject.LTDescription[j]
        op.value = oReceivePreviewObject.LTCode[j]
        frmReceive.DdlTipoDocumento.add(op)
    }

    invokePtCountry()
}
function showResultsCountry(methodResult) {
    //alert("showResultsCountry")
    var oCountryObject = null
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cCountryWebServices")
        return
    }
    else {
        oCountryObject = methodResult.value
        if (oCountryObject.ErrorType != "") {
            if (oCountryObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oCountryObject.ErrorMessage, oCountryObject.ErrorType, "invokePtCountry()")
            }
            return
        }
    }
    if (frmReceive.TxtDestAddress.readOnly == false) {
        op1 = document.createElement("<option>")
        op1.text = "Elenco Paesi (selezionarne uno)"
        op1.value = ""
        frmReceive.DdlDestCountry.add(op1)
        frmReceive.DdlDestState.disabled = true
        op2 = document.createElement("<option>")
        op2.text = "Elenco Paesi (selezionarne uno)"
        op2.value = ""
        frmReceive.DdlDestNazioneNascita.add(op2)
    }
    for (j = 0; j < oCountryObject.CountryCode.length;
        j++) {
        op = document.createElement("<option>")
        op.text = oCountryObject.CountryName[j]
        op.value = oCountryObject.CountryCode[j]
        frmReceive.DdlPaeseRilascio.add(op)
        if (frmReceive.TxtDestAddress.readOnly == false) {
            op1 = document.createElement("<option>")
            op1.text = oCountryObject.CountryName[j]
            op1.value = oCountryObject.CountryCode[j]
            frmReceive.DdlDestCountry.add(op1)
            op2 = document.createElement("<option>")
            op2.text = oCountryObject.CountryName[j]
            op2.value = oCountryObject.CountryCode[j]
            frmReceive.DdlDestNazioneNascita.add(op2)
        }
    }
    invokePTState()
}
function showResultsStates(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cStateWebService")
    }
    else {
        oStatesObject = methodResult.value
        if (oStatesObject.ErrorType != "") {
            if (oStatesObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oStatesObject.ErrorMessage, oStatesObject.ErrorType, "invokePTState()")
            }
            return
        }
    }
    InputParam.style.visibility = "hidden"
    OutputParam1.style.visibility = 'visible'
    flgWorking = false
    if (frmReceive.TxtDestCodFiscale.readOnly == false) {
        frmReceive.TxtDestCodFiscale.focus()
    }
    else {
        frmReceive.TxtNumDocumento.focus()
    }
    if (frmReceive.TxtDestAddress.readOnly == false) {
        frmReceive.DdlDestCountry.tabIndex = "5"
        frmReceive.DdlDestCountry.style.backgroundColor = "white"
        frmReceive.DdlDestCountry.style.color = "black"
        document.getElementById("LblCircleDestCountry").style.visibility = 'visible'
        frmReceive.DdlDestState.tabIndex = "6"
        frmReceive.DdlDestState.style.color = "Black"

        frmReceive.DdlDestNazioneNascita.disabled = false
        frmReceive.DdlDestNazioneNascita.tabIndex = "2"
        frmReceive.DdlDestNazioneNascita.style.backgroundColor = "white"
        frmReceive.DdlDestNazioneNascita.style.color = "black"
        document.getElementById("LblCircleDestNazioneNascita").style.visibility = 'visible'


        frmReceive.DdlScopoTransazione.disabled = false
        frmReceive.DdlScopoTransazione.tabIndex = "11"
        frmReceive.DdlScopoTransazione.style.backgroundColor = "white"
        frmReceive.DdlScopoTransazione.style.color = "black"
        document.getElementById("LblCircleScopoTransazione").style.visibility = 'visible'

        frmReceive.DdlRelazioneMittente.disabled = false
        frmReceive.DdlRelazioneMittente.tabIndex = "12"
        frmReceive.DdlRelazioneMittente.style.backgroundColor = "white"
        frmReceive.DdlRelazioneMittente.style.color = "black"
        document.getElementById("LblCircleRelazioneMittente").style.visibility = 'visible'

    }
    setTimeout("objSmistatore.Visualizza_Msg('');", 25)
    flgCancellaMessaggio = true
    flgFocus = true

    //controllo congruenza nome/cognome beneficiario
    var xmlCompliance = caricaSessionePresentatore();
    var presentatore = null;

    if (xmlCompliance != null) {
        presentatore = xmlCompliance.getElementsByTagName("Presentatore")[0];

        if (presentatore != null) {
            document.frmReceive.TxtDestCodFiscale.value = presentatore.getElementsByTagName("CF")[0].childNodes[0].nodeValue;
            document.frmReceive.TxtDestCodFiscale.disabled = 'true';
            if (presentatore.getElementsByTagName("DN")[0].childNodes[0] != null) {
                document.frmReceive.UctrlDestDataNascita_TxtDate.value = presentatore.getElementsByTagName("DN")[0].childNodes[0].nodeValue;
                document.frmReceive.UctrlDestDataNascita_TxtDate.disabled = 'true';
            }
            if (presentatore.getElementsByTagName("IR")[0].childNodes[0] != null) {
                document.frmReceive.TxtDestAddress.value = presentatore.getElementsByTagName("IR")[0].childNodes[0].nodeValue;
                document.frmReceive.TxtDestAddress.disabled = 'true';
            }
            if (presentatore.getElementsByTagName("CAR")[0].childNodes[0] != null) {
                document.frmReceive.TxtDestCap.value = presentatore.getElementsByTagName("CAR")[0].childNodes[0].nodeValue;
                document.frmReceive.TxtDestCap.disabled = 'true';
            }
            if (presentatore.getElementsByTagName("CR")[0].childNodes[0] != null) {
                document.frmReceive.TxtDestCity.value = presentatore.getElementsByTagName("CR")[0].childNodes[0].nodeValue;
                document.frmReceive.TxtDestCity.disabled = 'true';
            }

            document.frmReceive.TxtNumDocumento.value = presentatore.getElementsByTagName("ND")[0].childNodes[0].nodeValue;
            document.frmReceive.TxtNumDocumento.disabled = 'true';
            document.frmReceive.TxtEnteEmittente.value = presentatore.getElementsByTagName("ER")[0].childNodes[0].nodeValue;
            document.frmReceive.TxtEnteEmittente.disabled = 'true';
            document.frmReceive.UctrlDataRilascioDocum_TxtDate.value = presentatore.getElementsByTagName("DR")[0].childNodes[0].nodeValue;
            document.frmReceive.UctrlDataRilascioDocum_TxtDate.disabled = 'true';

            var tipoDoc = arrMapDocCompliance[presentatore.getElementsByTagName("TD")[0].childNodes[0].nodeValue];
            if (tipoDoc != "") {
                document.frmReceive.DdlTipoDocumento.value = tipoDoc;
                document.frmReceive.DdlTipoDocumento.disabled = 'true';
            } /*else {
                objSmistatore.Visualizza_Msg(MSG.mgr_doc_novalid, 8);
                window.navigate("./../../exitnok.aspx");
            }*/

            /*document.frmReceive.DdlTipoDocumento.value = arrMapDocCompliance[presentatore.getElementsByTagName("TD")[0].childNodes[0].nodeValue];
            document.frmReceive.DdlTipoDocumento.disabled = 'true';*/

            //focus sul primo campo editabile
            document.frmReceive.DdlDestNazioneNascita.focus();

            var nome_presentatore = presentatore.getElementsByTagName("CO")[0].childNodes[0].nodeValue + " " + presentatore.getElementsByTagName("NO")[0].childNodes[0].nodeValue;

            document.frmReceive.TxtPresentatore.value = nome_presentatore;
            if (nome_presentatore != document.frmReceive.TxtDestinatario.value) {
                var bottone = objSmistatore.Visualizza_Msg(MSG.mgr_pres_no_benef, 2003);
                if (bottone == 1) {
                    document.frmReceive.TxtDestCodFiscale.focus();
                }
                else { // esco a menu
                    window.navigate("./../../exitnok.aspx")

                }
            }
        }
        /*
     else { //popolo i campi con i dati sessione presentatore
        
    }*/
    }
}
function showResultsReceive(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cReceiveWebService")
        return
    }
    else {
        oReceiveObject = methodResult.value
        if (oReceiveObject.ErrorType != "") {
            if (oReceiveObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oReceiveObject.ErrorMessage, oReceiveObject.ErrorType, "invokePtReceive()")
            }
            return
        }
    }
    document.getElementById("Label2").style.visibility = 'visible'
    if (restartLevel == 0)
        document.getElementById("Label2").innerHTML = "Ricezione MoneyGram ** Risposta dal C.N. **"
    document.getElementById("txtSmistatore").value = oReceiveObject.XmlSmistatore
    OutputParam1.style.visibility = 'visible'
    document.getElementById("Panel3").style.visibility = 'hidden'
    document.getElementById("TxtImportoInvio").value = oReceiveObject.ReceiveAmount

    document.getElementById("LblPresentatore").style.visibility = 'hidden'
    document.getElementById("TxtPresentatore").style.visibility = 'hidden'

    document.getElementById("LblMessaggio").style.visibility = 'hidden'
    document.getElementById("TxtMessaggio").style.visibility = 'hidden'
    document.getElementById("TxtImportoInvio").style.left = 252
    document.getElementById("LblImporto").style.left = 272
    showFinalForm()
    setTimeout("endTransaction();", 400)
}
function showResultsReceiveRestart(methodResult) {
    if (methodResult.error) {
        window.navigate("./../../Error.aspx?err=Errore del WebService locale nell'invocazione di 'cReceiveRestartXMLWebService'&techerr=" + methodResult.errorDetail)
    }
    var objResult = methodResult.value
    if (objResult.ErrorType != "") {
        if (objResult.ErrorType == "TimeOut") {
            window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
        }
        else {
            riprovaAbbandona(objResult.ErrorMessage, objResult.ErrorType, "invokePtReceiveRestart()")
        }
        return
    }
    document.getElementById("TxtSmistatore").value = objResult.StrXmlRestart1
    if (scriviRestart(1)) {
        invokePtReceive()
    }
}
function showResultsPTConfirm(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cPTConfirmWebService")
    }
    else {
        var objResult = methodResult.value
        var urlToExit = objResult.PageToRedirect
        var bStatus = objResult.Status
        if (bStatus == true) {
            if (createSmistatoreStampa()) {
                if (!stampaDocumento()) {
                    frmReceive.style.display = 'none'
                    if (urlToExit == "./../../exit.aspx")
                        window.navigate("./../../MGRStampaNOK.aspx")
                    else
                        window.navigate("./../../MGRStampaNOK.aspx?signalnotsent=yes")
                }
                else {
                    if (objSmistatoreStampa.Visualizza_Msg('Stampa del duplicato?', 2003) == 1) {
                        if (preparaDuplicatoStampa()) {
                            stampaDuplicato()
                        }
                    }
                    frmReceive.style.display = 'none'
                    cancellaRestart()
                    navigate(urlToExit)
                    return
                }
            }
            else {
                cancellaRestart()
                window.navigate("./../../MGRStampaNOK.aspx?signalnotsent=yes")
            }
        }
        else {
            navigate(urlToExit)
        }
    }
}
function endTransaction() {
    if (addAutNumber() == false)
        return
    if (scriviRestart(2)) {
        if (scriviDatiContabili()) {
            frmReceive.style.display = ''
            setTimeout("invokePTConfirm(true);", 500)
        }
    }
}
function reportError(err, strNomeWebService) {
    var strQueryString = "err=Errore durante la comunicazione col Web Service Locale" +
        "&techerr=Errore nella chiamata client-side al web service locale'" + strNomeWebService + "'" +
        "~Eccezione: " + escape(err.string)
    // alert(err.string)
    cancellaRestart()
    window.navigate("./../../Error.aspx?" + strQueryString)
}
function riprovaAbbandona(msg, typeErr, fnName) {
    var iRCSmistatore
    createSmistatore()
    try {
        switch (typeErr) {
            case "A":
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 4012)
                if (iRCSmistatore == 4) {
                    objSmistatore.Visualizza_Msg("Attendere. Operazione in corso...")
                    eval(fnName)
                    return
                }
                else {
                    cancellaRestart()
                    window.navigate("./../../exitnok.aspx")
                    return false
                }
                break
            case "B":
                flgWorking = false
                frmReceive.style.display = ''
                disableFields(false)
                document.getElementById("TxtCodRif").disabled = false
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 1)
                document.getElementById("TxtCodRif").focus()
                return false
                break
            default:
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 4008)
                cancellaRestart()
                window.navigate("./../../exitnok.aspx")
                return false
                break
        }
    }
    catch (exception) {
        if (exception.description != null)
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo RiprovaAbbandona~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante l'invocazione del metodo RiprovaAbbandona")
        return false
    }
}
function fnDdlOnFocus() {
    lastObjFocus = event.srcElement
}
function fnDdlOnClick() {
    flgDdlClick = true
}
function DdlOnMouseDown() {
    if (event.srcElement.readOnly == true) {
        discardEvent(event)
        return
    }
}
function ChangeCountry() {
    var comboPaese = document.getElementById(event.srcElement.id)
    var comboStato
    var labelStato
    var op
    if (comboPaese.id == "DdlDestCountry") {
        comboStato = document.getElementById("DdlDestState")
        labelStato = document.getElementById("LlbCircleDestState")
    }
    else {
        comboStato = document.getElementById("DdlStatoRilascio")
        labelStato = document.getElementById("LblCircleDocState")
    }
    comboStato.disabled = false
    for (i = comboStato.length - 1; i >= 1; i--) {
        comboStato.remove(i)
    }
    if (comboPaese.selectedIndex > 0) {
        for (j = 0; j < oStatesObject.CountryCode.length;
            j++) {
            if (oStatesObject.CountryCode[j] == comboPaese.value) {
                op = document.createElement("<option>")
                op.text = trim(oStatesObject.StateName[j])
                op.value = trim(oStatesObject.StateCode[j])
                comboStato.add(op)
                if (comboStato.item(0).text != "Elenco Stati (selezionarne uno)")
                    comboStato.item(0).text = "Elenco Stati (selezionarne uno)"
            }
        }
        if (comboStato.length <= 1) {
            if (comboStato.length == 1) {
                if (comboStato.item(0).text != " ")
                    comboStato.item(0).text = " "
            }
            else {
                op = document.createElement("<option>")
                op.text = " "
                op.value = ""
                comboStato.add(op)
            }
            comboStato.selectedIndex = 0
            comboStato.disabled = true
        }
        else {
            comboStato.selectedIndex = 0
            comboStato.style.color = "Black"
        }
    }
    else {
        if (comboStato.length > 0)
            comboStato.item(0).text = " "
        comboStato.disabled = true
    }
    if (comboStato.disabled == true) {
        comboStato.style.backgroundColor = 'silver'
        labelStato.style.visibility = 'hidden'
    }
    else {
        comboStato.style.backgroundColor = 'white'
        labelStato.style.visibility = 'visible'
    }
}
function CheckCampi(obj, TipoCampo) {
    var ret = true
    switch (TipoCampo) {
        case "TXT":
            obj.value = trim(obj.value)
            if (obj.value == "")
                ret = false
            break
        case "DDL":
            if (obj.selectedIndex < 1) {
                ret = false
            }
            break
        case "DAT":
            if (obj.value == "00/00/0000") {
                ret = false
            }
            else {
                ret = isDate(obj.value)
            }
            break
    }
    return ret
}
function validateForm() {
    var msg = "";
    var maxLenghtMsg = "Campo %_CAMPO_% troppo lungo (max %_LIMIT_%).";

    if (!(CheckCampiLimit(document.getElementById("TxtDestAddress"), "TXT", 35))) {
        msg = maxLenghtMsg.replace("%_CAMPO_%", 'Indirizzo Beneficiario').replace('%_LIMIT_%', 30);
        objFocus = document.frmReceive.TxtDestAddress;
        objFocus.disabled = false;
    } else if (!(CheckCampiLimit(document.getElementById("TxtDestCity"), "TXT", 20))) {
        msg = maxLenghtMsg.replace("%_CAMPO_%", "Citta' Beneficiario").replace('%_LIMIT_%', 20);
        objFocus = document.frmReceive.TxtDestCity;
        objFocus.disabled = false;
    }


    if (document.frmReceive.TxtDestAddress.readOnly == false) {
        if (!CheckCampi(document.frmReceive.TxtDestCodFiscale, "TXT")) {
            msg = "Inserire il codice fiscale del Beneficiario"
            objFocus = document.frmReceive.TxtDestCodFiscale
        }
        else if (document.frmReceive.TxtDestCodFiscale.value.length != 16) {
            msg = "Codice fiscale del Beneficiario errato"
            objFocus = document.frmReceive.TxtDestCodFiscale
        }
        else if (!CheckCampi(document.getElementById("UctrlDestDataNascita:TxtDate"), "DAT")) {
            msg = "Data di Nascita non valida"
            objFocus = document.getElementById("UctrlDestDataNascita:TxtDate")
        }
        else if (!CheckCampi(document.frmReceive.DdlDestNazioneNascita, "DDL")) {
            msg = "Selezionare il paese di nascita del Beneficiario"
            objFocus = document.frmReceive.DdlDestNazioneNascita
        }
        else if (!CheckCampi(document.frmReceive.TxtDestAddress, "TXT")) {
            msg = "Inserire l'indirizzo del Beneficiario"
            objFocus = document.frmReceive.TxtDestAddress
        }
        else if (!CheckCampi(document.frmReceive.TxtDestCap, "TXT")) {
            msg = "Inserire il CAP del Beneficiario"
            objFocus = document.frmReceive.TxtDestCap
        }
        else if (!CheckCampi(document.frmReceive.TxtDestCity, "TXT")) {
            msg = "Inserire la Citta' del Beneficiario"
            objFocus = document.frmReceive.TxtDestCity
        }
        else if (!CheckCampi(document.frmReceive.DdlDestCountry, "DDL")) {
            msg = "Selezionare il paese del Beneficiario"
            objFocus = document.frmReceive.DdlDestCountry
        }
        else if (document.frmReceive.DdlDestState.disabled == false) {
            if (!CheckCampi(document.frmReceive.DdlDestState, "DDL")) {
                msg = "Selezionare lo stato del Beneficiario"
                objFocus = document.frmReceive.DdlDestState
            }
        }
        //MEV 115957 VBERTO
        else if (!CheckCampi(document.frmReceive.TxtTelefono, "TXT")) {
            msg = "Inserire il numero di telefono del Beneficiario"
            objFocus = document.frmReceive.TxtTelefono
        }
        else if (document.frmReceive.TxtTelefono.value.length > 10) {
            msg = "Numero di Telefono maggiore di 10 numeri\n"
            objFocus = document.frmReceive.TxtTelefono;
        }
        else if (document.frmReceive.DdlScopoTransazione.disabled == false) {
            if (!CheckCampi(document.frmReceive.DdlScopoTransazione, "DDL")) {
                msg = "Selezionare Scopo della transazione"
                objFocus = document.frmReceive.DdlScopoTransazione
            }
        }
        else if (document.frmReceive.DdlRelazioneMittente.disabled == false) {
            if (!CheckCampi(document.frmReceive.DdlRelazioneMittente, "DDL")) {
                msg = "Selezionare Relazione con il Mittente"
                objFocus = document.frmReceive.DdlRelazioneMittente
            }
        }
    }

    if (msg == "") {
        if (!CheckCampi(document.frmReceive.TxtNumDocumento, "TXT")) {
            msg = "Inserire il numero del Documento"
            objFocus = document.frmReceive.TxtNumDocumento
        }
        else if (!CheckCampi(document.frmReceive.DdlTipoDocumento, "DDL")) {
            msg = "Selezionare il tipo di  Documento"
            objFocus = document.frmReceive.DdlTipoDocumento
        }
        else if (!CheckCampi(document.frmReceive.TxtEnteEmittente, "TXT")) {
            msg = "Inserire l'ente di emissione"
            objFocus = document.frmReceive.TxtEnteEmittente
        }
        else if (!CheckCampi(document.getElementById("UctrlDataRilascioDocum:TxtDate"), "DAT")) {
            msg = "Data di Rilascio non valida"
            objFocus = document.getElementById("UctrlDataRilascioDocum:TxtDate")
        }
        else if (!CheckCampi(document.frmReceive.DdlPaeseRilascio, "DDL")) {
            msg = "Selezionare il paese di rilascio"
            objFocus = document.frmReceive.DdlPaeseRilascio
        }
        else if (document.frmReceive.DdlStatoRilascio.disabled == false) {
            if (!CheckCampi(document.frmReceive.DdlStatoRilascio, "DDL")) {
                msg = "Selezionare lo stato di rilascio"
                objFocus = document.frmReceive.DdlStatoRilascio
            }
        }
        else if (document.frmReceive.DdlRelazioneMittente.disabled == false) {
            if (!CheckCampi(document.frmReceive.DdlRelazioneMittente, "DDL")) {
                msg = "Selezionare Relazione con il Mittente"
                objFocus = document.frmReceive.DdlRelazioneMittente
            }
        }
    }
    if (msg != "") {
        resetAfterValidate(msg)
        return false
    } else {
        //check codice fiscale
        if (!chkFisc()) {
            flgWorking = false
            return false
        }

    }

    return true
}


function caricaSessionePresentatore() {

    var strXMLdoc = "<Dati_Compliance>";
    strXMLdoc += "</Dati_Compliance>";

    var xmlOutput = objSmistatore.LeggiSessioneCompliance(strXMLdoc);

    if (xmlOutput) {
        var xmlDoc = parseXml(objSmistatore.strXMLDocRitorno);
        return xmlDoc;
        //return xmlDoc.getElementsByTagName("Presentatore")[0];

        /*document.getElementById("TxtCodiceFiscaleMitt").value = presentatori.getElementsByTagName("CF")[0].childNodes[0].nodeValue;
        document.getElementById("TxtCodiceFiscaleMitt").disabled = 'true';
        document.getElementById("TxtCognomeMitt").value = presentatori.getElementsByTagName("CO")[0].childNodes[0].nodeValue;
        document.getElementById("TxtCognomeMitt").disabled = 'true';
        document.getElementById("TxtNomeMitt").value = presentatori.getElementsByTagName("NO")[0].childNodes[0].nodeValue;
        document.getElementById("TxtNomeMitt").disabled = 'true';
        //alert(presentatori.getElementsByTagName("CF")[0].childNodes[0].nodeValue);*/
    }

    return null;
}

function resetAfterValidate(msg) {
    flgWorking = false
    objSmistatore.Visualizza_Msg(msg, 1)
    objFocus.focus()
}
function focusController() {
    if (flgFocus == false) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (objSmistatore != null) {
        if (flgCancellaMessaggio == true)
            objSmistatore.Visualizza_Msg("")
    }
    if ((flgDatiTransWorking != false) || (flgWorking != false)) {
        discardEvent(event)
        return
    }
    if (flgDdlClick == false) {
        if (lastObjFocus == null) {
            discardEvent(event)
            return
        }
        if ((lastObjFocus.id == "TxtCodRif") && (lastObjFocus.disabled == true)) {
            discardEvent(event)
            return
        }
        lastObjFocus.focus()
    }
    else {
        flgDdlClick = false
    }
}
function scriviRestart(level) {
    var bRCSmistatore
    try {
        bRCSmistatore = objSmistatore.Scrivi_Restart(document.getElementById("TxtSmistatore").value, document.getElementById("TxtComando").Url, level)
    }
    catch (exception) {
        if (level == 2) {
            codErr = "S011 - Errore nel salvataggio dei dati. Operazione non eseguita "
            objSmistatore.Visualizza_Msg(codErr, 8)
            objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
            invokePTConfirm(false)
            return false
        }
        if (exception.description != null) {
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Scrivi_Restart~Eccezione: " + exception.description)
        }
        else {
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore inaspettato durante l'invocazione del metodo Scrivi_Restart")
        }
        return false
    }
    if (!bRCSmistatore) {
        objSmistatore.Leggi_Errore(objSmistatore.strXMLDocRitorno)
        document.getElementById("TxtSmistatore").value = objSmistatore.strXMLDocRitorno
        var descrErr = objSmistatore.strDescErrRitorno
        var codErr = objSmistatore.strCodErrRitorno
        descrErr = "(" + descrErr + " - " + codErr + ")"
        codErr = "S011 - Errore nel salvataggio dei dati. Operazione non eseguita "
        objSmistatore.Visualizza_Msg(codErr + descrErr, 8)
        if (level == 2) {
            objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
            invokePTConfirm(false)
            return false
        }
        window.navigate("./../../exitnok.aspx")
        return false
    }
    return true
}
function createNamesString() {
    var str = ""
    str = "DdlDestStateVal" +
        "^DdlDestStateDesc" +
        "^DdlDestCountryVal" +
        "^DdlDestCountryDesc" +
        "^TxtDestCity" +
        "^TxtDestCap" +
        "^TxtDestAddress" +
        "^TxtMittente" +
        "^TxtDataInvio" +
        "^TxtTransStatus" +
        "^TxtRefNumber" +
        "^TxtDestinatario" +
        "^TxtImportoInvio" +
        "^TxtMessaggio" +
        "^TxtNumDocumento" +
        "^DdlTipoDocumentoVal" +
        "^DdlTipoDocumentoDesc" +
        "^TxtEnteEmittente" +
        "^DdlPaeseRilascioVal" +
        "^DdlPaeseRilascioDesc" +
        "^DdlStatoRilascioVal" +
        "^DdlStatoRilascioDesc" +
        "^TxtCodRif" +
        "^UctrlDataRilascioDocum" +
        "^TxtDestCodFiscale" +
        "^UctrlDestDataNascita" +
        "^DdlDestNazioneNascitaVal" +
        "^DdlDestNazioneNascitaDesc" +
        "^DdlScopoTransazioneVal" +
        "^DdlScopoTransazioneDesc" +
        "^DdlRelazioneMittenteVal" +
        "^DdlRelazioneMittenteDesc" +
        "^TxtTelefono"
    return str
}
function createValuesString() {
    var str = ""
    var stateCode = ""
    var destStateCode = ""
    var destStateDesc = ""
    var destCountryCode = ""
    var destCountryDesc = ""
    var destNazioneNascitaCode = ""
    var destNazioneNascitaDesc = ""

    //MEV 115957 V.BERTO
    var scopoTransazioneCode = ""
    var scopoTransazioneDesc = ""
    var relazioneMittenteCode = ""
    var relazioneMittenteDesc = ""


    if (document.frmReceive.DdlStatoRilascio.selectedIndex > 0) {
        stateCode += document.frmReceive.DdlStatoRilascio.value.toString()
    }
    if (document.frmReceive.DdlDestState.selectedIndex > 0) {
        destStateCode += document.frmReceive.DdlDestState.value.toString()
        destStateDesc += document.frmReceive.DdlDestState.item(document.frmReceive.DdlDestState.selectedIndex).text
    }
    if (document.frmReceive.DdlDestCountry.selectedIndex > 0) {
        destCountryCode += document.frmReceive.DdlDestCountry.value.toString()
        destCountryDesc += document.frmReceive.DdlDestCountry.item(document.frmReceive.DdlDestCountry.selectedIndex).text
    }
    if (document.frmReceive.DdlDestNazioneNascita.selectedIndex > 0) {
        destNazioneNascitaCode += document.frmReceive.DdlDestNazioneNascita.value.toString()
        destNazioneNascitaDesc += document.frmReceive.DdlDestNazioneNascita.item(document.frmReceive.DdlDestNazioneNascita.selectedIndex).text
    }

    //MEV 115957 V.BERTO
    if (document.frmReceive.DdlScopoTransazione.selectedIndex > 0) {
        scopoTransazioneCode += document.frmReceive.DdlScopoTransazione.value.toString()
        scopoTransazioneDesc += document.frmReceive.DdlScopoTransazione.item(document.frmReceive.DdlScopoTransazione.selectedIndex).text
    }
    if (document.frmReceive.DdlRelazioneMittente.selectedIndex > 0) {
        relazioneMittenteCode += document.frmReceive.DdlRelazioneMittente.value.toString()
        relazioneMittenteDesc += document.frmReceive.DdlRelazioneMittente.item(document.frmReceive.DdlRelazioneMittente.selectedIndex).text
    }

    str += destStateCode +
        "^" + destStateDesc +
        "^" + destCountryCode +
        "^" + destCountryDesc +
        "^" + document.frmReceive.TxtDestCity.value +
        "^" + document.frmReceive.TxtDestCap.value +
        "^" + document.frmReceive.TxtDestAddress.value +
        "^" + document.frmReceive.TxtMittente.value +
        "^" + document.frmReceive.TxtDataInvio.value +
        "^" + document.frmReceive.TxtTransStatus.value +
        "^" + document.frmReceive.TxtRefNumber.value +
        "^" + document.frmReceive.TxtDestinatario.value +
        "^" + document.frmReceive.TxtImportoInvio.value +
        "^" + document.frmReceive.TxtMessaggio.value +
        "^" + document.frmReceive.TxtNumDocumento.value +
        "^" + document.frmReceive.DdlTipoDocumento.value +
        "^" + document.frmReceive.DdlTipoDocumento.item(document.frmReceive.DdlTipoDocumento.selectedIndex).text +
        "^" + document.frmReceive.TxtEnteEmittente.value +
        "^" + document.frmReceive.DdlPaeseRilascio.value +
        "^" + document.frmReceive.DdlPaeseRilascio.item(document.frmReceive.DdlPaeseRilascio.selectedIndex).text +
        "^" + stateCode +
        "^" + document.frmReceive.DdlStatoRilascio.item(document.frmReceive.DdlStatoRilascio.selectedIndex).text +
        "^" + document.frmReceive.TxtCodRif.value +
        "^" + document.getElementById("UctrlDataRilascioDocum:TxtDate").value +
        "^" + document.frmReceive.TxtDestCodFiscale.value +
        "^" + document.getElementById("UctrlDestDataNascita:TxtDate").value +
        "^" + destNazioneNascitaCode +
        "^" + destNazioneNascitaDesc +
        "^" + scopoTransazioneCode +
        "^" + scopoTransazioneDesc +
        "^" + relazioneMittenteCode +
        "^" + relazioneMittenteDesc +
        "^" + document.frmReceive.TxtTelefono.value
    return str
}
function preparePreviewValues() {
    var strVal
    var str = ""
    var destStateCode = ""
    var destCountryCode = ""
    var destNazioneNascitaCode = ""
    var destNazioneNascitaDesc = ""

    //MEV 115957 V.BERTO
    var scopoTransazioneCode = ""
    var scopoTransazioneDesc = ""
    var relazioneMittenteCode = ""
    var relazioneMittenteDesc = ""

    if (document.frmReceive.DdlDestState.selectedIndex > 0) {
        destStateCode += document.frmReceive.DdlDestState.value.toString()
    }
    if (document.frmReceive.DdlDestCountry.selectedIndex > 0) {
        destCountryCode += document.frmReceive.DdlDestCountry.value.toString()
    }
    if (document.frmReceive.DdlDestNazioneNascita.selectedIndex > 0) {
        destNazioneNascitaCode += document.frmReceive.DdlDestNazioneNascita.value.toString()
        destNazioneNascitaDesc += document.getElementById("DdlDestNazioneNascita").item(document.getElementById("DdlDestNazioneNascita").selectedIndex).text
    }

    //MEV 115957 VBERTO
    if (document.frmReceive.DdlScopoTransazione.selectedIndex > 0) {
        scopoTransazioneCode += document.frmReceive.DdlScopoTransazione.value.toString()
        scopoTransazioneDesc += document.getElementById("DdlScopoTransazione").item(document.getElementById("DdlScopoTransazione").selectedIndex).text
    }
    if (document.frmReceive.DdlRelazioneMittente.selectedIndex > 0) {
        relazioneMittenteCode += document.frmReceive.DdlRelazioneMittente.value.toString()
        relazioneMittenteDesc += document.getElementById("DdlRelazioneMittente").item(document.getElementById("DdlRelazioneMittente").selectedIndex).text
    }

    str += oReceivePreviewObject.agentCheckAmount
    str += "^" + oReceivePreviewObject.agentCheckAuthorizationNumber
    str += "^" + oReceivePreviewObject.agentCheckNumber
    str += "^" + oReceivePreviewObject.banamexAccountNumber
    str += "^" + oReceivePreviewObject.banamexBranchNumber
    str += "^" + oReceivePreviewObject.banamexReferenceNumber
    str += "^" + oReceivePreviewObject.customerCheckAmount
    str += "^" + oReceivePreviewObject.customerCheckAuthorizationNumber
    str += "^" + oReceivePreviewObject.customerCheckNumber
    str += "^" + oReceivePreviewObject.dateTimeSent
    str += "^" + oReceivePreviewObject.direction1
    str += "^" + oReceivePreviewObject.direction2
    str += "^" + oReceivePreviewObject.direction3
    str += "^" + oReceivePreviewObject.feeDifference
    str += "^" + oReceivePreviewObject.messageField1
    str += "^" + oReceivePreviewObject.messageField2
    str += "^" + oReceivePreviewObject.newExchangeRate
    str += "^" + oReceivePreviewObject.newReceiveAmount
    str += "^" + oReceivePreviewObject.newReceiveCurrency
    str += "^" + oReceivePreviewObject.newSendFee
    str += "^" + oReceivePreviewObject.okForAgent
    str += "^" + oReceivePreviewObject.originalExchangeRate
    str += "^" + oReceivePreviewObject.originalReceiveAmount
    str += "^" + oReceivePreviewObject.originalReceiveCountry
    str += "^" + oReceivePreviewObject.originalReceiveCurrency
    str += "^" + oReceivePreviewObject.originalSendAmount
    str += "^" + oReceivePreviewObject.originalSendCurrency
    str += "^" + oReceivePreviewObject.originalSendFee
    str += "^" + oReceivePreviewObject.originatingCountry
    str += "^" + oReceivePreviewObject.receiveAmount
    str += "^" + oReceivePreviewObject.receiveCurrency
    str += "^" + document.frmReceive.TxtDestAddress.value
    str += "^" + document.frmReceive.TxtDestCity.value
    str += "^" + oReceivePreviewObject.receiverColonia
    str += "^" + destCountryCode
    str += "^" + oReceivePreviewObject.receiverFirstName
    str += "^" + oReceivePreviewObject.receiverLastName
    str += "^" + oReceivePreviewObject.receiverLastName2
    str += "^" + oReceivePreviewObject.receiverMunicipio
    str += "^" + oReceivePreviewObject.receiverPhone
    str += "^" + destStateCode
    str += "^" + document.frmReceive.TxtDestCap.value
    str += "^" + oReceivePreviewObject.redirectIndicator
    str += "^" + oReceivePreviewObject.referenceNumber
    str += "^" + oReceivePreviewObject.senderFirstName
    str += "^" + oReceivePreviewObject.senderHomePhone
    str += "^" + oReceivePreviewObject.senderLastName
    str += "^" + oReceivePreviewObject.testAnswer
    str += "^" + oReceivePreviewObject.testQuestion
    str += "^" + oReceivePreviewObject.transactionStatus
    str += "^" + oReceivePreviewObject.transactionType
    str += "^" + document.frmReceive.TxtDestCodFiscale.value //51
    str += "^" + document.getElementById("UctrlDestDataNascita:TxtDate").value
    str += "^" + destNazioneNascitaCode //53
    str += "^" + destNazioneNascitaDesc //54
    str += "^" + oReceivePreviewObject.mgiTransactionSessionId
    str += "^" + scopoTransazioneCode
    str += "^" + scopoTransazioneDesc //57

    //MEV 115957 VBERTO
    str += "^" + relazioneMittenteCode
    str += "^" + relazioneMittenteDesc //59
    str += "^" + document.frmReceive.TxtTelefono.value //60
    re = /undefined/g
    strVal = str.replace(re, "")
    //alert(strVal)
    return strVal
}
function scriviDatiContabili() {
    var bRCSmistatore
    var ctrSmistatore = document.getElementById("TxtSmistatore")
    try {
        bRCSmistatore = objSmistatore.Scrivi_Dati_Contabili(ctrSmistatore.value)
    }
    catch (exception) {
        objSmistatore.Visualizza_Msg("Errore Scrittura Dati Contabili", 8)
        invokePTConfirm(false)
        objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
        return false
    }
    if (!bRCSmistatore) {
        objSmistatore.Leggi_Errore(objSmistatore.strXMLDocRitorno)
        var descrErr = objSmistatore.strCodErrRitorno + ' - ' + objSmistatore.strDescErrRitorno
        objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
        objSmistatore.Visualizza_Msg(descrErr, 8)
        invokePTConfirm(false)
        return false
    }
    ctrSmistatore.value = objSmistatore.strXMLDocRitorno
    return true
}
function cancellaRestart() {

    var bRCSmistatore
    try {
        bRCSmistatore = objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
    }
    catch (exception) {
        if (exception.description != null)
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Cancella_Restart~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante l'invocazione del metodo Cancella_Restart")
        return false
    }

    if (!bRCSmistatore) {
        objSmistatore.Leggi_Errore(objSmistatore.strXMLDocRitorno)
        document.getElementById("TxtSmistatore").value = objSmistatore.strXMLDocRitorno
        var descrErr = objSmistatore.strCodErrRitorno + ' - ' + objSmistatore.strDescErrRitorno
        objSmistatore.Visualizza_Msg(descrErr, 8)
        window.navigate("./../../exitnok.aspx")
        return false
    }
    return true
}
function scriviGiornaleDiFondo() {
    var bRCSmistatore
    try {
        bRCSmistatore = objSmistatore.Scrivi_GDF(document.getElementById('TxtSmistatore').value)
    }
    catch (exception) {
        objSmistatore.Visualizza_Msg("S006 - Errore nella scrittura del giornale di fondo", 1)
    }
    if (!bRCSmistatore) {
        objSmistatore.Leggi_Errore(objSmistatore.strXMLDocRitorno)
        var descrErr = objSmistatore.strDescErrRitorno
        var codErr = objSmistatore.strCodErrRitorno
        descrErr = "(" + descrErr + " - " + codErr + ")"
        codErr = "S006 - Errore nella scrittura del giornale di fondo "
        objSmistatore.Visualizza_Msg(codErr + ' - ' + descrErr, 1)
        return false
    }
    document.getElementById("TxtSmistatore").value = objSmistatore.strXMLDocRitorno
    return true
}
function createSmistatoreStampa() {
    if (objSmistatoreStampa != null)
        return true
    try {
        objSmistatoreStampa = SmistatoreStampa(false)
        return true
    }
    catch (exception) {
        return false
    }
}
function stampaDocumento() {
    var bRCSmistatore
    try {
        //DE LEO FIX DEFECT SDP00097260, SDP00097262, SDP00097265 ,SDP00097267 - INIZIO
        //è la funzione dello smistatore con un solo parametro che visualizza il messaggio dei defect. 
        //lo commento e utilizzo quella con 2 parametri!
        //bRCSmistatore = objSmistatoreStampa.Stampa_Documento(document.getElementById("TxtSmistatore").value)
        bRCSmistatore = objSmistatoreStampa.Stampa_Documento(document.getElementById("TxtSmistatore").value, parseInt("1"))
        //DE LEO FIX DEFECT SDP00097260, SDP00097262, SDP00097265 ,SDP00097267 - FINE
    }
    catch (exception) {
        return false
    }
    if (!bRCSmistatore) {
        objSmistatoreStampa.Leggi_Errore(objSmistatoreStampa.strXMLDocRitorno)
        document.getElementById("TxtSmistatore").value = objSmistatoreStampa.strXMLDocRitorno
        var descrErr = objSmistatoreStampa.strDescErrRitorno
        var codErr = objSmistatoreStampa.strCodErrRitorno
        if (objSmistatoreStampa.Visualizza_Msg(codErr + ' - ' + descrErr, 3012) == 4) {
            return stampaDocumento()
        }
        else {
            objSmistatoreStampa.Cancella_Restart(document.getElementById("TxtSmistatore").value)
            return false
        }
    }
    return true
}
function addAutNumber() {
    //DE LEO: CODICE AUTORIZZAZIONE NON VIENE PIU STAMPATO SULLA RICEVUTA. COMMENTO IL CODICE.
    /*    
    try
    {
       var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.4.0")
    }
    catch(exception)
    {
       objSmistatoreStampa.Visualizza_Msg("Impossibile eseguire la Stampa - Componente MSXML 4.0 non installato.", 8)
       return false
    }
    xmlDoc.async = false
    xmlDoc.resolveExternals = false
    xmlDoc.loadXML(document.getElementById("TxtSmistatore").value)
    var eleStampa = xmlDoc.getElementsByTagName("Pagina_Stampa")
    var numItems = parseInt(eleStampa.item(0).getAttribute("NUM_ITEMS"))
    eleStampa.item(0).setAttribute("NUM_ITEMS", parseInt(numItems + 1))
    var elem = xmlDoc.createElement("Item")
    elem.setAttribute("RIGA", "36")
    elem.setAttribute("COLONNA", "60")
    elem.setAttribute("FONT", "9")
    elem.text = "Codice Autorizzazione: " + oReceiveObject.AgentCheckAut
    xmlDoc.documentElement.selectSingleNode("/Dati_Operazione/Stampante/Stampa/Pagina_Stampa").appendChild(elem)
    document.getElementById("TxtSmistatore").value = xmlDoc.xml
    */
    return true
}
function preparaDuplicatoStampa() {
    try {
        var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.4.0")
    }
    catch (exception) {
        objSmistatoreStampa.Visualizza_Msg("Impossibile eseguire il duplicato di Stampa - Componente MSXML 4.0 non installato.", 8)
        return false
    }
    xmlDoc.async = false
    xmlDoc.resolveExternals = false
    xmlDoc.loadXML(document.getElementById("TxtSmistatore").value)
    var eleStampa = xmlDoc.getElementsByTagName("Pagina_Stampa")
    var numItems = parseInt(eleStampa.item(0).getAttribute("NUM_ITEMS"))
    eleStampa.item(0).setAttribute("NUM_ITEMS", parseInt(numItems + 1))
    eleStampa.item(0).setAttribute("MODELLO", "Modulo")
    var elem = xmlDoc.createElement("Item")
    elem.setAttribute("RIGA", "33")
    elem.setAttribute("COLONNA", "103")
    elem.setAttribute("FONT", "10")
    elem.text = "** DUPLICATO **"
    xmlDoc.documentElement.selectSingleNode("/Dati_Operazione/Stampante/Stampa/Pagina_Stampa").appendChild(elem)
    document.getElementById("TxtSmistatore").value = xmlDoc.xml
    return true
}
function stampaDuplicato() {
    var bRCSmistatore
    try {
        //DE LEO FIX DEFECT SDP00097260, SDP00097262, SDP00097265 ,SDP00097267 - INIZIO
        //è la funzione dello smistatore con un solo parametro che visualizza il messaggio dei defect. 
        //lo commento e utilizzo quella con 2 parametri!
        //bRCSmistatore = objSmistatoreStampa.Stampa_Documento(document.getElementById("TxtSmistatore").value)
        bRCSmistatore = objSmistatoreStampa.Stampa_Documento(document.getElementById("TxtSmistatore").value, parseInt("1"))
        //DE LEO FIX DEFECT SDP00097260, SDP00097262, SDP00097265 ,SDP00097267 - FINE
    }
    catch (exception) {
        if (exception.description != null)
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore di Stampa&techerr=Errore durante l'invocazione del metodo Stampa_Documento~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore di Stampa&techerr=Errore inaspettato durante l'invocazione del metodo Stampa_Documento")
        return false
    }
    if (!bRCSmistatore) {
        objSmistatoreStampa.Leggi_Errore(objSmistatoreStampa.strXMLDocRitorno)
        var descrErr = objSmistatoreStampa.strDescErrRitorno
        var codErr = objSmistatoreStampa.strCodErrRitorno
        if (objSmistatoreStampa.Visualizza_Msg(codErr + ' - ' + descrErr, 3012) == 4) {
            stampaDuplicato()
            return true
        }
        else {
            return true
        }
    }
    return true
}
function disableFields(bDisable) {
    if (oReceivePreviewObject != null) {
        if (oReceivePreviewObject.requiredFields == true) {
            document.frmReceive.TxtDestAddress.disabled = bDisable
            document.frmReceive.TxtDestAddress.disabled = bDisable
            document.frmReceive.TxtDestCap.disabled = bDisable
            document.frmReceive.TxtDestCity.disabled = bDisable
            document.frmReceive.DdlDestCountry.disabled = bDisable
            document.frmReceive.TxtDestCodFiscale.disabled = bDisable
            document.getElementById("UctrlDestDataNascita:TxtDate").disabled = bDisable
            document.frmReceive.DdlDestNazioneNascita.disabled = bDisable
            if (document.frmReceive.DdlDestState.length > 1)
                document.frmReceive.DdlDestState.disabled = bDisable
            else
                document.frmReceive.DdlDestState.disabled = true
            //MEV 115957 VBERTO
            document.frmReceive.TxtTelefono.disabled = bDisable
            document.frmReceive.DdlScopoTransazione.disabled = bDisable
            document.frmReceive.DdlRelazioneMittente.disabled = bDisable
        }
    }
    document.frmReceive.TxtNumDocumento.disabled = bDisable
    document.frmReceive.DdlTipoDocumento.disabled = bDisable
    document.frmReceive.TxtEnteEmittente.disabled = bDisable
    document.frmReceive.DdlPaeseRilascio.disabled = bDisable
    if (document.frmReceive.DdlStatoRilascio.length > 1)
        document.frmReceive.DdlStatoRilascio.disabled = bDisable
    else
        document.frmReceive.DdlStatoRilascio.disabled = true
    document.getElementById("UctrlDataRilascioDocum:TxtDate").disabled = bDisable
}
function fnNotAvailable() {
    var sMsg = "La ricezione relativa al codice di riferimento transazione inserito risulta gia' effettuata"
    riprovaAbbandona(sMsg, "C", fnNotAvailable)
}
function CountryKeyDown() {
    if (FireSpecialKeys() == true) {
        discardEvent(event)
        return
    }
    if (FireFunctionKeys() == true) {
        discardEvent(event)
        return
    }
    if (onKeyDownComboEvent() != -1) {
        discardEvent(event)
        if ((event.srcElement.id == "DdlPaeseRilascio") || (event.srcElement.id == "DdlDestCountry"))
            ChangeCountry()
        return
    }
}
var waitingForSecondChar = false
function onKeyDownComboEvent() {
    if (event.keyCode < 65 || event.keyCode > 90 || event.altKey == true) {
        return -1
    }
    event.returnValue = false
    var eventSource = event.srcElement.name
    if (!waitingForSecondChar) {
        strFirstChar = String.fromCharCode(event.keyCode)
        timeFirstChar = new Date().getTime()
        if (!selectComboItem(strFirstChar, 1, eventSource)) {
            waitingForSecondChar = false
            return
        }
        waitingForSecondChar = true
    }
    else {
        waitingForSecondChar = false
        timeSecondChar = new Date().getTime()
        if (timeSecondChar - timeFirstChar > 1500) {
            return onKeyDownComboEvent(event, this)
        }
        else {
            strSecondChar = String.fromCharCode(event.keyCode)
            if (!selectComboItem(strFirstChar + strSecondChar, 2, eventSource)) {
                return onKeyDownComboEvent(event, this)
            }
        }
    }
}
function selectComboItem(strItem, position, field) {
    var size = document.getElementById(field).length
    var chMiddle = document.getElementById(field).options[size / 2].text.substring(0, 1)
    if (strItem.substring(0, 1) > chMiddle) {
        for (var i = size / 2; i < size; i++) {
            if (document.getElementById(field).options[i].text.substring(0, position) == strItem) {
                document.getElementById(field).options[i].selected = true
                return true
            }
        }
    }
    else {
        for (var i = 0; i <= size / 2; i++) {
            if (document.getElementById(field).options[i].text.substring(0, position) == strItem) {
                document.getElementById(field).options[i].selected = true
                return true
            }
        }
    }
    return false
}
function showFinalForm() {
    /*
    alert(document.getElementById("TxtDestCodFiscale").value)
    alert(document.getElementById("DdlDestNazioneNascita").value)
    alert(document.getElementById("UctrlDestDataNascita:TxtDate").value)
    */
    document.getElementById("DdlDestCountry").disabled = false
    document.getElementById("DdlDestCountry").readOnly = true
    document.getElementById("DdlDestState").disabled = false
    document.getElementById("DdlDestState").readOnly = true
    document.getElementById("DdlDestState").style.cssText = "FONT-SIZE:10pt;Z-INDEX:132;BORDER-LEFT-COLOR:solid;LEFT:398px;BORDER-BOTTOM-COLOR:solid;WIDTH:197px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:86px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid; COLOR: blue"
    document.getElementById("DdlDestCountry").style.cssText = "FONT-SIZE:10pt;Z-INDEX:130;BORDER-LEFT-COLOR:solid;LEFT:91px;BORDER-BOTTOM-COLOR:solid;WIDTH:255px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:86px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid; COLOR: blue"
    document.getElementById("TxtDestinatario").disabled = false
    document.getElementById("TxtDestinatario").readOnly = true
    document.getElementById("TxtDestAddress").disabled = false
    document.getElementById("TxtDestAddress").readOnly = true
    document.getElementById("TxtDestCodFiscale").disabled = false
    document.getElementById("TxtDestCodFiscale").readOnly = true
    document.getElementById("DdlDestNazioneNascita").disabled = false
    document.getElementById("DdlDestNazioneNascita").readOnly = true
    document.getElementById("TxtDestCap").disabled = false
    document.getElementById("TxtDestCap").readOnly = true
    document.getElementById("TxtDestCity").disabled = false
    document.getElementById("TxtDestCity").readOnly = true
    document.getElementById("Panel1").style.cssText = "Z-INDEX:111;LEFT:3px;WIDTH:608px;BORDER-TOP-STYLE:groove;BORDER-RIGHT-STYLE:groove;BORDER-LEFT-STYLE:groove;POSITION:absolute;TOP:22px;HEIGHT:101px;BORDER-BOTTOM-STYLE:groove"
    document.getElementById("LblRefNumber").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:112;LEFT:6px;WIDTH:241px;FONT-FAMILY:Arial;POSITION:absolute;TOP:17px;HEIGHT:24px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtRefNumber").style.cssText = "FONT-SIZE:10pt;Z-INDEX:113;BORDER-LEFT-COLOR:solid;LEFT:206px;BORDER-BOTTOM-COLOR:solid;WIDTH:102px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:16px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblTransacStatus").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:114;LEFT:317px;WIDTH:126px;FONT-FAMILY:Arial;POSITION:absolute;TOP:17px;HEIGHT:24px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtTransStatus").style.cssText = "FONT-SIZE:10pt;Z-INDEX:115;BORDER-LEFT-COLOR:solid;LEFT:442px;BORDER-BOTTOM-COLOR:solid;WIDTH:151px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:16px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblDataInvio").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:118;LEFT:6px;WIDTH:176px;FONT-FAMILY:Arial;POSITION:absolute;TOP:59px;HEIGHT:24px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtDataInvio").style.cssText = "FONT-SIZE:10pt;Z-INDEX:119;BORDER-LEFT-COLOR:solid;LEFT:159px;BORDER-BOTTOM-COLOR:solid;WIDTH:72px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:57px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblMittente").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:120;LEFT:259px;WIDTH:65px;FONT-FAMILY:Arial;POSITION:absolute;TOP:59px;HEIGHT:24px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtMittente").style.cssText = "FONT-SIZE:10pt;Z-INDEX:121;BORDER-LEFT-COLOR:solid;LEFT:326px;BORDER-BOTTOM-COLOR:solid;WIDTH:268px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:57px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("Panel2").style.cssText = "Z-INDEX:110;BORDER-LEFT-COLOR:solid;LEFT:3px;BORDER-BOTTOM-COLOR:solid;WIDTH:608px;BORDER-TOP-STYLE:groove;BORDER-TOP-COLOR:solid;BORDER-RIGHT-STYLE:groove;BORDER-LEFT-STYLE:groove;POSITION:absolute;TOP:124px;HEIGHT:121px;BORDER-RIGHT-COLOR:solid;BORDER-BOTTOM-STYLE:groove"
    document.getElementById("LblDestinatario").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:121;LEFT:6px;WIDTH:82px;FONT-FAMILY:Arial;POSITION:absolute;TOP:9px;HEIGHT:19px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtDestinatario").style.cssText = "FONT-SIZE:10pt;Z-INDEX:122;BORDER-LEFT-COLOR:solid;LEFT:93px;BORDER-BOTTOM-COLOR:solid;WIDTH:501px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:7px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblDestAddress").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:123;LEFT:8px;WIDTH:59px;FONT-FAMILY:Arial;POSITION:absolute;TOP:35px;HEIGHT:20px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtDestAddress").style.cssText = "FONT-SIZE:10pt;Z-INDEX:124;BORDER-LEFT-COLOR:solid;LEFT:93px;BORDER-BOTTOM-COLOR:solid;WIDTH:501px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:32px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblDestCap").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:125;LEFT:7px;WIDTH:39px;FONT-FAMILY:Arial;POSITION:absolute;TOP:63px;HEIGHT:19px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtDestCap").style.cssText = "FONT-SIZE:10pt;Z-INDEX:126;BORDER-LEFT-COLOR:solid;LEFT:92px;BORDER-BOTTOM-COLOR:solid;WIDTH:106px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:59px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblDestCity").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:127;LEFT:209px;WIDTH:39px;FONT-FAMILY:Arial;POSITION:absolute;TOP:63px;HEIGHT:21px;BACKGROUND-COLOR:silver"
    document.getElementById("TxtDestCity").style.cssText = "FONT-SIZE:10pt;Z-INDEX:128;BORDER-LEFT-COLOR:solid;LEFT:253px;BORDER-BOTTOM-COLOR:solid;WIDTH:342px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:58px;HEIGHT:21px;BACKGROUND-COLOR:silver;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblDestCountry").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:129;LEFT:7px;WIDTH:52px;FONT-FAMILY:Arial;POSITION:absolute;TOP:87px;HEIGHT:19px;BACKGROUND-COLOR:silver"
    document.getElementById("LblCircleDestCountry").style.visibility = 'hidden'
    document.getElementById("LblCircleDocState").style.visibility = 'hidden'
    document.getElementById("LblDestState").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:131;LEFT:350px;WIDTH:39px;FONT-FAMILY:Arial;POSITION:absolute;TOP:87px;HEIGHT:18px;BACKGROUND-COLOR:silver"
    document.getElementById("LlbCircleDestState").style.visibility = 'hidden'
    document.getElementById("TxtImportoInvio").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:12pt;Z-INDEX:108;BORDER-LEFT-COLOR:solid;LEFT:244px;BORDER-BOTTOM-COLOR:solid;WIDTH:108px;COLOR:blue;BORDER-TOP-COLOR:solid;FONT-FAMILY:Arial;POSITION:absolute;TOP:305px;HEIGHT:22px;BACKGROUND-COLOR:silver;TEXT-ALIGN:right;BORDER-RIGHT-COLOR:solid"
    document.getElementById("LblImporto").style.cssText = "FONT-WEIGHT:bold;FONT-SIZE:10pt;Z-INDEX:104;LEFT:270px;WIDTH:67px;FONT-FAMILY:Arial;POSITION:absolute;TOP:287px;HEIGHT:20px"

    document.getElementById("LblCodFiscale").style.visibility = 'hidden'
    document.getElementById("TxtDestCodFiscale").style.visibility = 'hidden'
    document.getElementById("LblDestDataNascita").style.visibility = 'hidden'
    document.getElementById("LblDestNazioneNascita").style.visibility = 'hidden'
    document.getElementById("LblCircleDestNazioneNascita").style.visibility = 'hidden'
    document.getElementById("DdlDestNazioneNascita").style.visibility = 'hidden'
    document.getElementById("UctrlDestDataNascita:TxtDate").style.visibility = 'hidden'
    document.getElementById("imgFreccia").style.visibility = 'hidden'


    //MEV 115957 VBERTO
    document.getElementById("TxtTelefono").disabled = false
    document.getElementById("TxtTelefono").readOnly = true
    document.getElementById("LblTelefono").style.visibility = 'hidden'
    document.getElementById("TxtTelefono").style.visibility = 'hidden'

    document.getElementById("DdlScopoTransazione").disabled = false
    document.getElementById("DdlScopoTransazione").readOnly = true
    document.getElementById("LblScopoTransazione").style.visibility = 'hidden'
    document.getElementById("LblCircleScopoTransazione").style.visibility = 'hidden'
    document.getElementById("DdlScopoTransazione").style.visibility = 'hidden'

    document.getElementById("DdlRelazioneMittente").disabled = false
    document.getElementById("DdlRelazioneMittente").readOnly = true
    document.getElementById("LblRelazioneMittente").style.visibility = 'hidden'
    document.getElementById("LblCircleRelazioneMittente").style.visibility = 'hidden'
    document.getElementById("DdlRelazioneMittente").style.visibility = 'hidden'
}

function codiceFISCALE(cfins) {
    // funzione del solo controllo formale su checkdigit
    var cf = cfins.toUpperCase();
    var set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";
    var s = 0;
    for (i = 1; i <= 13; i += 2)
        s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    for (i = 0; i <= 14; i += 2)
        s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    if (s % 26 != cf.charCodeAt(15) - 'A'.charCodeAt(0))
        return false;
    return true;
}

function chkFisc() {
    res = true
    var msg1 = ""
    //if(!(codiceFISCALE(document.getElementById("TxtDestCodFiscale").value))){
    if (document.getElementById("TxtDestCodFiscale").value != "" && document.getElementById("TxtDestCodFiscale").value != "PF RESID. ESTERO" && !(codiceFISCALE(document.getElementById("TxtDestCodFiscale").value))) {
        objFocus = "TxtDestCodFiscale"
        msg1 = "Codice Fiscale Errato. Vuoi Continuare?\n"
        var retcf = objSmistatore.Visualizza_Msg(msg1, 2003)

        if (retcf == 2) {

            //document.getElementById("TxtDestCodFiscale").style.backgroundColor="white"
            //document.getElementById("TabStripMoneyGram").selectedIndex=3
            document.getElementById(objFocus).focus()
            res = false
        } else {
            //document.getElementById("TxtIndirizzoMitt").focus()
        }
    }
    return res
}

function Check_CampoTesto_ScrollDown(key_event, IDcampo) {
    // Funzione per ScrollDown elemnti del CF (editabile o PF Estero) con cursor down
    var CampoTesto = document.getElementById(IDcampo);
    //alert(CampoTesto.value)

    var key = key_event.keyCode
    //alert (key)
    if (CampoTesto.bloccato == true) {
        if (key != 40 && key != 9 && key != 27 && key != 35) {
            discardEvent(key_event)
            return
        }
    }
    else {
        if ((event.keyCode != 46) && (event.keyCode != 9) && (event.keyCode != 40) && (event.keyCode != 27) && (event.keyCode != 35)
            && (event.keyCode != 8) && (!((event.keyCode == 67) && event.altKey))
            && (!((event.keyCode == 86) && event.ctrlKey))) {
            if ((event.keyCode < 48) || ((event.keyCode > 57) && (event.keyCode < 65)) ||
                ((event.keyCode > 90) && (event.keyCode < 96)) || (event.keyCode > 105) ||
                event.altKey || event.shiftKey || event.ctrlKey) {
                discardEvent(key_event)
                return
            }
        }
    }


    if (key_event.keyCode == 40) {
        if (CampoTesto.value == "PF RESID. ESTERO") {
            CampoTesto.value = "";
            CampoTesto.bloccato = false
            /*
            document.getElementById("DdlDestNazioneNascita").disabled=true
            document.getElementById("DdlDestNazioneNascita").style.backgroundColor="silver"
            document.getElementById("DdlDestNazioneNascita").selectedIndex=0
            document.getElementById("LblCircleDestNazioneNascita").style.visibility = 'hidden'
            */
        } else {
            CampoTesto.value = "PF RESID. ESTERO";
            CampoTesto.bloccato = true
            /*
            document.getElementById("DdlDestNazioneNascita").disabled=false
            document.getElementById("DdlDestNazioneNascita").style.backgroundColor="white"
            document.getElementById("DdlDestNazioneNascita").selectedIndex=0
            document.getElementById("LblCircleDestNazioneNascita").style.visibility = 'visible'
            */
        }

    }
}

//funzione introdotta per risolvere il defect dello smistatore SDP00110392 - INIZIO
function CodiceFaseOK() {
    try {
        var tmp = document.getElementById("TxtSmistatore").value;
        tmp = tmp.toUpperCase();

        if (tmp.indexOf("<COD_FASE>MGRC</COD_FASE>") == -1) {
            //window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante la lettura del metodo Leggi_Dati_Transazione. Codice fase non conguente.")
            var descrErr = 'Errore durante la lettura del metodo Leggi_Dati_Transazione: Codice fase non congruente.'
            objSmistatore.Visualizza_Msg(descrErr, 8)
            window.navigate("./../../exitnok.aspx")
            return false;
        }
    }
    catch (exception) { }
    return true
}
//funzione introdotta per risolvere il defect dello smistatore SDP00110392 - INIZIO

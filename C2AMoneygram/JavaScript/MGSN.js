var objSmistatore = null
var objSmistatoreStampa = null
var methodCallID = 0
var oCountryDetailObject = null
var oSendPreviewObject = null
var oDirAgentsCityObject = null
var oStatesObject = null
var lastObjFocus = null
var flgDdlClick = false
var flgCountryChanged = false
var flgDatiTransWorking = false
var flgMulti = true
var printAgentiOK = false
var ESCenabled = true
var flgGridScroll = true
var flgWorking = false
var fieldName1 = new Array()
var fieldName2 = new Array()
var labelName1 = new Array()
var labelName2 = new Array()
var DatiTransazione = ""
var flgTabMittAttivo = false
var flgTabDestAttivo = false
var errore = ""

var oPrestampaObject = null
var oRestart1Object = null
var oSendObject = null
var flgValidateTab3 = false
var flgPage = 0
var flgCancellaMessaggio = true
var iTipoDoc = ""
var flgChCity = false
var WarningCodiceFiscaleMittErrato = false

function window::onunload() {
    createCookie("SessionStatus", "", -1)
    return true
}
function LoadHTables() {
    fieldName1[0] = "senderFirstName"
    fieldName2[0] = "TxtNomeMitt"
    fieldName1[1] = "senderLastName"
    fieldName2[1] = "TxtCognomeMitt"
    fieldName1[2] = "senderAddress"
    fieldName2[2] = "TxtIndirizzoMitt"
    fieldName1[3] = "senderCity"
    fieldName2[3] = "TxtCittaMitt"
    fieldName1[4] = "senderCountry"
    fieldName2[4] = "DdlPaeseMitt"
    fieldName1[5] = "senderState"
    fieldName2[5] = "DdlStatoMitt"
    fieldName1[6] = "senderZipCode"
    fieldName2[6] = "TxtCAPMitt"
    fieldName1[7] = "MittTelefono"
    fieldName2[7] = "TxtTelefonoMitt"
    fieldName1[8] = "senderDOB"
    fieldName2[8] = "UctrlDataNascitaMitt:TxtDate"
    fieldName1[9] = "senderBirthCity"
    fieldName2[9] = "TxtLuogoNascitaMitt"
    fieldName1[10] = "senderDocumentId"
    fieldName2[10] = "DdlTipoDocumento"
    fieldName1[11] = "senderDocumentNumber"
    fieldName2[11] = "TxtNumDocumento"
    fieldName1[12] = "senderEnteRilascioDoc"
    fieldName2[12] = "TxtEnteEmittenteDocum"
    fieldName1[13] = "senderDocumentCountry"
    fieldName2[13] = "DdlPaeseRilascioDocum"
    fieldName1[14] = "receiverCountry"
    fieldName2[14] = "DdlPaeseDest"
    fieldName1[15] = "receiverState"
    fieldName2[15] = "DdlStatoDest"
    fieldName1[16] = "receiverLastName"
    fieldName2[16] = "TxtCognomeDest"
    fieldName1[17] = "receiverFirstName"
    fieldName2[17] = "TxtNomeDest"
    fieldName1[18] = "receiverLastName2"
    fieldName2[18] = "TxtCognome2Dest"
    fieldName1[19] = "receiverAddress"
    fieldName2[19] = "TxtIndirizzoDest"
    fieldName1[20] = "receiverCity"
    fieldName2[20] = "TxtCittaDest"
    fieldName1[21] = "receiverZipCode"
    fieldName2[21] = "TxtCAPDest"

    /** MEV 115957 V.Berto Adeguamento AC 15.12 - eliminati campi come da requisiti */
    //fieldName1[22] = "testQuestion"
    //fieldName2[22] = "TxtDomandaDest"
    //fieldName1[23] = "testAnswer"
    //fieldName2[23] = "TxtRispostaDest"

    fieldName1[22] = "messageField1"
    fieldName2[22] = "TxtMessaggioDest1"
    fieldName1[23] = "messageField2"
    fieldName2[23] = "TxtMessaggioDest2"
    //DE LEO: Aggiunta campi 
    fieldName1[24] = "senderCodFiscale"
    fieldName2[24] = "TxtCodiceFiscaleMitt"
    //fieldName1[9]="senderBirthCity"
    //fieldName2[9]="DdlNazioneNascitaMitt"



    labelName1[0] = "DdlPaeseMitt"
    labelName2[0] = "LblDdlPaeseMitt"
    labelName1[1] = "DdlStatoMitt"
    labelName2[1] = "LblDdlStatoMitt"
    labelName1[2] = "DdlTipoDocumento"
    labelName2[2] = "LblDdlTipoDocumento"
    labelName1[3] = "DdlPaeseRilascioDocum"
    labelName2[3] = "LblDdlPaeseRilascioDocum"
    labelName1[4] = "DdlStatoRilascioDocum"
    labelName2[4] = "LblDdlStatoRilascioDocum"
    labelName1[5] = "DdlPaeseDest"
    labelName2[5] = "LblDdlPaeseDest"
    labelName1[6] = "DdlStatoDest"
    labelName2[6] = "LblDdlStatoDest"
}
function init() {
    //DivC2AVisible('hidden');
  //  alert("init");

    document.Form1.DdlPaese.useService("./../../LocalServices/cCountryDetailWebService.asmx?wsdl", "CountryDetail")
    document.Form1.DdlPaese.useService("./../../LocalServices/cSendPreviewWebService.asmx?wsdl", "SendPreview")
    document.Form1.DdlPaese.useService("./../../LocalServices/cDirAgentsCityWebService.asmx?wsdl", "DirAgentsCity")
    document.Form1.DdlPaese.useService("./../../LocalServices/cStateWebService.asmx?wsdl", "States")
    document.Form1.DdlPaese.useService("./../../LocalServices/cRestart1AndPreStampa.asmx?wsdl", "RestartPrestampa")
    document.Form1.DdlPaese.useService("./../../LocalServices/cSendWebService.asmx?wsdl", "Send")
        
    if (isComplianceEnabled(objSmistatore, "MGSN")) {
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
    }

    //GESTIONE datamatrix
    var datamatrix = objSmistatore.ReadDMXContext();
    //alert(datamatrix);
    storeSessionKey("DMX", "NO");    
    if (datamatrix) {       
        var xml = parseXml(objSmistatore.strXMLDocRitorno);
        var resultDataMtx = parseDatamatrix(decodeURIComponent(xml.getElementsByTagName('Result')[0].childNodes[0].nodeValue));
        if (resultDataMtx) {

            if (xmlCompliance != null && xmlCompliance.getElementsByTagName("Presentatore")[0] != null) { //se esiste una sessione presentatore controllo il datamatrix

                if ( xmlCompliance.getElementsByTagName("Presentatore")[0].getElementsByTagName("CF")[0].childNodes[0].nodeValue !== resultDataMtx.codFiscale ) {
                    var tasto = objSmistatore.Visualizza_Msg_New(MSG.mgr_dmx_cfko, 2003, "&Si", "&No");
                    if (tasto !== 1)
                        window.navigate("./../../exitnok.aspx");
                } else {
                    document.getElementById("DdlPaese").focus();

                    document.getElementById("UctrlImporto_TextEuro").value = resultDataMtx.importo;
                    document.getElementById("DdlPaese").value = resultDataMtx.paeseDest;
                    document.getElementById("TxtCognomeDest").value = resultDataMtx.cognomeDest.split('~')[0];
                    if (resultDataMtx.cognomeDest.split('~').length == 2) {
                        document.getElementById("TxtCognome2Dest").value = resultDataMtx.cognomeDest.split('~')[1];
                    }
                    
                    document.getElementById("TxtNomeDest").value = resultDataMtx.nomeDest;

                    document.getElementById("txtComando").focus();
                    storeSessionKey("DMX", "YES");
                }
            } else {
                document.getElementById("DdlPaese").focus();

                document.getElementById("UctrlImporto_TextEuro").value = resultDataMtx.importo;
                document.getElementById("DdlPaese").value = resultDataMtx.paeseDest;
                document.getElementById("TxtCognomeDest").value = resultDataMtx.cognomeDest.split('~')[0];

                if (resultDataMtx.cognomeDest.split('~').length == 2) {
                    document.getElementById("TxtCognome2Dest").value = resultDataMtx.cognomeDest.split('~')[1];
                }

                document.getElementById("TxtNomeDest").value = resultDataMtx.nomeDest;

                document.getElementById("txtComando").focus();
                storeSessionKey("DMX", "YES");
            }

            
        }
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
function createSmistatoreStampa() {
    try {
        objSmistatoreStampa = SmistatoreStampa(false)
    }
    catch (exception) {
        window.navigate("./../../Error.aspx?err=Errore nella creazione dello Smistatore di Stampa&techerr=" + exception.description)
        return false
    }
    return true
}
function leggiDatiTransazione() {
    flgDatiTransWorking = true
    var bRCSmistatore
    if (objSmistatore == null) {
        createSmistatore()
    }
    disableFirstPage(true)
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
    DatiTransazione = objSmistatore.strXMLDocRitorno
    
    var pippo = parseXml(DatiTransazione);
    storeSessionKey("ID4ANNULLO", pippo.getElementsByTagName('Sdp')[0].getElementsByTagName('Id_Opez')[0].childNodes[0].nodeValue);
    storeSessionKey("OPEZ4ANNULLO", pippo.getElementsByTagName('Controlli')[0].getElementsByTagName('Last_Ope')[0].childNodes[0].nodeValue);

    document.getElementById("TxtSmistatore").value = objSmistatore.strXMLDocRitorno
    objSmistatore.Visualizza_Msg("")
    enableFirstPage()
    flgDatiTransWorking = false
    return true
}
function reportError(err, strNomeWebService) {
    cancellaRestart()
    window.navigate("./../../Error.aspx?err=Web Service '" + strNomeWebService + "' non disponibile&techerr=Errore nella chiamata client-side al web service locale~Eccezione: " + encodeURI(err.string))
}
function DdlPaeseOnChange() {
    disableFirstPage(false)
    clearFirstPage()
    flgCountryChanged = true
    flgDdlClick = false
    document.Form1.DdlPaese.focus()
    document.Form1.DdlModalitaPagamento.selectedIndex = 0
    document.Form1.DdlModalitaPagamento.disabled = true
    document.Form1.DdlTipoImporto.selectedIndex = 0
    oCountryDetailObject = null
}
function clearFirstPage() {
    if (document.Form1.DdlStato.length > 0) {
        for (i = document.Form1.DdlStato.length - 1; i >= 0; i--) {
            document.Form1.DdlStato.remove(i)
        }
    }
    document.Form1.DdlStato.style.backgroundColor = 'white'
    document.Form1.TxtRestrizioni.value = ""
    document.Form1.DdlTipoImporto.selectedIndex = 0
    document.getElementById("LblDivisa").innerHTML = ""
    document.getElementById("UctrlImporto:TextEuro").value = "0,00"
}
function disableFirstPage(ddlcountry) {
    //document.Form1.TxtCodiceCliente.disabled = true
    document.Form1.TxtCodicePromozionale.disabled = true
    document.Form1.DdlTipoImporto.disabled = true
    document.getElementById("UctrlImporto:TextEuro").disabled = true
    document.Form1.TxtRestrizioni.disabled = true
    document.Form1.DdlStato.disabled = true
    document.Form1.DdlModalitaPagamento.disabled = true
    if (ddlcountry) {
        document.Form1.DdlPaese.disabled = true
    }
}
function enableFirstPage() {
    //document.Form1.TxtCodiceCliente.disabled = true
    document.Form1.TxtCodicePromozionale.disabled = false
    document.Form1.DdlTipoImporto.disabled = false
    document.getElementById("UctrlImporto:TextEuro").disabled = false
    document.Form1.TxtRestrizioni.disabled = false
    document.Form1.DdlPaese.disabled = false
    document.Form1.DdlModalitaPagamento.disabled = false
    if (document.Form1.DdlStato.length > 0)
        document.Form1.DdlStato.disabled = false
}
function disableSecondPage(bValue) {
}
function clearSecondPage() {
    flgChCity = false
    document.getElementById("TxtPaese").value = ""
    document.getElementById("TxtStato").value = ""
}
function DdlTipoImportoOnChange() {
    if ((document.Form1.DdlModalitaPagamento.selectedIndex > 0) && (document.Form1.DdlTipoImporto.value == 'VDIST')) {
        var s = document.Form1.DdlModalitaPagamento.value
        document.getElementById("LblDivisa").innerHTML = s.substring(s.lastIndexOf('-') + 1, s.length)
    }
    else if (document.Form1.DdlTipoImporto.selectedIndex == 0) {
        document.getElementById("LblDivisa").innerHTML = ""
    }
    else {
        document.getElementById("LblDivisa").innerHTML = "EUR"
    }
}
function DdlModalitaPagamentoOnChange() {
    if ((document.Form1.DdlModalitaPagamento.selectedIndex > 0) && (document.Form1.DdlTipoImporto.value == 'VDIST')) {
        var s = document.Form1.DdlModalitaPagamento.value
        document.getElementById("LblDivisa").innerHTML = s.substring(s.lastIndexOf('-') + 1, s.length)
    }
    else if (document.Form1.DdlTipoImporto.selectedIndex == 0) {
        document.getElementById("LblDivisa").innerHTML = ""
    }
    else {
        document.getElementById("LblDivisa").innerHTML = "EUR"
    }
}
function showResultsSendPreview(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cSendPreviewWebService")
    }
    else {
        oSendPreviewObject = methodResult.value
        objSmistatore.Visualizza_Msg("oSendPreviewObject = " + oSendPreviewObject)
        if (oSendPreviewObject.ErrorType != "") {
            if (oSendPreviewObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                
                riprovaAbbandona(oSendPreviewObject.ErrorMessage, oSendPreviewObject.ErrorType, "invokePTSendPreview()")
            }
            return
        }
        flgCancellaMessaggio = true
        document.getElementById("TabStripMoneyGram").disabled = false
        var tab = document.getElementById("TabStripMoneyGram").getTab(1)
        tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiOpe2.gif")
        tab.setAttribute("disabled", null)
        document.getElementById("btnModificaDati").disabled = false
        document.getElementById("TabStripMoneyGram").selectedIndex = 1
        objSmistatore.Visualizza_Msg("")
        var i
        document.getElementById("UctrlImportoEuro:TextEuro").value = oSendPreviewObject.SendAmount
        document.getElementById("UctrlCommissioneEuro:TextEuro").value = oSendPreviewObject.FeeAmount
        document.getElementById("UctrlTotaleEuro:TextEuro").value = oSendPreviewObject.TotalAmount
        document.Form1.TxtPaese.value = document.Form1.DdlPaese.item(document.Form1.DdlPaese.selectedIndex).text
        document.Form1.TxtCodicePromozionaleP2.value = document.Form1.TxtCodicePromozionale.value
        if (document.Form1.DdlStato.value != "")
            document.Form1.TxtStato.value = document.Form1.DdlStato.item(document.Form1.DdlStato.selectedIndex).text
        else
            document.Form1.TxtStato.value = ""
        MakeGridImporti()
    }
    /*
    if (document.Form1.TxtCodiceCliente.value != "") {
        document.Form1.TxtMittenteLista.value = oSendPreviewObject.ListaOperazioni[0].senderFirstName + " " + oSendPreviewObject.ListaOperazioni[0].senderLastName
        document.Form1.TxtCodiceClienteLista.value = document.Form1.TxtCodiceCliente.value
        document.Form1.TxtPaeseLista.value = getCountryDescription(oSendPreviewObject.ListaOperazioni[0].senderCountry)
        document.Form1.TxtPagamentoLista.value = document.Form1.DdlModalitaPagamento.item(document.Form1.DdlModalitaPagamento.selectedIndex).text
        if (oSendPreviewObject.ListaOperazioni[0].senderState != undefined) {
            document.Form1.TxtStatoLista.value = oSendPreviewObject.ListaOperazioni[0].senderState
        }
        document.Form1.TxtCittaLista.value = oSendPreviewObject.ListaOperazioni[0].senderCity
        document.Form1.TxtValutaContoLista.value = document.Form1.DdlTipoImporto.item(document.Form1.DdlTipoImporto.selectedIndex).text
        document.getElementById("LblValutaImporto").innerHTML = document.getElementById("LblDivisa").innerHTML
        document.Form1.TxtImportoLista.value = document.getElementById("UctrlImporto:TextEuro").value
        MakeGridListaOperazioni(oSendPreviewObject.ListaOperazioni)
    }
    */
    flgWorking = false
}
function showResultsCountryDetail(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cCountryDetailWebService")
    }
    else {
        if (DatiTransazione == "") {
            leggiDatiTransazione();
        }
        
        oCountryDetailObject = methodResult.value
        if (oCountryDetailObject.ErrorType != "") {
            if (oCountryDetailObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oCountryDetailObject.ErrorMessage, oCountryDetailObject.ErrorType, "invokePTCountryDetail()")
            }
            return
        }
        if (oCountryDetailObject.Restriction == "")
            oCountryDetailObject.Restriction = "Nessuna"
        if (oCountryDetailObject.SendActive == "true")
            oCountryDetailObject.SendActive = "SI"
        else
            oCountryDetailObject.SendActive = "NO"
        if (oCountryDetailObject.ExtraRules == "false")
            oCountryDetailObject.ExtraRules = "Nessuna"
        document.Form1.TxtRestrizioni.value = "Restrizioni: " + oCountryDetailObject.Restriction + "\n\n" + "Attivo per l'invio: " + oCountryDetailObject.SendActive + "\n\n" + "Norme Particolari: " + oCountryDetailObject.ExtraRules
        flgCountryChanged = false
        enableFirstPage()
        if (oCountryDetailObject.StateCodes.length == 0) {
            document.Form1.DdlStato.disabled = true
            document.Form1.DdlStato.style.backgroundColor = 'silver'
            //document.Form1.TxtCodiceCliente.focus() '2015
            document.Form1.TxtCodicePromozionale.focus()
        }
        else {
            var op = document.createElement("<option>")
            op.text = "Elenco Stati (selezionarne uno)"
            op.value = ""
            document.Form1.DdlStato.add(op)
            for (i = 0; i < oCountryDetailObject.StateCodes.length; i++) {
                var op = document.createElement("<option>")
                op.text = oCountryDetailObject.StateNames[i]
                op.value = oCountryDetailObject.StateCodes[i]
                document.Form1.DdlStato.add(op)
            }
            document.Form1.DdlStato.disabled = false
            document.Form1.DdlStato.style.backgroundColor = 'white'
            document.Form1.DdlStato.focus()
        }
        for (i = document.Form1.DdlTipoImporto.length - 1; i >= 0; i--) {
            document.Form1.DdlTipoImporto.remove(i)
        }
        var op0 = document.createElement("<option>")
        op0.text = "Tipo Valuta (selezionarne uno)"
        op0.value = ""
        document.Form1.DdlTipoImporto.add(op0)
        var op1 = document.createElement("<option>")
        op1.text = "Euro"
        op1.value = "EUR"
        document.Form1.DdlTipoImporto.add(op1)
        for (i = document.Form1.DdlModalitaPagamento.length - 1; i >= 0; i--) {
            document.Form1.DdlModalitaPagamento.remove(i)
        }
        var op0 = document.createElement("<option>")
        op0.text = "Modalita' Pagamento (selezionarne uno)"
        op0.value = ""
        document.Form1.DdlModalitaPagamento.add(op0)
        var flagValuta = false
        for (i = 0; i < oCountryDetailObject.ChiaveMP.length; i++) {
            var iLen = oCountryDetailObject.ChiaveMP[i].length;
            var r3 = oCountryDetailObject.ChiaveMP[i].substring(iLen, iLen - 3);
            if (r3 != "EUR") flagValuta = true
            var op = document.createElement("<option>")
            op.text = oCountryDetailObject.DescrizioneMP[i].replace(' /', '')
            op.value = oCountryDetailObject.ChiaveMP[i]
            document.Form1.DdlModalitaPagamento.add(op)
            document.Form1.DdlModalitaPagamento.style.backgroundColor = 'white'
        }
        if (flagValuta) {
            var op2 = document.createElement("<option>")
            op2.text = "Valuta di destinazione"
            op2.value = "VDIST"
            document.Form1.DdlTipoImporto.add(op2)
        }
    }
    flgCancellaMessaggio = true
    flgWorking = false
}

function showResultsDirAgentsCity(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cDirAgentsCityWebService")
    }
    else {
        flgCancellaMessaggio = false
        oDirAgentsCityObject = methodResult.value
        if (oDirAgentsCityObject.ErrorType != "") {
            if (oDirAgentsCityObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oDirAgentsCityObject.ErrorMessage, oDirAgentsCityObject.ErrorType, "invokePTDirAgentsCity()")
            }
            return
        }
        if (oDirAgentsCityObject.AgentName.length < 1) {
            NoAgents()
            document.getElementById("TabStripMoneygram").disabled = false
            return
        }
        var appoChiave = document.Form1.DdlModalitaPagamento.value.substring(0, 12)
        if (appoChiave != "BANK_DEPOSIT") {
            objSmistatore.Visualizza_Msg("")
            document.Form1.TxtCodiceBeneficiario.disabled = true
            document.Form1.TxtCodiceBeneficiario.style.backgroundColor = "silver"
            document.Form1.TxtCodiceBeneficiario.style.borderColor = ""
            document.Form1.TxtCodiceBeneficiario.mandatory = "F"
        }
        else {
            document.Form1.TxtCodiceBeneficiario.disabled = false
            document.Form1.TxtCodiceBeneficiario.style.backgroundColor = "white"
            document.Form1.TxtCodiceBeneficiario.mandatory = "O"
            document.Form1.TxtCodiceBeneficiario.style.borderColor = "red"
        }
    }

    document.getElementById("TabStripMoneygram").disabled = false
    flgCancellaMessaggio = true
    flgWorking = false

}
function getCountryDescription(StateCode) {
    var i = 0;
    for (i = 0; i < oCountryCode.length; i++) {
        if (oCountryCode[i] == StateCode) {
            return oCountryDesc[i]
        }
    }
}
function showResultsStates(methodResult) {
    flgCancellaMessaggio = false
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
        document.Form1.DdlStatoMitt.disabled = true
        document.Form1.DdlStatoDest.disabled = true
        document.Form1.DdlStatoRilascioDocum.disabled = true
        objSmistatore.Visualizza_Msg("")
    }
    document.getElementById("TabStripMoneyGram").disabled = false
    PopolaMittenteDestinatario()
    document.getElementById("TabStripMoneyGram").selectedIndex = 3
    /*
    if (document.Form1.TxtCodiceCliente.value != "") {
        GestListaOperazione()
    }
    */

    disableSecondPage(false)
    flgCancellaMessaggio = true
    flgWorking = false
}
function invokePTCountryDetail() {
    var countrySelected = document.Form1.DdlPaese.options[document.Form1.DdlPaese.selectedIndex].value
    var oCall = new Object()
    oCall.funcName = "GetCountryDetails"
    oCall.timeout = 120
    flgWorking = true
    methodCallID = document.Form1.DdlPaese.CountryDetail.callService(showResultsCountryDetail, oCall, countrySelected)
}
function invokePTSend() {
    var oCall = new Object()
    oCall.funcName = "GetSendDetails"
    oCall.timeout = 190
    var strXML = document.Form1.TxtSmistatore.value
    var strSendAmount = oSendPreviewObject.SendAmount
    var strFeeAmount = oSendPreviewObject.FeeAmount
    var strmgiTransactionSessionId = oSendPreviewObject.mgiTransactionSessionId
    var strMsg1 = escape(document.getElementById("TxtMessaggioDest1").value)
    var strMsg2 = escape(document.getElementById("TxtMessaggioDest2").value)
    var strReceiveCountry = oSendPreviewObject.ReceiveCountry
    var strIndirizzoDest = escape(document.getElementById("TxtIndirizzoDest").value)
    var strCittaDest = escape(document.getElementById("TxtCittaDest").value)
    var strNomeDest = escape(document.getElementById("TxtNomeDest").value)
    var strCognomeDest = escape(document.getElementById("TxtCognomeDest").value)
    var strCognome2Dest = escape(document.getElementById("TxtCognome2Dest").value)
    var strStatoDest = document.getElementById("DdlStatoDest").value
    var strPaeseDest = document.getElementById("DdlPaeseDest").value
    var strIndirizzoMitt = escape(document.getElementById("TxtIndirizzoMitt").value)
    //DE LEO
    //var strLuogoNascitaMitt=escape(document.getElementById("TxtLuogoNascitaMitt").value)
    var strLuogoNascitaMitt = document.getElementById("DdlNazioneNascitaMitt").value
    var strLuogoNascitaMittDesc = document.getElementById("DdlNazioneNascitaMitt").item(document.getElementById("DdlNazioneNascitaMitt").selectedIndex).text
    var strCodiceFiscaleMitt = document.getElementById("TxtCodiceFiscaleMitt").value
    var strCittaMitt = escape(document.getElementById("TxtCittaMitt").value)
    var strPaeseMitt = document.getElementById("DdlPaeseMitt").value
    var strDataNascitaMitt = document.getElementById("UctrlDataNascitaMitt:TxtDate").value
    var strPaeseRilascioDoc = document.getElementById("DdlPaeseRilascioDocum").value
    var strTipoDocumento = document.getElementById("DdlTipoDocumento").value
    var strNumDocumento = escape(document.getElementById("TxtNumDocumento").value)
    var strStatoRilascioDoc = document.getElementById("DdlStatoRilascioDocum").value
    var strEnteEmittente = escape(document.getElementById("TxtEnteEmittenteDocum").value)
    var strNomeMitt = escape(document.getElementById("TxtNomeMitt").value)
    var strCognomeMitt = escape(document.getElementById("TxtCognomeMitt").value)
   
    var strCittaRilDoc = escape(document.getElementById("TxtCittaRilascioDocum").value)
    var strDataRilDoc = document.getElementById("UctrlDataRilascioDocum:TxtDate").value
    var strCAPDest = escape(document.getElementById("TxtCAPDest").value)
    var strCAPMitt = escape(document.getElementById("TxtCAPMitt").value)
    var strStatoMitt = document.getElementById("DdlStatoMitt").value

    /** MEV 115957 V.Berto Adeguamento AC 15.12 - eliminati campi come da requisiti */
    //var strDomanda = escape(document.getElementById("TxtDomandaDest").value)
    //var strRisposta = escape(document.getElementById("TxtRispostaDest").value)
    var strDomanda = ""
    var strRisposta = ""

    var strTransType = oSendPreviewObject.TransactionType
    var strCittaInvio = ""
    var strPaeseInvio = document.getElementById("DdlPaese").item(document.getElementById("DdlPaese").selectedIndex).text
    var strTipoDocumentoDesc = ""
    var strCodiceRRN = document.Form1.TxtCodiceBeneficiario.value
    var strTipoInvio = document.getElementById("DdlModalitaPagamento").item(document.getElementById("DdlModalitaPagamento").selectedIndex).text
       
    var strNumberCard = ''; //document.getElementById("TxtTelefonoMitt").value
   
    var strChiave = document.Form1.DdlModalitaPagamento.value
    var strConsumerId = oSendPreviewObject.ListaOperazioni[0].consumerId
    if (document.Form1.DdlTipoDocumento.value != 0)
        strTipoDocumentoDesc = document.getElementById("DdlTipoDocumento").item(document.getElementById("DdlTipoDocumento").selectedIndex).text
    var strPaeseRilascioDocDesc = document.getElementById("DdlPaeseRilascioDocum").item(document.getElementById("DdlPaeseRilascioDocum").selectedIndex).text + " " + document.getElementById("TxtEnteEmittenteDocum").value + " " + document.getElementById("TxtCittaRilascioDocum").value
    var strStatoRilascioDocDesc = document.getElementById("DdlStatoRilascioDocum").item(document.getElementById("DdlStatoRilascioDocum").selectedIndex).text
    var strPayoutExchangeRate = oSendPreviewObject.PayoutExchangeRate
    var bPayoutGuaranteeIndicator = oSendPreviewObject.PayoutGuaranteeIndicator
    var strPayoutReceiveAmount = oSendPreviewObject.PayoutReceiveAmount
    var strPayoutReceiveCurrency = oSendPreviewObject.PayoutReceiveCurrency
    var strSendCurrency = oSendPreviewObject.SendCurrency
    var strTotalAmount = oSendPreviewObject.TotalAmount
    var strTransExchangeRate = oSendPreviewObject.TransExchangeRate
    var bTransGuaranteeIndicator = oSendPreviewObject.TransGuaranteeIndicator
    var strTransReceiveAmount = oSendPreviewObject.TransReceiveAmount
    var strTransReceiveCurrency = oSendPreviewObject.TransReceiveCurrency
    var strCodicePromozionale = document.getElementById("TxtCodicePromozionale").value

    /*MEV 115957*/
    var strDescOrigineDeiFondi = ""
    var strDescScopoTransazione = ""
    var strDescRelazioneBeneficiario = ""
    try{
        var eScopoTransazione = document.getElementById("DdlScopoTransazione");
        strDescScopoTransazione = eScopoTransazione.options[eScopoTransazione.selectedIndex].text;
        var eOrigineDeiFondi = document.getElementById("DdlOrigineDeiFondi");
        strDescOrigineDeiFondi = eOrigineDeiFondi.options[eOrigineDeiFondi.selectedIndex].text;
        var eRelazioneBeneficiario = document.getElementById("DdlRelazioneBeneficiario");
        strDescRelazioneBeneficiario = eRelazioneBeneficiario.options[eRelazioneBeneficiario.selectedIndex].text;
    } catch (err) {
        alert(err.message) 
    }

    var strOrigineDeiFondi = document.getElementById("DdlOrigineDeiFondi").value
    var strScopoTransazione = document.getElementById("DdlScopoTransazione").value
    var strRelazioneBeneficiario = document.getElementById("DdlRelazioneBeneficiario").value
    var strTelMitt = document.getElementById("TxtTelefonoMitt").value
    
    flgWorking = true
    methodCallID = document.Form1.DdlPaese.Send.callService(showResultsSend, oCall,
    escape(strXML), strSendAmount, strFeeAmount, strMsg1, strMsg2, strReceiveCountry,
    strIndirizzoDest, strCittaDest, strNomeDest, strCognomeDest, strCognome2Dest, strStatoDest,
    strPaeseDest, strIndirizzoMitt, strLuogoNascitaMitt, strCittaMitt, strPaeseMitt,
    strDataNascitaMitt, strPaeseRilascioDoc, strTipoDocumento, strNumDocumento, strStatoRilascioDoc,
    strEnteEmittente, strNomeMitt, strCognomeMitt, strTelMitt, strCittaRilDoc, strDataRilDoc,
    strCAPDest, strCAPMitt, strStatoMitt, strDomanda, strRisposta, strTransType, strCittaInvio,
    strPaeseInvio, strTipoDocumentoDesc, strPaeseRilascioDocDesc, strStatoRilascioDocDesc,
    strPayoutExchangeRate, bPayoutGuaranteeIndicator, strPayoutReceiveAmount, strPayoutReceiveCurrency,
    strSendCurrency, strTotalAmount, strTransExchangeRate, bTransGuaranteeIndicator, strTransReceiveAmount,
    strTransReceiveCurrency, escape(DatiTransazione), escape(strCodiceRRN), escape(strNumberCard), strChiave,
    strConsumerId, strCodiceFiscaleMitt, strLuogoNascitaMittDesc, strmgiTransactionSessionId, strCodicePromozionale, strTipoInvio, 
    strOrigineDeiFondi, strScopoTransazione, strRelazioneBeneficiario, strDescOrigineDeiFondi, strDescScopoTransazione, strDescRelazioneBeneficiario)
}

function showResultsSend(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cSendWebService")
    }
    else {
        oSendObject = methodResult.value
        if (oSendObject.ErrorType != "") {
            if (oSendObject.ErrorType == "TimeOut") {
                cancellaRestart()
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oSendObject.ErrorMessage, oSendObject.ErrorType, "invokePTSend()")
            }
            return
        }
        window.navigate("./MGRSendResponse.aspx")
    }
}
function invokePTSendPreview() {
    var oCall = new Object()
    flgCancellaMessaggio = false
    oCall.funcName = "GetSendPreviewDetails"
    oCall.timeout = 190
    var strXML = document.Form1.TxtSmistatore.value
    var strTipoImporto = document.Form1.DdlTipoImporto.value
    var strImporto = document.getElementById("UctrlImporto:TextEuro").value
    var strTransType = oCountryDetailObject.TransType
    /*SDPSVX-20081110-I.Parisi-Inizio-MoneyGram AC 7.6 fase II*/
    var strCodiceCliente = "" //escape(document.Form1.TxtCodiceCliente.value)
    /*SDPSVX-20081110-I.Parisi-Inizio-MoneyGram AC 7.6 fase II*/
    var strCodicePromozionale = escape(document.Form1.TxtCodicePromozionale.value)
    var strPaese = document.Form1.DdlPaese.value
    var strCitta = null
    var strStato = document.Form1.DdlStato.value
    var ChiaveMP = document.Form1.DdlModalitaPagamento.value
    flgWorking = true
    //objSmistatore.Visualizza_Msg("strXML = " + strXML + " strTipoImporto = " + strTipoImporto + " strTransType = " + strTransType + " strCodicePromozionale = " + strCodicePromozionale + " strPaese = " + strPaese + " strCitta = " + strCitta + " strStato = " + strStato + "ChiaveMP = " + ChiaveMP)
    methodCallID = document.Form1.DdlPaese.SendPreview.callService(showResultsSendPreview, oCall,
    escape(strXML), strTipoImporto, strImporto, strTransType, strCodiceCliente, strPaese,
    escape(strCitta), strStato, ChiaveMP, strCodicePromozionale)
    
    
}

function invokePTState() {
    var oCall = new Object()
    oCall.funcName = "GetStateDetails"
    oCall.timeout = 190
    methodCallID = document.Form1.DdlPaese.States.callService(showResultsStates, oCall)
    document.getElementById("TabStripMoneyGram").disabled = true
    disableSecondPage(true)
}
function txtComandoKeyDown() {
    if (FireSpecialKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (FireFunctionKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    var selectedTab = parseInt(document.getElementById("TabStripMoneyGram").selectedIndex)
    var appoChiave = document.Form1.DdlModalitaPagamento.value.substring(0, 12)
    if (flgWorking && (appoChiave != "BANK_DEPOSIT")) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (event.altKey == true) {
        if (event.keyCode != 67) {
            event.returnValue = false
            return
        }
        event.cancelBubble = true
        event.returnValue = false
    }
    if (event.keyCode == 9) {
        if (event.shiftKey == true) {
            switch (selectedTab) {
                case 0:
                    if (document.getElementById("UctrlImporto:TextEuro").disabled == false)
                        document.getElementById("UctrlImporto:TextEuro").focus()
                    else
                        lastObjFocus.focus()
                    break
                case 1:
                    if ((event.shiftKey == true) && (event.keyCode == 9)) {
                        document.getElementById("TabStripMoneyGram").selectedIndex = 0
                        event.cancelBubble = true
                        event.returnValue = false
                        return
                    }
                    break
                case 2:
                    /*if (isListaOperazioniEmpty()) {
                        document.getElementById("ckX").focus()
                    }
                    else {
                        document.getElementById("ck0").focus()
                    }
                    */
                    break
                case 3:
                    lastObjFocus.focus()
                    break
                case 4:
                    lastObjFocus.focus()
                    break
            }
        }
        else {
            switch (selectedTab) {
                case 0:
                    // defect SDP00097372 - fine
                    // fix il tab dopo "comando?" non deve andare su combo paese
                    if (document.getElementById("TxtCodicePromozionale").disabled == false) {
                        document.getElementById("TxtCodicePromozionale").focus()
                        break
                    }
                    // defect SDP00097372 - inizio
                    if (document.getElementById("DdlPaese").disabled == false)
                        document.getElementById("DdlPaese").focus()
                    break
                case 1:
                    break
                case 2:
                    //document.getElementById("DtgLista").focus()
                    break
                case 3:
                    if (document.Form1.TxtCognomeMitt.disabled == false) {
                        document.getElementById("TxtCognomeMitt").focus()
                    }
                    break
                case 4:
                    document.getElementById("TxtCognomeDest").focus()
                    break
            }
        }
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (event.keyCode == 13) {
        
        switch (parseInt(selectedTab)) {
            case 0:
                if (oCountryDetailObject == null) {
                    if (checkPaese()) {
                        flgCancellaMessaggio = false
                        objSmistatore.Visualizza_Msg("Attendere. Caricamento dati in corso...")
                        disableFirstPage(true)
                        document.Form1.DdlModalitaPagamento.disabled = false
                        invokePTCountryDetail()
                        disableFirstPage(false)
                    }
                    else {
                        objSmistatore.Visualizza_Msg("Selezionare un paese. prova", 1001)
                        document.Form1.DdlPaese.focus()
                    }
                }
                else {
                    if (validateAfterCountryDetail()) {
                        objSmistatore.Visualizza_Msg("Attendere. Caricamento dati in corso...")
                        if (document.getElementById("DdlStato").value == "")
                            document.getElementById("DdlStato").style.backgroundColor = "silver"
                        disableFirstPage(true)
                        invokePTSendPreview() //XXXXX                        
                       
                      
                    }
                    else {
                        return
                    }
                }
                break
            case 1:
                cambiaTab()                
                PopolaMittenteDestinatario();
                break
            case 2:
                objSmistatore.Visualizza_Msg("Attendere. Caricamento dati in corso...")
                flgCancellaMessaggio = false
                
                if ((document.getElementById("TabStripMoneyGram").getTab(3).disabled == null) || (document.getElementById("TabStripMoneyGram").getTab(3).disabled == false)) {
                    LoadHTables()
                    clearFieldsStyle()
                    setRequiredFields()
                    setNotAllowedFields()
                    setDocumentType()
                    var tab = document.getElementById("TabStripMoneyGram").getTab(3)
                    tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabMittente1.gif")
                    flgTabMittAttivo = true
                    tab.setAttribute("disabled", null)
                    if (oStatesObject == null)
                        invokePTState()
                    else {
                        disableSecondPage(true)                                             
                        document.getElementById("TabStripMoneygram").selectedIndex = 4
                        flgTabDestAttivo = true                     

                        flgCancellaMessaggio = true
                        disableSecondPage(false)
                    }
                }
                break
            case 3:
                if (validateMittentePage() && chkFisc() ) {
                    objSmistatore.Visualizza_Msg("Attendere. Caricamento dati in corso...")
                    var tab = document.getElementById("TabStripMoneyGram").getTab(4)
                    tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDestinatario1.gif")
                    tab.setAttribute("disabled", null)
                    document.getElementById("TabStripMoneyGram").selectedIndex = 4
                    flgTabDestAttivo = true
                    if (document.Form1.TxtCodiceBeneficiario.mandatory == "O")
                        document.Form1.TxtCodiceBeneficiario.focus()
                    else
                        document.Form1.TxtCognomeDest.focus()
                }
                else
                    return
                break
            case 4:
                //TODO
                if (validateBeneficiarioPage()) {
                    disableTab4Fields(true);
                    document.getElementById("TabstripMoneygram").disabled = true
                    objSmistatore.Visualizza_Msg("Attendere. Caricamento dati in corso...")
                    if (preStampaInvio(objSmistatore, DatiTransazione, document.Form1, oSendPreviewObject, function (result, xml) {
                            if (result.errore !== '52') {
                                if (preStampaInvioCartaceo(objSmistatore, DatiTransazione, document.Form1, oSendPreviewObject)) {
                                    objSmistatore.Visualizza_Msg("Attendere. Operazione in corso...")
                                    invokePTSend();
                                } else {
                                    objSmistatore.Visualizza_Msg("");
                                    document.getElementById("TabstripMoneygram").disabled = false
                                    disableTab4Fields(false);
                                    document.getElementById("TxtCognomeDest").focus();
                                }
                            } else {
                                objSmistatore.Visualizza_Msg("");
                                document.getElementById("TabstripMoneygram").disabled = false
                                disableTab4Fields(false);
                                document.getElementById("TabStripMoneyGram").selectedIndex = 0
                                document.getElementById("TxtCognomeDest").focus();
                            }
                    })) {
                        objSmistatore.Visualizza_Msg("Attendere. Operazione in corso...")
                        invokePTSend();
                    } else {
                        objSmistatore.Visualizza_Msg("");
                        document.getElementById("TabstripMoneygram").disabled = false
                        disableTab4Fields(false);
                        document.getElementById("TxtCognomeDest").focus();
                    }
                    //getPrestampa()
                }
                break
        }
    }
}
function cambiaTab() {

    //if (document.Form1.TxtCodiceCliente.value == "") {
        objSmistatore.Visualizza_Msg("Attendere. Caricamento dati in corso...")
        flgCancellaMessaggio = true
        if ((document.getElementById("TabStripMoneyGram").getTab(3).disabled == null) || (document.getElementById("TabStripMoneyGram").getTab(3).disabled == false)) {
           
            LoadHTables()
            clearFieldsStyle()
            setRequiredFields()
            setNotAllowedFields()
            setDocumentType()
            var tab = document.getElementById("TabStripMoneyGram").getTab(3)
            tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabMittente1.gif")
            tab.setAttribute("disabled", null)
            // DE LEO FIX DEFECT SDP00097377 - INIZIO
            // commento la seguente riga
            //ClearMittenteDestinatario()
            // DE LEO FIX DEFECT SDP00097377 - FINE
            document.getElementById("TabStripMoneygram").selectedIndex = 3
            if (oStatesObject == null) invokePTState()
            document.Form1.TxtCognomeMitt.focus()
        }
/*    
} else {
        flgCancellaMessaggio = false
        if (!isListaOperazioniEmpty()) {
            if (isChecked("ck0") || isChecked("ck1") || isChecked("ck1")) {
                objSmistatore.Visualizza_Msg("")
            } else {
                objSmistatore.Visualizza_Msg("Selezionare nome dalla lista se coincidente con il Beneficiario")
            }
        } else {
            objSmistatore.Visualizza_Msg("")
            var tab = document.getElementById("TabStripMoneyGram").getTab(2)
            tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiListaOperazione.gif")
            tab.setAttribute("disabled", null)
            document.getElementById("TabStripMoneygram").selectedIndex = 2
            document.getElementById("ckX").focus()
            event.cancelBubble = true
            event.returnValue = false
            return
        }
        var tab = document.getElementById("TabStripMoneyGram").getTab(2)
        tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiListaOperazione.gif")
        tab.setAttribute("disabled", null)
        document.getElementById("TabStripMoneygram").selectedIndex = 2
        if (!isListaOperazioniEmpty()) {
            document.getElementById("ck0").focus()
        } else {
            document.getElementById("ckX").focus()
        }
    }
    */
}
/*
function isListaOperazioniEmpty() {
    return document.getElementById("ck0") == null
}
*/
/*
function isChecked(controlName) {
    if (document.getElementById(controlName) != null) {
        return (document.getElementById(controlName).checked)
    }
    else {
        return false
    }
}
*/

function getRestart1() {
    var oCall = new Object()
    oCall.funcName = "GetRestartXML"
    oCall.timeout = 190
    oCall.async = "false"
    var strXML = document.Form1.TxtSmistatore.value
    var strControlNames = "DdlPaeseDesc|DdlPaeseValue|DdlStatoDesc|DdlStatoValue|TxtCitta|DdlTipoImportoDesc|" +
    "DdlTipoImportoValue|UctrlImporto|TxtCodiceCliente|TxtPaese|TxtStato|DdlCittaDesc|DdlCittaValue|UctrlImportoEuro|" +
    "UctrlCommissioneEuro|UctrlTotaleEuro|TxtCognomeMitt|TxtNomeMitt|TxtIndirizzoMitt|DdlModalitaPagamentoDesc|DdlModalitaPagamentoValue|TxtCittaMitt|" +
    "DdlPaeseMittDesc|DdlPaeseMittValue|DdlStatoMittDesc|DdlStatoMittValue|TxtCAPMitt|TxtTelefonoMitt|" +
    "UctrlDataNascitaMitt|TxtLuogoNascitaMitt|TxtNumDocumento|DdlTipoDocumentoDesc|DdlTipoDocumentoValue|" +
    "TxtEnteEmittenteDocum|UctrlDataRilascioDocum|TxtCittaRilascioDocum|DdlPaeseRilascioDocumDesc|" +
    "DdlPaeseRilascioDocumValue|DdlStatoRilascioDocumDesc|DdlStatoRilascioDocumValue|DdlRelazioneBeneficiarioDesc|DdlRelazioneBeneficiarioValue|TxtCodiceBeneficiario|TxtCognomeDest|TxtNomeDest|TxtCognome2Dest|" +  //Franceco implementazione beneficiario
    "TxtIndirizzoDest|TxtCittaDest|TxtCAPDest|DdlPaeseDestDesc|DdlPaeseDestValue|DdlStatoDestDesc|DdlStatoDestValue|" + 
    "DdlOrigineDeiFondiDesc|DdlOrigineDeiFondiValue|DdlScopoTransazioneDesc|DdlScopoTransazioneValue|TxtMessaggioDest1|TxtMessaggioDest2|DdlNazioneNascitaMittDesc|DdlNazioneNascitaMittValue|TxtCodiceFiscaleMitt|TxtCodicePromozionale"    //Francesco modifica restart    
    //"TxtDomandaDest|TxtRispostaDest|TxtMessaggioDest1|TxtMessaggioDest2|DdlNazioneNascitaMittDesc|DdlNazioneNascitaMittValue|TxtCodiceFiscaleMitt|TxtCodicePromozionale"
    

    var strStatoDesc
    if (document.Form1.DdlStato.selectedIndex == -1)
        strStatoDesc = ""
    else
        strStatoDesc = document.Form1.DdlStato.item(document.Form1.DdlStato.selectedIndex).text
    var strControlValues = document.Form1.DdlPaese.item(document.Form1.DdlPaese.selectedIndex).text +
    "|" + document.Form1.DdlPaese.value +
    "|" + strStatoDesc +
    "|" + document.Form1.DdlStato.value +
    "|PA" +
    "|" + document.Form1.DdlTipoImporto.item(document.Form1.DdlTipoImporto.selectedIndex).text +
    "|" + document.Form1.DdlTipoImporto.value +
    "|" + document.getElementById("UctrlImporto:TextEuro").value +
    "|" + "" +
    "|" + document.Form1.TxtPaese.value +
    "|" + document.Form1.TxtStato.value +
    "|PA" +
    "|PA" +
    "|" + document.getElementById("UctrlImportoEuro:TextEuro").value +
    "|" + document.getElementById("UctrlCommissioneEuro:TextEuro").value +
    "|" + document.getElementById("UctrlTotaleEuro:TextEuro").value +
    "|" + document.Form1.TxtCognomeMitt.value +
    "|" + document.Form1.TxtNomeMitt.value +
    "|" + document.Form1.TxtIndirizzoMitt.value +
    "|" + document.Form1.DdlModalitaPagamento.item(document.Form1.DdlModalitaPagamento.selectedIndex).text +
    "|" + document.Form1.DdlModalitaPagamento.value +
    "|" + document.Form1.TxtCittaMitt.value +
    "|" + document.Form1.DdlPaeseMitt.item(document.Form1.DdlPaeseMitt.selectedIndex).text +
    "|" + document.Form1.DdlPaeseMitt.value +
    "|" + document.Form1.DdlStatoMitt.item(document.Form1.DdlStatoMitt.selectedIndex).text +
    "|" + document.Form1.DdlStatoMitt.value +
    "|" + document.Form1.DdlRelazioneBeneficiario.item(document.Form1.DdlRelazioneBeneficiario.selectedIndex).text +
    "|" + document.Form1.DdlRelazioneBeneficiario.value +
    "|" + document.Form1.TxtCAPMitt.value +
    "|" + document.Form1.TxtTelefonoMitt.value +
    "|" + document.getElementById("UctrlDataNascitaMitt:TxtDate").value +
    "|" + document.Form1.TxtLuogoNascitaMitt.value +
    "|" + document.Form1.TxtNumDocumento.value +
    "|" + document.Form1.DdlTipoDocumento.item(document.Form1.DdlTipoDocumento.selectedIndex).text +
    "|" + document.Form1.DdlTipoDocumento.value +
    "|" + document.Form1.TxtEnteEmittenteDocum.value +
    "|" + document.getElementById("UctrlDataRilascioDocum:TxtDate").value +
    "|" + document.Form1.TxtCittaRilascioDocum.value +
    "|" + document.Form1.DdlPaeseRilascioDocum.item(document.Form1.DdlPaeseRilascioDocum.selectedIndex).text +
    "|" + document.Form1.DdlPaeseRilascioDocum.value +
    "|" + document.Form1.DdlStatoRilascioDocum.item(document.Form1.DdlStatoRilascioDocum.selectedIndex).text +
    "|" + document.Form1.DdlStatoRilascioDocum.value +    
    "|" + document.Form1.TxtCodiceBeneficiario.value +
    "|" + document.Form1.TxtCognomeDest.value +
    "|" + document.Form1.TxtNomeDest.value +
    "|" + document.Form1.TxtCognome2Dest.value +
    "|" + document.Form1.TxtIndirizzoDest.value +
    "|" + document.Form1.TxtCittaDest.value +
    "|" + document.Form1.TxtCAPDest.value +
    "|" + document.Form1.DdlPaeseDest.item(document.Form1.DdlPaeseDest.selectedIndex).text +
    "|" + document.Form1.DdlPaeseDest.value +
    "|" + document.Form1.DdlStatoDest.item(document.Form1.DdlStatoDest.selectedIndex).text +
    "|" + document.Form1.DdlStatoDest.value +
    //"|" + document.Form1.TxtDomandaDest.value +
    //"|" + document.Form1.TxtRispostaDest.value +
    "|" + document.Form1.DdlOrigineDeiFondi.item(document.Form1.DdlOrigineDeiFondi.selectedIndex).text +
    "|" + document.Form1.DdlOrigineDeiFondi.value +
    "|" + document.Form1.DdlScopoTransazione.item(document.Form1.DdlScopoTransazione.selectedIndex).text +
    "|" + document.Form1.DdlScopoTransazione.value + 
    "|" + document.Form1.TxtMessaggioDest1.value +
    "|" + document.Form1.TxtMessaggioDest2.value +
    "|" + document.Form1.DdlNazioneNascitaMitt.item(document.Form1.DdlNazioneNascitaMitt.selectedIndex).text +
    "|" + document.Form1.DdlNazioneNascitaMitt.value +
    "|" + document.Form1.TxtCodiceFiscaleMitt.value + 
    "|" + document.Form1.TxtCodicePromozionale.value

    var strSendPreviewNames = "payoutExchangeRate|payoutReceiveAmount|payoutReceiveCurrency|" +
    "payoutIndicator|transExchangeRate|transReceiveAmount|transReceiveCurrency|" +
    "transIndicator|feeAmount|receiveCountry|sendAmount|sendCurrency|totalAmount|" +
    "transactionType|mgiTransactionSessionId"
    var strPayoutIndicator = oSendPreviewObject.PayoutGuaranteeIndicator == true ? "true" : "false"
    var strTransIndicator = oSendPreviewObject.TransGuaranteeIndicator == true ? "true" : "false"
    var strSendPreviewValues = oSendPreviewObject.PayoutExchangeRate + "|" + oSendPreviewObject.PayoutReceiveAmount + "|" +
    oSendPreviewObject.PayoutReceiveCurrency + "|" + strPayoutIndicator + "|" +
    oSendPreviewObject.TransExchangeRate + "|" + oSendPreviewObject.TransReceiveAmount + "|" +
    oSendPreviewObject.TransReceiveCurrency + "|" + strTransIndicator + "|" +
    oSendPreviewObject.FeeAmount + "|" + oSendPreviewObject.ReceiveCountry + "|" + oSendPreviewObject.SendAmount + "|" +
    oSendPreviewObject.SendCurrency + "|" + oSendPreviewObject.TotalAmount + "|" + oSendPreviewObject.TransactionType + "|" + oSendPreviewObject.mgiTransactionSessionId
    flgWorking = true
    methodCallID = document.Form1.DdlPaese.RestartPrestampa.callService(showResultsRestart1, oCall,
    escape(strXML), escape(strControlValues), strControlNames, escape(strSendPreviewValues), strSendPreviewNames)
}
function PopolaMittenteDestinatario() {
    
   // if ((document.Form1.TxtCodiceCliente.value == "") || (document.getElementById("ck0") == null)) {
        ClearMittenteDestinatario()
        PopolaMittente()
   /* }
    else {
        PopolaMittente()
        if (isChecked("ck0")) {
            if (oSendPreviewObject.ListaOperazioni[0].receiverLastName != undefined) {
                document.Form1.TxtCognomeDest.value = oSendPreviewObject.ListaOperazioni[0].receiverLastName
            }
            else {
                document.Form1.TxtCognomeDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[0].receiverFirstName != undefined) {
                document.Form1.TxtNomeDest.value = oSendPreviewObject.ListaOperazioni[0].receiverFirstName
            }
            else {
                document.Form1.TxtNomeDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[0].receiverAddress != undefined) {
                document.Form1.TxtIndirizzoDest.value = oSendPreviewObject.ListaOperazioni[0].receiverAddress
            }
            else {
                document.Form1.TxtIndirizzoDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[0].receiverCity != undefined) {
                document.Form1.TxtCittaDest.value = oSendPreviewObject.ListaOperazioni[0].receiverCity
            }
            else {
                document.Form1.TxtCittaDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[0].receiverLastName2 != undefined) {
                document.Form1.TxtCognome2Dest.value = oSendPreviewObject.ListaOperazioni[0].receiverLastName2
            }
            else {
                document.Form1.TxtCognome2Dest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[0].receiverZipCode != undefined) {
                document.Form1.TxtCAPDest.value = oSendPreviewObject.ListaOperazioni[0].receiverZipCode
            }
            else {
                document.Form1.TxtCAPDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[0].receiverState != undefined) {
                document.Form1.DdlStatoDest.value = oSendPreviewObject.ListaOperazioni[0].receiverState
            }
            else {
                document.Form1.DdlStatoDest.value = ""
            }

        } else if (isChecked("ck1")) {
            if (oSendPreviewObject.ListaOperazioni[1].receiverLastName != undefined) {
                document.Form1.TxtCognomeDest.value = oSendPreviewObject.ListaOperazioni[1].receiverLastName
            }
            else {
                document.Form1.TxtCognomeDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[1].receiverFirstName != undefined) {
                document.Form1.TxtNomeDest.value = oSendPreviewObject.ListaOperazioni[1].receiverFirstName
            }
            else {
                document.Form1.TxtNomeDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[1].receiverAddress != undefined) {
                document.Form1.TxtIndirizzoDest.value = oSendPreviewObject.ListaOperazioni[1].receiverAddress
            }
            else {
                document.Form1.TxtIndirizzoDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[1].receiverCity != undefined) {
                document.Form1.TxtCittaDest.value = oSendPreviewObject.ListaOperazioni[1].receiverCity
            }
            else {
                document.Form1.TxtCittaDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[1].receiverLastName2 != undefined) {
                document.Form1.TxtCognome2Dest.value = oSendPreviewObject.ListaOperazioni[1].receiverLastName2
            }
            else {
                document.Form1.TxtCognome2Dest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[1].receiverZipCode != undefined) {
                document.Form1.TxtCAPDest.value = oSendPreviewObject.ListaOperazioni[1].receiverZipCode
            }
            else {
                document.Form1.TxtCAPDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[1].receiverState != undefined) {
                document.Form1.DdlStatoDest.value = oSendPreviewObject.ListaOperazioni[1].receiverState
            }
            else {
                document.Form1.DdlStatoDest.value = ""
            }
        } else if (isChecked("ck2")) {
            if (oSendPreviewObject.ListaOperazioni[2].receiverLastName != undefined) {
                document.Form1.TxtCognomeDest.value = oSendPreviewObject.ListaOperazioni[2].receiverLastName
            }
            else {
                document.Form1.TxtCognomeDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[2].receiverFirstName != undefined) {
                document.Form1.TxtNomeDest.value = oSendPreviewObject.ListaOperazioni[2].receiverFirstName
            }
            else {
                document.Form1.TxtNomeDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[2].receiverAddress != undefined) {
                document.Form1.TxtIndirizzoDest.value = oSendPreviewObject.ListaOperazioni[2].receiverAddress
            }
            else {
                document.Form1.TxtIndirizzoDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[2].receiverCity != undefined) {
                document.Form1.TxtCittaDest.value = oSendPreviewObject.ListaOperazioni[2].receiverCity
            }
            else {
                document.Form1.TxtCittaDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[2].receiverLastName2 != undefined) {
                document.Form1.TxtCognome2Dest.value = oSendPreviewObject.ListaOperazioni[2].receiverLastName2
            }
            else {
                document.Form1.TxtCognome2Dest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[2].receiverZipCode != undefined) {
                document.Form1.TxtCAPDest.value = oSendPreviewObject.ListaOperazioni[2].receiverZipCode
            }
            else {
                document.Form1.TxtCAPDest.value = ""
            }
            if (oSendPreviewObject.ListaOperazioni[2].receiverState != undefined) {
                document.Form1.DdlStatoDest.value = oSendPreviewObject.ListaOperazioni[2].receiverState
            }
            else {
                document.Form1.DdlStatoDest.value = ""
            }
        } else {
            ClearMittenteDestinatario()
            PopolaMittente()
        }
}
*/
}


function caricaSessionePresentatore() {
   
    var strXMLdoc = "<Dati_Compliance>";
    strXMLdoc += "</Dati_Compliance>";

    var xmlOutput = objSmistatore.LeggiSessioneCompliance(strXMLdoc);    
    
    if (xmlOutput) {        
        var xmlDoc = parseXml(objSmistatore.strXMLDocRitorno);
        return xmlDoc;     
    }

    return null;
}

var xmlCompliance = null;

function PopolaMittente() {
    
    if (xmlCompliance == null) {
        xmlCompliance = caricaSessionePresentatore();
    }

    var presentatore = null;
    var primoDaEditare = null;

    if (xmlCompliance != null) {
        presentatore = xmlCompliance.getElementsByTagName("Presentatore")[0];
    }
    
    if (oSendPreviewObject.ListaOperazioni[0].senderLastName != undefined) {
        //document.Form1.TxtCognomeMitt.value = oSendPreviewObject.ListaOperazioni[0].senderLastName
        document.Form1.TxtCognomeMitt.nomeNascosto = oSendPreviewObject.ListaOperazioni[0].senderLastName;
    }
    if (presentatore != null) {
        document.Form1.TxtCognomeMitt.value = presentatore.getElementsByTagName("CO")[0].childNodes[0].nodeValue;
        document.Form1.TxtCognomeMitt.disabled = true;
        document.Form1.TxtCodiceFiscaleMitt.value = presentatore.getElementsByTagName("CF")[0].childNodes[0].nodeValue;
        document.Form1.TxtCodiceFiscaleMitt.disabled = 'true';
    }
    else {
        document.Form1.TxtCognomeMitt.value = ""
    }
    if (oSendPreviewObject.ListaOperazioni[0].senderFirstName != undefined) {
        //document.Form1.TxtNomeMitt.value = oSendPreviewObject.ListaOperazioni[0].senderFirstName
        document.Form1.TxtNomeMitt.nomeNascosto = oSendPreviewObject.ListaOperazioni[0].senderFirstName;
    }
    if (presentatore != null) {
        document.Form1.TxtNomeMitt.value = presentatore.getElementsByTagName("NO")[0].childNodes[0].nodeValue;
        document.Form1.TxtNomeMitt.disabled = 'true';
    }
    else {
        document.Form1.TxtNomeMitt.value = ""
    }
    if (oSendPreviewObject.ListaOperazioni[0].senderAddress != undefined) {
        document.Form1.TxtIndirizzoMitt.value = oSendPreviewObject.ListaOperazioni[0].senderAddress
    }
    
    if (presentatore.getElementsByTagName("IR")[0].childNodes[0] != null) {       
        document.Form1.TxtIndirizzoMitt.value = presentatore.getElementsByTagName("IR")[0].childNodes[0].nodeValue;        
    }
    else {        
        document.Form1.TxtIndirizzoMitt.value = ""
    }
    if (oSendPreviewObject.ListaOperazioni[0].senderCity != undefined) {
        document.Form1.TxtCittaMitt.value = oSendPreviewObject.ListaOperazioni[0].senderCity
    }
    if (presentatore.getElementsByTagName("CR")[0].childNodes[0] != null) {
        document.Form1.TxtCittaMitt.value = presentatore.getElementsByTagName("CR")[0].childNodes[0].nodeValue;        
    }
    else { 
        document.Form1.TxtCittaMitt.value = ""
    }
    if (oSendPreviewObject.ListaOperazioni[0].senderZipCode != undefined) {
        document.Form1.TxtCAPMitt.value = oSendPreviewObject.ListaOperazioni[0].senderZipCode
    }
    if (presentatore.getElementsByTagName("CAR")[0].childNodes[0] != null) {
        document.Form1.TxtCAPMitt.value = presentatore.getElementsByTagName("CAR")[0].childNodes[0].nodeValue;        
    }
    else {
        document.Form1.TxtCAPMitt.value = ""
    }
    if (oSendPreviewObject.ListaOperazioni[0].senderCountry != undefined) {
        document.Form1.DdlPaeseMitt.value = oSendPreviewObject.ListaOperazioni[0].senderCountry
        ChangeOtherCountry("DdlPaeseMitt", "DdlStatoMitt")
    }
    else {
        document.Form1.DdlPaeseMitt.value = ""
    }
    if (oSendPreviewObject.ListaOperazioni[0].senderState != undefined) {
        document.Form1.DdlStatoMitt.value = oSendPreviewObject.ListaOperazioni[0].senderState
    }
    else {
        document.Form1.DdlStatoMitt.value = ""
    }
        
    if (presentatore != null ) { // && document.getElementById("DdlTipoDocumento").mandatory == "O") {
        document.Form1.UctrlDataNascitaMitt_TxtDate.value = presentatore.getElementsByTagName("DN")[0].childNodes[0].nodeValue;
        document.Form1.UctrlDataNascitaMitt_TxtDate.disabled = 'true';
        document.Form1.TxtNumDocumento.value = presentatore.getElementsByTagName("ND")[0].childNodes[0].nodeValue;
        document.Form1.TxtNumDocumento.disabled = 'true';
        document.Form1.TxtEnteEmittenteDocum.value = presentatore.getElementsByTagName("NER")[0].childNodes[0].nodeValue;
        document.Form1.TxtEnteEmittenteDocum.disabled = 'true';
        document.Form1.TxtCittaRilascioDocum.value = presentatore.getElementsByTagName("NLR")[0].childNodes[0].nodeValue;
        document.Form1.TxtCittaRilascioDocum.disabled = 'true';

        
        document.Form1.UctrlDataRilascioDocum_TxtDate.value = presentatore.getElementsByTagName("DR")[0].childNodes[0].nodeValue;
        document.Form1.UctrlDataRilascioDocum_TxtDate.disabled = 'true';

        var tipoDoc = arrMapDocCompliance[presentatore.getElementsByTagName("TD")[0].childNodes[0].nodeValue];        
        if (tipoDoc != "") {            
            document.Form1.DdlTipoDocumento.value = tipoDoc;
            document.Form1.DdlTipoDocumento.disabled = 'true';
        } /*else {
            objSmistatore.Visualizza_Msg(MSG.mgr_doc_novalid, 8);
            window.navigate("./../../exitnok.aspx");
        }*/
    }



    

    /*
    if ((document.Form1.TxtCodiceCliente.value != "") && (!isListaOperazioniEmpty())) {
        if (isChecked("ck0") || isChecked("ck1") || isChecked("ck2")) {

            document.Form1.TxtCognomeMitt.disabled = false
            document.Form1.TxtCognomeMitt.style.borderColor = "red"
            document.Form1.TxtCognomeMitt.mandatory = "O"
            document.Form1.TxtNomeMitt.disabled = false
            document.Form1.TxtNomeMitt.style.borderColor = "red"
            document.Form1.TxtNomeMitt.mandatory = "O"
        }

    }*/

    primoDaEditare.focus();

}
function ClearMittenteDestinatario() {
    document.Form1.TxtCognomeMitt.value = ""
    //document.Form1.TxtCognomeDest.value = ""
    document.Form1.TxtNomeMitt.value = ""
    //document.Form1.TxtNomeDest.value = ""
    document.Form1.TxtIndirizzoMitt.value = ""
    document.Form1.TxtIndirizzoDest.value = ""
    document.Form1.TxtCittaMitt.value = ""
    document.Form1.TxtCittaDest.value = ""
    document.Form1.TxtCognome2Dest.value = ""
    document.Form1.TxtCAPMitt.value = ""
    document.Form1.TxtCAPDest.value = ""
    document.Form1.TxtCodiceBeneficiario.value = ""
    document.Form1.TxtTelefonoMitt.value = ""
    document.Form1.DdlStatoMitt.selectedIndex = 0
    document.Form1.DdlStatoDest.selectedIndex = 0
    document.Form1.DdlPaeseMitt.selectedIndex = 0
    document.Form1.DdlPaeseDest.selectedIndex = 0
    document.getElementById("UctrlDataNascitaMitt:TxtDate").value = "00/00/0000"
    document.Form1.TxtLuogoNascitaMitt.value = ""
    document.Form1.TxtNumDocumento.value = ""
    document.Form1.DdlTipoDocumento.selectedIndex = 0
    document.Form1.TxtEnteEmittenteDocum.value = ""
    document.getElementById("UctrlDataRilascioDocum:TxtDate").value = "00/00/0000"
    document.Form1.TxtCittaRilascioDocum.value = ""
    document.Form1.DdlPaeseRilascioDocum.selectedIndex = 0
    document.Form1.DdlStatoRilascioDocum.selectedIndex = 0
    /** MEV 115957 V.Berto Adeguamento AC 15.12 - eliminati campi come da requisiti */
    //document.Form1.TxtDomandaDest.value = ""
    //document.Form1.TxtRispostaDest.value = ""

    document.Form1.TxtMessaggioDest1.value = ""
    document.Form1.TxtMessaggioDest2.value = ""
    document.Form1.DdlNazioneNascitaMitt.selectedIndex = 0
}
function getPrestampa() {
    var oCall = new Object()
    oCall.funcName = "GetPreStampaXML"
    oCall.timeout = 190
    oCall.async = "false"
    var strXML = document.Form1.TxtSmistatore.value
    var strCognomeMitt = document.Form1.TxtCognomeMitt.value
    var strNomeMitt = document.Form1.TxtNomeMitt.value
    var strIndirizzoMitt = document.Form1.TxtIndirizzoMitt.value
    var strCittaMitt = document.Form1.TxtCittaMitt.value
    var strCAPMitt = document.Form1.TxtCAPMitt.value
    var strCognomeDest = document.Form1.TxtCognomeDest.value
    var strCognome2Dest = document.Form1.TxtCognome2Dest.value
    var strNomeDest = document.Form1.TxtNomeDest.value
    var strPaeseDestValue = document.Form1.DdlPaese.value
    var strPaeseDestText = document.Form1.DdlPaese.item(document.Form1.DdlPaese.selectedIndex).text

    /** MEV 115957 V.Berto Adeguamento AC 15.12 - eliminati campi come da requisiti */
    var strDomanda = "" //document.Form1.TxtDomandaDest.value
    var strRisposta = "" //document.Form1.TxtRispostaDest.value

    var strMessaggio1 = document.Form1.TxtMessaggioDest1.value
    var strMessaggio2 = document.Form1.TxtMessaggioDest2.value
    var strTipoDocumento = ""
    if (document.Form1.DdlTipoDocumento.value != 0)
        strTipoDocumento = document.Form1.DdlTipoDocumento.item(document.Form1.DdlTipoDocumento.selectedIndex).text
    var strNumeroDocumento = document.Form1.TxtNumDocumento.value
    var strPaeseRilascioDocumento = ""
    var strStatoRilascioDocumento = ""
    if (document.Form1.DdlPaeseRilascioDocum.value != "")
        strPaeseRilascioDocumento = document.Form1.DdlPaeseRilascioDocum.item(document.Form1.DdlPaeseRilascioDocum.selectedIndex).text
    if (document.Form1.DdlStatoRilascioDocum.value != "")
        strStatoRilascioDocumento = document.Form1.DdlStatoRilascioDocum.item(document.Form1.DdlStatoRilascioDocum.selectedIndex).text
    var strSendAmount = oSendPreviewObject.SendAmount
    var strFeeAmount = oSendPreviewObject.FeeAmount
    var strTotalAmount = oSendPreviewObject.TotalAmount
    var strTransReceiveCurrency = oSendPreviewObject.TransReceiveCurrency
    var strTransExchangeRate = oSendPreviewObject.TransExchangeRate
    var strTransReceiveAmount = oSendPreviewObject.TransReceiveAmount
    flgWorking = true
    disableTab4Fields(true)
    document.getElementById("TabstripMoneygram").disabled = true
    methodCallID = document.Form1.DdlPaese.RestartPrestampa.callService(showResultsPrestampa, oCall,
    escape(strXML), escape(strCognomeMitt), escape(strNomeMitt), escape(strIndirizzoMitt), escape(strCittaMitt), escape(strCAPMitt),
    escape(strCognomeDest), escape(strCognome2Dest), escape(strNomeDest), strPaeseDestText, strPaeseDestValue, escape(strDomanda), escape(strRisposta),
    escape(strMessaggio1), escape(strMessaggio2), strTipoDocumento, escape(strNumeroDocumento), strPaeseRilascioDocumento,
    strStatoRilascioDocumento, strSendAmount, strFeeAmount, strTotalAmount, strTransReceiveCurrency,
    strTransExchangeRate, strTransReceiveAmount)
}
function showResultsRestart1(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cRestart1AndPreStampa")
    }
    else {
        oRestart1Object = methodResult.value
        if (oRestart1Object.ErrorType != "") {
            if (oRestart1Object.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oRestart1Object.ErrorMessage, oRestart1Object.ErrorType, "getRestart1()")
            }
            return
        }
        var url = document.getElementById("TxtComando").getAttribute("Url")
        document.getElementById("TxtSmistatore").value = oRestart1Object.StrXmlRestart1
        scriviRestart(url)
        invokePTSend()
    }
}
function showResultsPrestampa(methodResult) {
    if (methodResult.error) {
        reportError(methodResult.errorDetail, "cRestart1AndPreStampa")
    }
    else {
        oPrestampaObject = methodResult.value
        if (oPrestampaObject.ErrorType != "") {
            if (oPrestampaObject.ErrorType == "TimeOut") {
                window.navigate("../../Error.aspx?err=Sessione scaduta. Tornare al menu principale e riavviare la fase&techerr=Sessione Scaduta")
            }
            else {
                riprovaAbbandona(oPrestampaObject.ErrorMessage, oPrestampaObject.ErrorType, "getPrestampa()")
            }
            return
        }
        disableTab4Fields(true)
        document.getElementById("TabstripMoneygram").disabled = true
        document.getElementById("TxtSmistatore").value = oPrestampaObject.StrXmlPreStampa
        createSmistatoreStampa()
        if (stampaModuloPrestampa()) {
            getRestart1()
        }
        else { }
    }
}
function validateMittentePage() {
    var objFocus
    var msg = ""
    var maxLenghtMsg = "Campo %_CAMPO_% troppo lungo (max %_LIMIT_%)."
    var response = true
        
    //objSmistatore.Visualizza_Msg("Entrato in validateMittentePage")
    
    document.getElementById("TxtCognomeMitt").mandatory = "O"
    

    //if (document.getElementById("TxtCognomeMitt").value == "") {
    //    msg += "cognome errato"
    //    objFocus = "TxtCognomeMitt"
    //    response = false
    //}
    //msg += "cognome errato"

    //if (!(CheckCampi(document.getElementById("TxtCognomeMitt"), "TXT")) || !(CheckCampiLimit(document.getElementById("TxtCognomeMitt"), "TXT", 3))) {
    if (!(CheckCampi(document.getElementById("TxtCognomeMitt"), "TXT")) ) {
        msg += "Cognome Mittente obbligatorio\n"
        /*if (!(CheckCampiLimit(document.getElementById("TxtCognomeMitt"), "TXT", 3))) {
            msg = maxLenghtMsg.replace("%_CAMPO_%", 'Cognome Mittente').replace('%_LIMIT_%', 30);
        }*/
        objFocus = "TxtCognomeMitt"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtNomeMitt"), "TXT")) ) {
        //if (!(CheckCampi(document.getElementById("TxtNomeMitt"), "TXT")) || !(CheckCampiLimit(document.getElementById("TxtNomeMitt"), "TXT", 20))) {
        msg = "Nome Mittente obbligatorio\n"
        /*if (!(CheckCampiLimit(document.getElementById("TxtNomeMitt"), "TXT", 20))) {
            msg = maxLenghtMsg.replace("%_CAMPO_%", 'Nome Mittente').replace('%_LIMIT_%', 20);            
        }*/
        objFocus = "TxtNomeMitt"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtCodiceFiscaleMitt"), "TXT"))) {
        msg += "Codice Fiscale Mittente Obbligatorio\n"
        objFocus = "TxtCodiceFiscaleMitt"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtTelefonoMitt"), "TXT")) ) {
        msg += "Telefono Mittente obbligatorio\n"
        /*if (!(CheckCampiLimit(document.getElementById("TxtCognomeMitt"), "TXT", 3))) {
            msg = maxLenghtMsg.replace("%_CAMPO_%", 'Cognome Mittente').replace('%_LIMIT_%', 30);
        }*/
        objFocus = "TxtTelefonoMitt"
        response = false
    }
    else if (document.getElementById("TxtTelefonoMitt").value.length > 10) {
        msg += "Telefono Mittente maggiore di 10 numeri\n"
        objFocus = "TxtTelefonoMitt"
        response = false
    }
    else if (document.getElementById("TxtCodiceFiscaleMitt").value.length != 16) {
        msg += "Codice Fiscale Mittente Errato\n"
        objFocus = "TxtCodiceFiscaleMitt"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtIndirizzoMitt"), "TXT")) ) {
        //if (!(CheckCampi(document.getElementById("TxtIndirizzoMitt"), "TXT")) || !(CheckCampiLimit(document.getElementById("TxtIndirizzoMitt"), "TXT", 30))) {
        msg += "Indirizzo Mittente Obbligatorio\n"
        /*if (!(CheckCampiLimit(document.getElementById("TxtIndirizzoMitt"), "TXT", 30))) {
            msg = maxLenghtMsg.replace("%_CAMPO_%", "Indirizzo Mittente").replace('%_LIMIT_%', 30);
        }*/
        objFocus = "TxtIndirizzoMitt"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtCittaMitt"), "TXT")) ) {
        //(!(CheckCampi(document.getElementById("TxtCittaMitt"), "TXT")) || !(CheckCampiLimit(document.getElementById("TxtCittaMitt"), "TXT", 20))) {
        msg += "Citta' Mittente Obbligatoria\n"
        /*if (!(CheckCampiLimit(document.getElementById("TxtCittaMitt"), "TXT", 20))) {
            msg = maxLenghtMsg.replace("%_CAMPO_%", "Citta' Mittente").replace('%_LIMIT_%', 20);
        }*/
        objFocus = "TxtCittaMitt"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("DdlPaeseMitt"), "DDL"))) {
        msg += "Selezionare un Paese\n"
        objFocus = "DdlPaeseMitt"
        response = false
    }
    /*
    else if (document.getElementById("TxtTelefonoMitt").value.length == 0) {   // MEV 115957 Francesco obbligatorietà telefono mittente
        msg += "Il Telefono e' obbligatorio Nuovo controllo\n"
        objFocus = "TxtTelefonoMitt"
        response = false
    }*/
    else if (document.getElementById("DdlRelazioneBeneficiario").value == "") {
        msg += "Relazione Beneficiario obbligatoria\n"
        objFocus = "DdlRelazioneBeneficiario"
        response = false
    }
    
    if (response == true) {
        if (document.getElementById("DdlPaeseMitt").value != "") {
            if (!validateCountryWithState("DdlPaeseMitt", "DdlStatoMitt")) {
                msg += "Selezionare uno Stato"
                objFocus = "DdlStatoMitt"
                response = false
            }
        }
        if (document.getElementById("DdlPaeseMitt").value == "") {
            if (document.getElementById("DdlStatoMitt").value != "") {
                msg += "Selezionare uno Stato"
                objFocus = "DdlStatoMitt"
                response = false
            }
        }
    }
    if (response == true) {
        if (!(CheckCampi(document.getElementById("TxtCAPMitt"), "TXT"))) {
            msg += "Il CAP e' obbligatorio\n"
            objFocus = "TxtCAPMitt"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtTelefonoMitt"), "TXT"))) {
            msg += "Il Telefono e' obbligatorio\n"
            objFocus = "TxtTelefonoMitt"
            response = false
        }
        else if ((document.getElementById("UctrlDataNascitaMitt:TxtDate").disabled == false) && (!(CheckCampi(document.getElementById("UctrlDataNascitaMitt:TxtDate"), "DAT")))) {
            msg += "Inserire una data valida\n"
            objFocus = "UctrlDataNascitaMitt:TxtDate"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtLuogoNascitaMitt"), "TXT"))) {
            msg += "La localita' valida e' obbligatoria\n"
            objFocus = "TxtLuogoNascitaMitt"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("DdlNazioneNascitaMitt"), "DDL"))) {
            msg += "Nazione di Nascita Mittente obbligatoria\n"
            objFocus = "DdlNazioneNascitaMitt"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtLuogoNascitaMitt"), "TXT"))) {
            msg += "La localita' valida e' obbligatoria\n"
            objFocus = "TxtLuogoNascitaMitt"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtNumDocumento"), "TXT"))) {
            msg += "Il campo Numero documento e' obbligatorio\n"
            objFocus = "TxtNumDocumento"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("DdlTipoDocumento"), "DDL"))) {
            msg += "Selezionare il tipo documento\n"
            objFocus = "DdlTipoDocumento"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtEnteEmittenteDocum"), "TXT"))) {
            msg += "Il Ente Emittente e' obbligatorio\n"
            objFocus = "TxtEnteEmittenteDocum"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("UctrlDataRilascioDocum:TxtDate"), "DAT"))) {
            msg += "Inserire una data di rilascio del documento valida\n"
            objFocus = "UctrlDataRilascioDocum:TxtDate"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtCittaRilascioDocum"), "TXT"))) {
            msg += "Il campo Citta' di rilascio del documento e' obbligatorio\n"
            objFocus = "TxtCittaRilascioDocum"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("DdlPaeseRilascioDocum"), "DDL"))) {
            msg += "Selezionare il paese di rilascio del documento\n"
            objFocus = "DdlPaeseRilascioDocum"
            response = false
        }
    }
    if (response == true) {
        if (document.getElementById("DdlPaeseRilascioDocum").value != "") {
            if (!validateCountryWithState("DdlPaeseRilascioDocum", "DdlStatoRilascioDocum")) {
                msg += "Selezionare uno Stato"
                objFocus = "DdlStatoRilascioDocum"
                response = false
            }
        }
        if (document.getElementById("DdlPaeseRilascioDocum").value == "") {
            if (document.getElementById("DdlStatoRilascioDocum").value != "") {
                msg += "Selezionare uno Stato"
                objFocus = "DdlStatoRilascioDocum"
                response = false
            }
        }
    }

    if (msg != "") {
        objSmistatore.Visualizza_Msg(msg, 1001);
        document.getElementById("TabStripMoneyGram").selectedIndex = 3;
        document.getElementById(objFocus).disabled = false;
        document.getElementById(objFocus).focus();
        response = false;
    }

    if (msg == "" && !chkMittente()) {
        response = false
    }

    return response
}

function chkMittente() {
    var objFocus = ""
    var msg = ""
    /*
    if (document.Form1.TxtCodiceCliente.value != "" && document.getElementById("TabStripMoneyGram").selectedIndex == 3) {
        if (document.Form1.TxtCognomeMitt.value != document.Form1.TxtCognomeMitt.nomeNascosto) {
            objFocus = "TxtCognomeMitt"
            msg = "Cognome mittente incongruente rispetto al codice Rewards inserito"
        } else if (document.Form1.TxtNomeMitt.value != document.Form1.TxtNomeMitt.nomeNascosto) {
            objFocus = "TxtNomeMitt"
            msg = "Nome mittente incongruente rispetto al codice Rewards inserito"
        }
    }
    */

    if (msg != "") {
        var ret = objSmistatore.Visualizza_Msg(msg, 4012)
        if (ret == 4) {
            document.getElementById("TabStripMoneyGram").selectedIndex = 3
            document.getElementById(objFocus).value = ""
            document.getElementById(objFocus).focus()
            return false
        } else {
            cancellaRestart()
            window.navigate("./../../exitnok.aspx")
            return false
        }
    }

    return true
}

function chkFisc() {
    res = true
    var msg1 = ""
    //alert ("Controllo fiscale")

    //click sul tabstrip "dati beneficiario". Se il messaggio di warning è stato già dato esco.
    if (document.getElementById("TabStripMoneyGram").selectedIndex == 4 && WarningCodiceFiscaleMittErrato )
	    return 

    if (document.getElementById("TabStripMoneyGram").selectedIndex >= 3) {
        if (document.getElementById("TxtCodiceFiscaleMitt").value.length == 16 && document.getElementById("TxtCodiceFiscaleMitt").value != "" && document.getElementById("TxtCodiceFiscaleMitt").value != "PF RESID. ESTERO" && !(codiceFISCALE(document.getElementById("TxtCodiceFiscaleMitt").value))) {
            objFocus = "TxtCodiceFiscaleMitt"
            msg1 = "prova Codice Fiscale Errato. Vuoi Continuare?\n"
            document.getElementById("TxtCodiceFiscaleMitt").style.backgroundColor = "white"
            var retcf = objSmistatore.Visualizza_Msg(msg1, 2003)
            if (retcf == 2) {
                document.getElementById("TxtIndirizzoMitt").style.backgroundColor = "white"
                document.getElementById("TabStripMoneyGram").selectedIndex = 3
                document.getElementById(objFocus).focus()
                res = false
            } else {
                WarningCodiceFiscaleMittErrato = true
            }
        }
    }
    //alert ("Fine Controllo fiscale")
    return res
}

function validateBeneficiarioPage() {
    var objFocus
    var msg = ""
    var response = true
    if (!(CheckCampi(document.getElementById("TxtCodiceBeneficiario"), "TXT"))) {
        msg += "Il campo Codice Beneficiario e' obbligatorio\n"
        objFocus = "TxtCodiceBeneficiario"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtCognomeDest"), "TXT"))) {
        msg += "Il campo Cognome e' obbligatorio\n"
        objFocus = "TxtCognomeDest"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("TxtNomeDest"), "TXT"))) {
        msg += "Il campo Nome e' obbligatorio\n"
        objFocus = "TxtNomeDest"
        response = false
    }
    else if (!(CheckCampi(document.getElementById("DdlPaeseDest"), "DDL"))) {
        msg += "Selezionare un Paese\n"
        objFocus = "DdlPaeseDest"
        response = false
    }
    if (response == true) {
        if (document.getElementById("DdlPaeseDest").value != "") {
            if (!validateCountryWithState("DdlPaeseDest", "DdlStatoDest")) {
                msg += "Selezionare uno Stato"
                objFocus = "DdlStatoDest"
                response = false
            }
        }
        if (document.getElementById("DdlPaeseDest").value == "") {
            if (document.getElementById("DdlStatoDest").value != "") {
                msg += "Selezionare uno Stato"
                objFocus = "DdlStatoDest"
                response = false
            }
        }
    }
    if (response == true) {
        if (!(CheckCampi(document.getElementById("TxtCognome2Dest"), "TXT"))) {
            msg += "Il campo 2" + String.fromCharCode(176) + " Cognome  e' obbligatorio\n"
            objFocus = "TxtCognome2Dest"
            response = false
        }
            /** MEV 115957 V.Berto Adeguamento AC 15.12 - eliminati campi come da requisiti */
        /*else if (!(CheckCampi(document.getElementById("TxtDomandaDest"), "TXT"))) {
            msg += "Il campo Domanda e' obbligatorio\n"
            objFocus = "TxtDomandaDest"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtRispostaDest"), "TXT"))) {
            msg += "Il campo Risposta e' obbligatorio\n"
            objFocus = "TxtRispostaDest"
            response = false
        }
        */


            /* MEV 115957 V.Berto Adeguamento Ac 15.12 */
        else if (document.getElementById("DdlOrigineDeiFondi").value == "") {
            msg += "Origine dei Fondi obbligatorio\n"
            objFocus = "DdlOrigineDeiFondi"
            response = false
        }
        else if (document.getElementById("DdlScopoTransazione").value == "") {
            msg += "Scopo della Transazione obbligatoria\n"
            objFocus = "DdlScopoTransazione"
            response = false
        }



        else if (!(CheckCampi(document.getElementById("TxtMessaggioDest1"), "TXT"))) {
            msg += "Il campo Messaggio1 e' obbligatorio\n"
            objFocus = "TxtMessaggioDest1"
            response = false
        }
        else if (!(CheckCampi(document.getElementById("TxtMessaggioDest2"), "TXT"))) {
            msg += "Il campo Messaggio2 e' obbligatorio\n"
            objFocus = "TxtMessaggioDest2"
            response = false
        }
    }
    if (msg != "") {
        objSmistatore.Visualizza_Msg(msg, 1001)
        document.getElementById(objFocus).focus()
    } else { //focus su ultimo campo per evitare la comparsa del messaggio conferma operazione
        document.getElementById("TxtMessaggioDest2").focus()
    }
    return response
}
function validateCountryWithState(countryCtrl, stateCtrl) {
    var countryValue = document.getElementById(countryCtrl).value
    var stateValue = document.getElementById(stateCtrl).value
    if (countryValue == "USA" || countryValue == "CAN" || countryValue == "MEX" || countryValue == "PRI") {
        if (stateValue == "")
            return false
    }
    return true
}
function validateAfterCountryDetail() {
    if (checkStato()) {
        if (true) {
            if (checkModalitaPagamento()) {
                if (checkTipoValuta()) {
                    if (checkImporto()) {
                        return true
                    }
                }
            }
        }
    }
    return false
}
function checkModalitaPagamento() {
    if (document.Form1.DdlModalitaPagamento.disabled == true)
        return true
    else if (document.Form1.DdlModalitaPagamento.selectedIndex == 0) {
        objSmistatore.Visualizza_Msg("Selezionare una Modalita' di Pagamento.", 1001)
        document.Form1.DdlModalitaPagamento.focus()
        return false
    }
    else
        return true
}
function checkTipoValuta() {
    if (document.Form1.DdlTipoImporto.disabled == true)
        return true
    else if (document.Form1.DdlTipoImporto.selectedIndex == 0) {
        objSmistatore.Visualizza_Msg("Selezionare un Tipo Valuta.", 1001)
        document.Form1.DdlTipoImporto.focus()
        return false
    }
    else
        return true
}
function checkStato() {
    if (document.Form1.DdlStato.disabled == true)
        return true
    else if (document.Form1.DdlStato.selectedIndex == 0) {
        objSmistatore.Visualizza_Msg("Selezionare uno stato.", 1001)
        document.Form1.DdlStato.focus()
        return false
    }
    else
        return true
}
function checkImporto() {
    if (document.getElementById("UctrlImporto:TextEuro").value == "0,00") {
        objSmistatore.Visualizza_Msg("Inserire l'importo", 1001)
        document.getElementById("UctrlImporto:TextEuro").focus()
        return false
    }
    return true
}
function checkPaese() {
    if (document.Form1.DdlPaese.selectedIndex > 0)
        return true
    return false
}

function CheckCampi(obj, TipoCampo) {
    var ret = true
    switch (TipoCampo) {
        case "TXT":
            obj.value = trim(obj.value)
            if ((obj.mandatory == "O") && (obj.value == "")) {
                ret = false
            }
            break
        case "DDL":
            if ((obj.mandatory == "O") && (obj.selectedIndex < 1)) {
                ret = false
            }
            break
        case "DAT":
            var retDate
            if ((obj.mandatory == "O") && (obj.value == "00/00/0000")) {
                ret = false
            }
            if ((ret == true) && obj.value != "" && (obj.value != "00/00/0000")) {
                ret = isDate(obj.value)
            }
            break
        case "EUR":
            if ((obj.mandatory == "O") && (obj.value == "0,00")) {
                ret = false
            }
            break
    }
    return ret
}
function txtComandoFocus() {
    var ind = parseInt(document.getElementById("TabStripMoneyGram").selectedIndex)
    switch (ind) {
        case 0:
            if (oSendPreviewObject != null) {
                document.getElementById("TabStripMoneyGram").selectedIndex = 1
                return
            }
            break
        case 1:
            if (document.getElementById("TabStripMoneyGram").getTab(2).getAttribute("disabled") == false) {
                objSmistatore.Visualizza_Msg("Comando?")
                document.getElementById("TabStripMoneyGram").selectedIndex = 1
                return
            }
            break
        case 2:
            if (document.getElementById("TabStripMoneyGram").getTab(3).getAttribute("disabled") == false) {
                objSmistatore.Visualizza_Msg("Comando?")
                document.getElementById("TabStripMoneyGram").selectedIndex = 2
                return
            }
            break
        case 3:
            if (document.getElementById("TabStripMoneyGram").getTab(4).getAttribute("disabled") == false) {
                if (validateMittentePage()) {
                    objSmistatore.Visualizza_Msg("Comando?")
                    document.getElementById("TabStripMoneyGram").selectedIndex = 3
                    return
                } return
            }
            break
        case 4: }
    objSmistatore.Visualizza_Msg("Comando?")
}
function txtComandoBlur() {
    if (flgCancellaMessaggio == true)
        objSmistatore.Visualizza_Msg("")
}
function disableTabStrip() {
    var tab
    var i
    for (i = 1; i < 5; i++) {
        tab = document.getElementById("TabStripMoneyGram").getTab(i)
        switch (i) {
            case 1:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiOpe2Dis.gif")
                break
            case 2:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiListaOperazioneDis.gif")
                break
            case 3:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabMittenteDis1.gif")
                break
            case 4:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDestinatarioDis1.gif")
                break
        }
    }
    document.getElementById("TabStripMoneyGram").disabled = true
}
function fnOnKeyDown(Btab) {
    if (FireSpecialKeys() == true) {        
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (FireFunctionKeys() == true) {        
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    var flgControl
    switch (Btab) {
        case 0:
            if ((event.shiftKey == true) && (event.keyCode == 9)) {
                event.cancelBubble = true
                event.returnValue = false
                return
            }
            break
        case 1:
            if (onKeyDownComboEvent() != -1) {
                event.cancelBubble = true
                event.returnValue = false
                DdlPaeseOnChange()
                return
            }
            flgControl = flgCountryChanged
            break
        case 2:
            if ((event.shiftKey == true) && (event.keyCode == 9)) {
                document.getElementById("TabStripMoneyGram").selectedIndex = 0
                document.getElementById("BtnModificaDati").focus()
                return false
            }
            if (oDirAgentsCityObject == null) {
                flgControl = true
            }
            else {
                flgControl = false
            }
            break
        case 3:
            if (event.keyCode == 88 || event.keyCode == 13) {
                if (event.srcElement.type == "checkbox") {
                    event.srcElement.checked = !event.srcElement.checked
                    id = parseInt(event.srcElement.name.substr(2, 1))
                    //gestChkClick(id)
                }
            }
            if ((event.shiftKey == true) && (event.keyCode == 9)) {
                document.getElementById("TabStripMoneyGram").selectedIndex = 1
                event.cancelBubble = true
                event.returnValue = false
                return false
            } else if (event.keyCode == 9) {
                if (event.srcElement.tag == "lastCheck") {
                    document.Form1.txtComando.focus()
                    event.cancelBubble = true
                    event.returnValue = false
                    return
                }
            }
            break
        case 4:
          
            if ((event.shiftKey == true) && (event.keyCode == 9)) {
                if (document.Form1.TxtNomeMitt.disabled || event.srcElement.id == "TxtCognomeMitt") {
                    /*
                    if (document.Form1.TxtCodiceCliente.value != "") {
                        document.getElementById("TabStripMoneyGram").selectedIndex = 2
                        if (!isListaOperazioniEmpty()) {
                            document.getElementById("ck0").focus()
                        } else {
                            document.getElementById("ckX").focus()
                        }
                    } else {
                    */
                   
                        document.getElementById("TabStripMoneyGram").selectedIndex = 1
                        event.cancelBubble = true
                        event.returnValue = false
                    //}
                } else {
                    //document.Form1.TxtNomeMitt.focus()
                    document.Form1.TxtCodiceFiscaleMitt.focus()
                }
                return false
            }
            break
        case 5:

            if ((event.shiftKey == true) && (event.keyCode == 9)) {
                if (document.Form1.TxtCodiceBeneficiario.disabled == true) {
                    document.getElementById("TabStripMoneyGram").selectedIndex = 3
                    if (document.Form1.TxtCognomeMitt.disabled == true) {
                        //DE LEO
                        //document.getElementById("TxtIndirizzoMitt").focus()
                        document.getElementById("TxtCodiceFiscaleMitt").focus()
                    } else {
                        document.getElementById("TxtCognomeMitt").focus()
                    }
                    return false
                }
            }
            break
        case 6:
            if ((event.shiftKey == true) && (event.keyCode == 9)) {
                document.getElementById("TabStripMoneyGram").selectedIndex = 3
                if (document.Form1.TxtCognomeMitt.disabled == true) {
                    //document.getElementById("TxtIndirizzoMitt").focus()
                    document.getElementById("TxtCodiceFiscaleMitt").focus()
                } else {
                    document.getElementById("TxtCognomeMitt").focus()
                }
                return false
            }
            break
    }


    if (flgControl == true) {
        if (event.keyCode == 9) {
            event.cancelBubble = true
            event.returnValue = false
            document.getElementById("txtComando").focus()
        }
    }
}
function fnOnBlur() {
    if (event.srcElement.id == "TxtRestrizioni" && document.getElementById("DdlPaese").disabled == true) {
        event.cancelBubble = true
        event.returnValue = false
        document.getElementById("BtnModificaDati").focus()
    }
    event.srcElement.style.backgroundColor = "white"
}
function DdlOnFocus() {
    lastObjFocus = event.srcElement
    flgChCity = false
}
function DdlOnClick() {
    flgDdlClick = true
}
function DdlOnMouseUp() {
    flgDdlClick = false
}
function DdlTipoDocumentoOnChange() {
    iTipoDoc = document.getElementById("DdlTipoDocumento").value
}
function fnOnFocus() {
    event.srcElement.style.backgroundColor = "yellow"
    lastObjFocus = event.srcElement
}

function fnOnFocusCheckDimensione(limit, msg) {
    if (event.srcElement.value.length > 2) {
        /*primoDaEditare = document.Form1.TxtCognomeMitt;
        document.Form1.TxtCognomeMitt.onfocus = function () {
            objSmistatore.Visualizza_Msg('Campo COGNOME troppo lungo', 1);
            document.Form1.TxtCognomeMitt.disabled = false;
            document.Form1.TxtCognomeMitt.focus();
        };*/
        objSmistatore.Visualizza_Msg('Campo ' + msg + ' troppo lungo (max ' + limit + ')', 1);
        event.srcElement.focus();
    }

    event.srcElement.style.backgroundColor = "yellow";
    lastObjFocus = event.srcElement;

}

function DisableNumberKeys() {
    var ret = true
    if ((event.keyCode > 45) && (event.keyCode < 62)) {
        ret = false
    }
    return ret
}
function onKeyPressEvent() {
    if ((event.keyCode >= 128) ||
    (event.keyCode == 92) ||
    (event.keyCode == 34) ||
    (event.keyCode == 94) ||
    (event.keyCode == 123) ||
    (event.keyCode == 125) ||
    (event.keyCode == 91) ||
    (event.keyCode == 93) ||
    (event.keyCode == 60) ||
    (event.keyCode == 62) ||
    (event.keyCode == 63) ||
    (event.shiftKey == true && event.keyCode == 124)) {
        event.cancelBubble = true
        event.returnValue = false
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
    else
        return true
}
function fnTrapKeys() {
    //filtra tutti i caratteri diversi da A-Z e 0-9 per i campi TxtCodiceFiscaleMitt
    if ((event.srcElement.id == "TxtCodiceFiscaleMitt")) {
        if ((event.keyCode != 46) && (event.keyCode != 9) && (event.keyCode != 40) && (event.keyCode != 27) && (event.keyCode != 35)
        && (event.keyCode != 8) && (!((event.keyCode == 67) && event.altKey))
        && (!((event.keyCode == 86) && event.ctrlKey))) {
            if ((event.keyCode < 48) || ((event.keyCode > 57) && (event.keyCode < 65)) ||
            ((event.keyCode > 90) && (event.keyCode < 96)) || (event.keyCode > 105) ||
            event.altKey || event.shiftKey || event.ctrlKey) {
                event.cancelBubble = true
                event.returnValue = false
                return
            }
        }
    }
    //filtra tutti i caratteri diversi da A-Z e 0-9 per i campi TxtCodicePromozionale e TxtCodiceBeneficiario
    if ((event.srcElement.id == "TxtCodicePromozionale") || (event.srcElement.id == "TxtCodiceBeneficiario") ) {
    //if ( (event.srcElement.id == "TxtCodiceBeneficiario") ) {
        if ((event.keyCode != 46) && (event.keyCode != 9) && (event.keyCode != 27) && (event.keyCode != 35)
        && (event.keyCode != 8) && (!((event.keyCode == 67) && event.altKey))
        && (!((event.keyCode == 86) && event.ctrlKey))) {
            if ((event.keyCode < 48) || ((event.keyCode > 57) && (event.keyCode < 65)) ||
            ((event.keyCode > 90) && (event.keyCode < 96)) || (event.keyCode > 105) ||
            event.altKey || event.shiftKey || event.ctrlKey) {
                event.cancelBubble = true
                event.returnValue = false
                return
            }
        }
    }

    // filtra caratteri speciali per destinatario
    if ((event.srcElement.id == "TxtCognomeDest") || (event.srcElement.id == "TxtNomeDest") || (event.srcElement.id == "TxtCognome2Dest")) {
     
        if ((event.keyCode != 32) && (event.keyCode != 46) && (event.keyCode != 189) && (event.keyCode != 109) && (event.keyCode != 173) && (event.keyCode != 219) && (event.keyCode != 39) && (event.keyCode != 9) && (event.keyCode != 27) && (event.keyCode != 35)
            && (event.keyCode != 8) && (!((event.keyCode == 67) && event.altKey))
            && (!((event.keyCode == 86) && event.ctrlKey))) {

                if ((event.keyCode < 65) || ((event.keyCode > 90) && (event.keyCode < 96)) || (event.keyCode > 105) ||
                                                event.altKey || event.shiftKey || event.ctrlKey) {
                event.cancelBubble = true
                event.returnValue = false
                return
            }
        }
    }


    if (FireSpecialKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (FireFunctionKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    var key = event.keyCode
    if ((event.altKey == true && event.keyCode == 67)) {
        event.keyCode = 27
        key = 27
        event.cancelBubble = true
        event.returnValue = false
    }
    var appoChiave = document.Form1.DdlModalitaPagamento.value.substring(0, 12)
    if (flgWorking && (appoChiave != "BANK_DEPOSIT")) {
        if (!(event.altKey == true && event.keyCode != 67)) {
            event.cancelBubble = true
            event.returnValue = false
            return
        }
    }
    if (flgDatiTransWorking != false) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (event.srcElement.id == "TabStripMoneyGram") {
        if ((key >= 37) && (key <= 40)) {
            event.cancelBubble = true
            event.returnValue = false
            return
        }
    }
    if (event.srcElement.id == "BtnModificaDati") {
        if (event.shiftKey == true && key == 9) {
            event.cancelBubble = true
            event.returnValue = false
            return false
        }
    }

    // defect SDP00097372 - inizio
    // fix perdita del focus
    if (document.getElementById("TabStripMoneyGram").selectedIndex == 0) {
        if (event.srcElement.id == "TxtCodicePromozionale") {
            if (event.shiftKey == true && key == 9) {
                document.getElementById("TxtCodicePromozionale").focus()
                event.cancelBubble = true
                event.returnValue = false
                return false
            }
        }
    }
    // defect SDP00097372 - fine

    if (document.getElementById("TabStripMoneyGram").selectedIndex == 1) {
        if (event.shiftKey == true && key == 9) {
            document.getElementById("TabStripMoneyGram").selectedIndex = 0
            event.cancelBubble = true
            event.returnValue = false
            return false
        } else if (key == 9) {
            cambiaTab()
            event.cancelBubble = true
            event.returnValue = false
            return false
        }
    }

    if (event.altKey) {
        if (((key >= 37) && (key <= 40)) || (key == 27)) {
            event.cancelBubble = true
            event.returnValue = false
            return
        }
    }
    if (key == 35) {
        event.cancelBubble = true
        event.returnValue = false
        document.getElementById("txtComando").focus()
    }
    if ((key >= 112) && (key <= 123)) {
        event.cancelBubble = true
        event.returnValue = false
        lastObjFocus.focus()
    }
    if (key == 8) {
        if (event.srcElement.type != "text") {
            event.cancelBubble = true
            event.returnValue = false
            lastObjFocus.focus()
        }
    }
    if (key == 46) {
        HandleCancelKey()
    }
    if (key == 27) {
        event.cancelBubble = true
        event.returnValue = false
        if (ESCenabled == true) {
            if (objSmistatore == null)
                createSmistatore()
            var ret = objSmistatore.Visualizza_Msg("Confermi l'uscita?", 2003)
            if (ret == 1) {
                if (oRestart1Object != null) {
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
                }
                window.navigate("./../../exitnok.aspx")
            }
            else {
                try {
                    lastObjFocus.focus()
                }
                catch (exception) { }
            }
        }
    }
}
function HandleCancelKey() {
    var strCtrlName = event.srcElement.name
    if ((strCtrlName != 'DdlPaese') &&
    (strCtrlName != 'DdlStato') &&
    (strCtrlName != 'DdlTipoImporto') &&
    (strCtrlName != 'UctrlImporto:TextEuro') &&
    (strCtrlName != 'UctrlImportoEuro:TextEuro') &&
    (strCtrlName != 'UctrlCommissioneEuro:TextEuro') &&
    (strCtrlName != 'UctrlTotaleEuro:TextEuro') &&
    (strCtrlName != 'DdlPaeseMitt') &&
    (strCtrlName != 'DdlStatoMitt') &&
    (strCtrlName != 'DdlTipoDocumento') &&
    (strCtrlName != 'UctrlDataNascitaMitt:TxtDate') &&
    (strCtrlName != 'UctrlDataRilascioDocum:TxtDate') &&
    (strCtrlName != 'DdlStatoRilascioDocum') &&
    (strCtrlName != 'DdlPaeseRilascioDocum') &&
    (strCtrlName != 'DdlPaeseDest') &&
    (strCtrlName != 'DdlStatoDest') &&
    (strCtrlName != 'TxtRestrizioni') &&
    (strCtrlName != 'BtnModificaDati') &&
    (strCtrlName != '') &&
    (strCtrlName != null)
    ) {
        document.getElementById(strCtrlName).value = ''
    }
}
function TxtRestrizioniOnKeyDown() {
    if (FireSpecialKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (FireFunctionKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (event.shiftkey == true && event.key == 9) {
        event.cancelBubble = true
        event.returnValue = false
    }
    return
}
function BtnModificaOnKeyDown() {
    if (event.shiftkey == true && event.key == 9) {
        if (document.getElementById("TxtRestrizioni").disabled == false)
            document.getElementById("TxtRestrizioni").focus()
        else {
            event.cancelBubble = true
            event.returnValue = false
        }
    }
    return
}
var waitingForSecondChar = false
function onKeyDownComboEvent() {
    if (FireSpecialKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (FireFunctionKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
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
function ModificaFocus() {
    lastObjFocus = document.getElementById("BtnModificaDati")
}
function Modifica(bMessage) {
    var iRCSmistatore
    if (bMessage == true) {
        try {
            iRCSmistatore = objSmistatore.Visualizza_Msg("Sicuro di voler modificare i dati?", 2003)
        }
        catch (exception) {
            return false
        }
    }
    if (iRCSmistatore == 1 || bMessage == false) {
        document.getElementById("BtnModificaDati").disabled = true
        //ClearMittenteDestinatario()
        enableFirstPage()
        if (errore != "F") {
            document.getElementById("TxtCodicePromozionale").focus()
        }

        oSendPreviewObject = null
        oDirAgentsCityObject = null
        enableTabStrip(0)
        clearSecondPage()
        iTipoDoc = document.getElementById("DdlTipoDocumento").value
        return true
    }
    else {
        return false
    }
}
function clearFieldsStyle() {
    var i
    try{
        for (i = 0; i < fieldName2.length; i++) {
            //alert(fieldName2[i])
            document.getElementById(fieldName2[i]).mandatory = "F"
            document.getElementById(fieldName2[i]).style.borderColor = ""
            document.getElementById(fieldName2[i]).disabled = false
            document.getElementById(fieldName2[i]).style.backgroundColor = "white"
        }
        for (i = 0; i < labelName2.length; i++) {
            document.getElementById(labelName2[i]).style.display = "none"
        }
        if (document.getElementById("DdlStatoMitt").length <= 1) {
            document.getElementById("DdlStatoMitt").disabled = true
            if (document.getElementById("DdlStatoMitt").item(0).text == " ")
                document.getElementById("DdlStatoMitt").style.backgroundColor = "silver"
        }
        if (document.getElementById("DdlStatoDest").length <= 1) {
            document.getElementById("DdlStatoDest").disabled = true
            if (document.getElementById("DdlStatoDest").item(0).text == " ")
                document.getElementById("DdlStatoDest").style.backgroundColor = "silver"
        }
        if (document.getElementById("DdlStatoRilascioDocum").length <= 1) {
            document.getElementById("DdlStatoRilascioDocum").disabled = true
            if (document.getElementById("DdlStatoRilascioDocum").item(0).text == " ")
                document.getElementById("DdlStatoRilascioDocum").style.backgroundColor = "silver"
        }
    } catch (err) {
        alert(err.message)
    }
   
    
}
function setRequiredFields() {
    
    var j, i, k
    for (j = 0; j < oSendPreviewObject.RequiredFields.length; j++) {
        for (i = 0; i < fieldName1.length; i++) {
            if (fieldName1[i] == oSendPreviewObject.RequiredFields[j]) {
                document.getElementById(fieldName2[i]).mandatory = "O"
                if (document.getElementById(fieldName2[i]).type == "select-one") {
                    for (k = 0; k < labelName1.length; k++) {
                        if (labelName1[k] == fieldName2[i]) {
                            document.getElementById(labelName2[k]).style.display = ""
                        }
                    }
                }
                else {
                    document.getElementById(fieldName2[i]).style.borderColor = "red"
                }
            }
        }
    }

    /*V.BERTO Adeguamento AC 15.12 */
    document.getElementById("TxtTelefonoMitt").mandatory = "O"
    document.getElementById("TxtTelefonoMitt").disabled = false
    document.getElementById("TxtTelefonoMitt").style.borderColor = "red"


    //DE LEO
    document.getElementById("DdlNazioneNascitaMitt").mandatory = "O"
    document.getElementById("DdlNazioneNascitaMitt").disabled = false
    //DE LEO - FIX DEFECT SDP00097377 - commento la seguente riga
    //document.getElementById("DdlNazioneNascitaMitt").selectedIndex=0


    /*if ((document.getElementById("DdlTipoDocumento").mandatory == "O") || (document.getElementById("TxtNumDocumento").value != "")) {
        document.getElementById("DdlPaeseRilascioDocum").disabled = false
        document.getElementById("TxtCittaRilascioDocum").disabled = false
        document.getElementById("TxtEnteEmittenteDocum").disabled = false
        document.getElementById("UctrlDataRilascioDocum:TxtDate").disabled = false
    }
    else {
        document.getElementById("DdlTipoDocumento").disabled = true
        document.getElementById("DdlPaeseRilascioDocum").disabled = true
        document.getElementById("TxtCittaRilascioDocum").disabled = true
        document.getElementById("TxtEnteEmittenteDocum").disabled = true
        document.getElementById("UctrlDataRilascioDocum:TxtDate").disabled = true
    }
    if (document.getElementById("DdlStatoRilascioDocum").length > 1)
        document.getElementById("DdlStatoRilascioDocum").disabled = false
    else
        document.getElementById("DdlStatoRilascioDocum").disabled = true*/
}
function GestListaOperazione() {
    /*
    if (document.Form1.TxtCodiceCliente.value != "") {
        //document.Form1.TxtIndirizzoMitt.focus()
        //document.Form1.TxtCodiceFiscaleMitt.focus()
        document.Form1.TxtCognomeMitt.focus()
    } else {
    */
        if (document.Form1.TxtCognomeMitt.disabled) {
            //document.Form1.TxtIndirizzoMitt.focus()
            document.Form1.TxtCodiceFiscaleMitt.focus()
        }
        else
            document.Form1.TxtCognomeMitt.focus()
    //}
}
function setNotAllowedFields() {
    
    for (var j = 0; j < oSendPreviewObject.NotAllowedFields.length; j++) {
        for (var i = 0; i < fieldName1.length; i++) {
            if (fieldName1[i] == oSendPreviewObject.NotAllowedFields[j]) {
                document.getElementById(fieldName2[i]).mandatory = "D"
                document.getElementById(fieldName2[i]).style.backgroundColor = "silver"
                document.getElementById(fieldName2[i]).disabled = true
                if (document.getElementById(fieldName2[i]).type = "text")
                    document.getElementById(fieldName2[i]).value = ""
                else
                    document.getElementById(fieldName2[i]).selectedIndex = -1
            }
        }
    }
}
function ChangeOtherCountry(objPaese, objStato) {
    var comboPaese = document.getElementById(objPaese)
    var comboStato = document.getElementById(objStato)
    var op
    comboStato.disabled = false
    for (i = comboStato.length - 1; i >= 1; i--) {
        comboStato.remove(i)
    }
    if (comboPaese.selectedIndex > 0) {
        for (j = 0; j < oStatesObject.CountryCode.length; j++) {
            if (oStatesObject.CountryCode[j] == comboPaese.value) {
                op = document.createElement("<option>")
                op.text = oStatesObject.StateName[j]
                op.value = oStatesObject.StateCode[j]
                comboStato.add(op)
                if (comboStato.item(0).text != "Elenco Stati (selezionarne uno)")
                    comboStato.item(0).text = "Elenco Stati (selezionarne uno)"
            }
        }
        if (comboStato.length == 1) {
            if (comboStato.item(0).text != " ")
                comboStato.item(0).text = " "
            comboStato.disabled = true
        } else {
            comboStato.selectedIndex = 0
        }
    }
    else {
        comboStato.disabled = true
    }
    if (comboStato.disabled == true) {
        comboStato.style.backgroundColor = 'silver'
        document.getElementById("LblDdlStatoMitt").style.display = "none"
    }
    else {
        comboStato.style.backgroundColor = 'white'
        document.getElementById("LblDdlStatoMitt").style.display = ""
    }
    //DEFECT SDP00102981 - INIZIO
    if (document.getElementById("DdlStatoRilascioDocum").disabled == false) {
        document.getElementById("LblDdlStatoRilascioDocum").style.display = ""
    } else {
        document.getElementById("LblDdlStatoRilascioDocum").style.display = "none"
    }
    //sistemo anche un anomalia pregressa simile al defect in oggetto
    if (document.getElementById("DdlStatoMitt").disabled == false) {
        document.getElementById("LblDdlStatoMitt").style.display = ""
    } else {
        document.getElementById("LblDdlStatoMitt").style.display = "none"
    }
    //DEFECT SDP00102981 - FINE
}
function OtherCountryKeyDown(ctrlState) {
    if (FireSpecialKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (FireFunctionKeys() == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (onKeyDownComboEvent() != -1) {
        event.cancelBubble = true
        event.returnValue = false
        ChangeOtherCountry(event.srcElement.name, ctrlState)
        return
    }
}
function setDocumentType() {
    
    if (iTipoDoc == "") {
        var Doc = document.getElementById("DdlTipoDocumento")
        var i
        if (Doc.length > 0) {
            for (i = Doc.length - 1; i >= 0; i--) {
                Doc.remove(i)
            }
        }
        var oOpt = document.createElement("<option>")
        oOpt.text = "Elenco Documenti (selezionarne uno)"
        oOpt.value = "0"
        Doc.add(oOpt)
        for (i = 0; i < oSendPreviewObject.DocumentDescriptions.length; i++) {
            var oOpt = document.createElement("<option>")
            oOpt.text = oSendPreviewObject.DocumentDescriptions[i]
            oOpt.value = oSendPreviewObject.DocumentIds[i]
            Doc.add(oOpt)
        }
    }
}
function UltimoFocus() {
    event.cancelBubble = true
    event.returnValue = false
    document.getElementById("txtComando").focus()
    return
}
function stampaModuloPrestampa() {
    var bRCSmistatore
    try {
        bRCSmistatore = true;
    } catch (exception) {
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
        var btnPressed = objSmistatoreStampa.Visualizza_Msg(codErr + ' - ' + descrErr, 4012)
        if (btnPressed == 4) {
            stampaModuloPrestampa()
            return false
        }
        else {
            flgWorking = false
            document.getElementById("TabstripMoneygram").disabled = false
            disableTab4Fields(false)
            document.getElementById("TxtCognomeDest").focus()
            return false
        }
    }
    return AccettaPrestampa()
}
function AccettaPrestampa() {
    var iRCSmistatore
    iRCSmistatore = objSmistatore.Visualizza_Msg("Confermi i dati?", 2003)
    switch (iRCSmistatore) {
        case 1:
            ESCenabled = false
            flgMulti = false
            flgCancellaMessaggio = false
            objSmistatore.Visualizza_Msg("Attendere. Elaborazione in corso...")
            setWaitPointer()
            return true
            break
        case 2:
            document.getElementById("TabStripMoneyGram").disabled = false
            disableTab4Fields(false)
            flgCancellaMessaggio = true
            flgWorking = false
            if (document.Form1.TxtCodiceBeneficiario.disabled == true) {
                document.Form1.TxtCognomeDest.focus()
            } else {
                document.Form1.TxtCodiceBeneficiario.focus()
            }
            return false
            break
    }
}
function scriviRestart(urlToSave) {
    //alert("scrivi restart")
    var bRCSmistatore
    try {
        bRCSmistatore = objSmistatore.Scrivi_Restart(document.getElementById("TxtSmistatore").value, urlToSave, 1)
    }
    catch (exception) {
        if (exception.description != null)
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Scrivi_Restart~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore inaspettato durante l'invocazione del metodo Scrivi_Restart")
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
        window.navigate("./../../exitnok.aspx")
        return false
    }
}
function enableTabStrip(indexTab) {
    document.getElementById("TabStripMoneyGram").disabled = false
    var page
    var tab
    for (page = 4; page >= indexTab + 1; page--) {
        tab = document.getElementById("TabStripMoneyGram").getTab(page)
        tab.setAttribute("disabled", "true")
        switch (page) {
            case 0:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiOpe1Dis.gif")
                break
            case 1:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiOpe2Dis.gif")
                break
            case 2:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiListaOperazioneDis.gif")
                break
            case 3:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabMittenteDis1.gif")
                break
            case 4:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDestinatarioDis1.gif")
                break
        }
    }
    for (page = 0; page <= indexTab; page++) {
        tab = document.getElementById("TabStripMoneyGram").getTab(page)
        tab.setAttribute("disabled", null)
        switch (page) {
            case 0:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiOpe1.gif")
                break
            case 1:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiOpe2.gif")
                break
            case 2:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDatiListaOperazione.gif")
                break
            case 3:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabMittente1.gif")
                break
            case 4:
                tab.setAttribute("DEFAULTIMAGEURL", "./../../Images/TabDestinatario1.gif")
                break
        }
    }
}
function tabstripOnChange() {
    if (flgWorking == true) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    ind = parseInt(document.getElementById("TabStripMoneyGram").selectedIndex)
    if (ind > flgPage)
        flgPage = ind
    try {
        if (flgCancellaMessaggio == true)
            objSmistatore.Visualizza_Msg("")
    }
    catch (exception) { }
    try {
        switch (ind) {
            case 0:
                if (document.getElementById("DdlPaese").disabled == false) {
                    document.getElementById("DdlPaese").focus()
                }
                else {
                    document.getElementById("BtnModificaDati").focus()
                }
                objSmistatore.Visualizza_Msg("")
                break
            case 1:
                flgValidateTab1 = true
                objSmistatore.Visualizza_Msg("")
                break
            case 2:
                /*
                if (!isListaOperazioniEmpty()) {
                    if ((isChecked("ck0") || isChecked("ck1") || isChecked("ck1"))) {
                        objSmistatore.Visualizza_Msg("")
                    }
                    else {
                        objSmistatore.Visualizza_Msg("Selezionare nome dalla lista se coincidente con il Beneficiario")
                        flgCancellaMessaggio = false
                    }
                }
                else {
                    objSmistatore.Visualizza_Msg("")

                }
                if (!isListaOperazioniEmpty()) {
                    document.getElementById("ck0").focus()
                } else {
                    document.getElementById("ckX").focus()
                }
                */
                flgValidateTab2 = true
                break
            case 3:
                if (document.getElementById("TxtCognomeMitt").disabled == false) {
                    document.getElementById("TxtCognomeMitt").focus()
                } else {
                    //document.getElementById("TxtIndirizzoMitt").focus()
                    document.getElementById("TxtCodiceFiscaleMitt").focus()
                    objSmistatore.Visualizza_Msg("")
                }
                flgValidateTab3 = true
				WarningCodiceFiscaleMittErrato = false
                break
            case 4:
                var response = true
                if (flgValidateTab3 == true) {
                    flgValidateTab3 = false
                    response = (validateMittentePage() && chkFisc())
                }
                if (response) {
                    if (document.Form1.TxtCodiceBeneficiario.disabled == true) {
                        document.Form1.TxtCognomeDest.focus()
                    } else {
                        document.Form1.TxtCodiceBeneficiario.focus()
                        objSmistatore.Visualizza_Msg("")
                    }
                }
                break
        }
    }
    catch (exception) { }
}
function flussoStampaAgenti() {
    document.getElementById("TabStripMoneyGram").disabled = true
    disableSecondPage(true)
    document.getElementById("TxtStato").focus()
    if (objSmistatoreStampa != null)
        objSmistatoreStampa.Visualizza_Msg("")
    var numPagine = insertPageNumber()
    if (numPagine <= 0)
        return false
    stampaAgenti(numPagine)
    flgWorking = false
    flgMulti = true
}
function stampaAgenti(numPagine) {
    flgMulti = false
    flgWorking = true
    if (objSmistatoreStampa == null)
        createSmistatoreStampa()
    var bRCSmistatore
    try {
        var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.4.0")
    }
    catch (exception) {
        objSmistatoreStampa.Visualizza_Msg("Impossibile eseguire la Stampa Lista Agenti - Componente MSXML 4.0 non installato.", 8)
        flgWorking = false
        flgMulti = true
        return false
    }
    for (var i = 1; i <= numPagine; i++) {
        try {
            iRCSmistatore = objSmistatoreStampa.Visualizza_Msg("Stampa della pagina " + i + "?", 1003)
            if (iRCSmistatore == 1) {
                bRCSmistatore = objSmistatoreStampa.Stampa_Documento(document.getElementById("TxtSmistatoreAgenti").value, i, "US")
            } else {
                continue
            }
        }
        catch (exception) {
            objSmistatoreStampa.Visualizza_Msg("Errore durante la richiesta di Stampa Agenti", 8)
            abilitaCampiTab4()
            flgWorking = false
            flgMulti = true
            return false
        }
        if (!bRCSmistatore) {
            objSmistatoreStampa.Leggi_Errore(objSmistatoreStampa.strXMLDocRitorno)
            var descrErr = objSmistatoreStampa.strDescErrRitorno
            var codErr = objSmistatoreStampa.strCodErrRitorno
            objSmistatoreStampa.Visualizza_Msg(codErr + ' - ' + descrErr, 8)
            document.getElementById("TabStripMoneyGram").disabled = false
            disableSecondPage(false)
            flgWorking = false
            flgMulti = true
            return false
        }
    }
    document.getElementById("TabStripMoneyGram").disabled = false
    disableSecondPage(false)
    printAgentiOK = true
    return true
}
function FocusController() {
    var thisTab = document.getElementById("TabStripMoneyGram").selectedIndex
    thisTab = parseInt(thisTab)
    if (flgMulti == false) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    if (objSmistatore != null) {
        if (flgCancellaMessaggio == true)
            objSmistatore.Visualizza_Msg("")
    }
    if (flgDatiTransWorking != false) {
        event.cancelBubble = true
        event.returnValue = false
        return
    }
    try {
        if (flgDdlClick == false) {
            switch (thisTab) {
                case 0:
                    if (oSendPreviewObject != null) {
                        if (lastObjFocus == null) {
                            event.cancelBubble = true
                            event.returnValue = false
                            return
                        }
                        if (lastObjFocus.id == "TxtRestrizioni") {
                            lastObjFocus.focus()
                        }
                        else {
                            document.getElementById("BtnModificaDati").focus()
                        }
                    }
                    else {
                        lastObjFocus.focus()
                    }
                    break
                case 1:
                    break
                case 2:
                    lastObjFocus.focus()
                    break
                case 3:
                    lastObjFocus.focus()
                    break
                case 4:
                    lastObjFocus.focus()
            }
        }
        flgDdlClick = false
        lastTab = thisTab
    }
    catch (exception) { }
}
function UctrlFocusBackground(obj) {
    lastObjFocus = document.getElementById(obj)
}
function enableTab1(bEnabled) {
    frm1.DdlPaese.disabled = bEnabled
    if (frm1.DdlStato.length > 1)
        frm1.DdlStato.disabled = bEnabled
    frm1.DdlTipoImporto.disabled = bEnabled
    frm1.DdlModalitaPagamento.disabled = bEnabled
    document.getElementById("UctrlImporto:TextEuro").disabled = bEnabled
}
function disableTab4Fields(bEnabled) {
    document.getElementById("PageView4").disabled = bEnabled
    if (document.getElementById("TxtCognomeDest").mandatory != "D")
        document.getElementById("TxtCognomeDest").disabled = bEnabled
    if (document.getElementById("TxtNomeDest").mandatory != "D")
        document.getElementById("TxtNomeDest").disabled = bEnabled
    if (document.getElementById("TxtCognome2Dest").mandatory != "D")
        document.getElementById("TxtCognome2Dest").disabled = bEnabled

    /** V.Berto Adeguamento AC 15.12 - eliminati campi come da requisiti */
    /*if (document.getElementById("TxtDomandaDest").mandatory != "D")
        document.getElementById("TxtDomandaDest").disabled = bEnabled
    if (document.getElementById("TxtRispostaDest").mandatory != "D")
        document.getElementById("TxtRispostaDest").disabled = bEnabled
    */

    if (document.getElementById("TxtMessaggioDest1").mandatory != "D")
        document.getElementById("TxtMessaggioDest1").disabled = bEnabled
    if (document.getElementById("TxtMessaggioDest2").mandatory != "D")
        document.getElementById("TxtMessaggioDest2").disabled = bEnabled
    if (document.getElementById("TxtIndirizzoDest").mandatory != "D")
        document.getElementById("TxtIndirizzoDest").disabled = bEnabled
    if (document.getElementById("TxtCittaDest").mandatory != "D")
        document.getElementById("TxtCittaDest").disabled = bEnabled
    if (document.getElementById("DdlPaeseDest").mandatory != "D")
        document.getElementById("DdlPaeseDest").disabled = bEnabled
    if (parseInt(document.getElementById("DdlStatoDest").length) > 1)
        document.getElementById("DdlStatoDest").disabled = bEnabled
    else
        document.getElementById("DdlStatoDest").disabled = true
    if (document.getElementById("TxtCAPDest").mandatory != "D")
        document.getElementById("TxtCAPDest").disabled = bEnabled
}
function NumDocOnChange() {
    if (document.getElementById("TxtNumDocumento").mandatory != "O") {
        if (document.getElementById("TxtNumDocumento").value != "") {
            document.getElementById("DdlTipoDocumento").disabled = false
            document.getElementById("TxtEnteEmittenteDocum").disabled = false
            document.getElementById("UctrlDataRilascioDocum:TxtDate").disabled = false
            document.getElementById("TxtCittaRilascioDocum").disabled = false
            document.getElementById("DdlPaeseRilascioDocum").disabled = false
        } else {
            document.getElementById("DdlTipoDocumento").selectedIndex = 0
            document.getElementById("DdlTipoDocumento").disabled = true
            document.getElementById("TxtEnteEmittenteDocum").value = ""
            document.getElementById("TxtEnteEmittenteDocum").disabled = true
            document.getElementById("UctrlDataRilascioDocum:TxtDate").value = "00/00/0000"
            document.getElementById("UctrlDataRilascioDocum:TxtDate").disabled = true
            document.getElementById("TxtCittaRilascioDocum").value = ""
            document.getElementById("TxtCittaRilascioDocum").disabled = true
            document.getElementById("DdlPaeseRilascioDocum").selectedIndex = 0
            document.getElementById("DdlPaeseRilascioDocum").disabled = true
            document.getElementById("DdlStatoRilascioDocum").selectedIndex = 0
            document.getElementById("DdlStatoRilascioDocum").disabled = true
        }
    }
}
function setWaitPointer() {
    if (document.all) {
        for (var i = 0; i < document.all.length; i++)
            document.all(i).style.cursor = 'wait'
    }
}
function resetPointer() {
    if (document.all) {
        for (var i = 0; i < document.all.length; i++)
            document.all(i).style.cursor = 'default'
    }
}
function riprovaAbbandonaSubmit(msg, typeErr) {
    var iRCSmistatore
    createSmistatore()
    try {
        switch (typeErr) {
            case "A":
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 4012)
                if (iRCSmistatore == 4) {
                    objSmistatore.Visualizza_Msg("Attendere. Operazione in corso...")
                    document.forms[0].submit()
                    return
                }
                else {
                    cancellaRestart()
                    window.navigate("./../../exitnok.aspx")
                    return false
                }
                break
            case "B":
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 1)
                flgMessaggio = true
                resetPointer()
                cancellaRestart()
                window.navigate("./../../exitnok.aspx")
                return false
                break
                return
            case "C":
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
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Visualizza_Msg~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante l'invocazione del metodo Visualizza_Msg")
        return false
    }
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
                    setWaitPointer()
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
                if (document.getElementById("TabStripMoneyGram").selectedIndex == 4) {
                    objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
                }
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 1)
                document.getElementById("TabstripMoneygram").disabled = false
                disableTab4Fields(false)
                resetPointer()
                if (msg.substr(0, 4) == "P027") {
                    ESCenabled = true;
                    document.getElementById("TxtRispostaDest").focus()
                } 
                else {
                    if (document.getElementById("TabStripMoneyGram").selectedIndex == 4) {
                        document.getElementById("TabStripMoneyGram").selectedIndex = 4
                        document.Form1.TxtCodiceBeneficiario.focus()
                        ESCenabled = true
                    }
                    else {
                        document.getElementById("TabStripMoneyGram").selectedIndex = 0
                        Modifica(false)
                    }
                }
                flgWorking = false
                return false
                break
            case "X":
                errore = ""
                objSmistatore.Cancella_Restart(document.getElementById("TxtSmistatore").value)
                iRCSmistatore = objSmistatore.Visualizza_Msg(msg, 1001)
                document.getElementById("TabstripMoneygram").disabled = false
                document.getElementById("TabStripMoneyGram").selectedIndex = 4
                disableTab4Fields(false)
                flgWorking = false
                ESCenabled = true
                resetPointer()
                if (document.Form1.TxtCodiceBeneficiario.disabled == true) {
                    document.Form1.TxtCognomeDest.focus()
                } else {
                    document.Form1.TxtCodiceBeneficiario.focus()
                }
                flgCancellaMessaggio = true
                return
                break
            case "C":
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
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore Contabile&techerr=Errore durante l'invocazione del metodo Visualizza_Msg~Eccezione: " + exception.description)
        else
            window.navigate("./../../Error.aspx?err=Errore componente Smistatore&techerr=Errore inaspettato durante l'invocazione del metodo Visualizza_Msg")
        return false
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
        var descrErr = objSmistatore.strDescErrRitorno
        var codErr = objSmistatore.strCodErrRitorno
        objSmistatore.Visualizza_Msg(codErr + ' - ' + descrErr, 8)
        return false
    }
    return true
}
function NoAgents() {
    document.getElementById("TabstripMoneygram").disabled = false
    oDirAgentsCityObject = null
    objSmistatore.Visualizza_Msg("Non ci sono Agenti per questa citta'", 1001)
    document.getElementById("TabStripMoneyGram").disabled = false
    disableSecondPage(false)
    flgWorking = false
}
/*
function MakeGridListaOperazioni(listaOperazioni) {
    if (listaOperazioni == null) return
    for (i = document.getElementById("DtgLista").rows.length - 1; i >= 0; i--) {
        document.getElementById("DtgLista").deleteRow(i)
    }
    var myRow = document.getElementById("DtgLista").insertRow()
    var myCell = myRow.insertCell()
    var numRec = listaOperazioni.length;
    if (listaOperazioni.length > 3) {
        numRec = listaOperazioni.length - 1;
    }
    for (i = 0; i < numRec; i++) {
        if (listaOperazioni[0].receiverFirstName == undefined) {
            myCell.style.color = "blue"
            myCell.width = "30px"
            myCell.innerHTML = "<input type=text name=ckX tag=lastCheck style='width:0px;height:0px;Z-INDEX: 115; LEFT: 15px; POSITION: absolute; TOP: 110px'>"
            myCell = myRow.insertCell()
            return
        }
        myCell.style.color = "blue"
        myCell.width = "30px"
        if (i == numRec - 1) tagValue = "lastCheck"
        else tagValue = "notLastCheck"
        myCell.innerHTML = "<input type=checkbox name=ck" + i + " tag=" + tagValue + " onclick=gestChkClick(" + i + ")>"
        myCell = myRow.insertCell()
        myCell.style.color = "blue"
        myCell.width = "200px"
        myCell.innerHTML = listaOperazioni[i].receiverFirstName + " " + listaOperazioni[i].receiverLastName
        myCell = myRow.insertCell()
        myCell.style.color = "blue"
        myCell.width = "230px"
        myCell.innerHTML = listaOperazioni[i].receiverAddress
        myCell = myRow.insertCell()
        myCell.style.color = "blue"
        myCell.width = "190px"
        myCell.innerHTML = getCountryDescription(listaOperazioni[i].receiverCountry)
        myRow = document.getElementById("DtgLista").insertRow()
        myCell = myRow.insertCell()
    }
}

*/

/*
function gestChkClick(id) {
    objSmistatore.Visualizza_Msg("")
    var ck0 = document.getElementById("ck0")
    var ck1 = document.getElementById("ck1")
    var ck2 = document.getElementById("ck2")
    switch (id) {
        case 0:
            if (ck1 != undefined) ck1.checked = false
            if (ck2 != undefined) ck2.checked = false
            break;
        case 1:
            if (ck0 != undefined) ck0.checked = false
            if (ck2 != undefined) ck2.checked = false
            break;
        case 2:
            if (ck0 != undefined) ck0.checked = false
            if (ck1 != undefined) ck1.checked = false
            break;
    }
    if (flgTabMittAttivo == true) {
        enableTabStrip(2)
    }
    if (flgTabDestAttivo == true) {
        enableTabStrip(2)
    }
    flgMulti = true
}
*/
function MakeGridImporti() {
    var myTable = document.getElementById("gridImportiEuro")
    myTable.rows(1).cells(0).innerHTML = oSendPreviewObject.TransReceiveCurrency
    myTable.rows(1).cells(1).innerHTML = oSendPreviewObject.PayoutReceiveCurrency
    myTable.rows(1).cells(2).innerHTML = oSendPreviewObject.TransExchangeRate
    myTable.rows(1).cells(3).innerHTML = oSendPreviewObject.TransReceiveAmount
}
function ClearGridImporti() {
    var myTable = document.getElementById("gridImportiEuro")
    for (var i = 0; i < 4; i++) {
        myTable.rows(1).cells(i).innerHTML = "&nbsp;&nbsp;&nbsp;"
    }
}
function insertPageNumber() {
    try {
        var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.4.0")
    }
    catch (exception) {
        objSmistatoreStampa.Visualizza_Msg("Impossibile eseguire la Stampa - Componente MSXML 4.0 non installato.", 8)
        return -1
    }
    xmlDoc.async = false
    xmlDoc.resolveExternals = false
    xmlDoc.loadXML(document.getElementById("TxtSmistatoreAgenti").value)
    var pages = parseInt(xmlDoc.getElementsByTagName("Stampa").item(0).attributes(0).text)
    if (xmlDoc.documentElement.selectNodes("//Item[@NUMERO_PAGINA]").length > 0)
        return pages
    var eleStampa = xmlDoc.getElementsByTagName("Pagina_Stampa")
    var numItems
    for (pagNumber = 1; pagNumber <= pages; pagNumber++) {
        numItems = parseInt(eleStampa.item(pagNumber - 1).getAttribute("NUM_ITEMS"))
        eleStampa.item(pagNumber - 1).setAttribute("NUM_ITEMS", parseInt(numItems + 1))
        var elem = xmlDoc.createElement("Item")
        elem.setAttribute("RIGA", "07")
        elem.setAttribute("COLONNA", "120")
        elem.setAttribute("FONT", "9")
        elem.setAttribute("NUMERO_PAGINA", "")
        elem.text = "pag. " + pagNumber + " di " + pages
        eleStampa.item(pagNumber - 1).appendChild(elem)
    }
    document.getElementById("TxtSmistatoreAgenti").value = xmlDoc.xml
    return pages
}


function discardEvent(evt) {
    evt.cancelBubble = true
    evt.returnValue = false
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

function Check_CampoTesto_ScrollDown(key_event, IDcampo) {
    // Funzione per ScrollDown elemnti del CF (editabile o PF Estero) con cursor down
    var CampoTesto = document.getElementById(IDcampo);
    var key = key_event.keyCode
    //alert (key)
    if (CampoTesto.bloccato == true) {
        if (key != 40 && key != 9 && key != 27 && key != 35) {
            discardEvent(key_event)
            return
        }
    }


    if (key_event.keyCode == 40) {
        // avendo solo 2 item di cui uno non editabile, non uso variabili globali per i campi nel form, ma la loro property readOnly true/false
        if (CampoTesto.value == "PF RESID. ESTERO") {
            CampoTesto.value = "";
            CampoTesto.bloccato = false
            /*
			document.getElementById("DdlNazioneNascitaMitt").mandatory="D"
			document.getElementById("DdlNazioneNascitaMitt").disabled=true
			//document.getElementById("DdlNazioneNascitaMitt").style.backgroundColor="silver"
			document.getElementById("DdlNazioneNascitaMitt").selectedIndex=0
			*/
        } else {
            CampoTesto.value = "PF RESID. ESTERO";
            CampoTesto.bloccato = true
            /*
			document.getElementById("DdlNazioneNascitaMitt").mandatory="O"
			document.getElementById("DdlNazioneNascitaMitt").disabled=false
			//document.getElementById("DdlNazioneNascitaMitt").style.backgroundColor="white"
			document.getElementById("DdlNazioneNascitaMitt").selectedIndex=0
			*/
        }

    }


}

//MEV C2A
 
//MEV C2A
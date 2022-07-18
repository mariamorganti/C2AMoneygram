<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="C2A.aspx.vb" Inherits="C2AMoneygram.C2A" EnableViewState="False" ValidateRequest="false" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%--<%@ Register TagPrefix="UCtrl" TagName="Euro" Src="../../UserControls/EuroField.ascx" %>
<%@ Register TagPrefix="UCtrl" TagName="Date" Src="../../UserControls/DateField.ascx" %>--%>
<%@ Register TagPrefix="UCtrl" TagName="Euro" Src="~/UserControls/EuroField.ascx" %>
<%@ Register TagPrefix="UCtrl" TagName="Date" Src="~/UserControls/DateField.ascx" %> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    <title>MGSNStandard</title>
    <meta content="Microsoft Visual Studio.NET 7.0" name="GENERATOR">
    <meta content="Visual Basic 7.0" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
     <%
         If Not IsNothing(Session.Item("Port")) Then
             Dim strJS = "<script language=""javascript"" src=""https://localhost:2081/web/smistatore/smistatore.js"" type=""text/javascript""></script>"
             Response.Write(strJS)
         End If
    %>
    <script language="javascript" src="https://localhost:2081/web/gdtm/gdtm.js" type="text/javascript"> </script>
    <script language="javascript" src="https://localhost:2081/web/tdem/tdem.js" type="text/javascript"> </script>
    <script language="javascript" src="https://localhost:2081/web/tdem/jquery-1.12.4.min.8kcpr.js" type="text/javascript"> </script>
    <script language="javascript" src="https://localhost:2081/web/tdem/jquery-ui.min.8kcpr.js" type="text/javascript"> </script>
    <script language="javascript" src="https://localhost:2081/web/tdem/tdem-popup.js" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/JUtilities.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="~/JavaScript/MGSN.js" type="text/javascript" > </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/Compliance.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/Messaggi.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/stampe.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/storage.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    
    

</head>
<body
    bgcolor="silver" onload="init();" onkeypress="onKeyPressEvent();" onkeydown="fnTrapKeys();" onclick="Javascript:FocusController();"   ms_positioning="GridLayout" style="height: 100%;">
    <form id="Form1" method="post" runat="server" >
        <iewc:TabStrip ID="TabStripMoneyGram" Style="z-index: 17; left: 5px; overflow: hidden; position: absolute; top: 4px"
            TabIndex="-1" runat="server" SepSelectedImageUrl="../../Images/blank.gif" SepHoverImageUrl="../../Images/blank.gif"
            SepSelectedStyle="width:0;height:0;" SepHoverStyle="width:0;height:0;" SepDefaultImageUrl="../../Images/blank.gif"
            TabSelectedStyle="width:126;height:23;background-color:silver;" TabDefaultStyle="width:126;height:23;background-color:silver;"
            SepDefaultStyle="width:0; height:0" TabHoverStyle="width:126;height:23;background-color:silver;"
            TargetID="MultiPage1" Width="630px" Height="23px">
            <iewc:Tab DefaultImageUrl="./../../Images/TabDatiOpe1.gif" SelectedImageUrl="../../Images/TabDatiOpe1Sel.gif"
                ID="firstPage" AccessKey="1"></iewc:Tab>
            <iewc:Tab DefaultImageUrl="./../../Images/TabDatiOpe2.gif" SelectedImageUrl="../../Images/TabDatiOpe2Sel.gif"
                ID="secondPage" AccessKey="2"></iewc:Tab>
            <iewc:Tab DefaultImageUrl="./../../Images/TabDatiListaOperazione.gif" SelectedImageUrl="../../Images/TabDatiListaOperazioneSel.gif"
                ID="xxx" AccessKey="l" DefaultStyle="display:none"></iewc:Tab>
            <iewc:Tab DefaultImageUrl="./../../Images/TabMittente1.gif" SelectedImageUrl="../../Images/TabMittenteSel1.gif"
                ID="thirdPage" AccessKey="m"></iewc:Tab>
            <iewc:Tab DefaultImageUrl="./../../Images/TabDestinatario1.gif" SelectedImageUrl="../../Images/TabDestinatarioSel1.gif"
                ID="fourthPage" AccessKey="b"></iewc:Tab>
            <iewc:Tab DefaultImageUrl="./../../Images/TabDestinatario1.gif" SelectedImageUrl="../../Images/TabMittenteSel1.gif"
                ID="fivePage" AccessKey="c"></iewc:Tab>
        </iewc:TabStrip>
        <asp:TextBox ID="txtComando" Style="z-index: 01; left: 0px; position: absolute; top: 300px"
            TabIndex="10" Width="0px" Height="0px" EnableViewState="False" runat="server">             </asp:TextBox>
        <asp:TextBox ID="TxtSmistatore" Style="z-index: 13; left: 256px; position: absolute; top: 381px"
            TabIndex="-1" Width="0px" Height="0px" EnableViewState="False" runat="server"></asp:TextBox>
         <asp:textbox id="TxtMatricola" tabIndex="-1" runat="server" Height="0px" Width="0px"></asp:textbox>
        <asp:TextBox ID="TxtSmistatoreAgenti" Style="z-index: 15; left: 233px; position: absolute; top: 383px"
            TabIndex="-1" Width="0px" Height="0px" EnableViewState="False" runat="server"></asp:TextBox>
        <iewc:MultiPage ID="MultiPage1" Style="z-index: 03; left: 3px; position: absolute; top: 23px" runat="server"
            Width="635px" Height="346px" SelectedIndex="1" BackColor="Silver" BorderColor="Window" BorderStyle="Outset">
            <iewc:PageView runat="server" ID="Pageview1">
                <asp:Label ID="LblCodicePromo" Style="z-index: 05; left: 15px; position: absolute; top: 22px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Codice Promozionale</asp:Label>
                <asp:TextBox ID="TxtCodicePromozionale" Style="z-index: 05; left: 15px; position: absolute; top: 42px"
                    TabIndex="1" runat="server" Width="215px" MaxLength="20"></asp:TextBox>
                <asp:Label ID="LblPaese" Style="z-index: 05; left: 15px; position: absolute; top: 70px" TabIndex="-1"
                    runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Paese</asp:Label>
                <asp:DropDownList ID="DdlPaese" Style="z-index: 11; left: 15px; behavior: url(./../../webservice.htc); position: absolute; top: 88px"
                    TabIndex="2" runat="server" Width="215px" AutoPostBack="False">
                </asp:DropDownList>
                <asp:Label ID="LblStato" Style="z-index: 04; left: 235px; position: absolute; top: 70px" TabIndex="-1"
                    runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Stato</asp:Label>
                <asp:DropDownList ID="DdlStato" Style="z-index: 07; left: 235px; position: absolute; top: 88px" TabIndex="3"
                    runat="server" Width="215px">
                </asp:DropDownList>
                <asp:Label ID="LblRestrizioni" Style="z-index: 10; left: 15px; position: absolute; top: 123px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Restrizioni</asp:Label>
                <asp:TextBox ID="TxtRestrizioni" Style="z-index: 03; left: 15px; position: absolute; top: 140px"
                    TabIndex="5" runat="server" Width="590px" Height="70px" MaxLength="1000" ReadOnly="True"
                    TextMode="MultiLine"></asp:TextBox>
                <asp:Label ID="LblModalitaPagamento" Style="z-index: 05; left: 15px; position: absolute; top: 223px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Modalità Pagamento</asp:Label>
                <asp:DropDownList ID="DdlModalitaPagamento" Style="z-index: 11; left: 15px; behavior: url(./../../webservice.htc); position: absolute; top: 243px"
                    TabIndex="6" runat="server" Width="270px" AutoPostBack="False">
                </asp:DropDownList>
                <asp:Label ID="LblTipoImporto" Style="z-index: 15; left: 300px; position: absolute; top: 223px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Tipo Valuta</asp:Label>
                <asp:DropDownList ID="DdlTipoImporto" Style="z-index: 13; left: 300px; position: absolute; top: 243px"
                    TabIndex="7" runat="server" Width="305">
                </asp:DropDownList>
                <asp:Label ID="LblDivisa" Style="z-index: 14; left: 260px; position: absolute; top: 300px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">&nbsp;</asp:Label>
                
                <asp:DropDownList id="DdlSenderOccupation" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 354px"
						tabIndex="8" Runat="server" Width="586px" maxlength="20"></asp:DropDownList>

                <asp:DropDownList id="DdlIntendedUseOfMGIServices" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 396px"
						tabIndex="29" Runat="server" Width="586px" maxlength="20"></asp:DropDownList>
				<asp:label id="LblDdlIntendedUseOfMGIServices" style="Z-INDEX: 105; LEFT: 14px; POSITION: absolute; TOP: 396px"
						tabIndex="-1" runat="server" Width="588px" Height="24px" BackColor="Red"></asp:label>	

                <button id="BtnModificaDati" style="z-index: 12; left: 490px; position: absolute; top: 292px"
                    onclick="Javascript:return Modifica(true);" tabindex="9" type="button" onfocus="Javascript:ModificaFocus();"
                    onkeypress="Javascript:BtnModificaOnKeyDown()" accesskey="d">
                    Modifica <u>D</u>ati
                </button>
                <asp:Label ID="LblImporto" Style="z-index: 15; left: 300px; position: absolute; top: 277px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Importo</asp:Label>
                <div Style="z-index: 15; Width:50px;   left: 300px; position: absolute; top: 297px" ><UCtrl:Euro ID="UctrlImporto" runat="server"></UCtrl:Euro></div>
                
                  <div id="DivC2A" style="visibility:hidden" > 
                    <asp:Label ID="Label20" Style="z-index: 09; left: 15px; position: absolute; top: 335px"
                        TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Banca</asp:Label>
                    <asp:DropDownList ID="DropDownList5" Style="z-index: 06; left: 15px; position: absolute; top: 350px"
                        TabIndex="39" runat="server" Width="590px" MaxLength="30"></asp:DropDownList>
                    <asp:label id="Label21" style="Z-INDEX: 05; LEFT: 14px; POSITION: absolute; TOP: 350px"
                            tabIndex="-1" runat="server" Width="588px" Height="24px" BackColor="Red"></asp:label>
                     <asp:Label ID="Label19" Style="z-index: 09; left: 15px; position: absolute; top: 375px"
                        TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Codice Indirizzo</asp:Label>
                    <asp:TextBox ID="TextBox11" Style="z-index: 06; left: 15px; position: absolute; top: 390px"
                        TabIndex="42" runat="server" Width="590px" MaxLength="40"></asp:TextBox>
                     </div>
               
            </iewc:PageView>
            <iewc:PageView runat="server" ID="Pageview2">
                <asp:Label ID="LblCodicePromozionaleP2" Style="z-index: 05; left: 15px; position: absolute; top: 25px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Codice Promozionale</asp:Label>
                <asp:TextBox ID="TxtCodicePromozionaleP2" Style="z-index: 05; left: 15px; position: absolute; top: 42px"
                    TabIndex="1" runat="server" Width="160px" MaxLength="20" BackColor="Silver"></asp:TextBox>
                <asp:Label ID="LblPaese1" Style="z-index: 05; left: 15px; position: absolute; top: 66px" TabIndex="-1"
                    runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Paese</asp:Label>
                <asp:TextBox ID="TxtPaese" Style="z-index: 11; left: 15px; position: absolute; top: 83px" TabIndex="-1"
                    runat="server" Width="160px" MaxLength="100" ReadOnly="True"></asp:TextBox>
                <asp:Label ID="LblStato1" Style="z-index: 04; left: 225px; position: absolute; top: 66px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Stato</asp:Label>
                <asp:TextBox ID="TxtStato" Style="z-index: 07; left: 225px; position: absolute; top: 83px" TabIndex="-1"
                    runat="server" Width="160px" ReadOnly="True"></asp:TextBox>
                <asp:Label ID="LblImportoEuro" Style="z-index: 05; left: 15px; position: absolute; top: 113px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Importo €</asp:Label>
                <UCtrl:Euro ID="UctrlImportoEuro" runat="server"></UCtrl:Euro>
                <asp:Label ID="LblCommissioneEuro" Style="z-index: 05; left: 225px; position: absolute; top: 113px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Commissione €</asp:Label>
                <UCtrl:Euro ID="UctrlCommissioneEuro" runat="server"></UCtrl:Euro>
                <asp:Label ID="LblTotaleEuro" Style="z-index: 05; left: 430px; position: absolute; top: 113px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Totale €</asp:Label>
                <UCtrl:Euro ID="UctrlTotaleEuro" runat="server"></UCtrl:Euro>
                <div id="DIV1" style="left: 15px; overflow: auto; width: 588px; position: absolute; top: 161px; height: 45px"
                    onafterupdate="javascript:FocusController()">
                    <asp:DataGrid ID="gridImportiEuro" Width="588px" BorderColor="#000000" BorderStyle="solid" BorderWidth="1pt"
                        Font-Names="Arial" runat="server" CellPadding="2" CellSpacing="0" Font-Size="8" GridLines="Vertical"
                        AutoGenerateColumns="false">
                        <ItemStyle BackColor="LightGrey" ForeColor="#0000ff"></ItemStyle>
                        <HeaderStyle Font-Bold="True" ForeColor="Black" BackColor="Silver" BorderStyle="Solid" BorderColor="#ffffff"
                            BorderWidth="2px"></HeaderStyle>
                    </asp:DataGrid>
                </div>
            </iewc:PageView>
            <iewc:PageView runat="server" ID="Pageview3">
                <!--Tab Lista Operzioni -->
                <asp:TextBox ID="TxtUltimoTabLista" TabIndex="4" runat="server" Width="0" Height="0" EnableViewState="false"></asp:TextBox>
            </iewc:PageView>
            <iewc:PageView runat="server" ID="Pageview4">
                    <asp:Label id="LblIntestazione3Tab" style="Z-INDEX: 104; LEFT: 390px; POSITION: absolute; TOP: 26px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="10px"
                        ForeColor="Blue">S o l o &nbsp;&nbsp;  P e r s o n e &nbsp;&nbsp; F i s i c h e</asp:Label>
                    <asp:Label id="LblCognomeMitt" style="Z-INDEX: 104; LEFT: 15px; POSITION: absolute; TOP: 12px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Cognome</asp:Label>
                    <asp:TextBox id="TxtCognomeMitt" style="Z-INDEX: 107; LEFT: 15px; POSITION: absolute; TOP: 26px"
                        tabIndex="12" Runat="server" Width="360px" maxlength="35"></asp:TextBox>
                    <asp:Label id="LblNomeMitt" style="Z-INDEX: 105; LEFT: 15px; POSITION: absolute; TOP: 48px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Nome</asp:Label>
                    <asp:TextBox id="TxtNomeMitt" style="Z-INDEX: 111; LEFT: 15px; POSITION: absolute; TOP: 62px"
                        tabIndex="13" Runat="server" Width="360px" maxlength="35"></asp:TextBox>
                    <asp:Image id="imgFreccia" style="Z-INDEX: 101; LEFT: 575px; POSITION: absolute; TOP: 60px"
                        tabIndex="-1" runat="server" Width="24px" Height="24px" BorderStyle="None" ImageUrl="../../Images/freccia24.jpg"></asp:Image>
                    <asp:Label id="LblCodiceFiscaleMitt" style="Z-INDEX: 109; LEFT: 384px; POSITION: absolute; TOP: 48px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Codice Fiscale</asp:Label>
                    <asp:TextBox id="TxtCodiceFiscaleMitt" style="Z-INDEX: 105; LEFT: 384px; POSITION: absolute; TOP: 62px"
                        tabIndex="14" runat="server" width="185" maxlength="16"></asp:TextBox>
                    <asp:Label id="LblIndirizzoMitt" style="Z-INDEX: 109; LEFT: 16px; POSITION: absolute; TOP: 88px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Indirizzo</asp:Label>
                    <asp:TextBox id="TxtIndirizzoMitt" style="Z-INDEX: 106; LEFT: 16px; POSITION: absolute; TOP: 104px"
                        tabIndex="15" Runat="server" Width="432px" maxlength="30"></asp:TextBox>
                    <asp:Label id="LblCittaMitt" style="Z-INDEX: 109; LEFT: 464px; POSITION: absolute; TOP: 88px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Città</asp:Label>
                    <asp:TextBox id="TxtCittaMitt" style="Z-INDEX: 106; LEFT: 464px; POSITION: absolute; TOP: 104px"
                        tabIndex="16" Runat="server" Width="135px" maxlength="20"></asp:TextBox>
                    <asp:Label id="LblPaeseMitt" style="Z-INDEX: 109; LEFT: 15px; POSITION: absolute; TOP: 128px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Paese</asp:Label>
                    <asp:DropDownList id="DdlPaeseMitt" style="Z-INDEX: 105; LEFT: 15px; POSITION: absolute; TOP: 144px"
                        tabIndex="17" runat="server" width="215"></asp:DropDownList>
                    <asp:Label id="LblDdlPaeseMitt" style="Z-INDEX: 104; LEFT: 14px; POSITION: absolute; TOP: 144px"
                        tabIndex="-1" runat="server" Width="217px" Height="24px" BackColor="Red"></asp:Label>
                    <asp:Label id="LblStatoMitt" style="Z-INDEX: 109; LEFT: 255px; POSITION: absolute; TOP: 128px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Stato</asp:Label>
                    <asp:DropDownList id="DdlStatoMitt" style="Z-INDEX: 105; LEFT: 255px; POSITION: absolute; TOP: 144px"
                        tabIndex="18" runat="server" Width="215" Height="24px"></asp:DropDownList>
                    <asp:label id="LblDdlStatoMitt" style="Z-INDEX: 104; LEFT: 254px; POSITION: absolute; TOP: 144px"
                        tabIndex="-1" runat="server" Width="217px" Height="24px" BackColor="Red"></asp:label>
                    <asp:Label id="LblCAPMitt" style="Z-INDEX: 109; LEFT: 495px; POSITION: absolute; TOP: 128px"
                        tabIndex="-1" Runat="server" Width="100" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">CAP/Zip Code</asp:Label>
                    <asp:TextBox id="TxtCAPMitt" style="Z-INDEX: 106; LEFT: 495px; POSITION: absolute; TOP: 144px"
                        tabIndex="19" Runat="server" Width="102px" maxlength="10"></asp:TextBox>
                    <asp:Label id="LblTelefonoMitt" style="Z-INDEX: 109; LEFT: 15px; POSITION: absolute; TOP: 171px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Telefono</asp:Label>
                    <asp:TextBox id="TxtTelefonoMitt" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 184px"
                        tabIndex="20" Runat="server" Width="120px" maxlength="14" onkeyPress="return isNumber(event)"></asp:TextBox>
                    <asp:Label id="LblDataNascitaMitt" style="Z-INDEX: 109; LEFT: 160px; POSITION: absolute; TOP: 171px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Data Nascita</asp:Label>
                    <Uctrl:Date id="UctrlDataNascitaMitt" tabIndex="21" runat="server"></Uctrl:Date>
                    <asp:Label id="LblLuogoNascitaMitt" style="Z-INDEX: 109; LEFT: 255px; POSITION: absolute; TOP: 171px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Nazione di Nascita</asp:Label>
                    <asp:DropDownList id="DdlNazioneNascitaMitt" style="Z-INDEX: 105; LEFT: 255px; POSITION: absolute; TOP: 184px"
                        tabIndex="22" runat="server" Width="215"></asp:DropDownList>
                    <asp:Label id="LblDdlNazioneNascitaMitt" style="Z-INDEX: 104; LEFT: 254px; POSITION: absolute; TOP: 184px"
                        tabIndex="-1" runat="server" Width="217px" Height="24px" BackColor="Red"></asp:Label>
                    <asp:TextBox id="TxtLuogoNascitaMitt" style="Z-INDEX: 106; LEFT: 298px; POSITION: absolute; TOP: 184px; VISIBILITY: hidden;"
                        tabIndex="21" Runat="server" Width="10px" maxlength="20"></asp:TextBox>
                    <asp:Label id="LblNumDocumento" style="Z-INDEX: 109; LEFT: 477px; POSITION: absolute; TOP: 171px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Numero Documento</asp:Label>
                    <asp:TextBox id="TxtNumDocumento" style="Z-INDEX: 106; LEFT: 477px; POSITION: absolute; TOP: 184px"
                        tabIndex="22" Runat="server" Width="120px" maxlength="20"></asp:TextBox>
                    <asp:Label id="LblTipoDocumento" style="Z-INDEX: 109; LEFT: 15px; POSITION: absolute; TOP: 210px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Tipo Documento</asp:Label>
                    <asp:DropDownList id="DdlTipoDocumento" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 226px"
                        tabIndex="23" Runat="server" Width="260"></asp:DropDownList>
                    <asp:label id="LblDdlTipoDocumento" style="Z-INDEX: 104; LEFT: 14px; POSITION: absolute; TOP: 226px"
                        tabIndex="-1" runat="server" Width="262px" Height="24px" BackColor="Red"></asp:label>
                    <asp:Label id="LblEnteEmittenteDocum" style="Z-INDEX: 109; LEFT: 298px; POSITION: absolute; TOP: 210px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Ente Emittente</asp:Label>
                    <asp:TextBox id="TxtEnteEmittenteDocum" style="Z-INDEX: 106; LEFT: 298px; POSITION: absolute; TOP: 226px"
                        tabIndex="24" Runat="server" Width="170px" MaxLength="100"></asp:TextBox>
                <asp:Label id="LblDataRilascioDocum" style="Z-INDEX: 109; LEFT: 520px; POSITION: absolute; TOP: 210px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Data Rilascio</asp:Label>
                    <Uctrl:Date id="UctrlDataRilascioDocum" tabIndex="25"  runat="server"></Uctrl:Date>
                <asp:Label id="LblCittaRilascioDocum" style="Z-INDEX: 109; LEFT: 15px; POSITION: absolute; TOP: 255px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Città Rilascio</asp:Label>
                    <asp:TextBox id="TxtCittaRilascioDocum" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 270px"
                        tabIndex="26" Runat="server" Width="110px" maxlength="20"></asp:TextBox>
                    <asp:Label id="LblPaeseRilascioDocum" style="Z-INDEX: 109; LEFT: 142px; POSITION: absolute; TOP: 255px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Paese Rilascio</asp:Label>
                    <asp:DropDownList id="DdlPaeseRilascioDocum" style="Z-INDEX: 105; LEFT: 142px; POSITION: absolute; TOP: 270px"
                        tabIndex="27" runat="server" Width="215"></asp:DropDownList>
                    <asp:label id="LblDdlPaeseRilascioDocum" style="Z-INDEX: 104; LEFT: 141px; POSITION: absolute; TOP: 270px"
                        tabIndex="-1" runat="server" Width="217px" Height="24px" BackColor="Red"></asp:label>
                    <asp:Label id="LblStatoRilasioDocum" style="Z-INDEX: 109; LEFT: 384px; POSITION: absolute; TOP: 255px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Stato Rilascio</asp:Label>
                    <asp:DropDownList id="DdlStatoRilascioDocum" style="Z-INDEX: 105; LEFT: 384px; POSITION: absolute; TOP: 270px"
                        tabIndex="28" runat="server" Width="215"></asp:DropDownList>
                    <asp:label id="LblDdlStatoRilascioDocum" style="Z-INDEX: 104; LEFT: 383px; POSITION: absolute; TOP: 270px"
                        tabIndex="-1" runat="server" Width="217px" Height="24px" BackColor="Red"></asp:label>
                <asp:Label id="LblRelazioneBeneficiario" style="Z-INDEX: 109; LEFT: 15px; POSITION: absolute; TOP: 297px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Relazione con il Beneficiario</asp:Label>
                <asp:DropDownList id="DdlRelazioneBeneficiario" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 310px"
                        tabIndex="29" Runat="server" Width="586px" maxlength="20"></asp:DropDownList>
                <asp:label id="LblDdlRelazioneBeneficiario" style="Z-INDEX: 105; LEFT: 14px; POSITION: absolute; TOP: 310px"
                        tabIndex="-1" runat="server" Width="588px" Height="24px" BackColor="Red"></asp:label>
               	
                
                <asp:textbox id="TxtUltimoTab3" tabIndex="29" Runat="server" Width="0" Height="0" EnableViewState="false"></asp:textbox>
            </iewc:PageView>
            <iewc:PageView runat="server" ID="Pageview5">
                <asp:Label ID="LblIntestazione4Tab" Style="z-index: 04; left: 220px; position: absolute; top: 12px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="10px"
                    ForeColor="Blue">S o l o &nbsp;&nbsp;  P e r s o n e &nbsp;&nbsp; F i s i c h e</asp:Label>
                <div   style=" height:300px; width:625px; overflow:hidden auto;  position:absolute; top:27px">
                <asp:Label ID="LblCodiceBeneficiario" Style="z-index: 05; left: 430px; position: absolute; top: 20px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Codice Ricezione Beneficiario</asp:Label>
                <asp:TextBox ID="TxtCodiceBeneficiario" Style="z-index: 11; left: 430px; position: absolute; top: 38px"
                    TabIndex="29" runat="server" Width="170px" MaxLength="20"></asp:TextBox>
                <asp:Label ID="LblCognomeDest" Style="z-index: 04; left: 15px; position: absolute; top: 64px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Cognome</asp:Label>
                <asp:TextBox ID="TxtCognomeDest" Style="z-index: 07; left: 15px; position: absolute; top: 77px"
                    TabIndex="30" runat="server" Width="170px" MaxLength="20"></asp:TextBox>
                <asp:Label ID="LblNomeDest" Style="z-index: 05; left: 220px; position: absolute; top: 64px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Nome</asp:Label>
                <asp:TextBox ID="TxtNomeDest" Style="z-index: 11; left: 220px; position: absolute; top: 77px"
                    TabIndex="31" runat="server" Width="180px" MaxLength="14"></asp:TextBox>
                <asp:Label ID="LblCognome2Dest" Style="z-index: 09; left: 430px; position: absolute; top: 64px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">2° Cognome</asp:Label>
                <asp:TextBox ID="TxtCognome2Dest" Style="z-index: 06; left: 430px; position: absolute; top: 77px"
                    TabIndex="32" runat="server" Width="170px" MaxLength="20"></asp:TextBox>
                <asp:Label ID="LblIndirizzoDest" Style="z-index: 09; left: 15px; position: absolute; top: 104px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Indirizzo</asp:Label>
                <asp:TextBox ID="TxtIndirizzoDest" Style="z-index: 06; left: 15px; position: absolute; top: 118px"
                    TabIndex="33" runat="server" Width="200px" MaxLength="30"></asp:TextBox>
                <asp:Label ID="LblCittaDest" Style="z-index: 09; left: 250px; position: absolute; top: 104px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Città</asp:Label>
                <asp:TextBox ID="TxtCittaDest" Style="z-index: 06; left: 250px; position: absolute; top: 118px"
                    TabIndex="34" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                <asp:Label ID="LblCAPDest" Style="z-index: 09; left: 430px; position: absolute; top: 104px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">CAP/Zip Code</asp:Label>
                <asp:TextBox ID="TxtCAPDest" Style="z-index: 06; left: 430px; position: absolute; top: 118px"
                    TabIndex="35" runat="server" Width="170px" MaxLength="10"></asp:TextBox>
                <asp:Label ID="LblPaeseDest" Style="z-index: 09; left: 15px; position: absolute; top: 142px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Paese</asp:Label>
                <asp:DropDownList ID="DdlPaeseDest" Style="z-index: 05; left: 15px; position: absolute; top: 154px"
                    TabIndex="36" runat="server" Width="271">
                </asp:DropDownList>
                <asp:Label ID="LblDdlPaeseDest" Style="z-index: 04; left: 14px; position: absolute; top: 154px"
                    TabIndex="-1" runat="server" Width="273px" Height="24px" BackColor="Red"></asp:Label>
                <asp:Label ID="LblStatoDest" Style="z-index: 09; left: 331px; position: absolute; top: 142px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Stato</asp:Label>
                <asp:DropDownList ID="DdlStatoDest" Style="z-index: 05; left: 331px; position: absolute; top: 154px"
                    TabIndex="37" runat="server" Width="271">
                </asp:DropDownList>
                <asp:Label ID="LblDdlStatoDest" Style="z-index: 04; left: 330px; position: absolute; top: 154px"
                    TabIndex="-1" runat="server" Width="273px" Height="24px" BackColor="Red"></asp:Label>
                <%--<asp:Label ID="LblDomandaDest" Style="z-index: 09; left: 15px; position: absolute; top: 177px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Domanda</asp:Label>
                <asp:TextBox ID="TxtDomandaDest" Style="z-index: 06; left: 15px; position: absolute; top: 190px"
                    TabIndex="39" runat="server" Width="590px" MaxLength="30"></asp:TextBox>
                <asp:Label ID="lblRispostaDest" Style="z-index: 09; left: 15px; position: absolute; top: 215px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Risposta</asp:Label>
                <asp:TextBox ID="TxtRispostaDest" Style="z-index: 05; left: 15px; position: absolute; top: 230px"
                    TabIndex="40" runat="server" Width="590" MaxLength="30"></asp:TextBox>--%>
                 <asp:Label ID="LblOrigineFondi" Style="z-index: 09; left: 15px; position: absolute; top: 177px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Origine dei Fondi</asp:Label>
                <asp:DropDownList ID="DdlOrigineDeiFondi" Style="z-index: 06; left: 15px; position: absolute; top: 190px"
                    TabIndex="39" runat="server" Width="590px" MaxLength="30"></asp:DropDownList>
                <asp:label id="LblDdlOrigineDeiFondi" style="Z-INDEX: 05; LEFT: 14px; POSITION: absolute; TOP: 190px"
                        tabIndex="-1" runat="server" Width="588px" Height="24px" BackColor="Red"></asp:label>
                    <asp:Label ID="LblScopoTransazione" Style="z-index: 09; left: 15px; position: absolute; top: 215px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Scopo della Transazione</asp:Label>
                <asp:DropDownList ID="DdlScopoTransazione" Style="z-index: 05; left: 15px; position: absolute; top: 230px"
                    TabIndex="40" runat="server" Width="590" MaxLength="30"></asp:DropDownList>
                <asp:label id="LblDdlScopoTransazione" style="Z-INDEX: 04; LEFT: 14px; POSITION: absolute; TOP: 230px"
                        tabIndex="-1" runat="server" Width="588px" Height="24px" BackColor="Red"></asp:label>
                <%--<asp:Label id="LblOrigineFondi" style="Z-INDEX: 109; LEFT: 15px; POSITION: absolute; TOP: 297px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Origine dei Fondi</asp:Label>
                <asp:DropDownList id="DdlOrigineDeiFondi" style="Z-INDEX: 106; LEFT: 15px; POSITION: absolute; TOP: 310px"
                        tabIndex="29" Runat="server" Width="200px" maxlength="20"></asp:DropDownList>
                <asp:label id="LblDdlOrigineDeiFondi" style="Z-INDEX: 105; LEFT: 14px; POSITION: absolute; TOP: 310px"
                        tabIndex="-1" runat="server" Width="202px" Height="24px" BackColor="Red"></asp:label>--%>
                 <%-- <asp:Label id="LblScopoTransazione" style="Z-INDEX: 109; LEFT: 435px; POSITION: absolute; TOP: 297px"
                        tabIndex="-1" Runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Scopo della Transazione</asp:Label>
                <asp:DropDownList id="DdlScopoTransazione" style="Z-INDEX: 106; LEFT: 435px; POSITION: absolute; TOP: 310px"
                        tabIndex="29" Runat="server" Width="180px" maxlength="20"></asp:DropDownList>
                <asp:label id="LblDdlScopoTransazione" style="Z-INDEX: 105; LEFT: 434px; POSITION: absolute; TOP: 310px"
                        tabIndex="-1" runat="server" Width="182px" Height="24px" BackColor="Red"></asp:label>--%>
                <asp:Label ID="LblMessaggioDest1" Style="z-index: 09; left: 15px; position: absolute; top: 255px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Messaggio (1)</asp:Label>
                <asp:TextBox ID="TxtMessaggioDest1" Style="z-index: 05; left: 15px; position: absolute; top: 270px"
                    TabIndex="41" runat="server" Width="590" MaxLength="40"></asp:TextBox>
                <asp:Label ID="LblMessaggioDest2" Style="z-index: 09; left: 15px; position: absolute; top: 295px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Messaggio (2)</asp:Label>
                <asp:TextBox ID="TxtMessaggioDest2" Style="z-index: 06; left: 15px; position: absolute; top: 310px"
                    TabIndex="42" runat="server" Width="590px" MaxLength="40"></asp:TextBox>
                    <button id="btn1" style="z-index: 12; left: 490px; position: absolute; top: 292px"
                    onclick="Javascript:visualizzaC2A();" tabindex="9" type="button"  
                     accesskey="d">
                    Modifica <u>D</u>ati
                </button>
                
                <asp:TextBox ID="TxtUltimoTab4" TabIndex="43" runat="server" Width="0" Height="0" EnableViewState="false"></asp:TextBox>
            </iewc:PageView>
             <iewc:PageView runat="server" ID="Pageview6c2a">
                <asp:Label ID="Label1" Style="z-index: 04; left: 280px; position: absolute; top: 12px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="10px"
                    ForeColor="Blue">c2a &nbsp;&nbsp; wallet &nbsp;&nbsp; dati</asp:Label>
                <asp:Label ID="Label2" Style="z-index: 05; left: 430px; position: absolute; top: 20px"
                    TabIndex="-1" runat="server" Font-Bold="True" Font-Names="ms sans serif" Font-Size="12px">Codice Ricezione Beneficiario</asp:Label>
                 
            </iewc:PageView>
        </iewc:MultiPage>
    </form>

     <script type="text/javascript">	
          
         DivC2AVisible('hidden');

         function DivC2AVisible(flag) {
             var divDivC2A = document.getElementById('DivC2A');

             divDivC2A.style.visibility = flag

         }

         function visualizzaC2A() {
             var divDivC2A = document.getElementById('DivC2A');
             if (divDivC2A.style.visibility == 'hidden')
                 divDivC2A.style.visibility = 'visible';
             else
                 divDivC2A.style.visibility = 'hidden';

         }
     </script>
</body>
</html>



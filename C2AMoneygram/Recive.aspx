<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Recive.aspx.vb" Inherits="C2AMoneygram.Recive" EnableViewState="False" ValidateRequest="false" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
 
<%@ Register TagPrefix="UCtrl" TagName="Euro" Src="~/UserControls/EuroField.ascx" %>
<%@ Register TagPrefix="UCtrl" TagName="Date" Src="~/UserControls/DateField.ascx" %> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    <title>Recive C2A</title>
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
    <script language="javascript" src="~/JavaScript/MGRC.js" type="text/javascript" > </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/Compliance.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/Messaggi.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/stampe.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    <script language="javascript" src="<%= System.Configuration.ConfigurationManager.AppSettings.Item("MoneyGramWebBaseUrl") %>JavaScript/storage.js?version=<%= System.Configuration.ConfigurationManager.AppSettings.Item("RELEASE_VERSION")%>" type="text/javascript"> </script>
    
    

</head>
<body onkeypress="onKeyPressEvent();" onkeydown="fnTrapKeys();" onclick="focusController();"
    bgcolor="silver" scroll="no"   ms_positioning="GridLayout">
    <form id="frmReceive" method="post"   runat="server">
        <asp:TextBox ID="TxtSmistatore" Style="behavior: url(./../../webservice.htc)" TabIndex="-1" Height="0"
            Width="0" runat="server"></asp:TextBox>
        <asp:Label ID="Label2" Style="z-index: 104; left: 7px; position: absolute; top: 1px; text-align: center"
                TabIndex="-1" runat="server" Height="20px" Width="612px" ForeColor="Blue" Font-Size="12pt" Font-Bold="True" Font-Names="Arial">Ricezione MoneyGram Web GitHub2</asp:Label>
           <div   id="InputParam" style="z-index: 100; left: 5px; width: 614px; border-top-style: none; border-right-style: none; border-left-style: none; position: absolute; top: 25px; height: 328px; background-color: silver; border-bottom-style: none">
            <asp:Label ID="Label1" Style="z-index: 104; left: 80px; position: absolute;visibility: hidden; top: 118px" runat="server"
                ForeColor="Black" Font-Size="12" Font-Bold="true" Font-Name="Arial">Cod. Riferimento Transazione:</asp:Label>
            <asp:TextBox ID="TxtCodRif" Style="z-index: 11; left: 325px; position: absolute; top: 117px"
                TabIndex="1" runat="server" Width="139px" Font-Size="12pt" Font-Bold="True" Font-Names="Arial" MaxLength="8"></asp:TextBox>
        </div>
        <div id="OutputParam1" style="z-index: 100; left: 5px;   width: 625px; position: absolute; top: 15px; height: 338px; background-color: silver">
            <asp:Panel ID="Panel1" Style="z-index: 111; left: 3px; position: absolute; top: 6px" runat="server"
                Height="60px" Width="608px" Visible="true" BorderStyle="Groove">
                <asp:Label ID="LblRefNumber" Style="z-index: 112; left: 6px; position: absolute; top: 3px"
                    TabIndex="-1" runat="server" Width="196px" Height="19px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Cod. Riferimento Transazione:</asp:Label>
                <asp:TextBox ID="TxtRefNumber" Style="z-index: 113; left: 206px; position: absolute; top: 2px"
                    TabIndex="-1" runat="server" Width="100px" Height="21px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" ForeColor="Blue" MaxLength="8" BackColor="Silver" ReadOnly="True" Columns="8"></asp:TextBox>
                <asp:Label ID="LblTransacStatus" Style="z-index: 114; left: 317px; position: absolute; top: 3px"
                    TabIndex="-1" runat="server" Width="122px" Height="20px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Stato Transazione:</asp:Label>
                <asp:TextBox ID="TxtTransStatus" Style="z-index: 115; left: 442px; position: absolute; top: 2px"
                    TabIndex="-1" runat="server" Width="151px" Height="21px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" ForeColor="Blue" MaxLength="8" BackColor="Silver" ReadOnly="True" Columns="8"></asp:TextBox>
                <asp:Label ID="LblDataInvio" Style="z-index: 118; left: 6px; position: absolute; top: 29px"
                    TabIndex="-1" runat="server" Width="149px" Height="18px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Data Operazione Invio:</asp:Label>
                <asp:TextBox ID="TxtDataInvio" Style="z-index: 119; left: 159px; position: absolute; top: 27px"
                    TabIndex="-1" runat="server" Width="72px" Height="21px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" ForeColor="Blue" BackColor="Silver" ReadOnly="True" Columns="10"></asp:TextBox>
                <asp:Label ID="LblMittente" Style="z-index: 120; left: 259px; position: absolute; top: 29px"
                    TabIndex="-1" runat="server" Width="65px" Height="16px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Mittente:</asp:Label>
                <asp:TextBox ID="TxtMittente" Style="z-index: 121; left: 326px; position: absolute; top: 27px"
                    TabIndex="-1" runat="server" Width="268px" Height="21px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" ForeColor="Blue" BackColor="Silver" ReadOnly="True"></asp:TextBox>
            </asp:Panel>
              <asp:Label ID="LblPresentatore" Style="z-index: 121; left: 9px; position: absolute; top: 70px"
                    TabIndex="-1" runat="server" Width="82px" Height="19px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Presentatore:</asp:Label>
                <asp:TextBox ID="TxtPresentatore" Style="z-index: 122; left: 98px; position: absolute; top: 68px"
                    TabIndex="-1" runat="server" Width="501px" Height="21px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" ForeColor="Blue" BackColor="Silver" ReadOnly="True"></asp:TextBox>

              <asp:panel id="Panel2" style="Z-INDEX: 110; LEFT: 3px; POSITION: absolute; TOP: 92px" runat="server"
					Height="173px" Width="608px" Visible="true" BorderStyle="Groove">
					<asp:label id="LblDestinatario" style="Z-INDEX: 121; LEFT: 6px; POSITION: absolute; TOP: 4px"
						tabIndex="-1" runat="server" Width="82px" Height="19px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Beneficiario:</asp:label>
					<asp:textbox id="TxtDestinatario" style="Z-INDEX: 122; LEFT: 93px; POSITION: absolute; TOP: 2px"
						tabIndex="-1" runat="server" Width="501px" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Silver" ReadOnly="True"></asp:textbox>


					<asp:label id="LblCodFiscale" style="Z-INDEX: 129; LEFT: 6px; POSITION: absolute; TOP: 24px"
						tabIndex="-1" runat="server" Width="87px" Height="19px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Cod. Fiscale:</asp:label>
                    <asp:Image id="imgFreccia" style="Z-INDEX: 101; LEFT: 156px; POSITION: absolute; TOP: 41px"
						tabIndex="-1" runat="server" Width="24px" Height="24px" BorderStyle="None" ImageUrl="../../Images/freccia24.jpg"></asp:Image>
					<asp:textbox id="TxtDestCodFiscale" style="Z-INDEX: 122; LEFT: 6px; POSITION: absolute; TOP: 42px; width: 148px;"
						tabIndex="-1" runat="server" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" MaxLength="16" BackColor="Silver"></asp:textbox>


                    <asp:label id="LblDestDataNascita" style="Z-INDEX: 129; LEFT: 216px; POSITION: absolute; TOP: 24px"
						tabIndex="-1" runat="server" Width="88px" Height="19px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Data Nascita:</asp:label>
                    <UCTRL:DATE id="UctrlDestDataNascita" style="Z-INDEX: 115; LEFT: 216px; POSITION: absolute; TOP: 42px"
						tabIndex="9" runat="server"></UCTRL:DATE>
                    
                  <asp:label id="LblDestNazioneNascita" style="Z-INDEX: 129; LEFT: 418px; POSITION: absolute; TOP: 24px"
						tabIndex="-1" runat="server" Width="106px" Height="19px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Nazione Nascita:</asp:label>
                  <asp:label id="LblCircleDestNazioneNascita" style="Z-INDEX: 130; LEFT: 377px;  POSITION: absolute; TOP: 41px; width: 167px;"
						tabIndex="-1" runat="server" Height="24px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Red"></asp:label>
				  <asp:dropdownlist id="DdlDestNazioneNascita" style="Z-INDEX: 130; LEFT: 378px; POSITION: absolute; TOP: 42px; width: 200px;"
						tabIndex="-1" runat="server" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Silver"></asp:dropdownlist>

                  <asp:label id="LblDestAddress" style="Z-INDEX: 123; LEFT: 8px; POSITION: absolute; TOP: 64px"
						tabIndex="-1" runat="server" Width="59px" Height="20px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Indirizzo:</asp:label>
                  <asp:textbox id="TxtDestAddress" style="Z-INDEX: 124; LEFT: 6px; POSITION: absolute; TOP: 80px; width: 239px;"
						tabIndex="-1" runat="server" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" MaxLength="30" BackColor="Silver"></asp:textbox>

                  <asp:label id="LblDestCap" style="Z-INDEX: 125; LEFT: 283px; POSITION: absolute; TOP: 64px"
						tabIndex="-1" runat="server" Width="39px" Height="19px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Cap:</asp:label>
                  <asp:textbox id="TxtDestCap" style="Z-INDEX: 126; LEFT: 283px; POSITION: absolute; TOP: 80px"
						tabIndex="-1" runat="server" Width="106px" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" MaxLength="10" BackColor="Silver"></asp:textbox>


                  <asp:label id="LblDestCity" style="Z-INDEX: 127; LEFT: 416px; POSITION: absolute; TOP: 64px"
						tabIndex="-1" runat="server" Width="39px" Height="21px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Città:</asp:label>
                  <asp:textbox id="TxtDestCity" style="Z-INDEX: 128; LEFT: 416px; POSITION: absolute; TOP: 80px; width: 173px;"
						tabIndex="-1" runat="server" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" MaxLength="20" BackColor="Silver"></asp:textbox>

                  <asp:label id="LblDestCountry" style="Z-INDEX: 129; LEFT: 6px; POSITION: absolute; TOP: 102px"
						tabIndex="-1" runat="server" Width="52px" Height="19px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Paese:</asp:label>
                  <asp:label id="LblCircleDestCountry" style="Z-INDEX: 130; LEFT: 6px;   POSITION: absolute; TOP: 117px"
						tabIndex="-1" runat="server" Width="243px" Height="24px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Red"></asp:label>
				  <asp:dropdownlist id="DdlDestCountry" style="Z-INDEX: 130; LEFT: 7px; POSITION: absolute; TOP: 118px"
						tabIndex="-1" runat="server" Width="240px" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Silver"></asp:dropdownlist>

                  <asp:label id="LblDestState" style="Z-INDEX: 131; LEFT: 283px; POSITION: absolute; TOP: 102px"
						tabIndex="-1" runat="server" Width="39px" Height="18px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Stato:</asp:label>
                  <asp:label id="LlbCircleDestState" style="Z-INDEX: 132; LEFT: 282px; POSITION: absolute; TOP: 117px"
						tabIndex="-1" runat="server" Width="192px" Height="24px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Red"></asp:label>
					<asp:dropdownlist id="DdlDestState" style="Z-INDEX: 132; LEFT: 283px; POSITION: absolute; TOP: 118px"
						tabIndex="-1" runat="server" Width="190px" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Silver"></asp:dropdownlist>

                  <asp:label id="LblTelefono" style="Z-INDEX: 131; LEFT: 490px; POSITION: absolute; TOP: 101px"
						tabIndex="-1" runat="server" Width="39px" Height="18px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Silver">Telefono:</asp:label>
                  <asp:textbox id="TxtTelefono" style="Z-INDEX: 126; LEFT: 490px; POSITION: absolute; TOP: 118px; width: 102px;"
						tabIndex="-1" runat="server" Height="21px" Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" MaxLength="10" BackColor="Silver" onkeyPress="return isNumber(event)"></asp:textbox>

                 <asp:label id="LblScopoTransazione" style="Z-INDEX: 131; LEFT: 4px; POSITION: absolute; TOP: 143px;"
						tabIndex="-1" runat="server" Height="18px" Width="110px" Font-Names="Arial" Font-Bold="True"
						Font-Size="8pt" BackColor="Silver">Scopo Transazione:</asp:label>
						
                 <asp:label id="LblCircleScopoTransazione" style="Z-INDEX: 130; LEFT: 116px;   POSITION: absolute; TOP: 140px; width: 180px;"
						tabIndex="-1" runat="server" Height="24px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Red"></asp:label>
						
                 <asp:DropDownList ID="DdlScopoTransazione" Style="z-index: 130; left: 117px; position: absolute; top: 141px; width: 180px;"
                    TabIndex="40" runat="server" Font-Names="Arial" Height="21px" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Silver"></asp:DropDownList>


                  <asp:label id="LblRelazioneMittente" style="Z-INDEX: 131; LEFT: 301px; POSITION: absolute; TOP: 143px; width: 112px;"
						tabIndex="-1" runat="server" Height="18px" Font-Names="Arial" Font-Bold="True"
						Font-Size="8pt" BackColor="Silver">Relazione Mittente:</asp:label>
                  <asp:label id="LblCircleRelazioneMittente" style="Z-INDEX: 130; LEFT: 415px;   POSITION: absolute; TOP: 140px; width: 182px;"
						tabIndex="-1" runat="server" Height="24px" Font-Names="Arial" Font-Bold="True"
						Font-Size="10pt" BackColor="Red"></asp:label>
                  <asp:DropDownList ID="DdlRelazioneMittente" Style="z-index: 130; left: 416px; position: absolute; top: 141px; width: 180px;"
                    TabIndex="-1" runat="server" Height="21px"  Font-Names="Arial" Font-Bold="False"
						Font-Size="10pt" ForeColor="Blue" BackColor="Silver"></asp:DropDownList>
				</asp:panel>

            <asp:Label ID="LblMessaggio" Style="z-index: 105; left: 137px; position: absolute; top: 279px"
                TabIndex="-1" runat="server" Height="19px" Width="67px" Font-Size="10pt" Font-Bold="True" Font-Names="Arial">Messaggio</asp:Label>
            <asp:TextBox ID="TxtImportoInvio" Style="z-index: 108; left: 11px; position: absolute; top: 279px; text-align: right"
                TabIndex="-1" runat="server" Height="22px" Width="108px" ForeColor="Blue" Font-Size="12pt" Font-Bold="True" Font-Names="Arial" BackColor="Silver" ReadOnly="True"></asp:TextBox>
            <asp:TextBox ID="TxtMessaggio" Style="clear: both; z-index: 108; left: 212px; float: none; overflow: hidden; position: absolute; top: 263px"
                TabIndex="-1" runat="server" Height="43px" Width="399px" ForeColor="Blue" Font-Size="11pt" Font-Bold="False" Font-Names="Arial" BackColor="Silver" ReadOnly="True" TextMode="MultiLine" Rows="2"></asp:TextBox>
            <asp:Label ID="LblImporto" Style="z-index: 104; left: 33px; position: absolute; top: 263px"
                TabIndex="-1" runat="server" Height="18px" Width="67px" Font-Size="10pt" Font-Bold="True" Font-Names="Arial">Importo €</asp:Label>

            <asp:Panel ID="Panel3" Style="z-index: 100; left: 4px; position: absolute; top: 306px; background-color: silver"
                runat="server" Height="97px" Width="608px" Visible="true" BorderStyle="None">
                <asp:Label ID="LblNumDocumento" Style="z-index: 103; left: 3px; position: absolute; top: 1px; width: 101px;"
                    TabIndex="-1" runat="server" Height="17px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Nr. Documento</asp:Label>
                <asp:Label ID="LblTipoDocumento" Style="z-index: 112; left: 120px; position: absolute; top: 1px"
                    TabIndex="-1" runat="server" Width="118px" Height="21px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Tipo Documento</asp:Label>
                <asp:Label ID="LblEnteEmittente" Style="z-index: 102; left: 373px; position: absolute; top: 1px"
                    TabIndex="-1" runat="server" Width="97px" Height="18px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Ente Emittente</asp:Label>
                
                <asp:TextBox ID="TxtNumDocumento" Style="z-index: 119; left: 1px; position: absolute; top: 18px; width: 96px;"
                    TabIndex="20" runat="server" MaxLength="20" BorderColor="Red"></asp:TextBox>
                <asp:Label ID="LblCircleDocType" Style="z-index: 113; left: 110px; position: absolute; top: 17px"
                    TabIndex="-1" runat="server" Width="230px" Height="24px" BorderStyle="None" BackColor="Red"
                    BorderColor="White"></asp:Label>
                <asp:DropDownList ID="DdlTipoDocumento" Style="z-index: 121; left: 110px; position: absolute; top: 18px"
                    TabIndex="21" runat="server" Width="230px">
                </asp:DropDownList>
                <asp:TextBox ID="TxtEnteEmittente" Style="z-index: 114; left: 355px; position: absolute; top: 17px"
                    TabIndex="22" runat="server" Width="150px" Height="24px" MaxLength="100" BorderColor="Red"></asp:TextBox>
                
                
                
                

                <asp:Label ID="LblDataRilascio" Style="z-index: 101; left: 519px; position: absolute; top: 1px"
                    TabIndex="-1" runat="server" Width="83px" Height="18px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Data Rilascio</asp:Label>


                <asp:Label ID="LblPaeseRilascio" Style="z-index: 116; left: 6px; position: absolute; top: 62px"
                    TabIndex="-1" runat="server" Width="102px" Height="21px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Paese Rilascio</asp:Label>
                <asp:Label ID="LblStatoRilascio" Style="z-index: 117; left: 305px; position: absolute; top: 64px"
                    TabIndex="-1" runat="server" Width="94px" Height="18px" Font-Names="Arial" Font-Bold="True"
                    Font-Size="10pt" BackColor="Silver">Stato Rilascio</asp:Label>


                <UCtrl:Date ID="UctrlDataRilascioDocum" style="z-index: 115; left: 519px; position: absolute; top: 17px"
                    tabIndex="-1" runat="server"></UCtrl:Date>
               
                <asp:Label ID="LblCircleDocCountry" Style="z-index: 117; left: 104px; position: absolute; top: 60px; width: 187px;"
                    TabIndex="-1" runat="server" Height="24px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" BackColor="Red"></asp:Label>
                <asp:DropDownList ID="DdlPaeseRilascio" Style="z-index: 124; left: 105px; position: absolute; top: 61px; width: 185px;"
                    TabIndex="20" runat="server" Height="27px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt">
                </asp:DropDownList>
                <asp:Label ID="LblCircleDocState" Style="z-index: 118; left: 408px;   position: absolute; top: 58px; width: 179px;"
                    TabIndex="-1" runat="server" Height="24px" Font-Names="Arial" Font-Bold="False"
                    Font-Size="10pt" BorderStyle="None" BackColor="Red"></asp:Label>               
                <asp:DropDownList ID="DdlStatoRilascio" Style="z-index: 125; left: 407px; position: absolute; top: 61px; margin-top: 0px;"
                    TabIndex="21" runat="server" Width="180px" Font-Names="Arial" Font-Bold="False" Font-Size="10pt">
                </asp:DropDownList>

            </asp:Panel>
        </div>
        <asp:TextBox ID="txtComando" Style="z-index: 103; left: 0px; position: absolute; top: 0px" TabIndex="11"
            Height="0" Width="0" runat="server" BackColor="Silver" ReadOnly="True"></asp:TextBox>
    </form>
</body>
</html>

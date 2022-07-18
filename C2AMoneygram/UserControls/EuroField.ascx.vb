Partial Class EuroField
    Inherits System.Web.UI.UserControl

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub


    Public Property Value() As Decimal
        Get
            Return Convert.ToDecimal(TextEuro.Text)
        End Get
        Set(ByVal Value As Decimal)
            TextEuro.Text = Value.ToString("#,0.00")
        End Set
    End Property

    Public Property Control() As TextBox
        Get
            Return TextEuro
        End Get
        Set(ByVal Value As TextBox)
            TextEuro = Value
        End Set
    End Property


    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()

        TextEuro.Attributes.Add("onFocus", "javascript:onEuroFieldFocusEvent();")
        TextEuro.Attributes.Add("onClick", "javascript:onEuroFieldClick();")
        TextEuro.Attributes.Add("onKeyDown", "javascript:onEuroFieldKeyDownEvent();")
        TextEuro.Attributes.Add("onBlur", "javascript:onEuroFieldFocusLost();")

    End Sub

#End Region

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        'Put user code to initialize the page here
    End Sub

    Public WriteOnly Property Width() As Integer
        Set(ByVal Value As Integer)
            Me.Control.Width = Unit.Pixel(Value)
        End Set
    End Property

    Private Sub Page_PreRender(ByVal sender As Object, ByVal e As System.EventArgs) Handles MyBase.PreRender

        If Not Page.IsClientScriptBlockRegistered("setjavascriptcodeEuro") Then

            Page.RegisterClientScriptBlock("setjavascriptcodeEuro", SetJavaScriptCode())
        End If

    End Sub

    Private Function SetJavaScriptCode() As String

        Dim sHTML : sHTML = ""
        sHTML = " <script language=""javascript"">" & vbCrLf & _
       "var position=1" & vbCrLf & _
       "function onEuroFieldFocusEvent(){" & vbCrLf & _
       "document.activeElement.style.backgroundColor='yellow'" & vbCrLf & _
       "position=document.getElementById(event.srcElement.name).value.indexOf("","")" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "function onEuroFieldClick(){" & vbCrLf & _
       "if(document.getElementById(event.srcElement.name).readOnly==true){" & vbCrLf & _
       "event.cancelBubble=true" & vbCrLf & _
       "event.returnValue=false" & vbCrLf & _
       "return}" & vbCrLf & _
       "position=document.getElementById(event.srcElement.name).value.indexOf("","")" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "function setCaretAtPosition(field){" & vbCrLf & _
       "if(field.createTextRange){" & vbCrLf & _
       "var r=field.createTextRange()" & vbCrLf & _
       "r.moveStart('character',position)" & vbCrLf & _
       "r.collapse()" & vbCrLf & _
       "r.select()}}" & vbCrLf & _
       "function onEuroFieldKeyDownEvent(){" & vbCrLf & _
       "if(document.getElementById(event.srcElement.name).readOnly==true){" & vbCrLf & _
       "event.cancelBubble=true" & vbCrLf & _
       "event.returnValue=false" & vbCrLf & _
       "return}" & vbCrLf & _
       "if(((event.keyCode>=48)&&(event.keyCode<=57))||" & vbCrLf & _
       "((event.keyCode>=96)&&(event.keyCode<=105))||" & vbCrLf & _
       "(event.keyCode==8)||" & vbCrLf & _
       "(event.keyCode==46)||" & vbCrLf & _
       "(event.keyCode==39)||" & vbCrLf & _
       "(event.keyCode==37)||" & vbCrLf & _
       "(event.keyCode==188)||" & vbCrLf & _
       "(event.keyCode==110)||" & vbCrLf & _
       "(event.keyCode==27)" & vbCrLf & _
       "){" & vbCrLf & _
       "event.returnValue=false" & vbCrLf & _
       "var len=document.getElementById(event.srcElement.name).value.length" & vbCrLf & _
       "switch(event.keyCode){" & vbCrLf & _
       "case 8:" & vbCrLf & _
       "var strBefore=document.getElementById(event.srcElement.name).value" & vbCrLf & _
       "if(position==1){" & vbCrLf & _
       "var rightSubstr=strBefore.substring(position,len)" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=""0""+rightSubstr}" & vbCrLf & _
       "else if(position>1){" & vbCrLf & _
       "if((len-position)>2){" & vbCrLf & _
       "var leftSubstr=strBefore.substring(0,position-1)" & vbCrLf & _
       "var rightSubstr=strBefore.substring(position,len)" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=FormatNumber(leftSubstr+rightSubstr)}" & vbCrLf & _
       "else if((len-position)<2){" & vbCrLf & _
       "var leftSubstr=strBefore.substring(0,position-1)" & vbCrLf & _
       "var rightSubstr=strBefore.substring(position,len)" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=leftSubstr+""0""+rightSubstr}" & vbCrLf & _
       "position--}" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 46:" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=""0,00""" & vbCrLf & _
       "position=1" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 39:" & vbCrLf & _
       "if((len-position)==3)" & vbCrLf & _
       "position++" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 37:" & vbCrLf & _
       "if((len-position)<=2)" & vbCrLf & _
       "position--" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 188:" & vbCrLf & _
       "case 110:" & vbCrLf & _
       "if((len-position)==3)" & vbCrLf & _
       "position++" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 27:" & vbCrLf & _
       "var escPath=document.getElementById(event.srcElement.name).getAttribute(""EscPath"")" & vbCrLf & _
       "if(escPath !=null){" & vbCrLf & _
       "if(escPath !=""disabled"")" & vbCrLf & _
       "window.navigate(escPath)}" & vbCrLf & _
       "break" & vbCrLf & _
       "default:" & vbCrLf & _
       "var len=document.getElementById(event.srcElement.name).value.length" & vbCrLf & _
       "if(position==len)" & vbCrLf & _
       "return" & vbCrLf & _
       "if((len-position)>2&&len==13)" & vbCrLf & _
       "return" & vbCrLf & _
       "modifyEuroFieldText()" & vbCrLf & _
       "break}}" & vbCrLf & _
       "else{" & vbCrLf & _
       "if(event.keyCode==9){" & vbCrLf & _
       "event.returnValue=true" & vbCrLf & _
       "return}" & vbCrLf & _
       "else" & vbCrLf & _
       "event.returnValue=false}}" & vbCrLf & _
       "function modifyEuroFieldText(){" & vbCrLf & _
       "var digit" & vbCrLf & _
       "var dontFormat=false" & vbCrLf & _
       "switch(event.keyCode){" & vbCrLf & _
       "case 96:" & vbCrLf & _
       "digit=""0""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 97:" & vbCrLf & _
       "digit=""1""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 98:" & vbCrLf & _
       "digit=""2""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 99:" & vbCrLf & _
       "digit=""3""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 100:" & vbCrLf & _
       "digit=""4""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 101:" & vbCrLf & _
       "digit=""5""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 102:" & vbCrLf & _
       "digit=""6""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 103:" & vbCrLf & _
       "digit=""7""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 104:" & vbCrLf & _
       "digit=""8""" & vbCrLf & _
       "break" & vbCrLf & _
       "case 105:" & vbCrLf & _
       "digit=""9""" & vbCrLf & _
       "break" & vbCrLf & _
       "default:" & vbCrLf & _
       "digit=String.fromCharCode(event.keyCode)" & vbCrLf & _
       "break}" & vbCrLf & _
       "var len=document.getElementById(event.srcElement.name).value.length" & vbCrLf & _
       "var strBefore=document.getElementById(event.srcElement.name).value" & vbCrLf & _
       "var rightSubstr" & vbCrLf & _
       "var leftSubstr=strBefore.substring(0,position)" & vbCrLf & _
       "if(len-position>2)" & vbCrLf & _
       "rightSubstr=strBefore.substring(position,len)" & vbCrLf & _
       "else{" & vbCrLf & _
       "dontFormat=true" & vbCrLf & _
       "rightSubstr=strBefore.substring(position+1,len)}" & vbCrLf & _
       "if(leftSubstr !=""0"")" & vbCrLf & _
       "position++" & vbCrLf & _
       "else" & vbCrLf & _
       "leftSubstr=""""" & vbCrLf & _
       "if(dontFormat)" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=leftSubstr+digit+rightSubstr" & vbCrLf & _
       "else" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=FormatNumber(leftSubstr+digit+rightSubstr)" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "function FormatNumber(number){" & vbCrLf & _
       "if(number.length<=6)" & vbCrLf & _
       "return number" & vbCrLf & _
       "var commaIndex=number.indexOf("","")" & vbCrLf & _
       "var intPart=number.substring(0,commaIndex)" & vbCrLf & _
       "var decPart=number.substring(commaIndex+1,number.length)" & vbCrLf & _
       "var newIntPart=""""" & vbCrLf & _
       "var counterThousand=0" & vbCrLf & _
       "for(i=intPart.length-1;i>=0;i--){" & vbCrLf & _
       "if(counterThousand % 3==0&&counterThousand>0){" & vbCrLf & _
       "newIntPart="".""+newIntPart" & vbCrLf & _
       "position++}" & vbCrLf & _
       "if(intPart.charAt(i)!="".""){" & vbCrLf & _
       "newIntPart=intPart.charAt(i)+newIntPart" & vbCrLf & _
       "counterThousand++}" & vbCrLf & _
       "else" & vbCrLf & _
       "position--}" & vbCrLf & _
       "return(newIntPart+"",""+decPart)}" & vbCrLf & _
       "function onEuroFieldFocusLost(){" & vbCrLf & _
       "document.getElementById(event.srcElement.name).style.backgroundColor='white'}" & vbCrLf & _
       "</script>"

        Return sHTML
    End Function

End Class

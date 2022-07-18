Partial Class DateField
    Inherits System.Web.UI.UserControl

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub

    Public Property Control() As TextBox
        Get
            Return TxtDate
        End Get
        Set(ByVal Value As TextBox)
            TxtDate = Value
        End Set
    End Property


    Public Property Value() As String
        Get
            Return TxtDate.Text
        End Get
        Set(ByVal Value As String)
            If (Value.IndexOf("/") = -1) Then
                Value = SetData(Value)
            End If
            TxtDate.Text = Value
        End Set
    End Property


    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
        TxtDate.Attributes.Add("onFocus", "javascript:onDateFocusEvent();")
        TxtDate.Attributes.Add("onKeyDown", "javascript:onDateKeyDownEvent();")
        TxtDate.Attributes.Add("onBlur", "javascript:onDateFocusLost();")
        TxtDate.Attributes.Add("onClick", "javascript:onDateClick();")
        TxtDate.Attributes.Add("onSelect", "javascript:onDateSelect();")
    End Sub

#End Region


    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        'Put user code to initialize the page here
    End Sub


    Private Function setData(ByVal dataDaImpostare As String) As String

        If (IsNothing(dataDaImpostare) Or dataDaImpostare = String.Empty) Then
            Return String.Empty
        End If

        Dim strDate As String

        strDate = dataDaImpostare.Substring(0, 2) & _
                   "/" & _
                   dataDaImpostare.Substring(2, 2) & _
                   "/" & _
                   dataDaImpostare.Substring(4, 4)

        Return strDate
    End Function


    Private Sub Page_PreRender(ByVal sender As Object, ByVal e As System.EventArgs) Handles MyBase.PreRender
        If Not Page.IsClientScriptBlockRegistered("setjavascriptcodeDate") Then
            Page.RegisterClientScriptBlock("setjavascriptcodeDate", SetJavaScriptCode())
        End If
    End Sub


    Private Function SetJavaScriptCode() As String
        Dim sHTML : sHTML = ""
        sHTML = " <script language=""javascript"">" & vbCrLf & _
       "var position=0" & vbCrLf & _
       "function onDateFocusEvent(){" & vbCrLf & _
       "document.activeElement.style.backgroundColor=""yellow""" & vbCrLf & _
       "position=0" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "function onDateClick(){" & vbCrLf & _
       "position=0" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "function onDateSelect(){" & vbCrLf & _
       "event.returnValue=false}" & vbCrLf & _
       "function onDateKeyDownEvent(){" & vbCrLf & _
       "if(((event.keyCode>=48)&&(event.keyCode<=57))||" & vbCrLf & _
       "((event.keyCode>=96)&&(event.keyCode<=105))||" & vbCrLf & _
       "(event.keyCode==8)||" & vbCrLf & _
       "(event.keyCode==46)||" & vbCrLf & _
       "(event.keyCode==39)||" & vbCrLf & _
       "(event.keyCode==37)){" & vbCrLf & _
       "event.returnValue=false" & vbCrLf & _
       "switch(event.keyCode){" & vbCrLf & _
       "case 8:" & vbCrLf & _
       "if(position==0)" & vbCrLf & _
       "return" & vbCrLf & _
       "if(position==3 || position==6){" & vbCrLf & _
       "position--" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "return}" & vbCrLf & _
       "else{" & vbCrLf & _
       "position--" & vbCrLf & _
       "var oldPosition=position" & vbCrLf & _
       "event.keyCode=48" & vbCrLf & _
       "modifyDateText()" & vbCrLf & _
       "position=oldPosition" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "break" & vbCrLf & _
       "case 46:" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=""00/00/0000""" & vbCrLf & _
       "position=0" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 39:" & vbCrLf & _
       "if(position==10)" & vbCrLf & _
       "return" & vbCrLf & _
       "if(position==1 || position==4)" & vbCrLf & _
       "position=position+2" & vbCrLf & _
       "else" & vbCrLf & _
       "position++" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "case 37:" & vbCrLf & _
       "if(position==0)" & vbCrLf & _
       "return" & vbCrLf & _
       "if(position==3 || position==6)" & vbCrLf & _
       "position=position-2" & vbCrLf & _
       "else" & vbCrLf & _
       "position--" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))" & vbCrLf & _
       "break" & vbCrLf & _
       "default:" & vbCrLf & _
       "if(position==2 || position==5)" & vbCrLf & _
       "return" & vbCrLf & _
       "if(position<10)" & vbCrLf & _
       "modifyDateText()" & vbCrLf & _
       "break}}" & vbCrLf & _
       "else{" & vbCrLf & _
       "if(event.keyCode==9){" & vbCrLf & _
       "event.returnValue=true" & vbCrLf & _
       "return}" & vbCrLf & _
       "else" & vbCrLf & _
       "event.returnValue=false}}" & vbCrLf & _
       "function modifyDateText(){" & vbCrLf & _
       "var digit" & vbCrLf & _
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
       "var strLastDate=document.getElementById(event.srcElement.name).value" & vbCrLf & _
       "var rightSubstr=strLastDate.substring(position+1,10)" & vbCrLf & _
       "var leftSubstr=strLastDate.substring(0,position)" & vbCrLf & _
       "document.getElementById(event.srcElement.name).value=leftSubstr+digit+rightSubstr" & vbCrLf & _
       "if(position==1 || position==4)" & vbCrLf & _
       "position=position+2" & vbCrLf & _
       "else" & vbCrLf & _
       "position++" & vbCrLf & _
       "setCaretAtPosition(document.getElementById(event.srcElement.name))}" & vbCrLf & _
       "function setCaretAtPosition(field){" & vbCrLf & _
       "if(field.createTextRange){" & vbCrLf & _
       "var r=field.createTextRange()" & vbCrLf & _
       "r.moveStart(""character"",position)" & vbCrLf & _
       "r.collapse()" & vbCrLf & _
       "r.select()}}" & vbCrLf & _
       "function onDateFocusLost(){" & vbCrLf & _
       "document.getElementById(event.srcElement.name).style.backgroundColor=""white""}" & vbCrLf & _
       "</script>"

        Return sHTML
    End Function
End Class

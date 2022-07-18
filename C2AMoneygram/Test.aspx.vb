Public Class Test
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'setComboSender()
    End Sub
    Private Sub setComboSender()

        Dim FirstList As New ListItem



        FirstList.Text = "Elenco (selezionarne uno)"
        FirstList.Value = String.Empty

        DdlSenderOccupation.Items.Add(FirstList)

        Dim i As Integer
        Dim numeroLanci As Integer = 5

        For i = 1 To numeroLanci

            FirstList.Text = "sender " + Convert.ToString(i)
            FirstList.Value = Convert.ToString(i)
            DdlSenderOccupation.Items.Add(FirstList)
        Next
        DdlSenderOccupation.SelectedIndex = 0

        ''If Not IsNothing(arrScopoTransaz) Then
        'For idx = 0 To arrScopoTransaz.Length - 1
        '    Dim Mylist As New ListItem
        '    Mylist.Text = arrScopoTransaz(idx).Description
        '    Mylist.Value = arrScopoTransaz(idx).Value
        '    DdlScopoTransazione.Items.Add(Mylist)
        'Next
        ''End If
    End Sub

End Class
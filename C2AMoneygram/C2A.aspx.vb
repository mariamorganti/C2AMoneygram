Public Class C2A
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' TabStripMoneyGram.SelectedIndex = 4
        setComboSender()


    End Sub

    Protected Sub TabStripMoneyGram_SelectedIndexChange(sender As Object, e As EventArgs) Handles TabStripMoneyGram.SelectedIndexChange
        Dim indexOfSelectedTab As Integer = TabStripMoneyGram.SelectedIndex

    End Sub
    Private Sub setComboSender()

        Dim FirstList As New ListItem

        FirstList.Text = "Elenco (selezionarne uno)"
        FirstList.Value = String.Empty

        DdlSenderOccupation.Items.Add(FirstList)
        DdlIntendedUseOfMGIServices.Items.Add(FirstList)

        DdlSenderOccupation.Items.Insert(1, New ListItem("Occupation 1", "1"))
        DdlSenderOccupation.Items.Insert(2, New ListItem("Occupation 2", "2"))
        DdlIntendedUseOfMGIServices.Items.Insert(1, New ListItem("OfMGIServices 1", "1"))
        DdlIntendedUseOfMGIServices.Items.Insert(2, New ListItem("OfMGIServices 2", "2"))
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
MainViewController._this = null;

function MainViewController() 
{
  MainViewController._this = this;
}

MainViewController.prototype.init = function()
{
  this.setPageTitle();

  this.fillSpentWidget("idWidget", whoPaidApplication.getSession().m_arrSpent);
}

MainViewController.prototype.fillSpentWidget = function(_control, _arrayParent)
{
    // Get html control to be injected.
    var htmlControl = document.getElementById(_control);
  
    // Iterate over all array items and push them to the html control.
    var onsItem = null;
    var spentEntityItem = null;

    var monthData =  whoPaidApplication.getSession().getTotalsByMonth();

    // Fill widget content
    onsItem = document.createElement('ons-list-item');
    onsItem.setAttribute('tappable');
    onsItem.setAttribute('tap-background-color', "#A0A0A0");
    
    var itemHTML = this.spentWidget_Content("My spent", "Total", "No my spent", monthData);
 
    onsItem.innerHTML = itemHTML;
  
    // Append header item.
    htmlControl.appendChild(onsItem);
}

MainViewController.prototype.spentWidget_Content = function(_mPlayer1Label, _mBothLabel, _mPlayer2Label, _monthData)
{
  var content =
  `
    <div class="center list-item__center">
        <table style="width:100%">
          <tr>
            <td align="left">
              <strong>{{_mPlayer1Label}}</strong>
              <br>
              {{player1TotalSpent}}
            </td>
            
            <td align="center" width="100px">
              <strong>{{_mBothLabel}}</strong>
              <br>
              {{bothTotalSpent}}
            </td>

            <td align="right">
              <strong>{{_mPlayer2Label}}</strong>
              <br>
              {{player2TotalSpent}}
            </td>
          </tr>
        </table>
    </div>
   `;
 
   content = content.replace("_mPlayer1Label", _mPlayer1Label);
   content = content.replace("_mPlayer2Label", _mPlayer2Label);
   content = content.replace("_mBothLabel", _mBothLabel);
   content = content.replace(/bothTotalSpent/gi, _monthData.bothTotalSpent);
   content = content.replace(/player1TotalSpent/gi, _monthData.player1TotalSpent);
   content = content.replace(/player2TotalSpent/gi, _monthData.player2TotalSpent);  
   
   content = content.replace(/{{/gi, "");  
   content = content.replace(/}}/gi, ""); 
   
   return content;
}

MainViewController.prototype.setPageTitle = function() 
{
    document.querySelector('#idMainView_Title').innerHTML = appName();
}

MainViewController.newSpent = function()
{
  whoPaidApplication.getSession().resetCurrentSpent();
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT);
}

MainViewController.navigateToSpentListView = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT_LIST);
}
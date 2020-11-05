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
    var mSpent = 100;
    var nmSpent = 200;
    var totalSpent = mSpent + nmSpent;
    for (var i = 0; i < _arrayParent.length; i++) 
    {
      spentEntityItem = _arrayParent[i];
    }

    // Fill widget content
    onsItem = document.createElement('ons-list-item');
    onsItem.setAttribute('tappable');
    onsItem.setAttribute('tap-background-color', "#A0A0A0");
    
    var itemHTML = this.spentWidget_Content("My spent", "Total", "No my spent", mSpent, totalSpent, nmSpent);
 
    onsItem.innerHTML = itemHTML;
  
    // Append header item.
    htmlControl.appendChild(onsItem);
}

MainViewController.prototype.spentWidget_Content = function(_mSpentLabel, _totalSpentLabel, _nmSpentLabel, _mSpent, _totalSpent, _nmSpent)
{
  var content =
  `
    <div class="center list-item__center">
        <table style="width:100%">
          <tr>
            <td align="left">
              <strong>{{_mSpentLabel}}</strong>
              <br>
              {{_mSpent}}
            </td>
            
            <td align="center" width="100px">
              <strong>{{_totalSpentLabel}}</strong>
              <br>
              {{_totalSpent}}
            </td>

            <td align="right">
              <strong>{{_nmSpentLabel}}</strong>
              <br>
              {{_nmSpent}}
            </td>
          </tr>
        </table>
    </div>
   `;
 
   content = content.replace("_mSpentLabel", _mSpentLabel);
   content = content.replace("_nmSpentLabel", _nmSpentLabel);
   content = content.replace("_totalSpentLabel", _totalSpentLabel);
   content = content.replace(/_totalSpent/gi, _totalSpent);
   content = content.replace(/_mSpent/gi, _mSpent);
   content = content.replace(/_nmSpent/gi, _nmSpent);  
   
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
SpentListViewController._this = null;

function SpentListViewController() 
{
  SpentListViewController._this = this;
}

SpentListViewController.prototype.init = function()
{
  this.fillSpentExpandableControl(
    "idSpentList",
    whoPaidApplication.getSession().m_arrCategory, true, 
    whoPaidApplication.getSession().m_arrSpent, true,
    this.categorySpentForeignKeyValidator,
    "SpentListViewController.onclick_spentSelected",
    "SpentListViewController.onclick_delete");
}

SpentListViewController.prototype.fillSpentExpandableControl = function(_control, _arrayParent, _sortedParent, _arrayChild, _sortedChild, _foreignKeyValidator, _callbackFunctionName, _callbackFunctionDelete)
{
    // Get html control to be injected.
    var htmlControl = document.getElementById(_control);
  
    if (_sortedParent === true)
      Helper.arrayCompare(_arrayParent);
  
    if (_sortedChild === true)
      Helper.arrayCompare(_arrayChild);
  
    // Iterate over all array items and push them to the html control.
    var onsItemExpanded = null;
    var categoryEntityItem = null;
    for (var i = 0; i < _arrayParent.length; i++) 
    {
      categoryEntityItem = _arrayParent[i];
      
      // Create item header expandable
      onsItemExpanded = document.createElement('ons-list-item');
      onsItemExpanded.setAttribute('expandable');
      onsItemExpanded.setAttribute('tappable');
      onsItemExpanded.setAttribute('tap-background-color', "#A0A0A0");
      
      // Add subcategory items
      var itemHTML = "<strong>" + categoryEntityItem.getName() + "</strong>";
      
      itemHTML += '<div class="expandable-content">';
  
      var onsItem = null;
      var spentEntityItem = null;
      for (var ii = 0; ii < _arrayChild.length; ii++) 
      {
        spentEntityItem = _arrayChild[ii];
    
        if (_foreignKeyValidator !== null && _foreignKeyValidator(categoryEntityItem, spentEntityItem) === true)
        {
          itemHTML += this.spentListItem_Content
          (
            spentEntityItem.getDetail(), 
            spentEntityItem.getDate_YYYMMDD(), 
            Helper.getFormattedFloat(spentEntityItem.getPlayer1Spent_float() + spentEntityItem.getPlayer2Spent_float()),
            Helper.getFormattedFloat(spentEntityItem.getPlayer1Spent_float()), 
            Helper.getFormattedFloat(spentEntityItem.getPlayer2Spent_float()), 
            _callbackFunctionName + "(event, this, " + ii.toString() + ");",
            _callbackFunctionDelete + "(event, this, " + ii.toString() + ");"
          );
        }
      }
  
      itemHTML += '</div>';
  
      onsItemExpanded.innerHTML = itemHTML;
  
      // Append header item.
      htmlControl.appendChild(onsItemExpanded);
    }
}

SpentListViewController.prototype.spentListItem_Content = function(_itemDetail, _itemDate, _itemSpentBoth, _itemSpentMe, _itemSpentNotMe, _itemOnClick, _itemDeleteOnClick)
{
  var content =
  `
   <ons-list-item tappable="undefined" tap-background-color="#FF0000" onclick="{{_itemOnClick}}" class="list-item">
    <div class="center list-item__center">
        <table  style="width:100%">
          <tr>
            <td align="left">
              <strong>{{_itemDetail}}</strong>
              <br>
              {{_itemDate}}
            </td>
            
            <td align="right">
              <strong>{{_itemSpentBoth}}</strong>
              <br>
              {{_itemSpentMe}} / {{_itemSpentNotMe}}
            </td>

            <td align="right" width="40px">
              <ons-icon icon="fa-trash" onclick="{{_itemDeleteOnClick}}"></ons-icon>
            </td>
          </tr>
        </table>
    </div>
   </ons-list-item>
   `;
 
   content = content.replace("_itemDetail", _itemDetail);
   content = content.replace("_itemDate", _itemDate);
   content = content.replace("_itemSpentBoth", _itemSpentBoth);
   content = content.replace("_itemSpentMe", _itemSpentMe);
   content = content.replace("_itemSpentNotMe", _itemSpentNotMe);  
   content = content.replace("_itemOnClick", _itemOnClick);  
   content = content.replace("_itemDeleteOnClick", _itemDeleteOnClick);  
   
   content = content.replace(/{{/gi, "");  
   content = content.replace(/}}/gi, ""); 
   
   return content;
}

SpentListViewController.prototype.categorySpentForeignKeyValidator = function(_parentItem, _childItem)
{
  //console.log (_parentItem.getId() + " ... " +  _childItem.getCategoryId());
  return _parentItem.getId() === _childItem.getCategoryId();
}

SpentListViewController.onclick_spentSelected = function(_event, _sender, _arrayIndex)
{
  var spent = whoPaidApplication.getSession().m_arrSpent[_arrayIndex];
  console.log("Spent:" + spent);

  whoPaidApplication.getSession().setCurrentSpent(spent);

  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT);
}

SpentListViewController.onclick_delete = function(_event, _sender, _arrayIndex)
{
  _event.stopPropagation();

  // Show confirm dialog.
  ons
  .notification.confirm('Are you sure?')
  .then(
    function(name) 
    {
      if (name !== 0)
      {
        // Log spent before delete.
        var spent = whoPaidApplication.getSession().m_arrSpent[_arrayIndex];
        console.log("Delete Spent:" + spent);

        // Delete spent
        var spentModel = new SpentModel();
        spentModel.deleteSpentById
        (
          spent.getId(),
          function(_result)
          {
            ons.notification.toast('Spent deleted', {
              timeout: 2000
            });

            onsenNavigateTo(C_VIEW_PAGE_ID_SPENT_LIST);
          },
          function(_result)
          {
            ons.notification.alert("ERROR: " + _result);
          }
        );
      }
    }
  );
}

SpentListViewController.onclick_editSpent = function(_sender, _id)
{
} 

SpentListViewController.onclick_listSpent = function(_sender, _id)
{
  testGetAllSpent();
}
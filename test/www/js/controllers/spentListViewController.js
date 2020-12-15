SpentListViewController._this = null;

function SpentListViewController() 
{
  SpentListViewController._this = this;
  this.VIEW_MODE = C_VIEW_MODE_NOT_SET;

  this.m_lstSpentList = null;
  this.m_eleWidget = null;

  this.glData = null;
  appSession().addEventStartReloadingAllData(this.onEventStartReloadingAllData);
  appSession().addEventFinishedReloadingAllData(this.onEventFinishedReloadingAllData);
}

SpentListViewController.prototype.init = function()
{
  this.handleControls();
  
  this.resolveModeView();
}

SpentListViewController.prototype.handleControls = function() 
{
  this.m_lstSpentList = document.querySelector('#idSpentList');
  this.m_eleWidget = document.querySelector('#idSpentidget');
}

SpentListViewController.prototype.resolveModeView = function() 
{
  this.glData = SpentService.WSGetSpentsOrderedByMonthAndCategory();

  this.fillSpentExpandableControl();
  this.fillSpentWidget();
}

SpentListViewController.prototype.onEventStartReloadingAllData = function()
{
  console.log("addEventStartReloadingAllData");
  SpentListViewController._this.fillSpentExpandableControl();
  SpentListViewController._this.fillSpentWidget();
}

SpentListViewController.prototype.onEventFinishedReloadingAllData = function()
{
  SpentListViewController._this.glData = SpentService.WSGetSpentsOrderedByMonthAndCategory();

  console.log("addEventFinishedReloadingAllData");
  SpentListViewController._this.fillSpentExpandableControl();
  SpentListViewController._this.fillSpentWidget();
}

SpentListViewController.prototype.fillSpentWidget = function()
{
    if (this.m_eleWidget === null)
      return;

    var itemHTML = "";

    if (appSession().isDataBeingLoaded() === true)
    {
      var _background = "#1F4769";

      itemHTML =
      `
          <table style="width:100%; background:{{_background}}; padding:4px;">
            <tr style="vertical-align:bottom">
              <td align="center">
                <ons-progress-circular indeterminate></ons-progress-circular>
              </td>
            </tr>
          </table>
      `;

      itemHTML = itemHTML.replace("_background", _background);
    }
    else
    {
      itemHTML = this.spentWidget_Content();
    }
    
    // Fill widget content
    this.m_eleWidget.innerHTML = itemHTML;
}

SpentListViewController.prototype.spentWidget_Content = function()
{
  var _debtColor = "#ED5E61";
  var _notDebtColor = "#9EDA38";
  var _totalColor = "#FCFDFD";
  var _background = "#1F4769";

  var _player1Color = _notDebtColor;
  var _player2Color = _notDebtColor;

  if (this.glData.player1TotalSpent > this.glData.player2TotalSpent)
    _player1Color = _debtColor;
  else if (this.glData.player2TotalSpent > this.glData.player1TotalSpent)
    _player2Color = _debtColor;

  var content =
  `
      <table style="width:100%; background:{{_background}}; padding:4px;">
        <tr style="vertical-align:bottom">
          <td align="left">
            <div style="color:{{_player1Color}}; font-size:1.5em;">{{_player1Spent}}</div>
          </td>
          
          <td align="center">
            <div style="color:white; font-size:2em;"><strong>{{_bothSpent}}</strong></div>
          </td>
        
          <td align="right">
            <div style="color:{{_player2Color}}; font-size:1.5em;">{{_player2Spent}}</div>
          </td>
        </tr>
      
        <tr style="vertical-align:bottom">
          <td align="left">
            <div style="color:{{_player1Color}}; font-size:1em;">{{_player1Percent}}%</div>
          </td>
          
          <td align="center">
            <div style="color:{{_debtColor}}; font-size:1.2em;"><strong>{{_debt}}</strong></div>
          </td>
        
          <td align="right">
            <div style="color:{{_player2Color}}; font-size:1em;">{{_player2Percent}}%</div>
          </td>
        </tr>
      </table>
  `;

  content = content.replace("_background", _background);
  content = content.replace("_player1Spent", Helper.getFormattedFloat(this.glData.player1TotalSpent));
  content = content.replace("_player2Spent", Helper.getFormattedFloat(this.glData.player2TotalSpent));
  content = content.replace("_bothSpent", Helper.getFormattedFloat(this.glData.bothTotalSpent));
  content = content.replace(/_player1Color/gi, _player1Color);
  content = content.replace(/_player2Color/gi, _player2Color);
  content = content.replace("_totalColor", _totalColor);
  content = content.replace("_debtColor", _debtColor);
  content = content.replace("_debt", Helper.getFormattedFloat(this.glData.debt));
  content = content.replace("_player1Percent", Helper.getFormattedFloatFixed0(this.glData.player1Percent));
  content = content.replace("_player2Percent", Helper.getFormattedFloatFixed0(this.glData.player2Percent));
   
  content = content.replace(/{{/gi, "");  
  content = content.replace(/}}/gi, ""); 
   
   return content;
}

SpentListViewController.prototype.fillSpentExpandableControl = function()
{
  if (this.m_lstSpentList === null)
    return;

  console.log(this.glData);

  var itemHTML = "";

  if (appSession().isDataBeingLoaded() === true)
  {
    itemHTML =
    ` 
      <ons-list-item style="padding:0;">
        <table style="width:100%">
          <tr>
            <td align="center">
              <ons-progress-circular indeterminate></ons-progress-circular>
            </td>
          </tr>
        </table>
      </ons-list-item>
    `;
  }
  else
  {
    // Iterate all over array's items and push them to the html control.
    this.glData.arrCategoryGroup.forEach(eCategoryGroup => {
      itemHTML += this.spentListItemHeader_Content(eCategoryGroup);
    });
  }

  this.m_lstSpentList.innerHTML = itemHTML;
}

SpentListViewController.prototype.spentListItemHeader_Content = function(_categoryGroup)
{
  var _itemName = _categoryGroup.catEntity.getName();
  var _itemSpentBoth = _categoryGroup.bothTotalSpent; 
  var _itemSpentMe = _categoryGroup.player1TotalSpent;  
  var _itemSpentNotMe = _categoryGroup.player2TotalSpent;  
  
  var _itemExpandableContent = this.spentListItemExpandable_Content(_categoryGroup);


  var content =
  ` 
    <ons-list-item class="list-item" expandable tappable tap-background-color="lightgray">
      <div class="center list-item__center__custompadding">    
        <table style="width:100%">
          <tr>
            <td align="left">
              <strong>{{_itemName}}</strong>
            </td>
            
            <td align="right" width="40%">
              <strong>{{_itemSpentBoth}}</strong>
              <br>
              {{_itemSpentMe}} / {{_itemSpentNotMe}}
            </td>
          </tr>
        </table>
      </div>
      <div class="expandable-content">
        {{_itemExpandableContent}}
      </div>
    </ons-list-item>
   `;

   content = content.replace("_itemName", _itemName);
   content = content.replace("_itemSpentBoth", _itemSpentBoth);
   content = content.replace("_itemSpentMe", _itemSpentMe);
   content = content.replace("_itemSpentNotMe", _itemSpentNotMe);  
   content = content.replace("_itemExpandableContent", _itemExpandableContent);  

   content = content.replace(/{{/gi, "");  
   content = content.replace(/}}/gi, ""); 
   
   return content;
}

SpentListViewController.prototype.spentListItemExpandable_Content = function(_categoryGroup)
{
  var result = "";

  _categoryGroup.arrSpent.forEach((eSpent, index) => 
  {
    var _itemDetail = eSpent.getDetail();
    var _itemDate = eSpent.getDate_YYYMMDD();
    var _itemSpentBoth =  Helper.getFormattedFloat(eSpent.getPlayer1Spent_float() + eSpent.getPlayer2Spent_float());
    var _itemSpentMe =    Helper.getFormattedFloat(eSpent.getPlayer1Spent_float());
    var _itemSpentNotMe = Helper.getFormattedFloat(eSpent.getPlayer2Spent_float());

    var _itemOnClick = "SpentListViewController.onclick_spentSelected(event, this, " + index.toString() + ");";
    var _itemDeleteOnClick = "SpentListViewController.onclick_delete(event, this, " + index.toString() + ");";

    var content =
    `
    <ons-list-item tappable="undefined" tap-background-color="lightgray" onclick="{{_itemOnClick}}" class="list-item">
      <div class="center list-item__center__custompadding">
          <table style="width:100%">
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

    result += content;
  });
  
  return result;
}

SpentListViewController.onclick_spentSelected = function(_event, _sender, _arrayIndex)
{
  var spent = appSession().m_arrSpent[_arrayIndex];
  console.log("Spent:" + spent);

  appSession().setCurrentSpent(spent);

  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT);
}

SpentListViewController.onclick_delete = function(_event, _sender, _arrayIndex)
{
  _event.stopPropagation();

  console.log("FULLSCREEN", FullScreen.fullScreenApi.isFullScreen());

	Helper.showCustomDialog('spentListView-delete', 'Alert', 'Are you sure?', "SpentListViewController.callbackDialogDelete", _arrayIndex.toString());
}

SpentListViewController.callbackDialogDelete = function(_senderName, _code, _metadata)
{
  Helper.hideCustomDialog(_senderName);

  if (_code === 1 /*1= OK*/)
  {
    // Log spent before delete.
    var spent = appSession().m_arrSpent[parseInt(_metadata)];
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

        onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
      },
      function(_result)
      {
        ons.notification.alert("ERROR: " + _result);
      }
    );
  }
}

SpentListViewController.navigateToBack = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
}
SpentViewController._this = null;

function SpentViewController() 
{
  SpentViewController._this = this;
  this.VIEW_MODE = C_VIEW_MODE_NOT_SET;
}

SpentViewController.prototype.init = function()
{
  if (whoPaidApplication.getSession().getCurrentSpent() === null)
  {
    this.VIEW_MODE = C_VIEW_MODE_NEW;
    this.setPageTitle();

    // If it is a new spent then create one and wait callback to update controls.
    whoPaidApplication.getSession().createNewSpent
    (
      function(_result)
      {
        SpentViewController._this.updateControlValuesWithData();
      },
      function(_result) 
      { 
        appLog("SpentViewController.prototype.init, ERROR (" + _result + ")");
      }
    );
  }
  else
  {
    this.VIEW_MODE = C_VIEW_MODE_EDITION;
    this.setPageTitle();

    SpentViewController._this.updateControlValuesWithData();
  }
}

SpentViewController.prototype.setPageTitle = function() 
{
  if (this.VIEW_MODE === C_VIEW_MODE_NEW)
    document.querySelector('#idSpentView_Title').innerHTML = "New Spent";
  else if (this.VIEW_MODE === C_VIEW_MODE_EDITION)
    document.querySelector('#idSpentView_Title').innerHTML = "Edit Spent";
  else
    document.querySelector('#idSpentView_Title').innerHTML = "VIEWMODE NOT SET";
}

SpentViewController.prototype.updateControlValuesWithData = function() 
{
  var spent = whoPaidApplication.getSession().getCurrentSpent();
  
  document.querySelector('#edMeNewSpent').value = spent.getPlayer1Spent();
  document.querySelector('#edNotMeNewSpent').value = spent.getPlayer2Spent();
  document.querySelector('#edObservation').value = spent.getDetail();
  document.querySelector('#edDatePicker').value = spent.getDate_YYYMMDD();
  
  this.fillSpentTypeExpandableControl();
  this.updateFormWithSubCategorySelected(spent.getCategoryId());
}

SpentViewController.prototype.fillSpentTypeExpandableControl = function()
{
  var arrayCategory = whoPaidApplication.getSession().m_arrCategory;
  var arraySubCategory = whoPaidApplication.getSession().m_arrSubCategory;

  // Get html control to be injected.
  var htmlControl = document.getElementById("idSpentType");

  Helper.arrayCompare(arrayCategory);
  Helper.arrayCompare(arraySubCategory);

  // Iterate over all array items and push them to the html control.
  var onsItemExpanded = null;
  var categoryEntityItem = null;
  for (var i = 0; i < arrayCategory.length; i++) 
  {
    categoryEntityItem = arrayCategory[i];
    
    // Create item header expandable
    onsItemExpanded = document.createElement('ons-list-item');
    onsItemExpanded.setAttribute('expandable');
    onsItemExpanded.setAttribute('tappable');
    onsItemExpanded.setAttribute('tap-background-color', "#A0A0A0");
    
    // Add subcategory items
    var itemHTML = "<strong>" + categoryEntityItem.getName() + "</strong>";
    
    itemHTML += '<div class="expandable-content">';

    var onsItem = null;
    var subCategoryEntityItem = null;
    for (var ii = 0; ii < arraySubCategory.length; ii++) 
    {
      subCategoryEntityItem = arraySubCategory[ii];
  
      if (this.categorySpentForeignKeyValidator(categoryEntityItem, subCategoryEntityItem) === true)
      {
          itemHTML += this.categoryTypeListItem_Content
          (
            subCategoryEntityItem.getName(), 
            "SpentViewController.onclick_subCategorySelected(this, " + "'" + subCategoryEntityItem.getId() + "'" + ");"
          );
      }
    }

    itemHTML += '</div>';

    onsItemExpanded.innerHTML = itemHTML;

    // Append header item.
    htmlControl.appendChild(onsItemExpanded);
  }
}

SpentViewController.prototype.categoryTypeListItem_Content = function(_itemDetail, _itemOnClick)
{
  var content =
  `
   <ons-list-item tappable="undefined" tap-background-color="#FF0000" onclick="{{_itemOnClick}}" class="list-item">
     <div class="center list-item__center">
         {{_itemDetail}}    
      </div>
   </ons-list-item>
   `;
 
   content = content.replace("_itemDetail", _itemDetail);
   content = content.replace("_itemOnClick", _itemOnClick);  
   
   content = content.replace(/{{/gi, "");  
   content = content.replace(/}}/gi, ""); 
   
   return content;
}

SpentViewController.prototype.categorySpentForeignKeyValidator = function(_parentItem, _childItem)
{
  //console.log (_parentItem.getId() + " ... " +  _childItem.getCategoryId());
  return _parentItem.getId() === _childItem.getCategoryId();
}

SpentViewController.onclick_subCategorySelected = function(_sender, _elementId)
{
  whoPaidApplication.getSession().m_spentViewController.updateFormWithSubCategorySelected(_elementId);
}

// This function can be used at initial time and when user changes category type.
SpentViewController.prototype.updateFormWithSubCategorySelected = function(_elementId)
{
  if (_elementId !== "")
  {
    var subCategory = whoPaidApplication.getSession().getSubCategoryById(_elementId);
    var category = whoPaidApplication.getSession().getCategoryById(subCategory.getCategoryId());
    
    // Update category type title element.
    document.querySelector('#lblCategory').innerHTML = "<strong>" + "Category: " + category.getName() + " \\ " + subCategory.getName() + "</strong>";

    // Update current spent with category type selection.
    var spent = whoPaidApplication.getSession().getCurrentSpent();
    spent.setCategoryId(category.getId());
    spent.setSubCategoryId(subCategory.getId());
  }
}

// Current spent can be added or updated depends on VOEW_MODE.
SpentViewController.onclick_commitSpent = function()
{
  SpentViewController._this.updateDataWithControlValues();

  if (SpentViewController._this.VIEW_MODE === C_VIEW_MODE_NEW)
    SpentViewController._this.addCurrentSpent();
  else
    SpentViewController._this.updateCurrentSpent();
} 

SpentViewController.prototype.addCurrentSpent = function()
{
  var spent = whoPaidApplication.getSession().getCurrentSpent();
  console.log("Saving Spent:");
  console.log(spent);

  // Save spent and navigate back.
  var spentModel = new SpentModel();
  spentModel.addSpent
  (
    spent,
    function(_result)
    {
      whoPaidApplication.getSession().loadAllSpent(null, null);
      onsenNavigateTo(C_VIEW_PAGE_ID_MAIN_VIEW);
    },
    function(_result)
    {
      ons.notification.alert("ERROR: " + _result);
    }
  );
}

SpentViewController.prototype.updateCurrentSpent = function()
{
  var spent = whoPaidApplication.getSession().getCurrentSpent();
  console.log("Updating Spent:");
  console.log(spent);

  // Save spent and navigate back.
  var spentModel = new SpentModel();
  spentModel.updateSpent
  (
    spent,
    function(_result)
    {
      whoPaidApplication.getSession().loadAllSpent(null, null);
      onsenNavigateTo(C_VIEW_PAGE_ID_MAIN_VIEW);
    },
    function(_result)
    {
      ons.notification.alert("ERROR: " + _result);
    }
  );
}

SpentViewController.prototype.updateDataWithControlValues = function()
{
  var spent = whoPaidApplication.getSession().getCurrentSpent();

  spent.setPlayer1Spent(document.querySelector('#edMeNewSpent').value);
  spent.setPlayer2Spent(document.querySelector('#edNotMeNewSpent').value);
  spent.setDetail(document.querySelector('#edObservation').value);
  spent.setDate(document.querySelector('#edDatePicker').value);
}

SpentViewController.onclick_listSpent = function(_sender, _id)
{
  testGetAllSpent();
} 
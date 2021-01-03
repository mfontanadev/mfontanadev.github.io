SpentViewController._this = null;

function SpentViewController() 
{
  SpentViewController._this = this;
  this.VIEW_MODE = C_VIEW_MODE_NOT_SET;

  this.m_edMeNewSpent = null;
  this.m_edNotMeNewSpent = null;
  this.m_spentCategory = null;
  this.m_spentSubCategory = null;
  this.m_edObservation = null;
  this.m_edDatePicker = null;
}

SpentViewController.prototype.init = function()
{
  this.handleControls();
  
  this.resolveModeView();
}

SpentViewController.prototype.handleControls = function() 
{
  this.m_edMeNewSpent = document.querySelector('#edMeNewSpent');
  this.m_edNotMeNewSpent = document.querySelector('#edNotMeNewSpent');
  
  this.m_spentCategory = document.getElementById("idSpentTypeCategory");
  this.m_spentSubCategory = document.getElementById("idSpentTypeSubCategory");

  this.m_edObservation = document.querySelector('#edObservation');
  this.m_edDatePicker = document.querySelector('#edDatePicker');
}

SpentViewController.prototype.resolveModeView = function() 
{
  if (appSession().getCurrentSpent() === null)
  {
    this.VIEW_MODE = C_VIEW_MODE_NEW;
    this.setPageTitle();

    // If it is a new spent then create one and wait callback to update controls.
    appSession().createNewSpent
    (
      function(_result)
      {
        appSession().getCurrentSpent().setPlayer1Spent(0);
        appSession().getCurrentSpent().setPlayer2Spent(0);

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
  var spent = appSession().getCurrentSpent();
  
  this.m_edMeNewSpent.value = spent.getPlayer1Spent();
  this.m_edNotMeNewSpent.value = spent.getPlayer2Spent();
  this.fillCategoryControl();
  this.fillSubCategoryControl();
  this.m_edDatePicker.value = spent.getDate_YYYMMDD_datePickerFormat();
  this.m_edObservation.value = spent.getDetail();

  // Default focus and selection.
  this.m_edMeNewSpent._input.focus();
  this.m_edMeNewSpent._input.select();
}

SpentViewController.prototype.fillCategoryControl = function()
{
  var arrayCategory = appSession().m_arrCategory;

  var _selectedId = appSession().getCurrentSpent().getCategoryId();

  // Set default.
  if (_selectedId === "" && arrayCategory.length > 0)
  {
    _selectedId = arrayCategory[0].getId();
    appSession().getCurrentSpent().setCategoryId(_selectedId);
  }

  var itemHTML = "";

   // Sort arrays.
  Helper.arrayCompare(arrayCategory);

  // Iterate over all array items and push them to the html control.
  arrayCategory.forEach(element => {
    itemHTML += this.categoryListItem_Content(element, _selectedId);
  });

  // Update control.
  this.m_spentCategory.innerHTML = itemHTML;
}

SpentViewController.prototype.categoryListItem_Content = function(_categoryEntity, _selectedId)
{
  var _itemOnClick = "SpentViewController.onclick_categorySelected(this, " + "'" + _categoryEntity.getId() + "'" + ");"
  var _itemDetail = _categoryEntity.getName();

  var content = "";
  if (_categoryEntity.getId() === _selectedId)
  {
    content = `
    <ons-list-item tappable="undefined" onclick="{{_itemOnClick}}" class="list-item">
      <div align="left">
          <strong>{{_itemDetail}}</strong>    
        </div>
    </ons-list-item>
    `;
  }
  else
  {
    content = `
    <ons-list-item tappable="undefined" onclick="{{_itemOnClick}}" class="list-item">
      <div align="left">
          {{_itemDetail}}
        </div>
    </ons-list-item>
    `;
  }
 
   content = content.replace("_itemDetail", _itemDetail);
   content = content.replace("_itemOnClick", _itemOnClick);  
   
   content = content.replace(/{{/gi, "");  
   content = content.replace(/}}/gi, ""); 
   
   return content;
}

SpentViewController.prototype.fillSubCategoryControl = function()
{  
  var _categoryId = appSession().getCurrentSpent().getCategoryId();
  var arraySubCategory = CategoryService.getSubcategoriesFromCategory(_categoryId);

  var _selectedId = appSession().getCurrentSpent().getSubCategoryId();
  if (_selectedId === "" && arraySubCategory.length > 0)
  {
    _selectedId = arraySubCategory[0].getId();
    appSession().getCurrentSpent().setSubCategoryId(_selectedId);
  }

  var itemHTML = "";

  // Sort arrays
  Helper.arrayCompare(arraySubCategory);

  // Iterate over all array items and push them to the html control.
  arraySubCategory.forEach(element => {
    if (element.getCategoryId() === _categoryId)
    {
      itemHTML += this.subCategoryListItem_Content(element, _selectedId);
    }
  });

  this.m_spentSubCategory.innerHTML = itemHTML;
}

SpentViewController.prototype.subCategoryListItem_Content = function(_subCategoryEntity, _selectedId)
{
  var _itemOnClick = "SpentViewController.onclick_subCategorySelected(this, " + "'" + _subCategoryEntity.getId() + "'" + ");"
  var _itemDetail = _subCategoryEntity.getName();

  var content = "";
  if (_subCategoryEntity.getId() === _selectedId)
  {
    content = `
    <ons-list-item tappable="undefined" onclick="{{_itemOnClick}}" class="list-item">
      <div align="left">
          <strong>{{_itemDetail}}</strong>    
        </div>
    </ons-list-item>
    `;
  }
  else
  {
    content = `
    <ons-list-item tappable="undefined" onclick="{{_itemOnClick}}" class="list-item">
      <div align="left">
          {{_itemDetail}}
        </div>
    </ons-list-item>
    `;
  }
 
  content = content.replace("_itemDetail", _itemDetail);
  content = content.replace("_itemOnClick", _itemOnClick);  
   
  content = content.replace(/{{/gi, "");  
  content = content.replace(/}}/gi, ""); 
   
   return content;
}

SpentViewController.onclick_categorySelected = function(_sender, _elementId)
{
  var spent = appSession().getCurrentSpent();
  
  // Update current spent new category selected.
  spent.setCategoryId(_elementId);

  // Update category selector with selected category.
  SpentViewController._this.fillCategoryControl();

  // Clear subcategory control.
  spent.setSubCategoryDefault();
  SpentViewController._this.fillSubCategoryControl();
}

SpentViewController.onclick_subCategorySelected = function(_sender, _elementId)
{
  var spent = appSession().getCurrentSpent();
  
  // Update current spent new category selected.
  spent.setSubCategoryId(_elementId);

  // Update subcategory selector with selected subcategory.
  SpentViewController._this.fillSubCategoryControl(spent.getCategoryId(), spent.getSubCategoryId());
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

SpentViewController.prototype.updateDataWithControlValues = function()
{
  var spent = appSession().getCurrentSpent();

  spent.setPlayer1Spent(this.m_edMeNewSpent.value);
  spent.setPlayer2Spent(this.m_edNotMeNewSpent.value);
  spent.setDetail(this.m_edObservation.value);
  spent.setDate(this.m_edDatePicker.value);
}

SpentViewController.prototype.addCurrentSpent = function()
{
  var spent = appSession().getCurrentSpent();
  console.log("Saving Spent:");
  console.log(spent);

  // Save spent and navigate back.
  SpentService.addSpent
  (
    spent,
    function(_result)
    {
      appSession().reloadAllData();
      onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
    },
    function(_result)
    {
      ons.notification.alert("ERROR: " + _result);
    }
  );
}

SpentViewController.prototype.updateCurrentSpent = function()
{
  var spent = appSession().getCurrentSpent();
  console.log("Updating Spent:");
  console.log(spent);

  // Save spent and navigate back.
  SpentService.updateSpent
  (
    spent,
    function(_result)
    {
      appSession().reloadAllData();
      onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
    },
    function(_result)
    {
      ons.notification.alert("ERROR: " + _result);
    }
  );
}

SpentViewController.navigateToBack = function()
{
  if (SpentViewController._this.VIEW_MODE === C_VIEW_MODE_NEW)
    onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
  else if (SpentViewController._this.VIEW_MODE === C_VIEW_MODE_EDITION)
    onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
}
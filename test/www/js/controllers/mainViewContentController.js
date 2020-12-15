MainViewContentController._this = null;

function MainViewContentController() 
{
  MainViewContentController._this = this;
}

MainViewContentController.prototype.init = function()
{
  this.setPageTitle();
}

MainViewContentController.prototype.setPageTitle = function() 
{
    document.querySelector('#idMainView_Title').innerHTML = appName();
}

MainViewContentController.newSpent = function()
{
  appSession().resetCurrentSpent();
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT);
}

MainViewContentController.navigateToSpentListView = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT_LIST);
}
MainViewController._this = null;

function MainViewController() 
{
  MainViewController._this = this;
}

MainViewController.prototype.init = function()
{
}

MainViewController.prototype.setPageTitle = function() 
{
}

MainViewController.newSpent = function()
{
  appSession().resetCurrentSpent();
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT);
}

MainViewController.navigateToSpentListView = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT_LIST);
}
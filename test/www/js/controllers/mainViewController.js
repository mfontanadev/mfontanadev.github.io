MainViewController._this = null;

function MainViewController() 
{
  MainViewController._this = this;
}

MainViewController.prototype.init = function()
{
  this.setPageTitle();
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
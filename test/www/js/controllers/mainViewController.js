MainViewController._this = null;

function MainViewController() 
{
  MainViewController._this = this;
}

MainViewController.prototype.init = function()
{
}

MainViewController.newSpent = function()
{
  whoPaidApplication.getSession().resetCurrentSpent();
  onsenNavigateTo(C_VIEW_PAGE_ID_SPENT);
}
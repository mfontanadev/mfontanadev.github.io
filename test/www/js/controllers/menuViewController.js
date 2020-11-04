function navigateToAbout()
{
	onsenNavigateTo(C_VIEW_PAGE_ID_ABOUT);
}

MenuViewController._this = null;

function MenuViewController() 
{
	MenuViewController._this = this;
  this.VIEW_MODE = C_VIEW_MODE_NOT_SET;
}

MenuViewController.prototype.init = function()
{
  this.setPageTitle();
}

MenuViewController.prototype.setPageTitle = function() 
{
}

MenuViewController.navigateToAboutView = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_ABOUT);
}

MenuViewController.navigateToTestView = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_TEST);
}
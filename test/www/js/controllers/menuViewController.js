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
  MenuViewController.updateFullScreenLabel(); 
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

MenuViewController.updateFullScreenLabel = function(_stopPropagation)
{
  // Special asynch logic to give time fullscreen logic performs the change
  // and flags will be updated.
  if (_stopPropagation === true)
  {
    if (FullScreen.fullScreenApi.isFullScreen()) 
    {
      document.getElementById("idToggleFullScreen").innerHTML = "Exit full screen";
    } 
    else 
    {
      document.getElementById("idToggleFullScreen").innerHTML = "Full Screen";
    }
  }
  else
  {
    window.setTimeout( function() 
    {	
      MenuViewController.updateFullScreenLabel(true);
    }, 250);
  }
}
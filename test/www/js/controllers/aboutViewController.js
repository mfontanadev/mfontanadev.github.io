AboutViewController._this = null;

function AboutViewController() 
{
  AboutViewController._this = this;
  this.VIEW_MODE = C_VIEW_MODE_NOT_SET;
}

AboutViewController.prototype.init = function()
{
  this.setPageTitle();

  this.updateInfo();
}

AboutViewController.prototype.setPageTitle = function() 
{
    document.querySelector('#idAboutView_Title').innerHTML = "About";
}

AboutViewController.prototype.updateInfo = function() 
{
  document.querySelector('#idAboutAppNameNAdVersion').innerHTML = appNameAndVersion();
  document.querySelector('#idAboutProvider').innerHTML = "Provided by mfontanadev";
  document.querySelector('#idAboutDeveloper').innerHTML = "mfontanadev@gmail.com";
}
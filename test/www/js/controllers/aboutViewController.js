AboutViewController._this = null;

function AboutViewController() 
{
  AboutViewController._this = this;
  this.VIEW_MODE = C_VIEW_MODE_NOT_SET;
}

AboutViewController.prototype.init = function()
{
  this.setPageTitle();
}

AboutViewController.prototype.setPageTitle = function() 
{
    document.querySelector('#idAboutView_Title').innerHTML = "About+";
}

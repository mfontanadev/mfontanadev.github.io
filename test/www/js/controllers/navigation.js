function customNavigateTo(_target)
{
	window.location.href = _target;
}

function onsenNavigateTo(_target)
{
	_target = _target + ".html";
	appLog('pushing page: ' + _target);
	var myNavigator = document.querySelector('#myNavigator');
	myNavigator.resetToPage(Config.C_FOLDER_VIEWS + _target);
}

function onInitEvent(_event)
{
	var page = event.target;
	console.log("onInitEvent (pageId, page):", page.id, ",", page);

	if (page.id === C_VIEW_PAGE_ID_ABOUT) 
		whoPaidApplication.getSession().m_aboutViewController.init();
	else if (page.id === C_VIEW_PAGE_ID_MENU) 
		whoPaidApplication.getSession().m_menuViewController.init();		
	else if (page.id === C_VIEW_PAGE_ID_SPENT) 
		whoPaidApplication.getSession().m_spentViewController.init();	
	else if (page.id === C_VIEW_PAGE_ID_MAIN_VIEW)
		whoPaidApplication.getSession().m_mainViewController.init();	
	else if (page.id === C_VIEW_PAGE_ID_SPENT_LIST)
		whoPaidApplication.getSession().m_spentListViewController.init();	
}

function onsenMenuOpen()
{
	var menu = document.getElementById('mySplitter');

	if (menu.isOpen === true)
		menu.close();
	else
		menu.open();
};
  
/*
function onsenLoad(page) 
{
	var content = document.getElementById('content');
	var menu = document.getElementById('menu');
	content.load(page)
	  .then(menu.close.bind(menu));
};
*/

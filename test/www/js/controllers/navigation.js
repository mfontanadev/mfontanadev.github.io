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
		appSession().m_aboutViewController.init();
	else if (page.id === C_VIEW_PAGE_ID_MENU) 
		appSession().m_menuViewController.init();		
	else if (page.id === C_VIEW_PAGE_ID_SPENT) 
		appSession().m_spentViewController.init();	
	else if (page.id === C_VIEW_PAGE_ID_MAIN)
		appSession().m_mainViewController.init();	
	else if (page.id === C_VIEW_PAGE_ID_MAIN)
		appSession().m_mainViewContentController.init();	
	else if (page.id === C_VIEW_PAGE_ID_SPENT_LIST)
		appSession().m_spentListViewController.init();	
	else if (page.id === C_VIEW_PAGE_ID_TEST)
		appSession().m_testViewController.init();	
	else if (page.id === C_VIEW_PAGE_ID_SPLASH)
		appSession().m_splashViewController.init();	
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

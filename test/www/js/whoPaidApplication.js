var C_VIEW_MODE_NOT_SET = 0;
var C_VIEW_MODE_EDITION = 1;
var C_VIEW_MODE_NEW = 2;

var C_VIEW_PAGE_ID_MENU = "menuView";
var C_VIEW_PAGE_ID_ABOUT = "aboutView";
var C_VIEW_PAGE_ID_SPENT = "spentView";
var C_VIEW_PAGE_ID_MAIN_VIEW = "mainView";
var C_VIEW_PAGE_ID_SPENT_LIST = "spentListView";

function WhoPaidApplication() 
{
    this.m_db = null;
	this.m_session = null;
}

WhoPaidApplication.prototype.init = function() 
{
	var _this = this;

	appLog("On WhoPaidApplication");
	appLog("   Version v" + this.getVersionName());
	
	// Force singleton creation.
	this.getSession();

	// Initialize data base engine.	
	this.getDB();
	
	// Lazy load of data.
	// TODO: use som mechanism of synch to be sure that all data was loaded before start. 
	window.setTimeout( function() 
	{	
		_this.initDelayed();
	}, 1000);
}

WhoPaidApplication.prototype.getSession = function()
{
	if (this.m_session === null)
	{
		appLog("getSession");
		this.m_session = new Session();
	}

	return this.m_session;
}

WhoPaidApplication.prototype.getDB = function()
{
	if (this.m_db === null)
	{
		appLog("getDB");
		this.m_db = new DBManager();
		this.m_db.init();
	}

	return this.m_db;
}

// Give time to database files to be ready.
WhoPaidApplication.prototype.initDelayed = function() 
{
	// Load all data.
	this.getSession().init();

	// *** Unit Tests ***
	runModelTests();
	//this.autoLogin();
}

WhoPaidApplication.prototype.getVersionName = function() 
{
    return "1.1.2";
}

WhoPaidApplication.prototype.autoLogin  = function() 
{
    const username = "User2";
	const password = "Pass2";
    var userModel = new UserModel();

	userModel.findUserByName
	(
		username, 
		function(_userEntity) 
		{ 
			if (_userEntity !== null)
			{
				whoPaidApplication.getSession().setCurrentUser(_userEntity);
				appLog("Current user ID:" + _userEntity.log());
				onsenNavigateTo(C_VIEW_PAGE_ID_MAIN_VIEW);
			}
			else
                appLog("AutoLogin; FAILED");

		},
		function(_result) 
		{
			appLog("login, " + _result); 
		}
	);
}

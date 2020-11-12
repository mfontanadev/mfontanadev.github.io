function WhoPaidApplication() 
{
    this.m_db = null;
	this.m_session = null;
}

WhoPaidApplication.prototype.init = function() 
{
	var _this = this;

	// Force singleton creation.
	this.getSession();

	// Initialize data base engine.	
	this.getDB();
	this.m_db.init
	(
		function() 
		{	
			console.log("Finish");
			_this.initDelayed();
		}
	);
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
	}

	return this.m_db;
}

// Give time to database files to be ready.
WhoPaidApplication.prototype.initDelayed = function() 
{
	appLog("initdelayed");
	
	// Load all data.
	this.getSession().init();

	// Unit Tests
	runModelTests();

	// Debug porpouses
	//this.autoLogin();
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
				onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
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

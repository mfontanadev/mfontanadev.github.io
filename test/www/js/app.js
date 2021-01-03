var appData = {
	'session': null,
	'db': null,	
	'log': "",
	'localStorageManager': null
}

function init()
{
	appSetPageTitle();

	document.addEventListener('deviceReady', function () 
	{
		//testHtmlStorage();
				
		TimeDiff.logTimes = true;

		appLog("********** On deviceReady");
		appLog("Device type:" + getDeviceType());
		appLogCordovaFile();
		
		FullScreen.init("myNavigator");

		registerOnInitNavigationEvent();

		sessionInitialization();

		dbInitialization();

		showInitialView();
	});
}


function registerOnInitNavigationEvent()
{
	// Call init function of controllers classes after transition is finished.
	// This will be called after 'deviceReady'
	document.addEventListener('init', function(event) 
	{
		appLog("********** On init");
		onNavigationInitEvent(event);
	});
}

// Initialize data base engine.	
function sessionInitialization()
{
	var session = appSession();
	session.init();
}

// Initialize data base engine.	
function dbInitialization()
{
	var database = appDB();

	database.init();
	database.onEventPopulateInitialData
	(
		function(){appSession().reloadAllData();}
	);
    database.populateInitialData();
}

function appSession()
{
	if (appData.session === null)
	{
		appLog("getSession");
		appData.session = new Session();
	}

	return appData.session;
}

function appDB()
{
	if (appData.db === null)
	{
		//appLog("getDB");
		appData.db = new DBManager();
	}

	return appData.db;
}

function appLocalStorage()
{
	if (appData.localStorageManager === null)
	{
		appLog("appLocalStorage()");
		appData.localStorageManager = new LocalStorageManager();
	}

	return appData.db;
}

function appLogData()
{
	if (appData.log === null)
	{
		appLog("getLog");
		appData.log = "";
	}

	return appData.log;
}

// Give time to database files to be ready.
function showInitialView()
{
	appLog("\n\n********** initdelayed");
	
	// Unit Tests
	// runServiceTests();

	// Debug porpouses
	// appautoLogin();

	onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);

	//onsenNavigateTo(C_VIEW_PAGE_ID_LOGIN);
	//onsenNavigateTo(C_VIEW_PAGE_ID_TEST);

	//appSession().reloadAllData();
}

function appAutoLogin()
{
    const username = "User2";
	const password = "Pass2";

	UserService.findUserByName
	(
		username, 
		function(_userEntity) 
		{ 
			if (_userEntity !== null)
			{
				appSession().setCurrentUser(_userEntity);
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

function appLog(_string)
{
	if (Config.C_LOG === true)
	{
		console.log(_string);
		appData.log += _string;

		var logArea = document.querySelector('#logArea');
		if (typeof logArea !== 'undefined' && logArea !== null)
		{
			logArea.value = logArea.value + _string + "\n"; 
			logArea.scrollTop = logArea.scrollHeight;
			logArea.style.display = 'block';	

			var logAreaDiv = document.querySelector('#divLogArea');
			if (typeof logAreaDiv !== 'undefined' && logAreaDiv !== null)
			{
				logArea.style.width = (logAreaDiv.clientWidth - 16) + "px";
			}
		}
	}
}

function appClearLog()
{
	if (Config.C_LOG === true)
	{
		var logArea = document.querySelector('#logArea');
		if (typeof logArea !== 'undefined' && logArea !== null)
		{
			logArea.value = ""; 
			logArea.scrollTop = logArea.scrollHeight;
			logArea.style.display = 'block';	
		}
	}
}

function appLogCordovaFile(_file)
{
	appLog("\n\n")
	appLog("cordova.file:" + cordova.file);

	if (typeof cordova.file !== 'undefined')
	{
		_file =  cordova.file;
		appLog("applicationDirectory:" + _file.applicationDirectory);
		appLog("applicationStorageDirectory:" + _file.applicationStorageDirectory);
		appLog("dataDirectory:" + _file.dataDirectory);
		appLog("cacheDirectory:" + _file.cacheDirectory);
		appLog("externalRootDirectory:" + _file.externalRootDirectory);
		appLog("externalApplicationStorageDirectory:" + _file.externalApplicationStorageDirectory);
		appLog("externalDataDirectory:" + _file.externalDataDirectory);
		appLog("externalCacheDirectory:" + _file.externalCacheDirectory);
		appLog("tempDirectory:" + _file.tempDirectory);
		appLog("syncedDataDirectory:" + _file.syncedDataDirectory);
		appLog("documentsDirectory:" + _file.documentsDirectory);
		appLog("sharedDirectory:" + _file.sharedDirectory);
		appLog("\n\n")
	}
}

function appVersion()
{
    return "1.4.3";
}

function appName()
{
    return "WhoPaidEx";
}

function appNameAndVersion()
{
	return appName() + " v" + appVersion();
}

function appSetPageTitle()
{
	var fullName = appNameAndVersion();

	appLog(fullName);
	document.title = fullName;
}

function appToggleFullScreen() 
{
	var fsElement = document.getElementById(FullScreen.fullScreenApi.fullScreenElement);
	
	if (!FullScreen.fullScreenApi.isFullScreen()) 
	{
		FullScreen.fullScreenApi.requestFullScreen(fsElement);
	} 
	else 
	{
		FullScreen.fullScreenApi.cancelFullScreen(fsElement);
	}

	MenuViewController.updateFullScreenLabel();
}

function getDeviceType()
{
	appLog("isIPad:" + ons.platform.isIPad());
	appLog("isIPhoneX:" + ons.platform.isIPhoneX());
	appLog("isIPhone:" + ons.platform.isIPhone());
	appLog("isAndroidPhone:" + ons.platform.isAndroidPhone());
	appLog("isAndroidTablet:" + ons.platform.isAndroidTablet());

	var returnValue = "undefined";

	if (ons.platform.isIPad() === true ||
		ons.platform.isAndroidTablet() === true)
	{
		returnValue = "tablet";
	}
	else if (ons.platform.isAndroidPhone() === true ||
			 ons.platform.isIPhoneX() === true ||
			ons.platform.isIPhone() === true)
	{
		returnValue = "mobile";
	}
	else
	{
		returnValue = "desktop";
	}

	appLog("device type:" + returnValue);
	return returnValue;
}

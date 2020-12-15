var appData = {
	'session': null,
	'db': null,	
	'log': ""
}

function init()
{
	appSetPageTitle();

	document.addEventListener('deviceReady', function () 
	{
		appLog("********** On deviceReady");
		appLog("Device type:" + getDeviceType());
		
		TimeDiff.logTimes = true;
		
		FullScreen.init("myNavigator");

		// Call init function of controllers classes after transition is finished.
		// This will be called after 'deviceReady'
		document.addEventListener('init', function(event) 
		{
			appLog("********** On init");
			onInitEvent(event);
		});

		// Init app singleton to hold: database, session and global constants.
		appSession();

		// Initialize data base engine.	
		appDB().init
		(
			function() 
			{	
				console.log("Finish");
				appInitDelayed();
			}
		);
	});
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
		appLog("getDB");
		appData.db = new DBManager();
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
function appInitDelayed()
{
	appLog("initdelayed");
	
	// Load all data.
	appSession().init();

	// Unit Tests
	// runModelTests();

	// Debug porpouses
	// appautoLogin();

	//onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
}

function appAutoLogin()
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
    return "1.3.0";
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

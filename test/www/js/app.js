var whoPaidApplication = null;

function init()
{
	appSetPageTitle();

	document.addEventListener('deviceReady', function () 
	{
		appLog("********** On deviceReady");
		
		FullScreen.init("myNavigator");
		//appLogCordovaFile(cordova.file);
		//log(ons.platform.isIPad());

		// Init app singleton to hold: database, session and global constants.
		whoPaidApplication = new WhoPaidApplication();
		whoPaidApplication.init();
		
		// Call init function of controllers classes after transition is finished.
		// This will be called after 'deviceReady'
		document.addEventListener('init', function(event) 
		{
			appLog("********** On init");
			onInitEvent(event);
		});
	});
}

function appLog(_string)
{
	if (Config.C_LOG === true)
	{
		console.log(_string);

		var logArea = document.querySelector('#logArea');
		if (typeof logArea !== 'undefined' && logArea !== null)
		{
			logArea.value = logArea.value + _string + "\n"; 
			logArea.scrollTop = logArea.scrollHeight;
			logArea.style.display = 'block';	
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
    return "1.1.4";
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
		document.getElementById("idToggleFullScreen").innerHTML = "Exit full screen";
		FullScreen.fullScreenApi.requestFullScreen(fsElement);
	} 
	else 
	{
		document.getElementById("idToggleFullScreen").innerHTML = "Full Screen";
		FullScreen.fullScreenApi.cancelFullScreen(fsElement);
	}
}

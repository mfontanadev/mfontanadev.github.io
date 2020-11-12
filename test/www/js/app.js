var whoPaidApplication = null;

function init()
{
	appSetPageTitle();

	document.addEventListener('deviceReady', function () 
	{
		appLog("********** On deviceReady");
		appLog("Device type:" + getDeviceType());
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
    return "1.1.17";
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

/*
function getDeviceType()
{
	const ua = navigator.userAgent;

	appLog(ua);
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) 
	{
	  return "tablet";
	}

	if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) 
	{
	  return "mobile";
	}
	
	return "desktop";
};
*/

/*
function appToggleFullScreen() 
{
	if (!document.fullscreenElement) 
	{
		document.getElementById("idToggleFullScreen").innerHTML = "Exit full screen";
		document.documentElement.requestFullscreen();
	} 
	else 
	{
	  if (document.exitFullscreen) 
	  {
		document.getElementById("idToggleFullScreen").innerHTML = "Full Screen";
		document.exitFullscreen(); 
	  }
	}
}
*/

  /*
  function appRequestFullscreen(ele) {
	if (ele.requestFullscreen) {
	  ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
	  ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
	  ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
	  ele.msRequestFullscreen();
	} else {
	  console.log('Fullscreen API is not supported.');
	}
  };

  var exitFullscreen = function () {
	if (document.exitFullscreen) {
	  document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
	  document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
	  document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
	  document.msExitFullscreen();
	} else {
	  console.log('Fullscreen API is not supported.');
	}
  };
  */
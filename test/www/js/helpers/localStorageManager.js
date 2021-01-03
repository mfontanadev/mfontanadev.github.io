/**
 * Class LocalStorageManager:
 * 		Functions to save, read, insert, and update files
 * 		usgin either cordova or localStorage solution.
 */
function LocalStorageManager ()
{ 
	// Can be: cordovaStorage, htmlStorage.
	this.storageSystem = null;		
}

LocalStorageManager.prototype.init = function ()
{
	if (this.isSupportCordovaStorage())
	{
		this.useCordovaStorageSystem();
	}
	else if (thid.isSupportHtmlStorage())
	{
		this.useHtmlStorageSystem();
	}
	else
	{
		appLog("Local storages not supported");
	}
};

LocalStorageManager.prototype.isSupportedLocalStorage = function ()
{
	return this.supportCordovaStorage() === true || this.supportHtmlStorage() === true; 
}

LocalStorageManager.prototype.isSupportCordovaStorage = function ()
{
	return CordovaStorage.isSupported();
}

LocalStorageManager.prototype.isSupportHtmlStorage = function ()
{
	return HtmlStorage.isSupported();
}

LocalStorageManager.prototype.test = function ()
{
};

LocalStorageManager.prototype.dumpFileSystemData = function ()
{
	this.storageSystem.dumpFileSystemData();
};

LocalStorageManager.prototype.useCordovaStorageSystem = function ()
{
	this.storageSystem = new CordovaStorage();
	this.storageSystem.init();
	appLog("using CordovaStorage");
	//this.storageSystem.test();
};

LocalStorageManager.prototype.useHtmlStorageSystem = function ()
{
	this.storageSystem = new HtmlStorage();
	this.storageSystem.init();
	appLog("using HtmlStorage");
	//this.storageSystem.test();
};

LocalStorageManager.prototype.writeToFile = function(_fileName, _content, _callbackOK, _callbackError)
{
	this.storageSystem.writeToFile(_fileName, _content, _callbackOK, _callbackError);
}

LocalStorageManager.prototype.readFile = function(_fileName, _callbackOK, _callbackError)
{
	this.storageSystem.readFile(_fileName, _callbackOK, _callbackError);
}

LocalStorageManager.prototype.deleteFile = function(_fileName, _callbackOK, _callbackError)
{
	this.storageSystem.deleteFile(_fileName, _callbackOK, _callbackError);
}

LocalStorageManager.prototype.appendToFile = function(_fileName, _content, _callbackOK, _callbackError)
{
	this.storageSystem.appendToFile(_fileName, _content, _callbackOK, _callbackError);
}

LocalStorageManager.prototype.updateFile = function(_fileName, _content, _offset, _callbackOK, _callbackError)
{
	this.storageSystem.updateFile(_fileName, _content, _offset, _callbackOK, _callbackError);
}

LocalStorageManager.prototype.existsFile = function(_fileName, _callbackOK, _callbackError)
{
	return this.storageSystem.existsFile(_fileName, _callbackOK, _callbackError);
}

LocalStorageManager.prototype.updateFileAndroid = function(_fileName, _content, _offset, _callbackOK, _callbackError)
{
	return this.storageSystem.updateFileAndroid(_fileName, _content, _offset, _callbackOK, _callbackError)
}

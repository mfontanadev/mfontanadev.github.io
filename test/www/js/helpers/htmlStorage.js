/**
 * Class CordovaStorage:
 * 		Functions to save, read, insert, and update files
 * 		usgin localStorage file system solution.
 * 
 * 		http://people.w3.org/mike/localstorage.html
 */
function HtmlStorage () 
{ 
}

HtmlStorage.prototype.init = function ()
{
}

HtmlStorage.isSupported = function(_ok, _error)
{
	var result = (typeof(Storage) !== "undefined");
	appLog("htmlStorage supported:" + result);

	if (result === true)
		_ok();
	else
		_error();
}

HtmlStorage.prototype.test = function ()
{
	var TEST_KEY = "testKey";

	localStorage.removeitem(TEST_KEY);
	localStorage.setItem(TEST_KEY, "testValue");
	var testValue = localStorage.getItem(TEST_KEY)

	appLog("HtmlStorage.prototype.test:" + testValue);
}

HtmlStorage.prototype.dumpFileSystemData = function ()
{
	appLog(localStorage);
}

/**
 * Write data to file (creates output file or delete if it exists and write the data)
 */
HtmlStorage.prototype.writeToFile = function(_fileName, _content, _callbackOK, _callbackError)
{
	var bRet = false;
	var _this = this;

	try
	{
		localStorage.setItem(_fileName, _content);
		_callbackOK();
	}
	catch(e)
	{
		_this.errorHandler(e, _fileName, _callbackError);
	}
		
	return bRet;
}

HtmlStorage.prototype.write = function(_fileEntry, _dataObj, _callbackOK, _callbackError) 
{
}

/**
 * Read entiry file data.
 */
HtmlStorage.prototype.readFile = function(_fileName, _callbackOK, _callbackError)
{
	var bRet = false;
	var _this = this;

	try
	{
		var data = localStorage.getItem(_fileName);

		// Create if not exists.
		if (data === null)
		{
			data = '';
			localStorage.setItem(_fileName, data);
		}

		_callbackOK(data);
	}
	catch(e)
	{
		_this.errorHandler(e, _fileName, _callbackError);
	}
		
	return bRet;
}

HtmlStorage.prototype.read = function(_fileEntry, _callbackOK, _callbackError) 
{
}

/**
 * Delete file.
 */
HtmlStorage.prototype.deleteFile = function(_fileName, _callbackOK, _callbackError)
{
	var bRet = false;
	var _this = this;

	try
	{
		localStorage.removeItem(_fileName);
		/*
		var data = localStorage.getItem(_fileName);

		// Create if not exists.
		if (data !== null)
		{
			localStorage.removeItem(_fileName);
		}*/

		_callbackOK();
	}
	catch(e)
	{
		_this.errorHandler(e, _fileName, _callbackError);
	}
		
	return bRet;
}

HtmlStorage.prototype.delete = function(_fileEntry, _callbackOK, _callbackError) 
{
}

HtmlStorage.prototype.appendToFile = function(_fileName, _content, _callbackOK, _callbackError)
{
	var bRet = false;
	var _this = this;

	try
	{
		var data = localStorage.getItem(_fileName);

		// Create if not exists.
		if (data === null)
			data = '';
		
		data = data + _content;
		localStorage.setItem(_fileName, data);

		_callbackOK();
	}
	catch(e)
	{
		_this.errorHandler(e, _fileName, _callbackError);
	}
		
	return bRet;
}

HtmlStorage.prototype.writeAppend = function(_fileEntry, dataObj, _callbackOK, _callbackError)
{}

/**
 * Write data to file, deletes previous data.
 */
HtmlStorage.prototype.updateFile = function(_fileName, _content, _offset, _callbackOK, _callbackError)
{
	var bRet = false;
	var _this = this;

	try
	{
		var data = localStorage.getItem(_fileName);

		// Create if not exists.
		if (data === null)
			data = '';
		
		// Update string: 
		// Position:
		// Current string:     Hello_world.
		// Position 6 (####):  Hello####ld.
		// Position 11 (####): Hello_worl####
		var dataLenght = data.length;

		if (dataLenght > 0)
		{
			appLog("Update, full read:" + _data);

			if (_offset < 0)
				_offset = 0;
			
			if (_offset > dataLenght)
				_offset = dataLenght;
	
			var newData = data.substring(0, _offset) + _content;
			if ((dataLenght - newData.length) > 0)
			{
				newData +=  data.substring(_offset + _content.length);
			}

			localStorage.setItem(_fileName, newData);
		}

		_callbackOK();
	}
	catch(e)
	{
		_this.errorHandler(e, _fileName, _callbackError);
	}
		
	return bRet;
}

HtmlStorage.prototype.writeUpdate = function(_fileEntry, dataObj, _offset, _callbackOK, _callbackError) 
{
}

/**
 * Error handler.
 */
HtmlStorage.prototype.errorHandler = function(e, _fileName, _callback) 
{
	var msg = ''
	var errorCode = "-1";

	if (e !== null)
	{
		switch (e.code) 
		{
			case FileError.NOT_FOUND_ERR: 				msg = 'File not found'; break;
			case FileError.SECURITY_ERR:				msg = 'Security error'; break;
			case FileError.ABORT_ERR:					msg = 'Abort error'; break;

			case FileError.NOT_READABLE_ERR:			msg = 'Not redeable';	break;
			case FileError.ENCODING_ERR:				msg = 'Encoding err';	break;
			case FileError.NO_MODIFICATION_ALLOWED_ERR:	msg = 'No modification allowed';	break;
			case FileError.INVALID_STATE_ERR:			msg = 'Invalid state';	break;
			case FileError.SYNTAX_ERR:					msg = 'Syntax error';	break;
			case FileError.INVALID_MODIFICATION_ERR:	msg = 'Invalid modification';	break;
			case FileError.QUOTA_EXCEEDED_ERR:			msg = 'Quota exceeded';	break;
			case FileError.TYPE_MISMATCH_ERR:			msg = 'Type mismatch'; break;
			case FileError.PATH_EXISTS_ERR:				msg = 'Path exists'; break;
			default: 									msg = e.message; break;
		}

		errorCode = e.code;
	}

	appLog('Error (' + _fileName + '): ' + msg)

	if (typeof _callback !== 'undefined' && _callback !== null)
	{
		_callback(errorCode);
	}
}

HtmlStorage.prototype.readTextFile_mocked = function(_fileName)
{
	var returnValue = null;

	if (_fileName === "Category.txt")
	{
		returnValue = "01  ,Food                            ,1   ;" + "\n";
		returnValue+= "02  ,Food2                           ,2   ;" + "\n";
		returnValue+= "03  ,Food3                           ,3   ;" + "\n";
	}

	return returnValue;
}

HtmlStorage.prototype.updateFileAndroid = function(_fileName, _content, _offset, _callbackOK, _callbackError)
{
	this.updateFile(_fileName, _content, _offset, _callbackOK, _callbackError);
}

HtmlStorage.prototype.existsFile = function(_fileName, _callbackOK, _callbackError) 
{
	var bRet = false;
	var _this = this;

	try
	{
		var bFound = false;
		
		for (var i = 0; i < localStorage.length && bFound === false; i++) 
		{
			if (localStorage.key(i) === _fileName)	
				bFound = true;
		}

		if (bFound !== null)
			_callbackOK();
		else
			_this.errorHandler(_this.error(FileError.NOT_FOUND_ERR), _fileName, _callbackError);
	}
	catch(e)
	{
		_this.errorHandler(e, _fileName, _callbackError);
	}
		
	return bRet;
}

HtmlStorage.prototype.error = function(_code) 
{
	return {code: _code};
}
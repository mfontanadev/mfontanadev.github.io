/**
 * Encapsulate most usefull file properties and uri properties.
 */
function FileEx() 
{
	this.m_file = null;
	this.m_fileName = "";
	this.m_filePath = "";
	this.uri = "";
}	

/**
 * Contructor.
 */
FileEx.prototype.FileEx_withPathAndName = function(_filePath, _fileName)
{   		
	this.m_filePath = _filePath;
	this.m_fileName = _fileName;
}

/**
 * Returns string with the path to data directoy inside de app context.
 * Always find external storege before local storage.
 *
 * If none of store types available returns an empty string.
 */
FileEx.getValidStorageDataPath = function()
{
	var result = "";

	// Check if cordova file engine is intalled.	
	if (typeof cordova.file !== 'undefined' && cordova.file !== null)
	{
		if (typeof cordova.file.externalDataDirectory !== 'undefined' && cordova.file.externalDataDirectory !== null)
			result = cordova.file.externalDataDirectory;
		else if (typeof cordova.file.dataDirectory !== 'undefined' && cordova.file.dataDirectory !== null)
			result = cordova.file.dataDirectory;
	}

	result = thi.getFileSystemType();
	return result;
}

/**
 * Write data to file (creates output file or delete if it exists and write the data)
 */
FileEx.writeToFile = function(_fileName, _content, _callbackOK, _callbackError)
{
	var bRet = false;
	
	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			fs.root.getFile
			(
				_fileName, 
				{ create: true, exclusive: false }, 
				function (fileEntry) 
				{
					var dataObj = new Blob([_content], { type: 'text/plain' });
					FileEx.write(fileEntry, dataObj, _callbackOK, _callbackError);
				}, 
				function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
	);
		
	return bRet;
}

FileEx.write = function(_fileEntry, _dataObj, _callbackOK, _callbackError) 
{
    _fileEntry.createWriter(
		function (fileWriter) 
		{
			fileWriter.onwriteend = function() 
			{
				_callbackOK();
			};

			fileWriter.onerror = function (e) 
			{
				FileEx.errorHandler(e, _fileEntry.name, _callbackError);
			};

			// If data object is not passed in,
			// create a new Blob instead.
			if (_dataObj) 
			{
				fileWriter.write(_dataObj);
			}
			else
			{
				FileEx.errorHandler(null, _fileEntry.name, _callbackError);
			}
    });
}

/**
 * Read entiry file data.
 */
FileEx.readFile = function(_fileName, _callbackOK, _callbackError)
{
	var bRet = false;
	
	//appLog("   File: Read");
	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			//appLog('   File system open: ' + fs.name);
			
			fs.root.getFile
			(
				_fileName, 
				{ create: true}, 
				function (fileEntry) 
				{
					FileEx.read(fileEntry, _callbackOK, _callbackError);
				}, 
				function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);
		}
	);
		
	return bRet;
}

FileEx.read = function(_fileEntry, _callbackOK, _callbackError) 
{
    // Create a FileWriter object for our FileEntry (log.txt).
    _fileEntry.file(
		function (file) 
		{
			var reader = new FileReader();

			reader.onloadend = function(e) 
			{
				_callbackOK(this.result);
			};
			
			reader.onerror = function (e) 
			{
				FileEx.errorHandler(e, _fileEntry.name, _callbackError);
			};

			reader.readAsText(file);
		},
		function(e){FileEx.errorHandler(e, _fileEntry.name, _callbackError);}
	);
}

/**
 * Delete file.
 */
FileEx.deleteFile = function(_fileName, _callbackOK, _callbackError)
{
	var bRet = false;
	
	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			fs.root.getFile
			(
				_fileName, 
				{ create: false}, 
				function (fileEntry) 
				{
					FileEx.delete(fileEntry, _callbackOK, _callbackError);
				}, 
				function(e)
				{
					FileEx.errorHandler(e, _fileName, _callbackError);
				}
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
	);
		
	return bRet;
}

FileEx.delete = function(_fileEntry, _callbackOK, _callbackError) 
{
	_fileEntry.remove
	(
		function() 
		{
			_callbackOK();
		}, 
		function(e)
		{
			FileEx.errorHandler(e, _fileEntry.name, _callbackError);
		}, 
		function()
		{
			FileEx.errorHandler(null, _fileEntry.name, _callbackError);
		}
	);
}

/**
 * Write data to file, deletes previous data.
 */
FileEx.appendToFile = function(_fileName, _content, _callbackOK, _callbackError)
{
	var bRet = false;
	
	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			fs.root.getFile
			(
				_fileName, 
				{ create: true, exclusive: false }, 
				function (fileEntry) 
				{
					var dataObj = new Blob([_content], { type: 'text/plain' });
					FileEx.writeAppend(fileEntry, dataObj, _callbackOK, _callbackError);
				}, 
				function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
	);

	return bRet;
}

FileEx.writeAppend = function(_fileEntry, dataObj, _callbackOK, _callbackError) 
{
    _fileEntry.createWriter(
		function (fileWriter) 
		{
			fileWriter.onwriteend = function() {
				_callbackOK();
			};

			fileWriter.onerror = function (e) 
			{
				FileEx.errorHandler(e, _fileEntry.name, _callbackError);
			};

			if (dataObj) 
			{
				fileWriter.seek(fileWriter.length); // Start write position at EOF.
				fileWriter.write(dataObj);
			}
			else
			{
				FileEx.errorHandler(null, _fileEntry.name, _callbackError);
			}
    });
}

/**
 * Write data to file, deletes previous data.
 */
FileEx.updateFile = function(_fileName, _content, _offset, _callbackOK, _callbackError)
{
	var bRet = false;

	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			fs.root.getFile
			(
				_fileName, 
				{ create: true, exclusive: false, append: true }, 
				function (fileEntry) 
				{
					var dataObj = new Blob([_content], { type: 'text/plain' });
					FileEx.writeUpdate(fileEntry, dataObj, _offset, _callbackOK, _callbackError);
				}, 
				function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
	);

	return bRet;
}

FileEx.writeUpdate = function(_fileEntry, dataObj, _offset, _callbackOK, _callbackError) 
{
    _fileEntry.createWriter(
		function (fileWriter) 
		{
			fileWriter.onwriteend = function() 
			{
				_callbackOK(DBManager.C_DB_RESULT_OK);
			};

			fileWriter.onerror = function (e) 
			{
				FileEx.errorHandler(e, _fileEntry.name, _callbackError);
			};

			if (dataObj) 
			{
				fileWriter.seek(_offset);
				fileWriter.write(dataObj);
			}
			else
			{
				FileEx.errorHandler(null, _fileEntry.name, _callbackError);
			}
    });
}

FileEx.errorHandler = function(e, _fileName, _callback) 
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

FileEx.readTextFile_mocked = function(_fileName)
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

/**
 * Trick to make Android write at seek position works.
 * The idea is read all data, change on the fly and write all data back.
 * PERFOMANCE: I have no words.
 */
FileEx.updateFileAndroid = function(_fileName, _content, _offset, _callbackOK, _callbackError)
{
	var bRet = false;
	
	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			//appLog('   File system open: ' + fs.name);
			
			fs.root.getFile
			(
				_fileName, 
				{ create: true}, 
				function (fileEntry) 
				{
					FileEx.read(
						fileEntry, 
						function (_data)
						{
							appLog("Full read:" + _data);

							// Update string: 
							// Position:
							// Current string:     Hello_world.
							// Position 6 (####):  Hello####ld.
							// Position 11 (####): Hello_worl####
							var dataLenght = _data.length;

							if (dataLenght > 0)
							{
								if (_offset < 0)
									_offset = 0;
								
								if (_offset > dataLenght)
									_offset = dataLenght;
						
								var newData = _data.substring(0, _offset) + _content;
								if ((dataLenght - newData.length) > 0)
								{
									newData +=  _data.substring(_offset + _content.length);
								}

								var dataObj = new Blob([newData], { type: 'text/plain' });
								FileEx.write(fileEntry, dataObj, _callbackOK, _callbackError);
							}
						}, 
						_callbackError);
				}, 
				function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
	);
		
	return bRet;
}

FileEx.existsFile = function(_fileName, _callbackOK, _callbackError) 
{
	var bRet = false;
	
	window.requestFileSystem
	(
		this.getFileSystemType(), 
		0, 
		function (fs) 
		{
			fs.root.getFile
			(
				_fileName, 
				{ create: false}, 
				function (fileEntry) 
				{
					_callbackOK();
				}, 
				function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
				/*
				function(e)
				{
					_callbackError(e.code);
				}*/
			);
		}, 
		function(e){FileEx.errorHandler(e, _fileName, _callbackError);}
	);
		
	return bRet;
}

FileEx.getFileSystemType = function() 
{
	return (typeof LocalFileSystem != "undefined") ? LocalFileSystem.PERSISTENT : 1;
}


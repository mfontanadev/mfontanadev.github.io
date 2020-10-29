function testClearLogArea()
{
	appClearLog();
}

function gotoLogin()
{
	onsenNavigateTo("loginView.html");	
}


function testCreateFile()
{
	FileEx.writeToFile
	(
		"TestFile.txt", 
		"",
		function() { appLog("OK, writeToFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), writeToFile:"); }
	);
}

function testReadFile()
{
	FileEx.readFile
	(
		"TestFile.txt", 
		function(_data) { appLog("OK, readFile:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), readToFile:"); }
	);
}

function testAppendFile()
{
	FileEx.appendToFile
	(
		"TestFile.txt", "line " + (Math.random() * 1000).toString(), 
		function() { appLog("OK, appendToFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), appendToFile:"); }
	);
}

function testUpdateFileOld()
{
	FileEx.updateFile
	(
		"TestFile.txt", "K", 1, 
		function() { appLog("OK, updateToFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), updateToFile:"); }
	);
}

function testUpdateFile()
{
	FileEx.updateFileAndroid
	(
		"TestFile.txt", "####", 1, 
		function() { appLog("OK, updateFileAndroid:"); },
		function(_result) { appLog("ERROR (" + _result + "), updateFileAndroid:"); }
	);
}

function testDeleteFile()
{
	FileEx.deleteFile
	(
		"TestFile.txt", 
		function() { appLog("OK, deleteFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), deleteFile:"); }
	);
}

function testEmptyTable()
{
	whoPaidApplication.getDB().emptyTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

function testReadTable()
{
	whoPaidApplication.getDB().readTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		function(_data) { appLog("OK, table:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

function testUpdateTable(_id)
{
	var ent = null;
	var tmpCategoty = new DBCursor();
	var m_arrCategory = new Array(); 

	Helper.clearArray(m_arrCategory);

	// Agregar algunas categorias.
	var record = new Array();
	record.push(_id);
	record.push("FoodModified");
	record.push("200");
	
	whoPaidApplication.getDB().updateRecord
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY, 
		DBAppDictionary.C_DB_TABLE_CATEGORY_ID,
		_id,
		record,
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				loadCategories();
			}
			else
			{
				appLog("OK (" + _result + "), table:");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

function testInsertTable()
{
	// Agregar algunas categorias.
	var record = new Array();
	record.push("1");
	record.push("Food");
	record.push("1");

	whoPaidApplication.getDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		record,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

function testDeleteTable()
{
	whoPaidApplication.getDB().deleteTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

function testPopulateTable(_index, _max)
{
	if (_index <= _max)
	{
		var id = _index.toString().trim();
		id = Helper.stringLeftFill(id, "0", 4);

		// Agregar algunas categorias.
		var record = new Array();
		record.push(id);
		record.push("Food");
		record.push(id + id);

		appLog("Populating");
		appLog(record);

		whoPaidApplication.getDB().insertRecord
		(
			DBAppDictionary.C_DB_TABLE_CATEGORY,
			record,
			function(_result) 
			{ 
				appLog("OK (" + _result + "), table:"); 
				
				window.setTimeout( function() {	testPopulateTable(_index + 1, _max); }, Config.C_DELAY_INSERT_RECORD_MS);
			},
			function(_result) { appLog("ERROR (" + _result + "), table:"); }
		);
	}
}


function loadCategories()
{
	var ent = null;
	var tmpCategoty = new DBCursor();
	var m_arrCategory = new Array(); 

	Helper.clearArray(m_arrCategory);

	whoPaidApplication.getDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY, 
		tmpCategoty, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				appLog(_result);
				appLog("Star serializing");
				for (var i = 0; i < tmpCategoty.rows().length; i++)
				{
					ent = new CategoryEntity();
					ent.init(tmpCategoty.getString(i, 0), 
							tmpCategoty.getString(i, 1), 
							tmpCategoty.getString(i, 2));
			
					m_arrCategory.push(ent);
					appLog(ent.log());
				}
				appLog("End serializing");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
	
}

function deleteCategory(_id)
{
	appLog("Delete category id:" + _id);
	whoPaidApplication.getDB().deleteRecord
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		DBAppDictionary.C_DB_TABLE_CATEGORY_ID,
		_id,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);		
}

function bechParse(_max)
{
	var result = "";
	var timeDiff = new TimeDiff();
	TimeDiff.logTimes = true;

	for (var _index = 0; _index <= _max; _index++)
	{
		var id = _index.toString().trim();
		id = Helper.stringLeftFill(id, "0", 4);

		var record = id + ",Food                            ," + id + ";" + "\n";
		result += record;
	}

	appLog(result);
	
	var tableCAT = new DBTable();
	tableCAT.DBTable_withManagerAndName(null, DBAppDictionary.C_DB_TABLE_CATEGORY);
	tableCAT.addField(DBAppDictionary.C_DB_TABLE_CATEGORY_ID, 		DBManager.C_FIELD_TYPE_TEXT, 4, true);
	tableCAT.addField(DBAppDictionary.C_DB_TABLE_CATEGORY_NAME, 	DBManager.C_FIELD_TYPE_TEXT, 32, false);
	tableCAT.addField(DBAppDictionary.C_DB_TABLE_CATEGORY_ZORDER, 	DBManager.C_FIELD_TYPE_TEXT, 4, false);

	timeDiff.startTime("parseFields");
	var rows = tableCAT.parseFields(tableCAT.getFileds(), result, true);
	timeDiff.showTimeDiffCustomeConsole("parseFields", appLog);

	var tableCAT_cursor = new DBCursor();
	tableCAT_cursor.setRows(rows);

	timeDiff.startTime("deserialize Categories");
	var arrCategory = Array();
	for (var i = 0; i < tableCAT_cursor.rows().length; i++)
	{
		ent = new CategoryEntity();
		ent.init(tableCAT_cursor.getString(i, 0), 
		tableCAT_cursor.getString(i, 1), 
		tableCAT_cursor.getString(i, 2));

		arrCategory.push(ent);
	}
	timeDiff.showTimeDiffCustomeConsole("deserialize Categories", appLog);


	timeDiff.startTime("compare Categories");

	var entComp = new CategoryEntity();
	entComp.init("9999", "Food comp", "9999"); 

	var arrCategory = Array();
	for (var i = 0; i < tableCAT_cursor.rows().length; i++)
	{
		ent = new CategoryEntity();
		ent.init(tableCAT_cursor.getString(i, 0), 
		tableCAT_cursor.getString(i, 1), 
		tableCAT_cursor.getString(i, 2));

		arrCategory.push(ent);

		if (ent.compare(entComp) === true)
			appLog("Compare true");
	}
	timeDiff.showTimeDiffCustomeConsole("compare Categories", appLog);

}

function loadUsers()
{
	var ent = null;
	var tmpUser = new DBCursor();
	var m_arrUser = new Array(); 

	Helper.clearArray(m_arrUser);

	whoPaidApplication.getDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_USER, 
		tmpUser, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				appLog(_result);
				appLog("Star serializing");
				for (var i = 0; i < tmpUser.rows().length; i++)
				{
					ent = new UserEntity();
					ent.init(tmpUser.getString(i, 0), 
							 tmpUser.getString(i, 1), 
							 tmpUser.getString(i, 2),
							 tmpUser.getString(i, 3),
							 tmpUser.getString(i, 3));
			
					m_arrUser.push(ent);
					appLog(ent.log());
				}
				appLog("End serializing");
			}
			else
			{
				appLog("ERROR (" + _result + "), table:");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
	
}


function deleteUser()
{
	whoPaidApplication.getDB().deleteTable
	(
		DBAppDictionary.C_DB_TABLE_USER,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

function testDeleteTableByName(_tableName)
{
	whoPaidApplication.getDB().deleteTable
	(
		_tableName,
		function(_result) { appLog("OK (" + _result + "), table:" + tableName); },
		function(_result) { appLog("ERROR (" + _result + "), table:" + tableName); }
	);
}
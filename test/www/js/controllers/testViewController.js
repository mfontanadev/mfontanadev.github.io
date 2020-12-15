TestViewController._this = null;

function TestViewController() 
{
	TestViewController._this = this;
	this.VIEW_MODE = C_VIEW_MODE_NOT_SET;
}

TestViewController.prototype.init = function()
{
}

TestViewController.testClearLogArea = function()
{
	appClearLog();
}

TestViewController.gotoLogin = function()
{
	onsenNavigateTo(C_VIEW_PAGE_ID_LOGIN);	
}

TestViewController.fullScreen = function()
{
	appToggleFullScreen();
}

TestViewController.dumpLog = function()
{
	var _string = appLogData();

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

// RAW FILE TESTS
TestViewController.testCreateFile = function()
{
	FileEx.writeToFile
	(
		"TestFile.txt", 
		"",
		function() { appLog("OK, writeToFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), writeToFile:"); }
	);
}

TestViewController.testReadFile = function()
{
	FileEx.readFile
	(
		"TestFile.txt", 
		function(_data) { appLog("OK, readFile:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), readToFile:"); }
	);
}

TestViewController.testAppendFile = function()
{
	FileEx.appendToFile
	(
		"TestFile.txt", "line " + (Math.random() * 1000).toString(), 
		function() { appLog("OK, appendToFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), appendToFile:"); }
	);
}

TestViewController.testUpdateFileOld = function()
{
	FileEx.updateFile
	(
		"TestFile.txt", "K", 1, 
		function() { appLog("OK, updateToFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), updateToFile:"); }
	);
}

TestViewController.testUpdateFile = function()
{
	FileEx.updateFileAndroid
	(
		"TestFile.txt", "####", 1, 
		function() { appLog("OK, updateFileAndroid:"); },
		function(_result) { appLog("ERROR (" + _result + "), updateFileAndroid:"); }
	);
}

TestViewController.testDeleteFile = function()
{
	FileEx.deleteFile
	(
		"TestFile.txt", 
		function() { appLog("OK, deleteFile:"); },
		function(_result) { appLog("ERROR (" + _result + "), deleteFile:"); }
	);
}

// TABLE Category
TestViewController.testEmptyTable_Category = function()
{
	appDB().emptyTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testReadTable_Category = function()
{
	appDB().readTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		function(_data) { appLog("OK, table:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testUpdateTable_Category = function(_id)
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
	
	appDB().updateRecord
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY, 
		DBAppDictionary.C_DB_TABLE_CATEGORY_ID,
		_id,
		record,
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				TestViewController.loadCategories();
			}
			else
			{
				appLog("OK (" + _result + "), table:");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.loadCategories = function()
{
	var ent = null;
	var tmpCategoty = new DBCursor();
	var m_arrCategory = new Array(); 

	Helper.clearArray(m_arrCategory);

	appDB().selectAll
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

TestViewController.testInsertTable_Category = function()
{
	// Agregar algunas categorias.
	var record = new Array();
	record.push("1");
	record.push("Inserted Food");
	record.push("1");

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		record,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testDeleteTable_Category = function()
{
	appDB().deleteTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

// TABLE SubCategory
TestViewController.testEmptyTable_SubCategory = function()
{
	appDB().emptyTable
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testReadTable_SubCategory = function()
{
	appDB().readTable
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY,
		function(_data) { appLog("OK, table:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testUpdateTable_SubCategory = function(_id)
{
	var ent = null;
	var tmpCategoty = new DBCursor();
	var m_arrCategory = new Array(); 

	Helper.clearArray(m_arrCategory);

	// Agregar algunas categorias.
	var record = new Array();
	record.push(_id);
	record.push("1");
	record.push("SubCategory modified");
	record.push("1");
	
	appDB().updateRecord
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY, 
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY_ID,
		_id,
		record,
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				TestViewController.loadSubCategories();
			}
			else
			{
				appLog("OK (" + _result + "), table:");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.loadSubCategories = function()
{
	var ent = null;
	var tmpCategoty = new DBCursor();
	var m_arrCategory = new Array(); 

	Helper.clearArray(m_arrCategory);

	appDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY, 
		tmpCategoty, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				appLog(_result);
				appLog("Star serializing");
				for (var i = 0; i < tmpCategoty.rows().length; i++)
				{
					ent = new SubCategoryEntity();
					ent.init(tmpCategoty.getString(i, 0), 
							tmpCategoty.getString(i, 1), 
							tmpCategoty.getString(i, 2),
							tmpCategoty.getString(i, 3));
			
					m_arrCategory.push(ent);
					appLog(ent.log());
				}
				appLog("End serializing");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
	
}

TestViewController.testInsertTable_SubCategory = function()
{
	// Agregar algunas categorias.
	var record = new Array();
	record.push("100");
	record.push("1");
	record.push("SubCategory inserted");
	record.push("1");

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY,
		record,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testDeleteTable_SubCategory = function()
{
	appDB().deleteTable
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

// TABLE Spent
TestViewController.testEmptyTable_Spent = function()
{
	appDB().emptyTable
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testReadTable_Spent = function()
{
	appDB().readTable
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		function(_data) { appLog("OK, table:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testUpdateTable_Spent = function(_id)
{
	var ent = null;
	var tmpCategoty = new DBCursor();
	var m_arrCategory = new Array(); 

	Helper.clearArray(m_arrCategory);

	// Agregar algunas spent.
	var record = new Array();
	record.push(_id);
	record.push("2");      
	record.push("100");
	record.push("200");
	record.push("09/09/2020");
	record.push("3");
	record.push("4");
	record.push("Modified");
	
	appDB().updateRecord
	(
		DBAppDictionary.C_DB_TABLE_SPENT, 
		DBAppDictionary.C_DB_TABLE_SPENT_ID,
		_id,
		record,
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				TestViewController.loadSpents();
			}
			else
			{
				appLog("OK (" + _result + "), table:");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.loadSpents = function()
{
	var ent = null;
	var cursor = new DBCursor();
	var m_arr = new Array(); 

	Helper.clearArray(m_arr);

	appDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_SPENT, 
		cursor, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				appLog(_result);
				appLog("Star serializing");
				for (var i = 0; i < cursor.rows().length; i++)
				{
					ent = new SpentEntity();
					ent.init(
                        cursor.getString(i, 0), 
                        cursor.getString(i, 1), 
                        cursor.getString(i, 2),
                        cursor.getString(i, 3),
                        cursor.getString(i, 4),
                        cursor.getString(i, 5),
                        cursor.getString(i, 6),
                        cursor.getString(i, 7)
                    );
					appLog(ent.log());
				}
				appLog("End serializing");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
	
}

TestViewController.testInsertTable_Spent = function()
{
	// Agregar algunas categorias.
	var record = new Array();
	record.push("100");
	record.push("2");      
	record.push("100");
	record.push("200");
	record.push("09/09/2020");
	record.push("3");
	record.push("4");
	record.push("Inserted");
	record.push(record);

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		record,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testDeleteTable_Spent = function()
{
	appDB().deleteTable
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testInsertTable_Spent = function()
{
	// Agregar algunas categorias.
	var record = new Array();
	record.push("100");
	record.push("2");      
	record.push("1000");
	record.push("2000");
	record.push("09/09/2020");
	record.push("3");
	record.push("4");
	record.push("Inserted");
	record.push(record);

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		record,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testPopulateSpentTable = function()
{
	// Agregar algunas categorias.

    var records = new Array();

	var record = null;
	for (let index = 0; index < 100; index++) {
		record = new Array();
		record.push( (100 + index).toString());
		record.push("2");      
		record.push("1");
		record.push("1");
		record.push("09/09/2020");
		record.push("3");
		record.push("4");
		record.push("Modified");
		records.push(record);
	}
		
	appDB().insertRecordArray
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		records,
		0,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

// TABLE User
TestViewController.testEmptyTable_User = function()
{
	appDB().emptyTable
	(
		DBAppDictionary.C_DB_TABLE_USER,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testReadTable_User = function()
{
	appDB().readTable
	(
		DBAppDictionary.C_DB_TABLE_USER,
		function(_data) { appLog("OK, table:\n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testUpdateTable_User = function(_id)
{
	var ent = null;
	var tmpCategoty = new DBCursor();

	var record = new Array();
	record.push(_id);
	record.push("1000");      
	record.push("Updated username");
	record.push("Updated password");
	record.push("Uodated recover question");
	record.push("Uodated recover answer");
	
	appDB().updateRecord
	(
		DBAppDictionary.C_DB_TABLE_USER, 
		DBAppDictionary.C_DB_TABLE_USER_ID,
		_id,
		record,
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				TestViewController.loadUsers();
			}
			else
			{
				appLog("OK (" + _result + "), table:");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.loadUsers = function()
{
	var ent = null;
	var cursor = new DBCursor();
	var m_arr = new Array(); 

	Helper.clearArray(m_arr);

	appDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_USERS, 
		cursor, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				appLog(_result);
				appLog("Star serializing");
				for (var i = 0; i < cursor.rows().length; i++)
				{
					ent = new UserEntity();
					ent.init(
                        cursor.getString(i, 0), 
                        cursor.getString(i, 1), 
                        cursor.getString(i, 2),
                        cursor.getString(i, 3),
                        cursor.getString(i, 4)
                    );
					appLog(ent.log());
				}
				appLog("End serializing");
			}
		},
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
	
}

TestViewController.testInsertTable_User = function()
{
	// Agregar algunas categorias.
	var record = new Array();
	record.push("1000");      
	record.push("Inserted username");
	record.push("Inserted password");
	record.push("Inserted recover question");
	record.push("Inserted recover answer");

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_USER,
		record,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

TestViewController.testDeleteTable_User = function()
{
	appDB().deleteTable
	(
		DBAppDictionary.C_DB_TABLE_USER,
		function(_result) { appLog("OK (" + _result + "), table:"); },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
	);
}

// TEST dialog
TestViewController.showDialog = function()
{
	Helper.showCustomDialog('testView-save', 'Mi alert', 'Mi message', "TestViewController.dialogCallback");
}

TestViewController.dialogCallback = function(_senderName, _code)
{
	//console.log(_code);
	document.getElementById(_senderName).hide();
}

// BENCHMARK
TestViewController.benchParseOverCategory = function(_max)
{
	var result = "";
	var timeDiff = new TimeDiff();

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
	timeDiff.showTimeDiffCustomConsole("parseFields", appLog);

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
	timeDiff.showTimeDiffCustomConsole("deserialize Categories", appLog);


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
	timeDiff.showTimeDiffCustomConsole("compare Categories", appLog);

}

TestViewController.testPopulateTable = function(_index, _max)
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

		appDB().insertRecord
		(
			DBAppDictionary.C_DB_TABLE_CATEGORY,
			record,
			function(_result) 
			{ 
				appLog("OK (" + _result + "), table:"); 
				
				window.setTimeout(function() {	testPopulateTable(_index + 1, _max); }, Config.C_DELAY_INSERT_RECORD_MS);
			},
			function(_result) { appLog("ERROR (" + _result + "), table:"); }
		);
	}
}

// Navigation
TestViewController.navigateToBack = function()
{
  onsenNavigateTo(C_VIEW_PAGE_ID_MAIN);
}
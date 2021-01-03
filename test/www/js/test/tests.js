function runServiceTests()
{
	appLog("\n\n\n\n\n\n\n\n");
	appLog("START TESTS");
	/*
	findUser_resultNotFound();
	findUser_resultFound();
	testTableExists();
	testMaxIDOnUserTable();
	testSpentEntityDatesFunctons();

	testGetAllCategory();
	testGetAllSubCategory();
	testGetAllSpent();
	
	testDumpFiles();
	*/
	appLog("END TESTS");
	appLog("\n\n\n\n\n\n\n\n");
}

// SERVICE TESTS
function findUser_resultNotFound()
{
    const username = "user1";
	const password = "p1";
    var testDescription = "TEST findUser_resultNotFound: " + username + "," + password;
    appLog(testDescription);

	UserService.findUserByName
	(
		username, 
		function(_userEntity) 
		{ 
			if (_userEntity !== null)
                appLog(testDescription + "; FOUND");
			else
                appLog(testDescription + "; NOT FOUND");

		},
		function(_result) 
		{
			appLog("login, " + _result); 
		}
	);
}

function findUser_resultFound()
{
    const username = "User2";
	const password = "Pass2";
    var testDescription = "TEST findUser_resultFound: " + username + "," + password;
    appLog(testDescription);

	UserService.findUserByName
	(
		username, 
		function(_userEntity) 
		{ 
			if (_userEntity !== null)
                appLog(testDescription + "; FOUND");
			else
                appLog(testDescription + "; NOT FOUND");

		},
		function(_result) 
		{
			appLog("login, " + _result); 
		}
	);
}

function testTableExists()
{
	appDB().existsTableFile
	(
		DBAppDictionary.C_DB_TABLE_USER, 
		function(_result)
		{
            appLog("existsTableFile, OK (" + _result + ")");
		},
        function(_result) 
        { 
            appLog("existsTableFile, ERROR (" + _result + ")");
        }
	);
}

function testMaxIDOnUserTable()
{
    var testDescription = "TEST testMaxIDOnUserTable: ";
    appLog(testDescription);

	appDB().getMaxID
	(
		DBAppDictionary.C_DB_TABLE_USER,
		DBAppDictionary.C_DB_TABLE_USER_ID,
		function(_result)
		{
            appLog("testMaxIDOnUserTable, OK (" + _result + ")");
		},
        function(_result) 
        { 
            appLog("testMaxIDOnUserTable, ERROR (" + _result + ")");
        }
	);
}

function testSpentEntityDatesFunctons()
{
    var testDescription = "TEST testSpentEntityDatesFunctons: ";
	var spentEntity = new SpentEntity();

	console.log("SpentEntity.getDate():" + spentEntity.getDate());
	console.log("SpentEntity.getDate_KeyForMonthSelector() day default to 01:" + spentEntity.getDate_KeyForMonthSelector());  

	spentEntity.setDateWithTime(2020, 12, 13);
	console.log("SpentEntity.getDate_KeyForMonthSelector() day default to 01:" + spentEntity.getDate_KeyForMonthSelector());  

}

function testGetAllCategory()
{
    var testDescription = "TEST testGetAllCategory: ";
    appLog(testDescription);

	CategoryService.getAllCategory
	(
		function(_result) 
		{ 
			appLog(testDescription  + " OK:" + _result);
		},
		function(_result) 
		{
			appLog(testDescription  + " ERROR:" + _result);
		}
	);
}

function testGetAllSubCategory()
{
    var testDescription = "TEST testGetAllSubCategory: ";
    appLog(testDescription);

	SubCategoryService.getAllSubCategory
	(
		function(_result) 
		{ 
            appLog(testDescription  + " OK:" + _result);
		},
		function(_result) 
		{
			appLog(testDescription  + " ERROR:" + _result);
		}
	);
}

function testGetAllSpent()
{
	CordovaStorage.readFile
	(
		"Spent.txt", 
		function(_data) { appLog("OK, readFile:Spent.txt \n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR, readFile:Spent.txt (" + _result + "), readToFile:"); }
	);
		
	var testDescription = "TEST testGetAllSpent: ";
    appLog(testDescription);

	SpentService.getAllSpent
	(
		function(_result) 
		{ 
            appLog(testDescription  + " OK:" + _result);
		},
		function(_result) 
		{
			appLog(testDescription  + " ERROR:" + _result);
		}
	);
}

function testDumpFiles()
{
	CordovaStorage.readFile
	(
		"Category.txt", 
		function(_data) { appLog("OK, readFile:Category.txt \n" + "Lenght:" + _data.length + "\nData:\n"  + _data); },
		function(_result) { appLog("ERROR, readFile:Category.txt (" + _result + "), readToFile:"); }
	);

	CordovaStorage.readFile
	(
		"SubCategory.txt", 
		function(_data) { appLog("OK, readFile:SubCategory.txt \n" + "Lenght:" + _data.length + "\nData:\n"  + _data); },
		function(_result) { appLog("ERROR, readFile:SubCategory.txt (" + _result + "), readToFile:"); }
	);
}


function testHtmlStorage()
{
	var TEST_FILE_NAME = "html_storage_testfile.txt";
	var TEST_FILE_CONTENT_DATA = "Content of html_srtorage_testfile.txt";

	var localStorageManager = new LocalStorageManager();
	localStorageManager.useHtmlStorageSystem();
	
	localStorageManager.deleteFile(
		TEST_FILE_NAME, 
		function() {appLog("OK, HTML_deleteFile: file=" + TEST_FILE_NAME); },
		function(_result) {appLog("ERROR, HTML_deleteFile: file=" + TEST_FILE_NAME + ", result(" + _result + ")"); }
	);

	localStorageManager.writeToFile(
		TEST_FILE_NAME, 
		TEST_FILE_CONTENT_DATA,
		function() 	{ appLog("OK, HTML_writeToFile: file=" + TEST_FILE_NAME); },
		function(_result) 	{ appLog("ERROR, HTML_writeToFile: file=" + TEST_FILE_NAME + ", result(" + _result + ")"); }
	)

	localStorageManager.readFile(
		TEST_FILE_NAME, 
		function(_data) { appLog("OK, HTML_readFile: file=" + TEST_FILE_NAME + ",Lenght:" + _data.length + ", Data:("  + _data + ")"); },
		function(_result) 	{ appLog("ERROR, HTML_readFile: file=" + TEST_FILE_NAME + ", result(" + _result + ")"); }
	)

	localStorageManager.appendToFile(
		TEST_FILE_NAME, 
		"line " + (Math.random() * 1000).toString(), 
		function() 	{ appLog("OK, HTML_appendToFile: file=" + TEST_FILE_NAME); },
		function(_result) 	{ appLog("ERROR, HTML_appendToFile: file=" + TEST_FILE_NAME + ", result(" + _result + ")"); }
	);

	localStorageManager.updateFile(
		TEST_FILE_NAME, 
		"####",
		2, 
		function() 	{ appLog("OK, HTML_updateFile: file=" + TEST_FILE_NAME); },
		function(_result) 	{ appLog("ERROR, HTML_updateFile: file=" + TEST_FILE_NAME + ", result(" + _result + ")"); }
	);

	localStorageManager.existsFile(
		TEST_FILE_NAME, 
		function() 	{ appLog("OK, HTML_existsFile: file=" + TEST_FILE_NAME); },
		function(_result) 	{ appLog("ERROR, HTML_existsFile: file=" + TEST_FILE_NAME + ", result(" + _result + ")"); }
	);

	localStorageManager.dumpFileSystemData();
}
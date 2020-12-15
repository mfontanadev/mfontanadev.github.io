function runModelTests()
{
	appLog("\n\n\n\n\n\n\n\n");
	appLog("START TESTS");
	/*
	findUser_resultNotFound();
	findUser_resultFound();
	testTableExists();
	testMaxIDOnUserTable();
	testSpentEntityDatesFunctons();
	*/
	testGetAllCategory();
	testGetAllSubCategory();
	testGetAllSpent();
	
	testDumpFiles();
	appLog("END TESTS");
	appLog("\n\n\n\n\n\n\n\n");
}

// MODEL TESTS
function findUser_resultNotFound()
{
    const username = "user1";
	const password = "p1";
    var testDescription = "TEST findUser_resultNotFound: " + username + "," + password;
    appLog(testDescription);

    var userModel = new UserModel();
	userModel.findUserByName
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

    var userModel = new UserModel();
	userModel.findUserByName
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

    var model = new CategoryModel();
	model.getAllCategory
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

    var model = new SubCategoryModel();
	model.getAllSubCategory
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
	
	FileEx.readFile
	(
		"Spent.txt", 
		function(_data) { appLog("OK, readFile:Spent.txt \n" + "Lenght:" + _data.length + "\nData:"  + _data); },
		function(_result) { appLog("ERROR, readFile:Spent.txt (" + _result + "), readToFile:"); }
	);
	
	
	var testDescription = "TEST testGetAllSpent: ";
    appLog(testDescription);

    var model = new SpentModel();
	model.getAllSpent
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
	FileEx.readFile
	(
		"Category.txt", 
		function(_data) { appLog("OK, readFile:Category.txt \n" + "Lenght:" + _data.length + "\nData:\n"  + _data); },
		function(_result) { appLog("ERROR, readFile:Category.txt (" + _result + "), readToFile:"); }
	);

	FileEx.readFile
	(
		"SubCategory.txt", 
		function(_data) { appLog("OK, readFile:SubCategory.txt \n" + "Lenght:" + _data.length + "\nData:\n"  + _data); },
		function(_result) { appLog("ERROR, readFile:SubCategory.txt (" + _result + "), readToFile:"); }
	);
}
// Database definition.
DBAppDictionary.C_DB_TABLE_CATEGORY = "Category";
DBAppDictionary.C_DB_TABLE_CATEGORY_ID = "_Id";
DBAppDictionary.C_DB_TABLE_CATEGORY_NAME = "Name";
DBAppDictionary.C_DB_TABLE_CATEGORY_ZORDER = "ZOrder";

DBAppDictionary.C_DB_TABLE_USER = "User";
DBAppDictionary.C_DB_TABLE_USER_ID = "_Id";
DBAppDictionary.C_DB_TABLE_USER_USERNAME = "Username";
DBAppDictionary.C_DB_TABLE_USER_PASSWORD = "Password";
DBAppDictionary.C_DB_TABLE_USER_RECOVER_QUESTION = "RecoverQuestion";
DBAppDictionary.C_DB_TABLE_USER_RECOVER_ANSWER = "RecoverAnswer";

DBAppDictionary.C_DB_TABLE_SUBCATEGORY = "SubCategory";
DBAppDictionary.C_DB_TABLE_SUBCATEGORY_ID = "_Id";
DBAppDictionary.C_DB_TABLE_SUBCATEGORY_CATEGORY_ID = "_CateroryId";
DBAppDictionary.C_DB_TABLE_SUBCATEGORY_NAME = "Name";
DBAppDictionary.C_DB_TABLE_SUBCATEGORY_ZORDER = "ZOrder";

DBAppDictionary.C_DB_TABLE_SPENT = "Spent";
DBAppDictionary.C_DB_TABLE_SPENT_ID = "_Id";
DBAppDictionary.C_DB_TABLE_SPENT_USER_ID = "_UserId";
DBAppDictionary.C_DB_TABLE_SPENT_PLAYER1_SPENT = "Player1Spent";
DBAppDictionary.C_DB_TABLE_SPENT_PLAYER2_SPENT = "Player2Spent";
DBAppDictionary.C_DB_TABLE_SPENT_DATE = "Date";
DBAppDictionary.C_DB_TABLE_CATEGORY_ID = "CategoryId";
DBAppDictionary.C_DB_TABLE_SPENT_SUBCATEGORY_ID = "SubCategoryId";
DBAppDictionary.C_DB_TABLE_SPENT_OBSERVATION = "Obvervation";


function DBAppDictionary(_dbManager) 
{
    this.m_dbManager = _dbManager;
}

/**
 * Tables definition.
 */
DBAppDictionary.prototype.createDB = function() 
{
    appLog("\nOn DBAppDictionary");
    
    var newTable = null;
		
    this.m_dbManager.createTableDefinition(DBAppDictionary.C_DB_TABLE_CATEGORY);
    newTable = this.m_dbManager.getTable(DBAppDictionary.C_DB_TABLE_CATEGORY);
        newTable.addField(DBAppDictionary.C_DB_CATEGORY_ID, 		DBManager.C_FIELD_TYPE_TEXT, 4, true);
        newTable.addField(DBAppDictionary.C_DB_CATEGORY_NAME, 		DBManager.C_FIELD_TYPE_TEXT, 32, false);
        newTable.addField(DBAppDictionary.C_DB_CATEGORY_ZORDER, 	DBManager.C_FIELD_TYPE_TEXT, 4, false);
    appLog(newTable.log());

    this.m_dbManager.createTableDefinition(DBAppDictionary.C_DB_TABLE_USER);
    newTable = this.m_dbManager.getTable(DBAppDictionary.C_DB_TABLE_USER);
        newTable.addField(DBAppDictionary.C_DB_TABLE_USER_ID, 		        DBManager.C_FIELD_TYPE_TEXT, 4, true);
        newTable.addField(DBAppDictionary.C_DB_TABLE_USER_USERNAME, 		    DBManager.C_FIELD_TYPE_TEXT, 32, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_USER_PASSWORD, 	        DBManager.C_FIELD_TYPE_TEXT, 16, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_USER_RECOVER_QUESTION, 	DBManager.C_FIELD_TYPE_TEXT, 32, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_USER_RECOVER_ANSWER, 	DBManager.C_FIELD_TYPE_TEXT, 32, false);

    this.m_dbManager.createTableDefinition(DBAppDictionary.C_DB_TABLE_SUBCATEGORY);
    newTable = this.m_dbManager.getTable(DBAppDictionary.C_DB_TABLE_SUBCATEGORY);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SUBCATEGORY_ID, 		  DBManager.C_FIELD_TYPE_TEXT, 4, true);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SUBCATEGORY_CATEGORY_ID, DBManager.C_FIELD_TYPE_TEXT, 4, true);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SUBCATEGORY_NAME,        DBManager.C_FIELD_TYPE_TEXT, 32, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SUBCATEGORY_ZORDER, 	  DBManager.C_FIELD_TYPE_TEXT, 4, false);
    appLog(newTable.log());

    this.m_dbManager.createTableDefinition(DBAppDictionary.C_DB_TABLE_SPENT);
    newTable = this.m_dbManager.getTable(DBAppDictionary.C_DB_TABLE_SPENT);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_ID, 		        DBManager.C_FIELD_TYPE_TEXT, 4, true);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_USER_ID, 	    DBManager.C_FIELD_TYPE_TEXT, 4, true);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_PLAYER1_SPENT,   DBManager.C_FIELD_TYPE_TEXT, 8, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_PLAYER2_SPENT,   DBManager.C_FIELD_TYPE_TEXT, 8, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_DATE,            DBManager.C_FIELD_TYPE_TEXT, 20, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_CATEGORY_ID,     DBManager.C_FIELD_TYPE_TEXT, 4, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_SUBCATEGORY_ID,  DBManager.C_FIELD_TYPE_TEXT, 4, false);
        newTable.addField(DBAppDictionary.C_DB_TABLE_SPENT_OBSERVATION,     DBManager.C_FIELD_TYPE_TEXT, 16, false);
    appLog(newTable.log());
}

/**
 * Init tables with default values, only if debug flag is true.
 */
DBAppDictionary.prototype.init = function()
{
    appLog("\nON DBAppDictionary");
    appLog("Test 1.0");

    //if (Consts.DEBUG == true)
    {
        this.initTableCategoryForTesting();
        this.initTableUserForTesting();
        this.initTableSubCategoryForTesting();
        this.initTableSpentForTesting();
    }
}

/**
 * Populate table with some data for testing porpourses.
 */
DBAppDictionary.prototype.initTableCategoryForTesting = function()
{
    var _this = this;
    var record = null;
    var records = new Array();

    appLog("   Populate C_DB_TABLE_CATEGORY");

    this.m_dbManager.createTable
	(
		DBAppDictionary.C_DB_TABLE_CATEGORY,
        function(_result) 
        { 
            appLog("OK (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_CATEGORY); 
            
            // Agregar algunas categorias.
            record = new Array();
            record.push("1");
            record.push("Food");
            record.push("1");
            records.push(record);

            record = new Array();
            record.push("2");
            record.push("House");
            record.push("2");
            records.push(record);

            record = new Array();
            record.push("3");
            record.push("Fun");
            record.push("3");
            records.push(record);

            record = new Array();
            record.push("4");
            record.push("Tax");
            record.push("4");
            records.push(record);
            
            record = new Array();
            record.push("5");
            record.push("Car");
            record.push("5");
            records.push(record);
            
            record = new Array();
            record.push("6");
            record.push("BB");
            record.push("6");
            records.push(record);

            _this.insertRecords(DBAppDictionary.C_DB_TABLE_CATEGORY, records, 0);
        },
		function(_result) { appLog("ERROR (" + _result + "), table:"); }
    );
}

/**
 * Populate table with some data for testing porpourses.
 */
DBAppDictionary.prototype.initTableUserForTesting = function()
{
    var _this = this;
    var record = null;
    var records = new Array();

    appLog("   Populate C_DB_TABLE_USER");

	this.m_dbManager.existsTableFile
	(
        DBAppDictionary.C_DB_TABLE_USER,
        // Insert records and populate table only if the file not exists.
        function(_result) 
        {
            appLog("Table already exists, do not delete onCreation (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_USER); 
        },
        function(_result) 
        { 
            if (_result === DBManager.C_DB_RESULT_TABLE_FILE_NOT_FOUND)
            {
                _this.m_dbManager.createTable
                (
                    DBAppDictionary.C_DB_TABLE_USER,
                    function(_result) 
                    { 
                        appLog("OK (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_USER); 
            
                        record = new Array();
                        record.push("5");
                        record.push("User1");
                        record.push("Pass1");
                        record.push("Question1");
                        record.push("Answer1");
                        records.push(record);
            
                        record = new Array();
                        record.push("6");
                        record.push("User2");
                        record.push("Pass2");
                        record.push("Question2");
                        record.push("Answer2");
                        records.push(record);
            
                        _this.insertRecords(DBAppDictionary.C_DB_TABLE_USER, records, 0);
                    },
                    function(_result) { appLog("ERROR (" + _result + "), table:"); }
                );
            }
            else
            {
                appLog("ERROR (" + _result + "), table:"); 
            }
        }
    );
}

/**
 * Populate table with some data for testing porpourses.
 */
DBAppDictionary.prototype.initTableSpentForTesting = function()
{
    var _this = this;
    var record = null;
    var records = new Array();

    appLog("   Populate C_DB_TABLE_SPENT");

    this.m_dbManager.existsTableFile
	(
        DBAppDictionary.C_DB_TABLE_SPENT,
        // Insert records and populate table only if the file not exists.
        function(_result) 
        {
            appLog("Table already exists, do not delete onCreation (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_SPENT); 
        },
        function(_result) 
        { 
            if (_result === DBManager.C_DB_RESULT_TABLE_FILE_NOT_FOUND)
            {
                _this.m_dbManager.createTable
                (
                    DBAppDictionary.C_DB_TABLE_SPENT,
                    function(_result) 
                    { 
                        appLog("OK (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_SPENT); 
                                                
                        // Spent
                        record = new Array();
                        record.push("1");
                        record.push("2");      
                        record.push("100");
                        record.push("200");
                        record.push("09/09/2020");
                        record.push("3");
                        record.push("4");
                        record.push("Detail");
                        records.push(record);
            
                        _this.insertRecords(DBAppDictionary.C_DB_TABLE_SPENT, records, 0);
                    },
                    function(_result) { appLog("ERROR (" + _result + "), table:"); }
                );
            }
            else
            {
                appLog("ERROR (" + _result + "), table:"); 
            }
        }
    );
}

/**
 * Populate table with some data for testing porpourses.
 */
DBAppDictionary.prototype.initTableSubCategoryForTesting = function()
{
    var _this = this;
    var record = null;
    var records = new Array();

    appLog("   Populate C_DB_TABLE_SUBCATEGORY");

    this.m_dbManager.createTable
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY,
        function(_result) 
        { 
            appLog("OK (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_SUBCATEGORY); 
            
            // Agregar algunas categorias.
            record = new Array();
            record.push("1");
            record.push("1");      // Food
            record.push("Super Coto 2");
            record.push("1");
            records.push(record);

            record = new Array();
            record.push("2");
            record.push("1");      // Food
            record.push("Chinos 2");
            record.push("2");
            records.push(record);

            record = new Array();
            record.push("3");
            record.push("4");      // Tax
            record.push("Cable 2");
            record.push("3");
            records.push(record);

            record = new Array();
            record.push("4");
            record.push("4");      // Tax
            record.push("Agua");
            record.push("4");
            records.push(record);

            record = new Array();
            record.push("5");
            record.push("4");      // Tax
            record.push("Gas");
            record.push("5");
            records.push(record);

            _this.insertRecords(DBAppDictionary.C_DB_TABLE_SUBCATEGORY, records, 0);
        },
		function(_result) { appLog("ERROR (" + _result + "), table:" + DBAppDictionary.C_DB_TABLE_SUBCATEGORY); }
    );
}

// Get a new record (return an array) if it is null or recicle it (clear it) if not.
DBAppDictionary.prototype.getNewRecord = function(_record)
{
    var returnValue = _record;
    if (returnValue === null)
        returnValue = new Array();
    else
        Helper.clearArray(returnValue);

    return returnValue;
}

// Call to insert record properly aka with not missing callbacks.
DBAppDictionary.prototype.insertRecord = function(_tableName, _record)
{
    this.m_dbManager.insertRecord
    (
        _tableName,
        _record,
        function(_result) { appLog("OK (" + _result + "), table:" + _tableName); },
        function(_result) { appLog("ERROR (" + _result + "), table:" + _tableName); }
    );
}

// Call to insert record properly aka with not missing callbacks.
DBAppDictionary.prototype.insertRecords = function(_tableName, _records, _index)
{
    var _this = this;

    if (_index < _records.length)
    {
        this.m_dbManager.insertRecord
        (
            _tableName,
            _records[_index],
            function(_result) 
            { 
                appLog("OK (" + _result + "), table:" + _tableName);
                _index++; 
                window.setTimeout( function() 
                {	
                    _this.insertRecords(_tableName, _records, _index);
                }, Config.C_DELAY_INSERT_RECORD_MS);
            },
            function(_result) { appLog("ERROR (" + _result + "), table:" + _tableName); }
        );
    }
}




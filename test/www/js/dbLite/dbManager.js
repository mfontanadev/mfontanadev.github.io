// Database adapter to interactuate with mongoDb, SQLLite, an so on.
//
// Plugin
// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html

// FIELD TYPES
DBManager.C_FIELD_TYPE_TEXT = "TEXT";
DBManager.C_FIELD_TYPE_INT = "INT";
DBManager.C_FIELD_TYPE_DOUBLE = "DOUBLE";
DBManager.C_FIELD_TYPE_BOOLEAN = "BOOLEAN";
DBManager.C_FIELD_SKEEP = "SKEEP";

// RESULT CODES
DBManager.C_DB_RESULT_NOT_SET = 0;
DBManager.C_DB_RESULT_OK = 10000;
DBManager.C_DB_RESULT_ERROR = 10001;
DBManager.C_DB_RESULT_FIELD_ALREADY_EXIST = 10002;
DBManager.C_DB_RESULT_TABLE_NOT_FOUND = 10003;
DBManager.C_DB_RESULT_EMPTY_RECORD = 10004;
DBManager.C_DB_RESULT_EMPTY_VALUES = 10005;
DBManager.C_DB_RESULT_TABLE_FILE_NOT_FOUND = 10006;

function DBManager() 
{
    this.m_tables = new Array();
    this.m_appDictionary = new DBAppDictionary(this);
    this.m_dbLocation = "defaultDataPath";
}

DBManager.prototype.init = function(_dbReadyCallback) 
{
    appLog("\nOn DBManager");

    //this.m_dbLocation = FileEx.getValidStorageDataPath();

    // Some valid db path found
    if (this.m_dbLocation.log !== 0)
    {
        // DBCreation
        appLog("    DBLocation:" + this.m_dbLocation);
        appLog("    Create database...");
        this.createDB(this.m_dbLocation);
                    
        // Table initialitation.
        this.m_appDictionary.init(_dbReadyCallback);
    }
    else
    {
        appLog("    Storages not availables");
    }
}

DBManager.prototype.createDB = function(_dbPath)
{
    var bResult = false;
    
    //if (FileEx.createDirectory(_dbPath) == true)
    {
        this.m_dbLocation = _dbPath;
        this.m_appDictionary.createDB();
    }
    
    return bResult;
}

DBManager.prototype.getDbLocation = function()
{
    return this.m_dbLocation;
}

DBManager.prototype.stopDBReadyEvent = function()
{
    this.m_appDictionary.stopDBReadyEvent();
}

// Create a new entry in table collection (it do not create the file associated)
DBManager.prototype.createTableDefinition = function(_tableName)
{
    var nResultCode = DBManager.C_DB_RESULT_OK;
    
    if (this.getTable(_tableName) === null)
    {
        var tableObj = new DBTable();
        tableObj.DBTable_withManagerAndName(this, _tableName);
        this.m_tables.push(tableObj);
    }

    return nResultCode;
}	

DBManager.prototype.insertRecord = function(_tableName, _values, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);

    if (tmpTable !== null)
    {
        tmpTable.insertRecord
        (
            _values, 
            function(_resultCode)
            {
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );        
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	

DBManager.prototype.selectAll = function(_tableName, _cursor, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);
    
    if (tmpTable !== null)
    {
        tmpTable.selectAll
        (
            _cursor, 
            false, 
            function(_data)
            {
                _callbackOK(_data);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	

DBManager.prototype.updateRecord = function(_tableName, _fieldToLook, _criteria, _values, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);
    
    if (tmpTable != null)
    {
        tmpTable.updateRecord
        (
            _fieldToLook, 
            _criteria, 
            _values,
            false,
            function(_resultCode)
            {
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );        
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	

DBManager.prototype.deleteRecord = function(_tableName, _fieldToLook, _criteria, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);   
    
    if (tmpTable != null)
    {
        tmpTable.deleteRecord
        (
            _fieldToLook, 
            _criteria, 
            function(_resultCode)
            {
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );             
    }
    else
    {
         _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);;
    }
}	

/**
 * 
 * @param _tableName
 * @return
 */
//TODO: chage name to getTableDefinition
DBManager.prototype.getTable = function(_tableName)
{
    var result = null;
    
    for (var i = 0; i < this.m_tables.length; i++)
    {
        if (this.m_tables[i].getName() === _tableName)
        {
            result = this.m_tables[i];
            break;
        }
    }
    
    return result;
}

/**
 * 
 * @param _tableName
 * @return
 */
//TODO: chage name to getTableDefinition
DBManager.prototype.getTableIndex = function(_tableName)
{
    var result = -1;
    
    for (var i = 0; i < this.m_tables.length; i++)
    {
        if (this.m_tables[i].getName() === _tableName)
        {
            result = i;
            break;
        }
    }
    
    return result;
}

/**
 * Delete table file and remove definition in manager.
 * 
 * @param _tableName
 * @return
 */
DBManager.prototype.deleteTable = function(_tableName, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);
    var _this = this;

    if (tmpTable !== null)
    {
        tmpTable.delete
        (
            function(_resultCode)
            {
                _this.removeTable(_tableName);
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );             
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);;
    }
}	

// Delete table file buy keep definition in manager.
// NOTE: after deletion the file will not be present in file system.
DBManager.prototype.emptyTable = function(_tableName, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);

    if (tmpTable !== null)
    {
        tmpTable.delete
        (
            function(_resultCode)
            {
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );        
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	

/**
 *  Helper, remove table from manager collection.
 * 
 * @param _tableName
 * @return
 */
DBManager.prototype.removeTable = function(_tableName)
{
    var tableIndex = this.getTableIndex(_tableName);
    
    if (tableIndex > -1)
    {
        this.m_tables.splice(tableIndex, 1);
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);;
    }
}	

/**
 * Read table data.
 * 
 * @param _tableName
 * @return
 */
DBManager.prototype.readTable = function(_tableName, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);
    
    if (tmpTable !== null)
    {
        tmpTable.read
        (
            function(_resultCode)
            {
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );             
    }
    else
    {
         _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);;
    }
}	

// Create file for table. If the file has data then delete it and remain created, 
// if the file does not exist create it as empty.
DBManager.prototype.createTable = function(_tableName, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);

    if (tmpTable !== null)
    {
        tmpTable.delete
        (
            function(_resultCode)
            {
                tmpTable.createFile
                (
                    function(_resultCode)
                    {
                        _callbackOK(_resultCode);
                    },
                    function(_resultCode)
                    {
                        _callbackError(_resultCode);
                    }
                ); 
            },
            function(_resultCode)
            {
                tmpTable.createFile
                (
                    function(_resultCode)
                    {
                        _callbackOK(_resultCode);
                    },
                    function(_resultCode)
                    {
                        _callbackError(_resultCode);
                    }
                );    
            }
        );        
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	

// Check if file asociated to the table exists in the file system.
DBManager.prototype.existsTableFile = function(_tableName, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);

    if (tmpTable !== null)
    {
        tmpTable.existsTableFile
        (
            function(_resultCode)
            {
                _callbackOK(_resultCode);
            },
            function(_resultCode)
            {
                if (_resultCode === FileError.NOT_FOUND_ERR ||
                    _resultCode === FileError.SYNTAX_ERR)
                    _callbackError(DBManager.C_DB_RESULT_TABLE_FILE_NOT_FOUND);
                else
                    _callbackError(_resultCode);
            }
        );        
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	

DBManager.prototype.getMaxID = function(_tableName, _fieldToLook, _callbackOK, _callbackError)
{
    var tmpTable = this.getTable(_tableName);
    
    if (tmpTable !== null)
    {
        tmpTable.getMaxID
        (
            _fieldToLook, 
            function(_data)
            {
                _callbackOK(_data);
            },
            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_TABLE_NOT_FOUND);
    }
}	
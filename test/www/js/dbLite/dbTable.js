
function DBTable() 
{
    this.m_dbManager = null;
    this.m_tableName = "";
    this.m_fields = null;
}

DBTable.prototype.DBTable_withManagerAndName = function(_dbManager, _tableName) 
{
    this.m_dbManager = _dbManager;
    this.m_tableName = _tableName;
    this.m_fields = new Array();

    appLog("   Fullpath:" + this.getTableFilePath());
}

DBTable.prototype.addField = function(_fieldName, _fieldType, _fieldSize, _primaryKey)
{
    var nResultCode = DBManager.C_DB_RESULT_OK;
    
    var fieldObj = new DBField()
    fieldObj.DBField_withNameType(_fieldName, _fieldType, _fieldSize, _primaryKey);
    this.m_fields.push(fieldObj);
    
    return nResultCode;
}

DBTable.prototype.getFileds = function()
{
    return this.m_fields;
}

DBTable.prototype.getName = function()
{
    return this.m_tableName;
}

DBTable.prototype.setName = function(_name)
{
    this.m_tableName = name;
}

DBTable.prototype.log = function()
{
    var logText = "";
    
    logText = "dbTable: " + "m_tableName=" + this.getName() + ", ";
    
    logText += "{";
        
    for (var i = 0; i < this.m_fields.length; i++)
        logText += this.m_fields[i].log();
    
    logText += "};";
    
    return logText;
}

DBTable.prototype.existsTableFile = function(_callbackOK, _callbackError)
{
    appLog("table existsTableFile (" + this.getTableFilePath() + ")");
    
    FileEx.existsFile
    (
        this.getTableFilePath(),
        function()
        {
            _callbackOK(DBManager.C_DB_RESULT_OK);
        },
        function(_resultCode)
        {
            _callbackError(_resultCode);
        }   
    );
}	

DBTable.prototype.createFile = function(_callbackOK, _callbackError)
{
    appLog("table createFile (" + this.getTableFilePath() + ")");
    
    FileEx.writeToFile
    (
        this.getTableFilePath(),
        "",
        function()
        {
            _callbackOK(DBManager.C_DB_RESULT_OK);
        },
        function(_resultCode)
        {
            _callbackError(_resultCode);
        }   
    );
}

DBTable.prototype.delete = function(_callbackOK, _callbackError)
{
    appLog("table delete (" + this.getTableFilePath() + ")");
    
    FileEx.deleteFile
    (
        this.getTableFilePath(),
        function()
        {
            _callbackOK(DBManager.C_DB_RESULT_OK);
        },
        function(_resultCode)
        {
            _callbackError(_resultCode);
        }   
    );
}	

// Get all content of the file, not parse the file.
DBTable.prototype.read = function(_callbackOK, _callbackError)
{
    appLog("table read (" + this.getTableFilePath()+ ")");

    FileEx.readFile
    (
        this.getTableFilePath(),
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

DBTable.prototype.insertRecord = function(_values, _callbackOK, _callbackError)
{
    if (_values !== null)
    {
        var tmpRecord = this.makeRecord(_values);

        if (tmpRecord !== "")
        {
            tmpRecord += "\n";
            appLog("table insert (" + this.getTableFilePath() + "): [" + tmpRecord + "]");

            FileEx.appendToFile
            (
                this.getTableFilePath(),
                tmpRecord,
                function()
                {
                    _callbackOK(DBManager.C_DB_RESULT_OK);
                },
                function(_resultCode)
                {
                    _callbackError(_resultCode);
                }   
            );
        }
        else
        {
            _callbackError( DBManager.C_DB_RESULT_EMPTY_RECORD);
        }
    }
    else
    {
        _callbackError( DBManager.C_DB_RESULT_EMPTY_VALUES);
    }
}

DBTable.prototype.makeRecord = function(_values)
{
    var result = "";
    
    var fieldsCount = this.m_fields.length;
    
    for (var i = 0; i < fieldsCount; i++)
    {
        // Si hay menos valores que campos, agregar blancos.
        if (i < fieldsCount)
        {
            result += Helper.stringRightFill(_values[i], " ", this.m_fields[i].getSize());
        }
        
        if (i == fieldsCount -1)
            result = result + ";";
        else
            result = result + ",";
    }
    
    return result;
}

DBTable.prototype.makeEmptyRecord = function()
{
    var result = "";
    
    var fieldsCount = this.m_fields.length;
    
    for (var i = 0; i < fieldsCount; i++)
    {
        // Si hay menos valores que campos, agregar blancos.
        if (i < fieldsCount)
        {
            result += Helper.stringRightFill("_", " ", this.m_fields[i].getSize());
        }
        
        if (i == fieldsCount -1)
            result = result + ";";
        else
            result = result + ",";
    }
    
    return result;
}

DBTable.prototype.selectAll = function(_cursor, includeDeletedRecords, _callbackOK, _callbackError)
{
    var _this = this;

    FileEx.readFile
    (
        this.getTableFilePath(), 
        function(_data)
        {
            if (_data === null)
                _callbackError(DBManager.C_DB_RESULT_ERROR);
        
            if (_data.length !== 0)
            {
                _cursor.setRows(_this.parseFields(_this.m_fields, _data, includeDeletedRecords));
                _callbackOK(DBManager.C_DB_RESULT_OK);
            }
            else
            {
                _callbackOK(DBManager.C_DB_RESULT_EMPTY_RECORD);
            }
        },
        function(_resultCode)
        {
            _callbackError(_resultCode);
        }
    );
}	

DBTable.prototype.getMaxID = function(_fieldToLook, _callbackOK, _callbackError)
{
    var allRecords = new DBCursor();
    var lookToFieldIndex = this.getFieldIndex(_fieldToLook); 

    var _this = this;

    if (lookToFieldIndex !== -1)
    {
        this.selectAll
        (
            allRecords, 
            false, 

            // After read all file, modify it in memory and write all againg. 
            function(_resultCode)
            {
                var nResultCode = DBManager.C_DB_RESULT_EMPTY_RECORD;

                if (_resultCode === DBManager.C_DB_RESULT_OK)
                {
                    var maxValue = "";
                    var fieldValue = "";
                    for (var i = 0; i < allRecords.rows().length; i++)
                    {
                        fieldValue = allRecords.getString(i, lookToFieldIndex);
                        
                        if (fieldValue > maxValue)
                            maxValue = fieldValue;
                    }
                }

                _callbackOK(maxValue);
            },

            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_EMPTY_VALUES);
    }    
}	

DBTable.prototype.updateRecord = function(_fieldToLook, _criteria, _values, _deleteRecord, _callbackOK, _callbackError)
{
    var allRecords = new DBCursor();
    var lookToFieldIndex = this.getFieldIndex(_fieldToLook); 

    var _this = this;

    if (lookToFieldIndex !== -1)
    {
        this.selectAll
        (
            allRecords, 
            true, 

            // After read all file, modify it in memory and write all againg. 
            function(_resultCode)
            {
                var nResultCode = DBManager.C_DB_RESULT_EMPTY_RECORD;

                if (_resultCode === DBManager.C_DB_RESULT_OK)
                {
                    for (var i = 0; i < allRecords.rows().length; i++)
                    {
                        if (allRecords.getString(i, lookToFieldIndex) === _criteria)
                        {
                            var tmpRecord = "";
            
                            if (_deleteRecord == true)
                            {
                                tmpRecord = _this.makeEmptyRecord();
                            }
                            else
                            {
                                if (_values !== null)
                                {
                                    tmpRecord = _this.makeRecord(_values);	
                                }
                                else
                                {
                                    nResultCode = DBManager.C_DB_RESULT_EMPTY_VALUES;
                                }
                            }	
                                
                            if (tmpRecord.length > 0)
                            {
                                nResultCode = DBManager.C_DB_RESULT_OK;
                                break;
                            }
                            else
                            {
                                nResultCode = DBManager.C_DB_RESULT_EMPTY_RECORD;
                            }
                        }
                    }
                    
                    if (nResultCode === DBManager.C_DB_RESULT_OK)
                    {
                        tmpRecord += "\n";
                        var offset = tmpRecord.length * i; 

                        FileEx.updateFileAndroid
                        (
                            _this.getTableFilePath(), 
                            tmpRecord, 
                            offset,
                            function(_result)
                            {
                                _callbackOK(DBManager.C_DB_RESULT_OK);
                            },
                            function(_result)
                            {
                                _callbackError(_result);
                            }
                        );
                    }   
                    else
                    {
                        _callbackOK(nResultCode);
                    }                     
                }
                else
                {
                    _callbackOK(_resultCode);
                }
            },

            function(_resultCode)
            {
                _callbackError(_resultCode);
            }
        );
    }
    else
    {
        _callbackError(DBManager.C_DB_RESULT_EMPTY_VALUES);
    }
}
    
DBTable.prototype.deleteRecord = function(_fieldToLook, _criteria, _callbackOK, _callbackError)
{
    return this.updateRecord(_fieldToLook, _criteria, null, true, _callbackOK, _callbackError);
}

DBTable.prototype.getFieldIndex = function(_fieldName)
{
    var result = -1;
    
    for (var i = 0; i < this.m_fields.length; i++)
    {
        if (this.m_fields[i].getName() === _fieldName)
        {
            result = i;
            break;
        }
        
    }
    
    return result;
}

/**
 * Extract each field from differents lines to array of fields.
 * Example: two lines
 * 111  ,aaa  ;
 * 222  ,bbb  ;
 * become in ["111", "aaa"], ["222", "bbb"]
 * 
 * @param _fieldsLenght: array with lenghts to kwon field's lenght.
 * @param _textToParse: text to be parsed.
 * @return
**/ 
DBTable.prototype.parseFields = function(_fieldsLenght, _textToParse, includeDeletedRecords)
{
    //Helper.logMessage("texto a parsear:" + _textToParse);

    var result = new Array();
    
    var offset = 0;
    var fieldCounter = 0;
    var fieldLenght = 0;
    var parsedString = "";

    var row = new Array();

    while (offset < _textToParse.length)
    {
        //fieldLenght = Integer.valueOf(((String)_fieldsLenght.get(fieldCounter))).intValue();    		
        fieldLenght = _fieldsLenght[fieldCounter].getSize();
        
        //Helper.logMessage(
        //		"campo=" + ((dbField)_fieldsLenght.get(fieldCounter)).getName() +  
        //		", ancho=" + String.valueOf(fieldLenght));
        
        // Get subvar representing a field.
        if (offset + fieldLenght < _textToParse.length)
        {
            parsedString = _textToParse.substring(offset, offset + fieldLenght);
            parsedString = parsedString.trim();
            row.push(parsedString);
            //Helper.logMessage("parsedvalue=" + parsedString);
        }

        // Next field.
        fieldCounter++;
        if (fieldCounter >= _fieldsLenght.length)
        {
            fieldCounter = 0;
            // En android no debemos usar 1 para evitar \n. 
            offset = offset + Config.C_ANDROID_DEFINED + 1;	 // skeep "\n";
            
            // Add row with fields parsed to result ArrayList.
            // Only if id is not "_", because "_" as first char means a deleted record.
            var firstByte = row[0].substring(0,1);
            if (firstByte !== "_" || includeDeletedRecords == true)
                result.push(row);
            row = new Array();
        }
        
        offset = offset + fieldLenght + 1;	//+1: skeep ","
    }
    
    // HARDCODED TEST
    //row = new ArrayListEx(); row.add("1111");row.add("aaa ");row.add("11.11");result.add(row);
    //row = new ArrayListEx(); row.add("2222");row.add("bbb ");row.add("22.22");result.add(row);

    return result;
}


DBTable.prototype.flushData = function()
{
    /*
    if (stFos !== null)
    {
        try {
            stFos.flush();
            //stFos.close();
        } 
        catch (IOException e) 
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }*/
}

DBTable.prototype.getTableFilePath = function()
{
    //return this.m_dbManager.getDbLocation() + "\\" + this.getName() + ".txt";
    return this.getName() + ".txt";
}

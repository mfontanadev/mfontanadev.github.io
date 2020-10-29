function SpentModel() 
{
}

SpentModel.prototype.findSpentById = function(_id, _cOK, _cERROR) 
{
    this.getAllSpent
    (
        function(_result) 
        { 
            var ent = null;

            for (var i = 0; i < _result.length; i++)
            {
                if (_result[i].getId() === _id)
                {
                    ent = _result[i];
                    break;
                }
            }

            _cOK(ent);
        },
        function(_result) 
        {
            Helper.logAndCallError(_result, _cERROR); 
        }
    )
}

SpentModel.prototype.getAllSpent = function(_cOK, _cERROR) 
{
    var ent = null;
	var cursor = new DBCursor();
	var records = new Array(); 

	Helper.clearArray(records);

	whoPaidApplication.getDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_SPENT, 
		cursor, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
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
			
					records.push(ent);
                }
                
                _cOK(records);
			}
			else
			{
                Helper.logAndCallError("getAllSpent, ERROR (" + _result + "), table:", _cERROR);
			}
		},
        function(_result) 
        { 
            Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR);
        }
	);
}

SpentModel.prototype.addSpent = function(_entity, _cOK, _cERROR) 
{
	var record = _entity.getRecord();

	whoPaidApplication.getDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_SPENT,
		record,
        function(_result) 
        { 
            _cOK(_result); 
        },
        function(_result) 
        { 
            Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR); 
        }
    );
}

SpentModel.prototype.updateSpent = function(_entity, _cOK, _cERROR) 
{
	var record = _entity.getRecord();

    whoPaidApplication.getDB().updateRecord
	(
        DBAppDictionary.C_DB_TABLE_SPENT,
        DBAppDictionary.C_DB_TABLE_SPENT_ID,
        _entity.getId(),
		record,
        function(_result) 
        { 
            _cOK(_result); 
        },
        function(_result) 
        { 
            Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR); 
        }
    );
}

SpentModel.prototype.deleteSpentById = function(_id, _cOK, _cERROR) 
{
    whoPaidApplication.getDB().deleteRecord
	(
        DBAppDictionary.C_DB_TABLE_SPENT,
        DBAppDictionary.C_DB_TABLE_SPENT_ID,
        _id,
        function(_result) 
        { 
            whoPaidApplication.getSession().loadAllSpent
            (
                function() {_cOK(_result); },
                function() { Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR); }
            );
        },
        function(_result) 
        { 
            Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR); 
        }
    );
}

function SpentService() 
{
}

SpentService.findSpentById = function(_id, _cOK, _cERROR) 
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

SpentService.getAllSpent = function(_cOK, _cERROR) 
{
    var ent = null;
	var cursor = new DBCursor();
	var records = new Array(); 

	Helper.clearArray(records);

	appDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_SPENT, 
		cursor, 
		function(_result)
		{
            if (_result === DBManager.C_DB_RESULT_OK || 
                _result === DBManager.C_DB_RESULT_EMPTY_RECORD)
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

SpentService.addSpent = function(_entity, _cOK, _cERROR) 
{
	var record = _entity.getRecord();

	appDB().insertRecord
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

SpentService.updateSpent = function(_entity, _cOK, _cERROR) 
{
	var record = _entity.getRecord();

    appDB().updateRecord
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

SpentService.deleteSpentById = function(_id, _cOK, _cERROR) 
{
    appDB().deleteRecord
	(
        DBAppDictionary.C_DB_TABLE_SPENT,
        DBAppDictionary.C_DB_TABLE_SPENT_ID,
        _id,
        function(_result) 
        { 
            appSession().loadAllSpent
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

SpentService.getSpentsOrderedByMonthAndCategory = function(_month) 
{
    Session.timeDiff.startTime("WSGetSpentsOrderedByMonthAndCategory");

    Helper.arrayCompare(appSession().m_arrCategory);
    Helper.arrayCompare(appSession().m_arrSpent);
    
    const global =
    {
        player1TotalSpent: 0,
        player2TotalSpent: 0,
        bothTotalSpent: 0,
        player1Percent: 0,
        player2Percent: 0,
        debt: 0,
        arrCategoryGroup: new Array()
    }

    const categoryGroup = 
    {
        catEntity: null,
        arrSpent: new Array(),
        player1TotalSpent: 0,
        player2TotalSpent: 0,
        bothTotalSpent: 0
    }
      
     // Iterate over all categories.
    appSession().m_arrCategory.forEach(eCategory => 
    {
        var categoryGroupItem = Object.create(categoryGroup);
        categoryGroupItem.catEntity = null;
        categoryGroupItem.arrSpent = new Array();
        categoryGroupItem.player1TotalSpent =  0;
        categoryGroupItem.player2TotalSpent = 0;
        categoryGroupItem.bothTotalSpent = 0;

        categoryGroupItem.catEntity = eCategory;
        
        // Iterate over all spents.
        appSession().m_arrSpent.forEach(eSpent => 
        {
            // JOIN spent.categoryId with category.id
            if (eCategory.getId() === eSpent.getCategoryId())
            {
                categoryGroupItem.arrSpent.push(eSpent);
                categoryGroupItem.player1TotalSpent += eSpent.getPlayer1Spent_float();
                categoryGroupItem.player2TotalSpent += eSpent.getPlayer2Spent_float();
                categoryGroupItem.bothTotalSpent = categoryGroupItem.player1TotalSpent + categoryGroupItem.player2TotalSpent;
            }
        });
    
        // Add to global
        global.arrCategoryGroup.push(categoryGroupItem);
        global.player1TotalSpent += categoryGroupItem.player1TotalSpent; 
        global.player2TotalSpent += categoryGroupItem.player2TotalSpent; 
        global.bothTotalSpent = global.player1TotalSpent + global.player2TotalSpent;
    });

    if (global.bothTotalSpent > 0)
    {
        global.player1Percent = global.player1TotalSpent / global.bothTotalSpent * 100;
        global.player2Percent = global.player2TotalSpent / global.bothTotalSpent * 100;
    }

    // Debt calculation depending on players spents.
    global.debt = 0;
    if (global.player1TotalSpent > global.player2TotalSpent)
    {
        global.debt = global.player1TotalSpent - (global.bothTotalSpent / 2);
    }
    else if (global.player2TotalSpent > global.player1TotalSpent)
    {
        global.debt = global.player2TotalSpent - (global.bothTotalSpent / 2);
    }
    
    Session.timeDiff.showTimeDiffCustomConsole("WSGetSpentsOrderedByMonthAndCategory", appLog);

    return global;
}


SpentService.getSpentById = function(_id) 
{
    var spent = null; 
    var _idString = _id.toString();

    // Iterate over all spents.
    appSession().m_arrSpent.forEach(eSpent => 
    {
        // JOIN spent.categoryId with category.id
        if (_idString === eSpent.getId())
        {
            spent = eSpent;
        }
    });

    return spent;
}

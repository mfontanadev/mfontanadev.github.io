function SubCategoryService() 
{
}

SubCategoryService.findSubCategoryById = function(_id, _cOK, _cERROR) 
{
    SubCategoryService.getAllCategory
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

SubCategoryService.getAllSubCategory = function(_cOK, _cERROR) 
{
    var ent = null;
	var cursor = new DBCursor();
	var records = new Array(); 

	Helper.clearArray(records);

	appDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY, 
		cursor, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				for (var i = 0; i < cursor.rows().length; i++)
				{
					ent = new SubCategoryEntity();
					ent.init(
                        cursor.getString(i, 0), 
                        cursor.getString(i, 1),                         
                        cursor.getString(i, 2), 
                        cursor.getString(i, 3)
                    );
			
					records.push(ent);
                }
                
                _cOK(records);
			}
			else
			{
                Helper.logAndCallError("getAllSubCategory, ERROR (" + _result + "), table:", _cERROR);
			}
		},
        function(_result) 
        { 
            Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR);
        }
	);
}

SubCategoryService.addSubCategory = function(_entity, _cOK, _cERROR) 
{
    // Agregar algunas categorias.
	var record = _entity.getRecord();

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_SUBCATEGORY,
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

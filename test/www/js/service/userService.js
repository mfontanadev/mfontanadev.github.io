function UserService() 
{
}

UserService.findUserByName = function(_userName, _cOK, _cERROR) 
{
    this.getAllUsers
    (
        function(_result) 
        { 
            var ent = null;

            for (var i = 0; i < _result.length; i++)
            {
                if (_result[i].getUsername() === _userName)
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

UserService.getAllUsers = function(_cOK, _cERROR) 
{
    var ent = null;
	var userCursor = new DBCursor();
	var m_arrUser = new Array(); 

	Helper.clearArray(m_arrUser);

	appDB().selectAll
	(
		DBAppDictionary.C_DB_TABLE_USER, 
		userCursor, 
		function(_result)
		{
			if (_result === DBManager.C_DB_RESULT_OK)
			{
				for (var i = 0; i < userCursor.rows().length; i++)
				{
					ent = new UserEntity();
					ent.init(
                        userCursor.getString(i, 0), 
                        userCursor.getString(i, 1), 
                        userCursor.getString(i, 2),
                        userCursor.getString(i, 3),
                        userCursor.getString(i, 4)
                    );
			
					m_arrUser.push(ent);
                }
                
                _cOK(m_arrUser);
			}
			else
			{
                Helper.logAndCallError("getAllUsers, ERROR (" + _result + "), table:", _cERROR);
			}
		},
        function(_result) 
        { 
            Helper.logAndCallError("ERROR (" + _result + "), table:", _cERROR);
        }
	);
}

UserService.addUser = function(_userEntity, _cOK, _cERROR) 
{
    // Agregar algunas categorias.
	var record = _userEntity.getRecord();

	appDB().insertRecord
	(
		DBAppDictionary.C_DB_TABLE_USER,
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

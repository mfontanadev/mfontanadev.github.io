Session._this = null;

function Session() 
{
    Session._this = this;
    this.m_currentUser = null;
    this.m_arrCategory = new Array();
    this.m_arrSubCategory = new Array();
    this.m_arrSpent = new Array();
    this.m_currentSpent = null;

    this.m_lastSpentId = 0;
    
    this.m_menuViewController = new MenuViewController();
    this.m_aboutViewController = new AboutViewController();
    this.m_spentViewController = new SpentViewController();
    this.m_spentListViewController = new SpentListViewController();
    this.m_mainViewController = new MainViewController();
    this.m_testViewController = new MainViewController();
}

Session.prototype.init = function() 
{
    this.loadAllCategory();
    this.loadAllSubcategory();
    this.loadAllSpent(null);
}

Session.prototype.getCurrentUser = function() 
{
    return this.m_currentUser;
}

Session.prototype.setCurrentUser = function(_userEntity) 
{
    this.m_currentUser = _userEntity;
}

Session.prototype.loadAllCategory = function() 
{
    var model = new CategoryModel();

    model.getAllCategory
    (
      function(_result) 
      { 
        Session._this.m_arrCategory = _result;
      },
      function(_result) 
      {
      }
    );
}

Session.prototype.loadAllSubcategory = function() 
{
    var model = new SubCategoryModel();
    model.getAllSubCategory
    (
      function(_result) 
      { 
        Session._this.m_arrSubCategory = _result;
      },
      function(_result) 
      {
      }
    );
}

Session.prototype.loadAllSpent = function(_cOK, _cERROR) 
{
    var model = new SpentModel();
    model.getAllSpent
    (
      function(_result) 
      { 
        Session._this.m_arrSpent = _result;
        console.log(_result);

        if (_cOK != null)
            _cOK(_result);
      },
      function(_result) 
      {
        if (_cERROR !== null)
            _cERROR(_result);
      }
    );
}

Session.prototype.createNewSpent = function(_callbackOK, _callbackError) 
{
    var testDescription = "TEST testMaxIDOnSpentTable: ";
    appLog(testDescription);

    whoPaidApplication.getDB().getMaxID
    (
        DBAppDictionary.C_DB_TABLE_SPENT,
        DBAppDictionary.C_DB_TABLE_SPENT_ID,
        function(_result)
        {
            appLog("testMaxIDOnSpentTable, OK (" + _result + ")");

            Session._this.m_currentSpent = new SpentEntity();

            Session._this.m_lastSpentId = parseInt(_result) + 1;

            Session._this.m_currentSpent.setId(Session._this.m_lastSpentId.toString());

            _callbackOK(_result);
        },
        function(_result) 
        { 
            appLog("testMaxIDOnSpentTable, ERROR (" + _result + ")");

            _callbackError(_result);
        }
    );
}

Session.prototype.getCurrentSpent = function() 
{
    return this.m_currentSpent;
}

Session.prototype.setCurrentSpent = function(_spentEntity) 
{
    this.m_currentSpent = _spentEntity;
}

Session.prototype.resetCurrentSpent = function() 
{
    this.m_currentSpent = null;
}

Session.prototype.getArrayById = function(_array, _id) 
{
    var retValue = null;

    for (var i = 0; i < _array.length; i++) 
    {
        if (_array[i].getId() === _id)
        {
            retValue = _array[i];
            break;
        }
    }  

    return retValue;
}

Session.prototype.getCategoryById = function(_id) 
{
    return this.getArrayById(this.m_arrCategory, _id);
}

Session.prototype.getSubCategoryById = function(_id) 
{
    return this.getArrayById(this.m_arrSubCategory, _id);
}

// Calculate total spent by month
Session.prototype.getTotalsByMonth = function() 
{
    var retValue = 
    {
        player1TotalSpent:0,
        player2TotalSpent:0,
        bothTotalSpent:0
    }

    this.m_arrSpent.forEach(element => {
        retValue.player1TotalSpent += element.getPlayer1Spent_float();
        retValue.player2TotalSpent += element.getPlayer2Spent_float();
    });

    retValue.bothTotalSpent = retValue.player1TotalSpent + retValue.player2TotalSpent;

    return retValue;
}
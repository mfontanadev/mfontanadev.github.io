Session.timeDiff = null;

function Session() 
{
    Session.timeDiff = new TimeDiff();
    
    this.m_dataIsBeingLoaded = true;

    this.m_arrEventStartReloadingAllData = new Array();
    this.m_arrEventFinishedReloadingAllData = new Array();

    this.m_lastSpentId = 0;

    this.m_currentUser = null;
    this.m_currentSpent = null;

    this.m_arrCategory = new Array();
    this.m_arrSubCategory = new Array();
    this.m_arrSpent = new Array();
}

Session.prototype.addEventStartReloadingAllData = function(_callback) 
{
    this.m_arrEventStartReloadingAllData.push(_callback);
}

Session.prototype.addEventFinishedReloadingAllData = function(_callback) 
{
    this.m_arrEventFinishedReloadingAllData.push(_callback);
}

Session.prototype.init = function() 
{
    this.m_menuViewController = new MenuViewController();
    this.m_aboutViewController = new AboutViewController();
    this.m_spentViewController = new SpentViewController();
    this.m_spentListViewController = new SpentListViewController();
    this.m_mainViewController = new MainViewController();
    this.m_mainViewContentController = new MainViewContentController();
    this.m_testViewController = new TestViewController();
    this.m_splashViewController = new SplashViewController();
    this.m_widgetViewController = new WidgetViewController();
}

Session.prototype.reloadAllData = function() 
{
    this.reloadAllDataAsynch(0, [
        this.loadAllCategory,
        this.loadAllSubcategory,
        this.loadAllSpent
    ]);
}

Session.prototype.reloadAllDataAsynch = function(_currentIndex, _functionsToExecute) 
{
    if (_currentIndex < _functionsToExecute.length)
    {
        if (_currentIndex === 0)
        {
            //console.log("trigger start reading data evenr");
            Session.timeDiff.startTime("reloadAllDataAsynch");

            this.m_dataIsBeingLoaded = true;
            appSession().triggerEventStartReloadingAllData();
        }

        _functionsToExecute[_currentIndex]
        (
            function(_result) 
            { 
                window.setTimeout( function() 
                {	
                    _currentIndex++;
                    appSession().reloadAllDataAsynch(_currentIndex, _functionsToExecute);
                }, Config.C_DELAY_INSERT_RECORD_MS );
            },
            function(_result) 
            {
                window.setTimeout( function() 
                {	
                    _currentIndex++;
                    appSession().reloadAllDataAsynch(_currentIndex, _functionsToExecute);
                }, Config.C_DELAY_INSERT_RECORD_MS );
            }
        );
    }
    else
    {
        console.log("trigger all data loadedr");
        Session.timeDiff.showTimeDiffCustomConsole("reloadAllDataAsynch", appLog);

        this.m_dataIsBeingLoaded = false;
        appSession().triggerFinishedReloadingAllData();
    }
}

Session.prototype.isDataBeingLoaded = function() 
{
    return this.m_dataIsBeingLoaded;
}

Session.prototype.triggerEventStartReloadingAllData = function() 
{
    this.m_arrEventStartReloadingAllData.forEach(element => {
        // Execute function "pointer".
        element();        
    });
}

Session.prototype.triggerFinishedReloadingAllData = function() 
{
    this.m_arrEventFinishedReloadingAllData.forEach(element => {
        // Execute function "pointer".
        element();        
    });
}

Session.prototype.loadAllCategory = function(_cOK, _cERROR) 
{
    Session.timeDiff.startTime("loadAllCategory");

    CategoryService.getAllCategory
    (
      function(_result) 
      { 
        Session.timeDiff.showTimeDiffCustomConsole("loadAllCategory", appLog);
        appSession().m_arrCategory = _result;
        _cOK(_result);
      },
      function(_result) 
      {
        _cERROR(_result);
      }
    );
}

Session.prototype.loadAllSubcategory = function(_cOK, _cERROR)
{
    Session.timeDiff.startTime("loadAllSubcategory");

    SubCategoryService.getAllSubCategory
    (
      function(_result) 
      { 
        Session.timeDiff.showTimeDiffCustomConsole("loadAllSubcategory", appLog);
        appSession().m_arrSubCategory = _result;
        _cOK(_result);
      },
      function(_result) 
      {
        _cERROR(_result);
      }
    );
}

Session.prototype.loadAllSpent = function(_cOK, _cERROR) 
{
    Session.timeDiff.startTime("loadAllSpent");

    SpentService.getAllSpent
    (
      function(_result) 
      { 
        Session.timeDiff.showTimeDiffCustomConsole("loadAllSpent", appLog);
        appSession().m_arrSpent = _result;

        if (_cOK !== null)
            _cOK(_result);
      },
      function(_result) 
      {
        if (_cERROR !== null)
            _cERROR(_result);
      }
    );
}

// Move all this to services folder
Session.prototype.createNewSpent = function(_callbackOK, _callbackError) 
{
    var testDescription = "TEST testMaxIDOnSpentTable: ";
    appLog(testDescription);

    appDB().getMaxID
    (
        DBAppDictionary.C_DB_TABLE_SPENT,
        DBAppDictionary.C_DB_TABLE_SPENT_ID,
        function(_result)
        {
            appLog("testMaxIDOnSpentTable, OK (" + _result + ")");

            appSession().m_currentSpent = new SpentEntity();
            
            appSession().m_lastSpentId = parseInt(_result) + 1;
            appSession().m_currentSpent.setId(appSession().m_lastSpentId.toString());

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

Session.prototype.getCurrentUser = function() 
{
    return this.m_currentUser;
}

Session.prototype.setCurrentUser = function(_userEntity) 
{
    this.m_currentUser = _userEntity;
}
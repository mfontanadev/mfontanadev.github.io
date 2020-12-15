function SpentService() 
{
}

SpentService.WSGetSpentsOrderedByMonthAndCategory = function(_month) 
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
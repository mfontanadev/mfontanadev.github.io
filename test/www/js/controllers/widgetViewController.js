WidgetViewController._this = null;

function WidgetViewController() 
{
  WidgetViewController._this = this;
  this.glData = null;

  appSession().addEventStartReloadingAllData(this.onEventStartReloadingAllData);
  appSession().addEventFinishedReloadingAllData(this.onEventFinishedReloadingAllData);
}

WidgetViewController.prototype.init = function()
{
  this.handleControls();
  
  this.resolveModeView();
}

WidgetViewController.prototype.handleControls = function() 
{
}

WidgetViewController.prototype.resolveModeView = function() 
{
  this.glData = SpentService.getSpentsOrderedByMonthAndCategory();
  WidgetViewController._this.fillSpentWidget();
  WidgetViewController._this.fillSpentWidgetCategory();
}

WidgetViewController.prototype.onEventStartReloadingAllData = function()
{
}

WidgetViewController.prototype.onEventFinishedReloadingAllData = function()
{
  WidgetViewController._this.glData = SpentService.getSpentsOrderedByMonthAndCategory();
  WidgetViewController._this.fillSpentWidget();
  WidgetViewController._this.fillSpentWidgetCategory();
}

WidgetViewController.prototype.fillSpentWidget = function()
{
  var _debtColor = "#ED5E61";
  var _notDebtColor = "#9EDA38";
  var _player1FontColor = _notDebtColor;
  var _player2FontColor = _notDebtColor;

  // Player colors.
  if (this.glData.player1TotalSpent > this.glData.player2TotalSpent)
    _player1FontColor = _debtColor;
  else if (this.glData.player2TotalSpent > this.glData.player1TotalSpent)
    _player2FontColor = _debtColor;
  
  var chartSpent = new Chartist.Pie(
    '#wigetChartSpent', 
    {
      series: [ Helper.getFormattedFloatFixed0(this.glData.player1Percent), 
                Helper.getFormattedFloatFixed0(this.glData.player2Percent)],

      labels: [ 'me ' +  '<br>' + Helper.getFormattedFloatFixed0(this.glData.player1Percent) + '%', 
                'not me ' +  '<br>' +  Helper.getFormattedFloatFixed0(this.glData.player2Percent) + '%']
    }, 
    {
      height: '200px',
      fullWidth: true,
      total: 100,
      showLabel: true
    });

  chartSpent.on
  (
    'draw', 
    function(context) 
    {
      if (context.type === 'slice')
      {
        if (context.index === 0)
          context.element.attr({style: 'fill: hsl(208, 54%, 20%);'});
        else if (context.index === 1)
          context.element.attr({style: 'fill: hsl(208, 54%, 25%);'});
      }

      if (context.type === 'label')
      {
        let textHtml = ['<p><strong>', context.text, '</strong></p>'].join('');
        
        // LAbel color depending og player's spent.
        let styleText = '';
        if (context.index === 0)
          styleText = 'font-size: 1em; overflow: visible; color: ' + _player1FontColor + ';'
        else if (context.index === 1)
          styleText = 'font-size: 1em; overflow: visible; color: ' + _player2FontColor + ';'

        let multilineText = Chartist.Svg('svg').foreignObject(
            textHtml,
            {
                style: styleText,
                x: context.x - 30,
                y: context.y - 50,
                width: 130,
                height: 20
            },
            'ct-label'
        );
        context.element.replace(multilineText);
      }
    }
  );
}


WidgetViewController.prototype.fillSpentWidgetCategory = function()
{
  // Calculate each category spent penrcent over the total spent.
  var series = new Array();
  var labels = new Array();
  var categoryGroupPercent = 0;
  this.glData.arrCategoryGroup.forEach(eCategory => 
  {
    if (eCategory.bothTotalSpent > 0)
    {
      if (this.glData.bothTotalSpent > 0)
        categoryGroupPercent = (eCategory.bothTotalSpent / this.glData.bothTotalSpent) * 100;
      else
        categoryGroupPercent = 0;

      series.push(Helper.getFormattedFloatFixed0(categoryGroupPercent));
      labels.push(eCategory.catEntity.getName() + '<br>' + Helper.getFormattedFloatFixed0(categoryGroupPercent) + '%');
    }
  });

  var chartCategory = new Chartist.Pie(
    '#wigetChartCategory', 
    {
      series,
      labels
    }, 
    {
      height: '200px',
      fullWidth: true,
      total: 100,
      showLabel: true
    });

    chartCategory.on('draw', function(context) 
    {
      if (context.type === 'label')
      {
          let textHtml = ['<p><strong>', context.text, '</strong></p>'].join('');
          let multilineText = Chartist.Svg('svg').foreignObject(
              textHtml,
              {
                  style: 'font-size: 1em; overflow: visible; color: black;',
                  x: context.x - 30,
                  y: context.y - 50,
                  width: 130,
                  height: 20
              },
              'ct-label'
          );
          context.element.replace(multilineText);
      }
    });
}

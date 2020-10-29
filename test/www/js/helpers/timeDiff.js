TimeDiff.logTimes = false;
TimeDiff.times = new Array();

function TimeDiff() 

{
    this.m_key = "";
    this.m_value = "";
}

TimeDiff.prototype.startTime = function(_key)
{
    var foundItem = this.chFoundTimeKey(_key);

    if (foundItem === null)
    {
        foundItem = {key:_key, date: null, totalTime: 0};
        TimeDiff.times.push(foundItem);
    }
    
    foundItem.totalTime = 0;
    foundItem.date = Date.now();
}

TimeDiff.prototype.showTimes = function(_value)
{
    TimeDiff.logTimes = _value;
}

TimeDiff.prototype.showTimeDiff = function(_key)
{
    this.showTimeDiffBase(_key, null);
}

TimeDiff.prototype.showTimeDiffCustomeConsole = function(_key, _customConsoleFunction)
{
    this.showTimeDiffBase(_key, _customConsoleFunction);
}

TimeDiff.prototype.showTimeDiffBase = function(_key, _console)
{
    if (TimeDiff.logTimes === false)
        return;

    this.addTimeDiff(_key);

    var foundItem = this.chFoundTimeKey(_key);
    if (foundItem !== null)
    {
        if (_console === null)
            console.log("Timediff ", foundItem.key, ":", foundItem.totalTime);
        else
            _console("Timediff " + foundItem.key + ":" + foundItem.totalTime);
    }
    else
    {
        if (_console === null)
            console.log("Timediff ", _key, ": not found");
        else
            _console("Timediff ", + _key + ": not found");
    }
}


TimeDiff.prototype.addTimeDiff = function(_key)
{
    var foundItem = this.chFoundTimeKey(_key);
    if (foundItem !== null)
    {
        foundItem.totalTime += (Date.now() - foundItem.date);
        foundItem.date = Date.now();
    }
}

TimeDiff.prototype.chFoundTimeKey = function(_key)
{
    var foundItem = null;

    for (var i = 0; i < TimeDiff.times.length && foundItem === null; i++) 
        if (TimeDiff.times[i].key === _key)
            foundItem = TimeDiff.times[i];

    return foundItem;
}

function Helper()
{
};

// ARRAYS
Helper.clearArray = function(_array)
{
	if (_array !== null && _array.length > 0)
	{
		_array.splice(0, _array.length);	
	}
}

Helper.arrayCompare = function(_array)
{
  _array.sort
  (
    function(item1, item2) 
    {
      return item1.compare(item2);
    }
  );
}

// STRINGS
Helper.stringRightFill = function(text, fillChar, lenght)
{
	var result = "";
	
	for (var i = 0; i < lenght; i++)
		result = result + fillChar;
	
	if (result.length >= text.length)
	{
		result = text + result.substring(0, result.length - text.length);
	}
	else
	{
		result = text.substring(0, lenght);
	}
	
	return result;
}

Helper.stringLeftFill = function(text, fillChar, lenght)
{
	var result = "";
	
	for (var i = 0; i < lenght; i++)
		result = result + fillChar;
	
	if (result.length >= text.length)
	{
		result = result.substring(0, result.length - text.length) + text;
	}
	else
	{
		result = text.substring(0, lenght);
	}
	
	return result;
}

// HTTP
Helper.callWebService = function(_type, _servicePath, _callbackError, _callbackSuccess)
{
	msgappLog("CallWebService request:" + _servicePath);

	$.ajax({
	   url: '//' + viewMngr.m_hostname + '/' + _servicePath,
	   error: function() 
	   {
	     	msgappLog("CallWebService: error");
	   		if (typeof _callbackError !== 'undefined')
	   			_callbackError("ERROR");
	   },
	   success: function(data) 
	   {
	   		msgappLog("CallWebService response:" + data);
	   		if (typeof _callbackSuccess !== 'undefined')
	   			_callbackSuccess(data);
	   },
	   type: _type
	});
}

// LOG
Helper.logAndCallError = function(_message, _callbackError)
{
	appLog(_message);
	_callbackError(_message);
}

/*
static public String getFormattedDouble(double _value)
{
	return String.format("%.01f", _value);
}

static public String getFormattedDouble(String _value)
{
	return getFormattedDouble(Double.valueOf(_value));
}    

static public String getFormattedDoubleRounded(double _value)
{
	return String.format("%.0f", _value);
}
*/
// DATE FORMAT
Helper.getFormattedFloat = function(_floatValue) 
{
	return Number.parseFloat(_floatValue).toFixed(2);
}

Helper.getDate_yyyy = function(_date) 
{
	return parseInt(_date.substring(0,4));
}

Helper.getDate_mm = function(_date) 
{
	return parseInt(_date.substring(5,7));
}

Helper.getDate_dd = function(_date) 
{
	return parseInt(_date.substring(8, 10));
}   
	
Helper.getDateWithTime = function(_yyyy, _mm, _dd, _time) 
{
	return 	Helper.stringLeftFill(_yyyy.toString(), "0", 4) + "/" + 
			Helper.stringLeftFill(_mm.toString(), "0", 2) + "/" + 
			Helper.stringLeftFill(_dd.toString(), "0", 2) + " " + _time;  
}


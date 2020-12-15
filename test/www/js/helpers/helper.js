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
// NUMBER FORMAT
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

Helper.getFormattedFloat = function(_floatValue) 
{
	return Number.parseFloat(_floatValue).toFixed(2);
}

Helper.getFormattedFloatFixed0 = function(_floatValue) 
{
	return Number.parseFloat(_floatValue).toFixed(0);
}

// DATE FORMAT
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

Helper.getCurrentDateWithTime = function()
{
	var today = new Date();

	return Helper.getDateWithTime(
		today.getFullYear(), 
		today.getMonth() + 1, 
		today.getDate(),
		today.getHours(),
		today.getMinutes(),
		today.getSeconds()
	);
}

//HTML
// Super tricky thing to make a dialog apper above fullscreen zIndez.
Helper.showCustomDialog = function(_elementName, _title, _message, _handlerName, _metadata)
{
	var dialog = document.getElementById(_elementName);

	document.getElementById(_elementName + '-title').innerHTML = _title;
	document.getElementById(_elementName + '-content').innerHTML = _message;

	// ------------------------------
	// Inyection of callback by name, I don't feel proud of this solution.
	// 
	var btn = document.getElementById(_elementName + '-button-cancel');
	var html = btn.outerHTML;
	html = html.replace('{}', _handlerName + "('" + _elementName + "', 0, '" + _metadata + "');");
	btn.outerHTML = html;
	appLog("btn.outerHTML = " + html);

	btn = document.getElementById(_elementName + '-button-ok');
	html = btn.outerHTML;
	html = html.replace('{}', _handlerName + "('" + _elementName + "', 1, '" + _metadata + "');");
	btn.outerHTML = html;
	appLog("btn.outerHTML = " + html);
	// ------------------------------

	dialog.show();
}

Helper.hideCustomDialog = function(_elementName)
{
	document.getElementById(_elementName).hide();
}

	var hideTimeID=0;
	var timeTimes=0;
	hideTimeID = setTimeout("ocultar(0)",500);
	function ocultar(d)
	{
	
		var as = document.getElementsByTagName("layer");
		for (var i=0; i<as.length; i++) 
			as[i].style.display = 'none';	
		timeTimes++;
	
		if (timeTimes >= 10)
			clearTimeout(hideTimeID);
		else
			hideTimeID = setTimeout("ocultar(0)",500);		
	}

// Class Score
function Indicator () 
{ 
	Indicator.prototype.initWith = function ()
	{
		this.m_Indicator = 0;
		this.m_pollution = 0;
		this.m_cars = 3;
	
		this.m_heroHealth = 100;
	}
	
	// 
	Indicator.prototype.implementGameLogic = function () 
	{ 
	}  

	Indicator.prototype.render = function (_canvas, _context)
	{
		renderRectangleFillTransparent(_canvas, _context, 0, 0, _canvas.width,_canvas.height, rgbToColor(20,20,20), 1);
	}

	Indicator.prototype.fLog = function () 
	{ 
		var logText = "Brick: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ";"; 

		return logText;
	}  
	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
}


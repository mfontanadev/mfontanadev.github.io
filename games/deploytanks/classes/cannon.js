// Class Cannon
function Cannon () 
{ 
	//var C_ENGINE_STATE_STOP = 0;
	var C_CANNON_MAX_RANGE = 500;		// in meters.
	var C_CANNON_MAX_RADIOUS = 10;		// in cm.		
	var C_CANNON_MAX_ENERGY = 48;				
	
	Cannon.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_CANNON;
		this.m_type = _type; 

		this.m_width = 100;
		this.m_height = 100;

		this.m_x = _x; 
		this.m_y = _y; 
		this.m_px = 0;
		this.m_py = 0;

		this.m_arrObj = new Array();

		this.updateCounter = 0;
		//this.updateMaxCycles = (C_Cannon_FRECUENCY * C_FPS_RENDER) / 1000;

		this.m_arrZoom = new Array();
		this.m_arrZoom.push(250);
		this.m_arrZoom.push(500);
		this.m_arrZoom.push(800);

		this.m_currentButtonIndex = -1;

		this.m_linkedTank = null;

		this.m_currentRange = 0;
		this.m_rangeInc = C_CANNON_MAX_RANGE / 5;
		this.m_currentRadious = 0;
		
		this.m_buttonz1 = new ChButton()
 		this.m_buttonz1.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_CANNON + 120 - 40, C_OFFSETY_CANNON + 120 - 30, C_KEY_NUMBER_1);
		this.m_buttonz4 = new ChButton()
 		this.m_buttonz4.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_CANNON + 10, C_OFFSETY_CANNON + 120 - 30, C_KEY_NUMBER_4);
		this.m_buttonz2 = new ChButton()
 		this.m_buttonz2.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_CANNON + 120 / 2 - 15, C_OFFSETY_CANNON + 120 - 20, C_KEY_NUMBER_2);
		this.m_buttonz3 = new ChButton()
 		this.m_buttonz3.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_CANNON + 120 / 2 - 15, C_OFFSETY_CANNON + 120 - 45, C_KEY_NUMBER_3);

		this.m_updEnergyUsed = 0;
		this.m_updDamage = 0;
		this.updateEnergyUsed();
	}	
	
	// 
	Cannon.prototype.handleInputs = function () 
	{ 
		this.m_buttonz1.handleInputs();
		this.m_buttonz2.handleInputs();
		this.m_buttonz3.handleInputs();
		this.m_buttonz4.handleInputs();

		if (this.m_buttonz1.isDown() == false && 
			this.m_buttonz2.isDown() == false && 
			this.m_buttonz3.isDown() == false && 
			this.m_buttonz4.isDown() == false)
			this.m_currentButtonIndex = -1;
			
		if (this.m_currentButtonIndex == -1)
		{
			if (this.m_buttonz3.isDown() == true)
			{
				this.modifyDiameter(5);
				this.m_currentButtonIndex = 3;
			}
			if (this.m_buttonz1.isDown() == true)
			{
				this.modifyRange(this.m_rangeInc);
				this.m_currentButtonIndex = 1;
			}
			if (this.m_buttonz4.isDown() == true)
			{
				this.modifyRange(this.m_rangeInc * -1);
				this.m_currentButtonIndex = 4;
			}
			if (this.m_buttonz2.isDown() == true)
			{
				this.modifyDiameter(-5);
				this.m_currentButtonIndex = 2;
			}
		}
	}  

	// 
	Cannon.prototype.implementGameLogic = function () 
	{ 
		this.handleInputs();

	}  


	Cannon.prototype.render = function (_canvas, _context)
	{
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_RIGHT), C_OFFSETX_CANNON, C_OFFSETY_CANNON, 1);
			
		var tmpRangeEnd = 80 * this.m_currentRange / C_CANNON_MAX_RANGE;
		for (var i = 0; i <= tmpRangeEnd ; i++) 
		{
			if (i == 0 || i % 5 == 0 || i == tmpRangeEnd)
				renderCircleTransparent(_canvas, _context, C_OFFSETX_CANNON + i + 20, C_OFFSETY_CANNON + 40, this.m_currentRadious, "red", 1-(i / tmpRangeEnd) );
		}
		
		for (var i = 0; i <= 80 ; i++) 
		{
			if (i % 10 == 0)
				renderLine(_canvas, _context, C_OFFSETX_CANNON + 20+i, C_OFFSETY_CANNON + 40 - 3, C_OFFSETX_CANNON + 20+i, C_OFFSETY_CANNON + 40 + 3, "gray", 1);
			else if (i % 4 == 0)
				renderLine(_canvas, _context, C_OFFSETX_CANNON + 20+i, C_OFFSETY_CANNON + 40 - 1, C_OFFSETX_CANNON + 20+i, C_OFFSETY_CANNON + 40 + 1, "gray", 1);
			else
				renderLine(_canvas, _context, C_OFFSETX_CANNON + 20+i, C_OFFSETY_CANNON + 40 , C_OFFSETX_CANNON + 20+i, C_OFFSETY_CANNON + 40 , "gray", 1);
		}
		
		m_fontMngr.drawTextSmall(_canvas, _context, "E=" + pad(this.m_updEnergyUsed,3),   C_OFFSETX_CANNON + 5, C_OFFSETY_CANNON + 8, rgbToColor(16,16,16));
		//m_fontMngr.drawTextSmall(_canvas, _context, "D=" + pad(this.m_updDamage    ,3),   C_OFFSETX_CANNON + 120-40-5, C_OFFSETY_CANNON + 8, rgbToColor(16,16,16));

		m_fontMngr.drawTextSmall(_canvas, _context, "0" ,   					C_OFFSETX_CANNON + 20-4, 	C_OFFSETY_CANNON + 55, rgbToColor(16,16,16));
		m_fontMngr.drawTextSmall(_canvas, _context, pad(this.m_currentRange,3), C_OFFSETX_CANNON + (60-12), C_OFFSETY_CANNON + 55, rgbToColor(16,16,16));
		m_fontMngr.drawTextSmall(_canvas, _context, pad(C_CANNON_MAX_RANGE),   	C_OFFSETX_CANNON + 100-12,  C_OFFSETY_CANNON + 55, rgbToColor(16,16,16));
		//m_fontMngr.drawTextSmall(_canvas, _context, "R=" + pad(this.m_currentRange,3),   C_OFFSETX_CANNON + 53, C_OFFSETY_CANNON + 55, rgbToColor(16,16,16));
				
		this.m_buttonz1.render(_canvas, _context);
		this.m_buttonz2.render(_canvas, _context);
		this.m_buttonz3.render(_canvas, _context);
		this.m_buttonz4.render(_canvas, _context);
	}

	Cannon.prototype.collisionRectangle = function () 
	{
		// -1 because a long story, center is not in de middle because cell size 
		// is no pair. The result rectangle is one pixel greater.
		var midRad = (C_CELL_WIDTH >> 1) - 1;
		
		this.m_rc.m_x1 = this.m_x - midRad;
		this.m_rc.m_y1 = this.m_y - midRad;
		this.m_rc.m_x2 = this.m_x + midRad;
		this.m_rc.m_y2 = this.m_y + midRad;
	
		return this.m_rc; 
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Cannon.prototype.modifyDiameter = function (_value) 
	{
		this.m_currentRadious += _value;
		
		if (this.m_currentRadious > C_CANNON_MAX_RADIOUS)
			this.m_currentRadious = C_CANNON_MAX_RADIOUS;
		
		if (this.m_currentRadious <= 5)
			this.m_currentRadious = 5;
		
		this.updateEnergyUsed();
	}

	Cannon.prototype.modifyRange = function (_value) 
	{
		this.m_currentRange += _value;
		
		if (this.m_currentRange > C_CANNON_MAX_RANGE)
			this.m_currentRange = C_CANNON_MAX_RANGE;
		
		if (this.m_currentRange <= 0)
			this.m_currentRange = 100;
		
		this.updateEnergyUsed();
	}
	
	// Calculate how many energy must be necesary when firing
	Cannon.prototype.updateEnergyUsed = function () 
	{
		// The idea is calculte energy using volumne of cilinder formula
		// where range is altitude and diametres y diameter.
		//
		// v = pi * r * r * h
		//
		/*
		var maxValue = Math.PI * C_CANNON_MAX_RADIOUS * C_CANNON_MAX_RADIOUS * C_CANNON_MAX_RANGE;
		var currentValue = Math.PI * this.m_currentRadious * this.m_currentRadious * this.m_currentRange;
		var percentValue = currentValue / maxValue;
		
		this.m_updEnergyUsed = 2 + (C_CANNON_MAX_ENERGY * percentValue);
		this.m_updEnergyUsed = Math.round(this.m_updEnergyUsed,0);
		*/
		var en5 =  [5, 15, 25, 30 , 50];
		var en10 = [10, 30, 50, 70 , 90];
			
		//  range 100 200 300 400 500
		// rad
		//  5     5   15  25  30  50    
		// 10     10  30  50  70  90
		if ( this.m_currentRadious == 5)
			this.m_updEnergyUsed = en5[(this.m_currentRange / 100) -1] ;
		if ( this.m_currentRadious == 10)
			this.m_updEnergyUsed = en10[(this.m_currentRange / 100) -1];
		
	}
	
	Cannon.prototype.energyUsed = function () 
	{
		return this.m_updEnergyUsed;
	}
	
}




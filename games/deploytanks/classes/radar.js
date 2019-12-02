// Class Hero
function Radar () 
{ 
	//var C_ENGINE_STATE_STOP = 0;
	var C_RADAR_FRECUENCY = 3000;
	var C_RADAR_DETECTION_RANGE = 100;		// in meters.
	
	Radar.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_RADAR;
		this.m_type = _type; 

		this.m_width = 100;
		this.m_height = 100;

		this.m_x = _x; 
		this.m_y = _y; 
		this.m_px = 0;
		this.m_py = 0;

		this.m_arrObj = new Array();

		this.updateMaxCycles = (C_RADAR_FRECUENCY * C_FPS_RENDER) / 1000;
		this.updateCounter = this.updateMaxCycles;	// force update at first cycle.

		this.m_arrZoom = new Array();
		this.m_arrZoom.push(300);
		this.m_arrZoom.push(500);
		this.m_arrZoom.push(800);

		this.m_currentZoomIndex = 0;

		this.m_linkedTank = null;

		this.m_buttonz1 = new ChButton()
 		this.m_buttonz1.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_RADAR + 35*0 + 8, C_OFFSETY_ENGINE + 120 - 20, C_KEY_F4);
		this.m_buttonz2 = new ChButton()
 		this.m_buttonz2.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_RADAR + 35*1 + 8, C_OFFSETY_ENGINE + 120 - 20, C_KEY_F5);
		this.m_buttonz3 = new ChButton()
 		this.m_buttonz3.initWith(0, C_OBJ_TYPE_CHBUTTON_GREEN, C_OFFSETX_RADAR + 35*2 + 8, C_OFFSETY_ENGINE + 120 - 20, C_KEY_F6);

	}
	
	// 
	Radar.prototype.handleInputs = function () 
	{ 
		this.m_buttonz1.handleInputs();
		this.m_buttonz2.handleInputs();
		this.m_buttonz3.handleInputs();

		if (this.m_buttonz1.isDown() == true)
		{
			this.pushButton(0);
		}
		if (this.m_buttonz2.isDown() == true)
		{
			this.pushButton(1);
		}
		if (this.m_buttonz3.isDown() == true)
		{
			this.pushButton(2);
		}

	}  

	// 
	Radar.prototype.implementGameLogic = function () 
	{ 
		this.handleInputs();

		if (this.updateCounter > -1)
		{
			this.updateCounter++;
				
			if (this.updateCounter >= this.updateMaxCycles)
			{
				this.updateCounter = 0;
				this.update();
			}
		}

		if (this.m_currentZoomIndex == 0) this.m_buttonz1.setDown(); else this.m_buttonz1.setUp();
		if (this.m_currentZoomIndex == 1) this.m_buttonz2.setDown(); else this.m_buttonz2.setUp();
		if (this.m_currentZoomIndex == 2) this.m_buttonz3.setDown(); else this.m_buttonz3.setUp();
	}  


	Radar.prototype.render = function (_canvas, _context)
	{
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_RIGHT), C_OFFSETX_RADAR, C_OFFSETY_RADAR, 1);

		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_RADAR), C_OFFSETX_RADAR+10, C_OFFSETY_RADAR + 0, 1);

		percent = 1 - (this.updateCounter / this.updateMaxCycles);

		for (var i = 0; i < this.m_arrObj.length ; i++) 
		{
			if (this.m_arrObj[i].m_x1 == 0)
				renderCircleTransparent(_canvas, _context,  C_OFFSETX_RADAR + this.m_px + 10 + this.m_arrObj[i].m_x2,  C_OFFSETY_RADAR + this.m_py + this.m_arrObj[i].m_y2, 1 , "yellow", percent);
			else
				renderCircleTransparent(_canvas, _context,  C_OFFSETX_RADAR + this.m_px + 10 + this.m_arrObj[i].m_x2,  C_OFFSETY_RADAR + this.m_py + this.m_arrObj[i].m_y2, 1 , "blue", percent);
		}

		this.m_buttonz1.render(_canvas, _context);
		this.m_buttonz2.render(_canvas, _context);
		this.m_buttonz3.render(_canvas, _context);

	}

	Radar.prototype.collisionRectangle = function () 
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

	Radar.prototype.update = function()
	{ 
		chClearArray(this.m_arrObj);

		var posItem = null;
		var currentRange =  this.m_arrZoom[this.m_currentZoomIndex];
		// This x / 2 - 10 is because ZoomRange is from center of radar to radious.
		var scaleX =  ((this.m_width / 2)- 10) / this.m_arrZoom[this.m_currentZoomIndex];
		var scaleY =  ((this.m_height / 2) - 10) / this.m_arrZoom[this.m_currentZoomIndex];
		var tankX = this.m_linkedTank.m_x;
		var tankY = this.m_linkedTank.m_y;

		for (var i = 0; i < m_maze.m_arrObj.length; i++) 
		{
			if (m_maze.m_arrObj[i].m_class == C_CLASS_ENEMY)
			{
				tmpModulo = modulo(m_maze.m_arrObj[i].m_x, m_maze.m_arrObj[i].m_y, tankX, tankY); 
				
				if ( tmpModulo < currentRange)
				{
					posItem = new chRect();
					chScaleDistance (tankX, tankY, m_maze.m_arrObj[i].m_x, m_maze.m_arrObj[i].m_y, scaleX, scaleY, posItem) 

					posItem.m_x2 = (this.m_width / 2) + posItem.m_x2;
					posItem.m_y2 = (this.m_height / 2) - posItem.m_y2;
					posItem.m_x1 = 0;
					
					if (m_maze.m_arrObj[i].m_status != C_STATUS_ALIVE)
						posItem.m_x1 = 1;
										
					this.m_arrObj.push(posItem);
				}
			}
		}

		var energySpent = 1;
		if (this.m_currentZoomIndex == 0)
			energySpent = 1;
		if (this.m_currentZoomIndex == 1)
			energySpent = 2;
		if (this.m_currentZoomIndex == 2)
			energySpent = 3;
		
		//this.modifyEnergy(energySpent * -1);
	}	

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Radar.prototype.isOn = function()
	{ 
		return this.m_state > C_Radar_STATE_STARTING;
	}

	Radar.prototype.linkTank = function(_tank)
	{ 
		this.m_linkedTank = _tank;
	}

	Radar.prototype.pushButton = function(_index)
	{ 
		if (this.m_currentZoomIndex != _index)
		{
			this.m_currentZoomIndex = _index;
			m_sndManager.stop(C_SND_RADAR_BUTTON);
			m_sndManager.play(C_SND_RADAR_BUTTON);
			this.update();
		}
	}
	
	Radar.prototype.modifyEnergy = function(_value)
	{
		if (this.m_linkedTank != null)
			this.m_linkedTank.modifyEnergy(_value);
	}
}



// Class Hero
function Energy () 
{ 
	Energy.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_ENERGY;
		this.m_type = _type; 

		this.m_x = _x; 
		this.m_y = _y; 

		//this.m_engine_startCounter = -1;
		//this.m_engine_maxCycles = 3000 / (C_FPS_RENDER);
		
		this.m_px = 0;
		this.m_py = 0;

		this.m_energy = 1000;
		this.m_energyRowAngle = 0;

		//m_sndManager.setVolume(C_SND_ENGINE_0, C_SND_ENGINE_0_VOLUME);
		this.m_arrHistory = new Array();
		this.m_maxHistoryItems = 50;
		this.m_historySeparation = 100 / this.m_maxHistoryItems; 
	}
	
	// 
	Energy.prototype.handleInputs = function () 
	{ 
		if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_G) == true)
		{
			//m_keyboardMngr.disableUntilKeyUp(C_KEY_CHAR_J);
			this.modifyIndicator(-5);
		}
		if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_H) == true)
		{
			//m_keyboardMngr.disableUntilKeyUp(C_KEY_CHAR_J);
			this.modifyIndicator(5);
		}
	}  

	// 
	Energy.prototype.implementGameLogic = function () 
	{ 
		this.handleInputs();
		this.calculateEnergyRowAngle();
	}  


	Energy.prototype.render = function (_canvas, _context)
	{
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_LEFT), C_OFFSETX_ENERGY, C_OFFSETY_ENERGY, 1);

		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENERGY_INDICATOR), C_OFFSETX_ENERGY + 0, C_OFFSETY_ENERGY -5, 1);
		drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENERGY_ROW_INDICATOR), C_OFFSETX_ENERGY + 60, C_OFFSETY_ENERGY + 60, this.m_energyRowAngle);

		renderRectangle(_canvas, _context, C_OFFSETX_ENERGY + 8, C_OFFSETY_ENERGY + 84, 103, 30, "gray")		
		var ind = 0;
		for (var i = this.m_arrHistory.length - 1; i >= 0; i--) 
		{
			valueData = this.m_arrHistory[i].m_t;
			_px = C_OFFSETX_ENERGY + (ind*2) + 10;

			renderLine(_canvas, _context, _px + 0, C_OFFSETY_ENERGY + 120 - 7, _px + 0, C_OFFSETY_ENERGY + 120 - 7 - valueData, "yellow", 1);
			renderLine(_canvas, _context, _px - 1, C_OFFSETY_ENERGY + 120 - 7, _px - 1, C_OFFSETY_ENERGY + 120 - 7 - valueData, "yellow", 1);
			ind++; 
		}

		m_fontMngr.drawTextSmall(_canvas, _context, pad(this.m_energy,4),   C_OFFSETX_ENERGY + (60 - 16), C_OFFSETY_ENERGY + 84 - 9, rgbToColor(16,16,16));
	}

	Energy.prototype.collisionRectangle = function () 
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

	Energy.prototype.calculateEnergyRowAngle = function()
	{ 
		this.m_energyRowAngle =  (-90 + (((1000-this.m_energy) / 1000) * 180));
		return this.m_energyRowAngle;
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Energy.prototype.modifyIndicator = function(_value)
	{ 
		this.m_energy = this.m_energy + _value;
		
		if (this.m_energy  < 0)
			this.m_energy = 0;
		
		if (this.m_energy  > 1000)
			this.m_energy = 1000;
		
		if (_value < -30)
			_value = -28;
		if (_value > 30)
			_value = 28;
		
		//TODO: positive value show in green, negative value show yellow
		if (_value < 0)
		{
			if (this.m_arrHistory.length > this.m_maxHistoryItems)
			{
				this.m_arrHistory.splice(0,1);
			}
			dataItem = new chPoint();
			dataItem.initWith(0,0,0,Math.abs(_value));
			this.m_arrHistory.push(dataItem);
			
		}
		
		this.m_energy = Math.round(this.m_energy ,0);
	}
	
	Energy.prototype.getCurrentEnergy = function(_value)
	{
		return this.m_energy;
	}
}

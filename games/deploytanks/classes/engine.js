// Class Hero
function Engine () 
{ 
	var C_ENGINE_STATE_STOP = 0;
	var C_ENGINE_STATE_STARTING = 1;
	var C_ENGINE_STATE_LOW = 4;
	var C_ENGINE_STATE_HIGHT = 8;

	var C_ENGINE_RPM_STARTING = 500;
	var C_ENGINE_RPM_LO = 1000;
	var C_ENGINE_RPM_HI = 3000;

	var C_ENGINE_RPM_HI = 3000;
	
	var C_ENGINE_LOST_ENERGY_FREC = 1000;

	Engine.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_ENGINE;
		this.m_type = _type; 

		this.m_x = _x; 
		this.m_y = _y; 
		this.m_state = C_ENGINE_STATE_STOP;
		//this.m_state = C_ENGINE_STATE_LOW;
		this.m_allowFire = false;

		this.m_engine_startCounter = -1;
		this.m_engine_maxCycles = 3000 / (C_FPS_RENDER);
		
		this.m_px = 0;
		this.m_py = 0;

		this.m_rpm = 0;

		this.m_rpmRowAngle = 0;

		m_sndManager.setVolume(C_SND_ENGINE_0, C_SND_ENGINE_0_VOLUME);
 		this.m_button = new ChButton()
 		this.m_button.initWith(0, C_OBJ_TYPE_CHBUTTON_BLUE, C_OFFSETY_ENGINE + (60 - 15),  C_OFFSETY_ENGINE + 120 - 18, C_KEY_CHAR_J);
	
		this.m_linkedTank = null;
		
		this.m_energyLostTimer = new ChTimer();
		this.m_energyLostTimer.initWith(C_ENGINE_LOST_ENERGY_FREC);
		this.m_energyLostTimer.start();
	}
	
	// 
	Engine.prototype.handleInputs = function () 
	{ 
			this.m_button.handleInputs();

			if (this.m_button.isDown() == true)
			{
				if (this.m_engine_startCounter == -1 && this.m_state == C_ENGINE_STATE_STOP)
				{
					this.m_state = C_ENGINE_STATE_STARTING;
					m_sndManager.setLoop(C_SND_ENGINE_STARTING, true);
					m_sndManager.play(C_SND_ENGINE_STARTING);
					this.m_engine_startCounter = 0;
				}
			}
			else
			{
				if (this.m_engine_startCounter > 1 && this.m_state == C_ENGINE_STATE_STARTING)
				{
					this.m_state = C_ENGINE_STATE_STOP;
					m_sndManager.stop(C_SND_ENGINE_STARTING);
					this.m_engine_startCounter = -1;
					this.setRpmZero();
				}
			}

			
	}  

	// 
	Engine.prototype.implementGameLogic = function () 
	{ 
		this.handleInputs();
		
		if (this.m_state == C_ENGINE_STATE_STARTING)
		{
			if (this.m_engine_startCounter > -1)
			{
				this.m_engine_startCounter++;
				this.setRpmStarting();

				if (this.m_engine_startCounter >= this.m_engine_maxCycles)
				{
					this.m_engine_startCounter = -1;
					this.m_state = C_ENGINE_STATE_LOW;
					
					m_sndManager.stop(C_SND_ENGINE_STARTING);	
					//m_sndManager.play(C_SND_ENGINE_STARTED);
					
					m_sndManager.setLoop(C_SND_ENGINE_0, true);
					m_sndManager.play(C_SND_ENGINE_0);

					this.setRpmLo();
				}
			}
		}


		if (this.m_state != C_ENGINE_STATE_STOP)
			this.m_button.setDown();
		else
			this.m_button.setUp();

		this.calculateRpmRowAngle();

		if (this.m_state != C_ENGINE_STATE_STOP && this.m_state != C_ENGINE_STATE_STARTING)
		{
			this.m_energyLostTimer.implementGameLogic();

			if (this.m_energyLostTimer.endReached() == true)
			{
				this.m_energyLostTimer.reset();
				this.m_energyLostTimer.start();
				this.modifyEnergy((this.m_rpm / 1000) * -1);
			}
		}
	}  


	Engine.prototype.render = function (_canvas, _context)
	{
		this.m_button.render(_canvas, _context);

		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_LEFT), C_OFFSETX_ENGINE, C_OFFSETY_ENGINE, 1);

		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_TACOMETRO), C_OFFSETX_ENGINE + 10, C_OFFSETY_ENGINE+ 2, 1);


		drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_TACOMETRO_ROW), C_OFFSETY_ENGINE + 50 + 10, C_OFFSETY_ENGINE + 50, this.m_rpmRowAngle);

		this.m_button.render(_canvas, _context);
/*
		if (this.m_state != C_ENGINE_STATE_STOP)
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENGINE_BUTTON_ON), C_OFFSETY_ENGINE + (60 - 15),  C_OFFSETY_ENGINE + 120 - 18, 1);
		if (this.m_state == C_ENGINE_STATE_STOP)
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENGINE_BUTTON_OFF),  C_OFFSETY_ENGINE + (60 - 15),  C_OFFSETY_ENGINE + 120 - 18, 1);
*/
	}

	Engine.prototype.collisionRectangle = function () 
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

	Engine.prototype.calculateRpmRowAngle = function()
	{ 
		this.m_rpmRowAngle = 120 - ((this.m_rpm / 1000) * 30);
		return this.m_rpmRowAngle;
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Engine.prototype.linkTank = function(_tank)
	{ 
		this.m_linkedTank = _tank;
	}

	Engine.prototype.isOn = function()
	{ 
		return this.m_state > C_ENGINE_STATE_STARTING;
	}

	Engine.prototype.setRpmHi = function()
	{ 
		return this.m_rpm = C_ENGINE_RPM_HI;
	}

	Engine.prototype.setRpmLo = function()
	{ 
		return this.m_rpm = C_ENGINE_RPM_LO;
	}

	Engine.prototype.setRpmStarting = function()
	{ 
		return this.m_rpm = C_ENGINE_RPM_STARTING;
	}

	Engine.prototype.setRpmZero = function()
	{ 
		return this.m_rpm = 0;
	}

	Engine.prototype.modifyEnergy = function(_value)
	{
		if (this.m_linkedTank != null)
			this.m_linkedTank.modifyEnergy(_value);
	}
}

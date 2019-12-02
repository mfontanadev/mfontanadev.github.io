// Class Hero
function Shield () 
{ 
	Shield.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_SHIELD;
		this.m_type = _type; 

		this.m_width = 100;
		this.m_height = 100;

		this.m_x = _x; 
		this.m_y = _y; 
		this.m_px = 0;
		this.m_py = 0;

		this.m_arrObj = new Array();

		this.updateCounter = 0;
		this.m_arrZoom = new Array();
		this.m_arrZoom.push(250);
		this.m_arrZoom.push(500);
		this.m_arrZoom.push(800);

		this.m_currentButtonIndex = -1;

		var indItem = null; 
		this.m_arrIndicator = new Array();
		indItem = new chRect();
		indItem.initWith(0,0,0,0);
		this.m_arrIndicator.push(indItem);

		indItem = new chRect();
		indItem.initWith(0,0,0,0);
		this.m_arrIndicator.push(indItem);

		indItem = new chRect();
		indItem.initWith(0,0,0,0);
		this.m_arrIndicator.push(indItem);

		indItem = new chRect();
		indItem.initWith(0,0,0,0);
		this.m_arrIndicator.push(indItem);

		indItem = new chRect();
		indItem.initWith(0,0,0,0);
		this.m_arrIndicator.push(indItem);

		this.m_linkedTank = null;

 		this.m_buttonr = new ChButton()
 		this.m_buttonr.initWith(0, C_OBJ_TYPE_CHBUTTON_BLUE,  C_OFFSETX_SHIELD + 35*0 + 8, C_OFFSETY_SHIELD + 120 - 20, C_KEY_NUMBER_9);

	}
	
	// 
	Shield.prototype.handleInputs = function () 
	{ 
		this.m_buttonr.handleInputs();
		
		if (this.m_buttonr.isDown() == false)
			this.m_currentButtonIndex = -1;

		//if (m_keyboardMngr.isKeyDown(C_KEY_NUMBER_9) == false && m_keyboardMngr.isKeyDown(C_KEY_NUMBER_8) == false)
		//	this.m_currentButtonIndex = -1;

		/*
		if (m_keyboardMngr.isKeyDown(C_KEY_NUMBER_6) == true && this.m_currentButtonIndex == -1)
		{
			this.pushButton(0);
			this.subIndicator();
			this.m_currentButtonIndex = 0;
			//m_keyboardMngr.disableUntilKeyUp(C_KEY_NUMBER_6);

		}
		if (m_keyboardMngr.isKeyDown(C_KEY_NUMBER_7) == true && this.m_currentButtonIndex == -1)
		{
			this.pushButton(1);
			this.addIndicator();
			this.m_currentButtonIndex = 1;
			//m_keyboardMngr.disableUntilKeyUp(C_KEY_NUMBER_7);
		}
		*/
		/*
		if (m_keyboardMngr.isKeyDown(C_KEY_NUMBER_8) == true  && this.m_currentButtonIndex == -1)
		{
			m_keyboardMngr.disableUntilKeyUp(C_KEY_NUMBER_8);
			this.modifyIndicator(-5);
			this.m_currentButtonIndex = 0;
		}*/
		if (this.m_buttonr.isDown() == true  && this.m_currentButtonIndex == -1)
		{
			//m_keyboardMngr.disableUntilKeyUp(C_KEY_NUMBER_9);
			this.modifyIndicator(5);
			this.m_currentButtonIndex = 1;
			m_sndManager.stop(C_SND_RADAR_BUTTON);
			m_sndManager.play(C_SND_RADAR_BUTTON);
		}

	}  

	// 
	Shield.prototype.implementGameLogic = function () 
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

		if (this.m_currentButtonIndex == 1) this.m_buttonr.setDown(); else this.m_buttonr.setUp();
	}  


	Shield.prototype.render = function (_canvas, _context)
	{
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_LEFT), C_OFFSETX_SHIELD, C_OFFSETY_SHIELD, 1);


		for (var i = 0; i < 5 ; i++) 
		{
			percent = this.m_arrIndicator[i].m_x1 * 0.20;
			if (this.m_arrIndicator[i].m_y1 == 0)
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_SHIELD_WOOD), C_OFFSETX_SHIELD +i * 15 + 4, C_OFFSETY_SHIELD + 5, percent);
			else if (this.m_arrIndicator[i].m_y1 == 1)
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_SHIELD_SILVER), C_OFFSETX_SHIELD + i * 15 + 4, C_OFFSETY_SHIELD + 5, percent);
			else if (this.m_arrIndicator[i].m_y1 == 2)
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_SHIELD_GOLD), C_OFFSETX_SHIELD + i * 15 + 4, C_OFFSETY_SHIELD + 5, percent);
			else if (this.m_arrIndicator[i].m_y1 == 3)
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_SHIELD_BLUE), C_OFFSETX_SHIELD + i * 15 + 4, C_OFFSETY_SHIELD + 5, percent);
		}
		
		this.m_buttonr.render(_canvas, _context);

		m_fontMngr.drawTextSmall(_canvas, _context, pad(this.indicatorValue(),4),   C_OFFSETX_SHIELD + (60 - 16), C_OFFSETY_SHIELD + 70, rgbToColor(16,16,16));
		
		
		/*
		if (this.m_currentButtonIndex == 0)
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_BUTTON_GREEN_ON), C_OFFSETX_SHIELD + 35*0 + 8, C_OFFSETY_SHIELD + 120 - 20, 1);
		else
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_BUTTON_GREEN_OFF), C_OFFSETX_SHIELD + 35*0 + 8, C_OFFSETY_SHIELD + 120 - 20, 1);

		if (this.m_currentButtonIndex == 1)
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_BUTTON_GREEN_ON),C_OFFSETX_SHIELD +120 - 30 - 8, C_OFFSETY_SHIELD + 120 - 20, 1);
		else
			drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_BUTTON_GREEN_OFF),C_OFFSETX_SHIELD +120 - 30 - 8, C_OFFSETY_SHIELD + 120 - 20, 1);
		*/
	}

	Shield.prototype.collisionRectangle = function () 
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
	Shield.prototype.isOn = function()
	{ 
		return this.m_state > C_Shield_STATE_STARTING;
	}

	Shield.prototype.linkTank = function(_tank)
	{ 
		this.m_linkedTank = _tank;
	}

	Shield.prototype.pushButton = function(_index)
	{ 
		if (this.m_currentButtonIndex != _index)
		{
			this.m_currentButtonIndex = _index;
			//m_sndManager.stop(C_SND_Shield_BUTTON);
			//m_sndManager.play(C_SND_Shield_BUTTON);
			this.update();
		}
	}

	Shield.prototype.modifyIndicator = function(_value)
	{ 
		var count = Math.abs(_value);
		
		var prevValue = this.indicatorValue();
		if (_value > 0)
		{
			for (var i = 0; i < count; i++) 
				this.addIndicator();
		}
		else	
		{
			for (var i = 0; i < count; i++) 
				this.subIndicator();
		}

		if (this.indicatorValue() != prevValue && this.m_linkedTank != null && _value > 0)
			this.m_linkedTank.modifyEnergy(_value * -3);
	}

	Shield.prototype.addIndicator = function()
	{ 
		if (this.m_arrIndicator[0].m_x1 < 5)
		{
			this.m_arrIndicator[0].m_x1 = this.m_arrIndicator[0].m_x1 + 1;
		}
		else
		{
			if (this.m_arrIndicator[1].m_x1 < 5)
			{
				this.m_arrIndicator[1].m_x1 = this.m_arrIndicator[1].m_x1 + 1;
			}
			else
			{
				if (this.m_arrIndicator[2].m_x1 < 5)
				{
					this.m_arrIndicator[2].m_x1 = this.m_arrIndicator[2].m_x1 + 1;
				}
				else
				{
					if (this.m_arrIndicator[3].m_x1 < 5)
					{
						this.m_arrIndicator[3].m_x1 = this.m_arrIndicator[3].m_x1 + 1;
					}
					else
					{
						if (this.m_arrIndicator[4].m_x1 < 5)
						{
							this.m_arrIndicator[4].m_x1 = this.m_arrIndicator[4].m_x1 + 1;
						}
						else
						{
							if (this.m_arrIndicator[0].m_y1 < 3)
							{
								this.m_arrIndicator[0].m_x1 = 1;
								this.m_arrIndicator[1].m_x1 = 0;
								this.m_arrIndicator[2].m_x1 = 0;
								this.m_arrIndicator[3].m_x1 = 0;
								this.m_arrIndicator[4].m_x1 = 0;

								this.m_arrIndicator[0].m_y1 = this.m_arrIndicator[0].m_y1 + 1;
								this.m_arrIndicator[1].m_y1 = this.m_arrIndicator[0].m_y1;
								this.m_arrIndicator[2].m_y1 = this.m_arrIndicator[0].m_y1;
								this.m_arrIndicator[3].m_y1 = this.m_arrIndicator[0].m_y1;
								this.m_arrIndicator[4].m_y1 = this.m_arrIndicator[0].m_y1;
							}
						}
					}
				}
			}
		}	

		//msglog(this.indicatorValue());		 
	}

	Shield.prototype.subIndicator = function()
	{ 
		if (this.m_arrIndicator[4].m_x1 > 0)
		{
			this.m_arrIndicator[4].m_x1 = this.m_arrIndicator[4].m_x1 - 1;
		}
		else
		{
			if (this.m_arrIndicator[3].m_x1 > 0)
			{
				this.m_arrIndicator[3].m_x1 = this.m_arrIndicator[3].m_x1 - 1;
			}
			else
			{
				if (this.m_arrIndicator[2].m_x1 > 0)
				{
					this.m_arrIndicator[2].m_x1 = this.m_arrIndicator[2].m_x1 - 1;
				}
				else
				{
					if (this.m_arrIndicator[1].m_x1 > 0)
					{
						this.m_arrIndicator[1].m_x1 = this.m_arrIndicator[1].m_x1 - 1;
					}
					else
					{
						if (this.m_arrIndicator[0].m_x1 > 0)
						{
							this.m_arrIndicator[0].m_x1 = this.m_arrIndicator[0].m_x1 - 1;
						}
						else
						{
							if (this.m_arrIndicator[0].m_y1 > 0)
							{
								this.m_arrIndicator[0].m_x1 = 5;
								this.m_arrIndicator[1].m_x1 = 5;
								this.m_arrIndicator[2].m_x1 = 5;
								this.m_arrIndicator[3].m_x1 = 5;
								this.m_arrIndicator[4].m_x1 = 5;

								this.m_arrIndicator[0].m_y1 = this.m_arrIndicator[0].m_y1 - 1;
								this.m_arrIndicator[1].m_y1 = this.m_arrIndicator[0].m_y1;
								this.m_arrIndicator[2].m_y1 = this.m_arrIndicator[0].m_y1;
								this.m_arrIndicator[3].m_y1 = this.m_arrIndicator[0].m_y1;
								this.m_arrIndicator[4].m_y1 = this.m_arrIndicator[0].m_y1;
							}
						}
					}
				}
			}
		}	

		msglog(this.indicatorValue());		 
	}

	Shield.prototype.indicatorValue = function()
	{
		return (this.m_arrIndicator[0].m_y1 * 25) + this.m_arrIndicator[0].m_x1 + this.m_arrIndicator[1].m_x1 + this.m_arrIndicator[2].m_x1 + this.m_arrIndicator[3].m_x1 + this.m_arrIndicator[4].m_x1;
	}

	Shield.prototype.linkTank = function(_tank)
	{ 
		this.m_linkedTank = _tank;
	}

}



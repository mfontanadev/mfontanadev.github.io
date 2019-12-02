// Class ChButton
function ChButton () 
{ 
	ChButton.prototype.initWith = function (_id, _type, _x, _y, _key)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_CHBUTTON;
		this.m_type = _type; 

		this.m_x = _x; 
		this.m_y = _y; 
		
		this.m_rc = new chRect();
		
		this.m_px = _x;
		this.m_py = _y;

		this.m_key = _key;
		this.m_down = false;
	}
	
		// 
	ChButton.prototype.handleInputs = function () 
	{ 
		this.m_down = false;

		if (m_mouseClick == true && collisionPointScaledRect(m_mousePosX , m_mousePosY,m_scaleX, m_scaleY, this.collisionRectangle()))
		{
			this.m_down = true;
		}
		else
		{
			this.m_down = m_keyboardMngr.isKeyDown(this.m_key);
		}
	}  

	// 
	ChButton.prototype.implementGameLogic = function () 
	{ 

	}  

	
	ChButton.prototype.render = function (_canvas, _context)
	{
		if (this.m_down == true)
		{
			switch(this.m_type)
			{
				case C_OBJ_TYPE_CHBUTTON_BLUE:
					drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENGINE_BUTTON_ON), this.m_px, this.m_py, 1);
					break;
			
				case C_OBJ_TYPE_CHBUTTON_GREEN:
					drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_BUTTON_GREEN_ON), this.m_px, this.m_py, 1);
					break;
			}
		}
		else
		{
			switch(this.m_type)
			{
				case C_OBJ_TYPE_CHBUTTON_BLUE:
					drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ENGINE_BUTTON_OFF), this.m_px, this.m_py, 1);
					break;
			
				case C_OBJ_TYPE_CHBUTTON_GREEN:
					drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_BUTTON_GREEN_OFF), this.m_px, this.m_py, 1);
					break;
			}
		}			
	}

	ChButton.prototype.collisionRectangle = function () 
	{
		this.m_rc.m_x1 = this.m_px;
		this.m_rc.m_y1 = this.m_py;
		this.m_rc.m_x2 = this.m_px + 30;
		this.m_rc.m_y2 = this.m_py + 18;
		
		return this.m_rc;
	}

	ChButton.prototype.fLog = function () 
	{ 
		var logText = "ChButton: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ";"; 

		return logText;
	}  

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------

	// The ChButton was hitted 
	ChButton.prototype.isDown = function ()
	{ 
		return this.m_down == true;
	}

	ChButton.prototype.setDown = function ()
	{ 
		return this.m_down = true;
	}

	ChButton.prototype.setUp = function ()
	{ 
		return this.m_down = false;
	}
}

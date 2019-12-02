// Class ViewHelp
function ViewHelp () 
{ 
	ViewHelp.prototype.initWith = function ()
	{
		this.m_midX = m_canvas.width / 2;
		this.m_menuItemSelected = 0;
	}
	
	// 
	ViewHelp.prototype.handleInputs = function () 
	{ 
		if (m_keyboardMngr.isKeyDown(C_BUTTON_B_KEY) == true || m_keyboardMngr.isKeyDown(C_KEY_RETURN) == true)
		{
			if (this.m_menuItemSelected == C_MAIN_MENU_ITEM_PLAY)
				btnIntro();
		}

		if (m_keyboardMngr.isKeyDown(C_BUTTON_RIGHT_KEY) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_BUTTON_RIGHT_KEY);
			C_LOG = !C_LOG;
		}

	}  

	// 
	ViewHelp.prototype.implementGameLogic = function () 
	{ 
	}  

	ViewHelp.prototype.render = function (_canvas, _context)
	{
		offsetX = (28 * 16) / 2;
		m_fontMngr.drawText(m_canvas, m_context, 'SHAREWARE VERSION, FIRST LEVEL ONLY', this.m_midX - offsetX, 24 * 0, rgbToColor(128,0,0));

		m_fontMngr.drawText(m_canvas, m_context, 'OBJECTIVE: KEEP PLANET GREEN',	 	this.m_midX - offsetX, 24 * 2, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '1-CONVERT POLLUTION FACTORIES', 	 	this.m_midX - offsetX, 24 * 3, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '  INTO GREEN.',   					this.m_midX - offsetX, 24 * 4 , rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '2-SAVE AS MUCH ENERGY AS YOU CAN',   	this.m_midX - offsetX, 24 * 5 , rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '  AND GET NEW EQUIPMENT.',   			this.m_midX - offsetX, 24 * 6 , rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '3-USE MODIFIED TANK WITH MAGNETIC',  	this.m_midX - offsetX, 24 * 7 , rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '  CANNON TO STOP THEM.',				this.m_midX - offsetX, 24 * 8 , rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '4-THEY TRY TO STOP YOU USING,',  		this.m_midX - offsetX, 24 * 9 , rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '  THEIR CANNONS.', 					this.m_midX - offsetX, 24 * 10 , rgbToColor(16,16,16));


		m_fontMngr.drawText(m_canvas, m_context, 'BACK', this.m_midX - (20 * 2), 300 , rgbToColor(16,16,16));
	
		row = this.m_menuItemSelected;
		m_fontMngr.drawText(m_canvas, m_context, '**', this.m_midX - 32-64, 300 + row * 24, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, '**', this.m_midX - 00+64, 300 + row * 24, rgbToColor(16,16,16));
	}

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------

	// ------------------------------------------
	// User actions
	// ------------------------------------------
}

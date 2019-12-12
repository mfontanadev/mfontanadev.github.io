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
		if (m_keyboardMngr.isKeyDown(C_BUTTON_A_KEY) == true || m_keyboardMngr.isKeyDown(C_KEY_RETURN) == true)
		{
			if (this.m_menuItemSelected == C_MAIN_MENU_ITEM_PLAY)
				btnIntro();
		}
	}  

	// 
	ViewHelp.prototype.implementGameLogic = function () 
	{ 
	}  

	ViewHelp.prototype.render = function (_canvas, _context)
	{
		offsetX = (28 * 16) / 2;
		m_fontMngr.drawText(m_canvas, m_context, 'BETA VERSION, ONE LEVEL ONLY', this.m_midX - offsetX, 24 * 0, rgbToColor(128,0,0));

		m_fontMngr.drawText(m_canvas, m_context, 'HERO:', 						 this.m_midX - offsetX, 24 * 2, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'UP,DOWW,LEFT,RIGHT = MOVE', 	 this.m_midX - offsetX, 24 * 3, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'K                  = PROTECT', this.m_midX - offsetX, 24 * 4, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'L                  = PUNCH',   this.m_midX - offsetX, 24 * 5, rgbToColor(16,16,16));

		m_fontMngr.drawText(m_canvas, m_context, 'ENEMIES?: YES, YOU CAN, ENJOY',this.m_midX - offsetX, 24 * 7, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'W,S,A,D            = MOVE', 	 this.m_midX - offsetX, 24 * 8, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'F                  = PROTECT', this.m_midX - offsetX, 24 * 9, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'G                  = PUNCH',   this.m_midX - offsetX, 24 *10, rgbToColor(16,16,16));

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

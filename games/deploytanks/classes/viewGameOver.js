// Class ViewHelp
function ViewGameOver () 
{ 
	ViewGameOver.prototype.initWith = function (_viewState)
	{
		this.m_midX = m_canvas.width / 2;
		this.m_menuItemSelected = 0;
		this.m_viewState = _viewState;
	}
	
	// 
	ViewGameOver.prototype.handleInputs = function () 
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
	ViewGameOver.prototype.implementGameLogic = function () 
	{ 
	}  

	ViewGameOver.prototype.render = function (_canvas, _context)
	{
		offsetX = (30 * 16) / 2;

		if (this.m_viewState == C_STATE_VIEW_GAMEOVER_WIN)
		{
			m_fontMngr.drawText(m_canvas, m_context, 'GOOD JOB, YOU STOPED POLLUTION',	 	this.m_midX - offsetX, 24 * 2, rgbToColor(0,128,0));
			m_fontMngr.drawText(m_canvas, m_context, '    YOU HAVE DESTROYED ALL    ', 	 	this.m_midX - offsetX, 24 * 3, rgbToColor(16,16,16));
			m_fontMngr.drawText(m_canvas, m_context, '     POLLUTION FACTORIES      ',   					this.m_midX - offsetX, 24 * 4 , rgbToColor(16,16,16));

			m_fontMngr.drawText(m_canvas, m_context, 'BACK', this.m_midX - (20 * 2), 300 , rgbToColor(16,16,16));
		}
		else
		{
			m_fontMngr.drawText(m_canvas, m_context, 'BAD JOB YOU HAVE NO MORE ENERGY',	 	this.m_midX - offsetX, 24 * 2, rgbToColor(128,0,0));
			m_fontMngr.drawText(m_canvas, m_context, '                               ', 	this.m_midX - offsetX, 24 * 3, rgbToColor(128,0,0));
			m_fontMngr.drawText(m_canvas, m_context, '         KEEP TRINING          ',		this.m_midX - offsetX, 24 * 4 , rgbToColor(128,0,0));

			m_fontMngr.drawText(m_canvas, m_context, 'BACK', this.m_midX - (20 * 2), 300 , rgbToColor(16,16,16));
		}
	
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

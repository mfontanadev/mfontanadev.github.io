// Class ViewIntro
function ViewIntro () 
{ 
	ViewIntro.prototype.initWith = function ()
	{
		//m_maze.loadLevel(0);
		//m_maze.start();
		
		this.m_midX = m_canvas.width / 2;
		this.m_menuItemSelected = 0;
	}
	
	// 
	ViewIntro.prototype.handleInputs = function () 
	{ 
			if (m_keyboardMngr.isKeyDown(C_BUTTON_UP_KEY) == true)
			{
				if (this.m_menuItemSelected > 0)
					this.m_menuItemSelected--;
				m_keyboardMngr.disableUntilKeyUp(C_BUTTON_UP_KEY);
			}
			if (m_keyboardMngr.isKeyDown(C_BUTTON_DOWN_KEY) == true)
			{
				if (this.m_menuItemSelected < C_MAIN_MENU_ITEM_EXIT)
					this.m_menuItemSelected++;
				m_keyboardMngr.disableUntilKeyUp(C_BUTTON_DOWN_KEY);
			}
			if (m_keyboardMngr.isKeyDown(C_BUTTON_A_KEY) == true || m_keyboardMngr.isKeyDown(C_KEY_RETURN) == true)
			{
				m_keyboardMngr.disableUntilKeyUp(C_KEY_RETURN);
				m_keyboardMngr.disableUntilKeyUp(C_BUTTON_A_KEY);
				
				
				if (this.m_menuItemSelected == C_MAIN_MENU_ITEM_PLAY)
					btnPlay();
				
				if (this.m_menuItemSelected == C_MAIN_MENU_ITEM_HELP)
					btnHelp();
				
				if (this.m_menuItemSelected ==  C_MAIN_MENU_ITEM_EXIT)
					btnCredits();
			}
	}  

	// 
	ViewIntro.prototype.implementGameLogic = function () 
	{ 
		
		//m_maze.implementGameLogic();

		/*
		// Find player position, view if player is over PLAY, HELP or EXIT.
		var heroId = m_maze.findIndexFromObject(C_CLASS_PLAYER, 0, false);
		
		if (heroId != -1)
		{
			//var x_hero =  m_maze.m_arrObj[heroId].m_x / C_CELL_WIDTH;
			//var y_hero =  m_maze.m_arrObj[heroId].m_y / C_CELL_HEIGHT;
			//play=9.5 , 9.5
			//help: 10.5, 5.5
			//exit: 9.5 , 11.5
			
			if (x_hero == 9.5 && y_hero == 9.5)
				btnLevel1();
			if (x_hero == 5.5 && y_hero == 10.5)
				btnLevelHelp();
		}*/
	}  

	ViewIntro.prototype.render = function (_canvas, _context)
	{
		drawImage_wh(m_canvas, m_context, m_resourceMngr.getImage(C_IMG_MAIN_MENU), this.m_midX - 256,10);
		m_fontMngr.drawText(m_canvas, m_context, 'PLAY', this.m_midX - 32, 300 + 00, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'HELP', this.m_midX - 32, 300 + 24, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'CREDITS', this.m_midX - 32 - 24, 300 + 48, rgbToColor(16,16,16));

		m_fontMngr.drawText(m_canvas, m_context, 'USE ARROWS AND ENTER', this.m_midX - (20 * 8), 300 + 24*4, rgbToColor(16,16,16));
		m_fontMngr.drawText(m_canvas, m_context, 'TOUCH CENTER 3 TIMES', this.m_midX - (20 * 8), 300 + 24*5, rgbToColor(16,16,16));
	
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

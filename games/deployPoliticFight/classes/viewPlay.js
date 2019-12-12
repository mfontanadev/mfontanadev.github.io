// Class ViewPlay
function ViewPlay () 
{ 
	ViewPlay.prototype.initWith = function (_maze)
	{
		//m_maze.loadLevel(1);
		//m_maze.start();
	}

	ViewPlay.prototype.initWithReset = function (_maze)
	{
		this.m_score = 0;
	}
	
	// 
	ViewPlay.prototype.handleInputs = function () 
	{
		if (m_keyboardMngr.isKeyDown( C_KEY_NUMBER_1) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_KEY_NUMBER_1);
			m_maze.addPlayerOne(true);
		}

		if (m_keyboardMngr.isKeyDown( C_KEY_NUMBER_2) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_KEY_NUMBER_2);
			m_maze.addPlayerTwo(true);
		}

	}  

	// 
	ViewPlay.prototype.implementGameLogic = function () 
	{ 
		m_maze.implementGameLogic();
		m_score.implementGameLogic();
	}  

	ViewPlay.prototype.render = function (_canvas, _context)
	{
		m_maze.render(_canvas, _context);
		m_score.render(_canvas, _context);
	}

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------

	// ------------------------------------------
	// User actions
	// ------------------------------------------
}

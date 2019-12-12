// Class ViewLevel
function ViewLevel () 
{ 
	ViewLevel.prototype.initWith = function ()
	{
	}
	
	// 
	ViewLevel.prototype.handleInputs = function () 
	{ 
		
	}  

	// 
	ViewLevel.prototype.implementGameLogic = function () 
	{ 
		m_maze.implementGameLogic();
	}  

	ViewLevel.prototype.render = function (_canvas, _context)
	{
		m_maze.render(_canvas, _context);
	}

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------

	// ------------------------------------------
	// User actions
	// ------------------------------------------
}

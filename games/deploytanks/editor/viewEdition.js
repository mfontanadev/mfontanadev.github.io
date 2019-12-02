// Class ViewEdition
function ViewEdition () 
{ 
	ViewEdition.prototype.initWith = function (_maze)
	{
	}

	ViewEdition.prototype.initWithReset = function (_maze)
	{
	}
	
	// 
	ViewEdition.prototype.handleInputs = function () 
	{ 
		
		m_editor.handleInputs();
	}  

	// 
	ViewEdition.prototype.implementGameLogic = function () 
	{ 
		m_editor.implementGameLogic();
		//m_score.implementGameLogic();
	}  

	ViewEdition.prototype.render = function (_canvas, _context)
	{
		m_editor.render(_canvas, _context);
		//m_score.render(_canvas, _context);
	}

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------

	// ------------------------------------------
	// User actions
	// ------------------------------------------
}

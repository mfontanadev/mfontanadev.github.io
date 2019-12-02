// Class Editor
function Editor () 
{ 
	Editor.prototype.initWith = function ()
	{
		this.m_arrObj = new Array();

		this.m_selectedResourceId = -1;
		this.m_offsetX = 0;
		this.m_offsetY = 0;
	}
	
	// 
	Editor.prototype.handleInputs = function () 
	{ 
	}  

	// 
	Editor.prototype.implementGameLogic = function () 
	{ 
		this.handleInputs();
	}  

	Editor.prototype.render = function (_canvas, _context)
	{
	/*
		var color = rgbaToColor(255, 0, 0 , 1);

		var px = this.m_x - (C_CELL_WIDTH >> 1);
		var py = this.m_y - (C_CELL_HEIGHT >> 1);

		if (this.m_tPercent == 0)
			drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_SMOG_CAR_GREEN), this.m_x, this.m_y, this.m_rotationAngle);
		else
			drawImageRotation(_canvas, _context, m_resourceMngr.getImage(C_IMG_SMOG_CAR), this.m_x, this.m_y, this.m_rotationAngle);
		*/
		
		// Render toolbox
		
		
	}

	Editor.prototype.collisionRectangle = function () 
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

	Editor.prototype.fLog = function () 
	{ 
		var logText = "Brick: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ", " + 
		"m_direction=" + this.m_direction + ";";
		
		return logText;
	}  
	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Editor.prototype.moveLogic = function ()
	{ 
	}

	// 
	Editor.prototype.addResourceId = function (_x, _y, _id) 
	{ 
		
		this.m_arrObj.push(_id);
	}  
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
}

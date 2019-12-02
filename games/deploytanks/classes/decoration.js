// Class Decoration
function Decoration () 
{ 
	Decoration.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_DECORATION;
		this.m_type = _type; 

		this.m_x = _x; 
		this.m_y = _y; 
		
		this.m_rc = new chRect();
		
		this.m_px = 0;
		this.m_py = 0;
	}
	
	// 
	Decoration.prototype.implementGameLogic = function () 
	{ 
		this.updateCoordinates();
	}  

	Decoration.prototype.updateCoordinates = function ()
	{
		//this.m_px = C_OFFSET_X_PLAY_AREA + (this.m_x * C_CELL_WIDTH) - m_maze.m_lev.m_offsetX;
		//this.m_py = C_OFFSET_Y_PLAY_AREA - (this.m_y * C_CELL_HEIGHT) - m_maze.m_lev.m_offsetY;
		this.m_px = C_OFFSET_X_PLAY_AREA + (this.m_x * 1) - m_maze.m_lev.m_offsetX;
		this.m_py = C_OFFSET_Y_PLAY_AREA - (this.m_y * 1) - m_maze.m_lev.m_offsetY;
	}
	
	Decoration.prototype.render = function (_canvas, _context)
	{
		if (m_maze.m_lev.mustBeRendered(this.m_x + (C_CELL_WIDTH*2.5), this.m_y - (C_CELL_HEIGHT*2.5)) == false)
			return;
			
		switch(this.m_type)
		{
			case C_OBJ_TYPE_GREEN:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_GREEN), this.m_px, this.m_py, 1);
				break;
			
			case C_OBJ_TYPE_I:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_I), this.m_px, this.m_py, 1);
				break;

			case C_OBJ_TYPE_II:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_II), this.m_px, this.m_py, 1);
				break;

			case C_OBJ_TYPE_III:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_III), this.m_px, this.m_py, 1);
				break;

			case C_OBJ_TYPE_IIII:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_IIII), this.m_px, this.m_py, 1);
				break;

			case C_OBJ_TYPE_H:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_H), this.m_px, this.m_py, 1);
				break;
			
			case C_OBJ_TYPE_V:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_V), this.m_px, this.m_py, 1);
				break;

			case C_OBJ_TYPE_X:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_ROAD_X), this.m_px, this.m_py, 1);
				break;

			case C_OBJ_GREEN_FAR:
				drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_GREEN_FAR), this.m_px, this.m_py, 1);
				break;
		}			
		
		if (C_RENDER_COLLISION_RECT == true)
			renderCollitionRectangle(_canvas, _context, this.collisionRectangle(), "yellow");
	}

	Decoration.prototype.collisionRectangle = function () 
	{
		this.m_rc.m_x1 = this.m_px;
		this.m_rc.m_y1 = this.m_py;
		this.m_rc.m_x2 = this.m_px + C_CELL_WIDTH*5;
		this.m_rc.m_y2 = this.m_py + C_CELL_HEIGHT*5;
		
		return this.m_rc;
	}

	Decoration.prototype.fLog = function () 
	{ 
		var logText = "Decoration: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ";"; 

		return logText;
	}  

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Decoration.prototype.move = function (_canvas, _context)
	{ 
	}
	
	Decoration.prototype.mustBeDeleted = function()
	{
		var bResult = false;
		return bResult;
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Decoration.prototype.dissolve = function (_power)
	{ 
	}

	// The Decoration was hitted 
	Decoration.prototype.beaten = function ()
	{ 
	}
}

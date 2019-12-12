// Class Decoration
function Decoration () 
{ 
	Decoration.prototype.initWith = function (_id, _type, _imgResourceId, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_DECORATION;
		this.m_type = _type;
		this.m_imgResourceId = _imgResourceId; 

		this.m_x = _x; 
		this.m_y = _y; 
		
		this.m_rc = new chRect();
	}

	// 
	Decoration.prototype.implementGameLogic = function () 
	{ 
	}  

	Decoration.prototype.renderOffset = function (_canvas, _context)
	{
		var px = this.m_x;
		var py = this.m_y;
		
		drawImage_offset(_canvas, _context, m_resourceMngr.getImage(this.m_imgResourceId), px , py, m_maze.m_lev.m_offsetX, 0);
	}

	Decoration.prototype.render = function (_canvas, _context)
	{
		var px = this.m_x;
		var py = this.m_y;
		
		// Obtener el minimo
		var w = chMin(_canvas.width / 2, m_resourceMngr.getImage(this.m_imgResourceId).width);
		var h = chMin(_canvas.height / 2, m_resourceMngr.getImage(this.m_imgResourceId).height);
		
		_context.drawImage(m_resourceMngr.getImage(this.m_imgResourceId), px+m_maze.m_lev.m_offsetX, py+0, w, h, 0, 0, w * 2, h * 2);
	}

	Decoration.prototype.collisionRectangle = function () 
	{
		var px = this.m_x * C_CELL_WIDTH;
		var py = this.m_y * C_CELL_WIDTH;
		
		this.m_rc.m_x1 = px;
		this.m_rc.m_y1 = py;
		this.m_rc.m_x2 = px + C_CELL_WIDTH;
		this.m_rc.m_y2 = py + C_CELL_WIDTH;
		
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

	Decoration.prototype.getWidth = function ()
	{ 
		return m_resourceMngr.getImage(this.m_imgResourceId).width;
	}

	Decoration.prototype.getHeight = function ()
	{ 
		return m_resourceMngr.getImage(this.m_imgResourceId).height;
	}
	
	
}

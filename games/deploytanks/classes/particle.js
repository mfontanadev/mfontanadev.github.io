// Class Particle
function Particle () 
{ 
	Particle.prototype.initWith = function (_id, _m_rad, _x, _y, _offX, _offY, _dirX, _dirY, _color, _ratio)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_PARTICLE;
		this.m_type = C_OBJ_TYPE_NONE;
		
		this.m_rad = _m_rad; 
		this.m_x = _x; 
		this.m_y = _y; 
		this.offX = _offX; 
		this.offY = _offY; 
		this.m_dirX = _dirX; 
		this.m_dirY = _dirY; 

		this.color = _color;
		this.ratio = _ratio; 
		
		this.m_point = new chPoint();
		this.m_point.initWith(0,0,0,0);
		
		this.m_rc = new chRect();
		
		this.m_rcH = new chRect();
		this.m_rcV = new chRect();

		this.m_px = 0;
		this.m_py = 0;
	}

	Particle.prototype.handleInputs = function () 
	{ 
	}
	
	Particle.prototype.implementGameLogic = function () 
	{
		this.move(m_canvas, m_context);
		this.dissolve(C_PARTICLE_NATURAL_DISSOLVE);
	}
	
	Particle.prototype.render = function (_canvas, _context)
	{
		var px = C_OFFSET_X_PLAY_AREA + this.m_x;
		var py = C_OFFSET_Y_PLAY_AREA - this.m_y;
		
		renderCircle(m_canvas, m_context, px, py, this.m_rad , this.color);
	}

	Particle.prototype.collisionRectangle = function () 
	{
		var midRad = this.m_rad;
		
		this.m_rc.m_x1 = this.m_x - midRad;
		this.m_rc.m_y1 = this.m_y - midRad;
		this.m_rc.m_x2 = this.m_x + midRad;
		this.m_rc.m_y2 = this.m_y + midRad;
	
		return this.m_rc; 
	}

	Particle.prototype.collisionRectangleH = function () 
	{
		var tmpR = this.collisionRectangle();
		
		this.m_rcH.m_x1 = tmpR.m_x1 + this.m_dirX;
		this.m_rcH.m_y1 = tmpR.m_y1;
		this.m_rcH.m_x2 = tmpR.m_x2 + this.m_dirX;
		this.m_rcH.m_y2 = tmpR.m_y2;
	
		return this.m_rcH; 
	}

	Particle.prototype.collisionRectangleV = function () 
	{
		var tmpR = this.collisionRectangle();
		
		this.m_rcV.m_x1 = tmpR.m_x1;
		this.m_rcV.m_y1 = tmpR.m_y1 + this.m_dirY;
		this.m_rcV.m_x2 = tmpR.m_x2;
		this.m_rcV.m_y2 = tmpR.m_y2 + this.m_dirY;
	
		return this.m_rcV; 
	}

	
	Particle.prototype.fLog = function () 
	{ 
		var logText = "Particle: " +
		"m_rad=" + this.m_rad + ", " +
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ", " + 
		"offX=" + this.offX + ", " + 
		"offY=" + this.offY + ", " + 
		"dirX=" + this.m_dirX + ", " + 
		"dirY=" + this.m_dirY + ", " + 
		"color=" + this.color + ", " + 
		"ratio=" + this.ratio + ";";
		
		return logText;
	}  

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Particle.prototype.move = function (_canvas, _context) 
	{ 
		if (this.m_x  + this.m_dirX >= _canvas.width)
			this.m_dirX = Math.abs(this.m_dirX) * -1;

		if (this.m_y + this.m_dirY >= _canvas.height)
			this.m_dirY = Math.abs(this.m_dirY) * -1;

		if (this.m_x + this.m_dirX <= 0)
			this.m_dirX = Math.abs(this.m_dirX);

		if (this.m_y + this.m_dirY <= 0)
			this.m_dirY = Math.abs(this.m_dirY);

		
		var idBrickH = m_maze.detectCollitionByClassInvType(C_CLASS_BRICK, C_OBJ_TYPE_GENERATOR, this.collisionRectangleH());
		var idBrickV = m_maze.detectCollitionByClassInvType(C_CLASS_BRICK, C_OBJ_TYPE_GENERATOR, this.collisionRectangleV());
	
		// Collition with brick, dissolve brick and me.
		var idObj = -1;
		if (idBrickH != -1 && idBrickH != -2)
			idObj = idBrickH;
		if (idBrickV != -1  && idBrickV != -2)
			idObj = idBrickV;

		if (idObj != -1  && idObj != -2)
		{
			if (m_maze.m_arrObj[idObj].m_type != C_OBJ_TYPE_GENERATOR)
			{
				m_maze.m_arrObj[idObj].beaten();
				this.dissolve(1);
			}
		}

		// Colliton player, dissolve player an particle.
		var idObj = m_maze.detectCollitionByClass(C_CLASS_PLAYER, this.collisionRectangle());
		if (idObj != -1 && idObj != -2)
		{
			m_maze.m_arrObj[idObj].dissolve(1);
			this.dissolve(5);
		}
			
		// Colliton with fire, dissolve fire and me.
		idObj = m_maze.detectCollitionByClass(C_CLASS_FIRE, this.collisionRectangle());

		if (idObj != -1 && idObj != -2)
		{
			m_maze.m_arrObj[idObj].dissolve(5);
			this.dissolve(1);
		}

		// Change direction.
		if (idBrickH != -1 && idBrickH != -2)
			this.m_dirX = this.m_dirX * -1;
		else
			this.m_x = this.m_x + this.m_dirX;
		
		if (idBrickV != -1 && idBrickV != -2)
			this.m_dirY = this.m_dirY * -1;
		else
			this.m_y = this.m_y + this.m_dirY;		

	}

	Particle.prototype.mustBeDeleted = function()
	{
		var bResult = false;
		
		bResult = (this.m_rad < C_MIN_DESTRUCTION_SIZE);

		return bResult;
	}	
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Particle.prototype.dissolve = function(_disolvePrower)
	{ 
		this.m_rad = this.m_rad - _disolvePrower;
		
		if (this.m_rad <= C_MIN_DESTRUCTION_SIZE)
			this.m_rad = C_MIN_DESTRUCTION_SIZE - 1;
	}
}

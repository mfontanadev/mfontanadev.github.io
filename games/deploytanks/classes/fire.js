// Class Fire
function Fire () 
{ 
	Fire.prototype.initWith = function (_id, _x, _y, _dirX, _dirY, _parentClass)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_FIRE;
		this.m_type = C_OBJ_TYPE_NONE;
		
		this.m_x = _x; 
		this.m_y = _y; 
		
		// Set the max quantity steps.
		this.m_steps = C_FIRE_MAX_STEPS;
	
		this.m_rad = 4;
		
		this.m_dirX = _dirX; 
		this.m_dirY = _dirY; 
		
		//this.setDir(_dir);
		
		this.color = rgbaToColor(255, 0, 0, 0.95);
		
		this.m_point = new chPoint();
		this.m_point.initWith(0,0,0,0);

		this.m_disolvePower = 0;
		this.m_range = 100;
		
		this.m_power = 100;
		this.m_state = C_STATE_ALIVE;

		this.m_rc = new chRect();
		
		this.m_px = 0;
		this.m_py = 0;

		this.m_parentClass = _parentClass;
		this.m_energy = 0;
	}
	
	Fire.prototype.handleInputs = function () 
	{ 
	}
	
	Fire.prototype.implementGameLogic = function () 
	{ 
		this.updateCoordinates();
			
		if (this.m_state != C_STATE_TAGGED_TO_DELETE)
		{
			if (this.m_steps > 0)
				this.move();

			if (this.m_state == C_STATE_BRICK_COLLITION)
			{
				this.dissolve(C_FIRE_DISSOLVING_POWER);
			}
			else
			{
				this.dissolve(this.m_disolvePower);
			}

			this.updatePower();
		}
	} 
	
	Fire.prototype.updateCoordinates = function ()
	{
		this.m_px = C_OFFSET_X_PLAY_AREA + this.m_x - m_maze.m_lev.m_offsetX;
		this.m_py = C_OFFSET_Y_PLAY_AREA - this.m_y - m_maze.m_lev.m_offsetY;
	}
	
	Fire.prototype.render = function (_canvas, _context)
	{
		percent = this.m_power / 100;
		renderCircleTransparent(m_canvas, m_context, this.m_px, this.m_py, this.m_rad , this.color, percent);
	}

	Fire.prototype.collisionRectangle = function () 
	{
		var midRad = this.m_rad >> 1;
		
		this.m_rc.m_x1 = this.m_x - midRad;
		this.m_rc.m_y1 = this.m_y - midRad;
		this.m_rc.m_x2 = this.m_x + midRad;
		this.m_rc.m_y2 = this.m_y + midRad;

		//msglog("colrect x1,y1-x2,y2: " + this.m_rc.m_x1.toString() + "," + this.m_rc.m_y1.toString() +"," + this.m_rc.m_x2.toString() + "," + this.m_rc.m_y2.toString());
	
		return this.m_rc; 
	}
	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Fire.prototype.updatePower = function ()
	{
		this.m_px = C_OFFSET_X_PLAY_AREA + this.m_x - m_maze.m_lev.m_offsetX;
		this.m_py = C_OFFSET_Y_PLAY_AREA - this.m_y - m_maze.m_lev.m_offsetY;
	}

	Fire.prototype.move = function () 
	{ 
		this.m_steps = this.m_steps + 1; 
		
		this.m_x = this.m_x + this.m_dirX;
		this.m_y = this.m_y + this.m_dirY;
		this.updateCoordinates();

		var idBrick = -1; 

		if (this.m_parentClass == C_CLASS_ENEMY)
			idBrick = m_maze.detectCollitionByClass(C_CLASS_PLAYER, this.collisionRectangle());
		if (this.m_parentClass == C_CLASS_PLAYER)
			idBrick = m_maze.detectCollitionByClass(C_CLASS_ENEMY, this.collisionRectangle());
		
		if (idBrick != -2 && idBrick != -1)
		{
			this.die();
			m_maze.m_arrObj[idBrick].hitted( this.m_power/100 * this.m_energy);
		}
	}	

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Fire.prototype.dissolve = function(_disolvePrower)
	{ 
		this.m_power = this.m_power - _disolvePrower;

		if (this.m_power <= 0)
		{
			this.m_power = 0;
			this.m_state = C_STATE_TAGGED_TO_DELETE;
		}
	}

	Fire.prototype.die = function()
	{ 
		this.m_state = C_STATE_TAGGED_TO_DELETE;
	}

	Fire.prototype.setDir = function (_dir)
	{
		this.m_direction = _dir;
		this.m_dirX = 0; 
		this.m_dirY = 0; 
		
		if (this.m_direction == C_DIR_RIGHT)
		{
			this.m_dirX = C_FIRE_STEP_SIZE; 
			this.m_dirY = 0; 
		}
		
		if (this.m_direction == C_DIR_UP)
		{
			this.m_dirX = 0; 
			this.m_dirY = -C_FIRE_STEP_SIZE; 
		}
		
		if (this.m_direction == C_DIR_LEFT)
		{
			this.m_dirX = -C_FIRE_STEP_SIZE; 
			this.m_dirY = 0; 
		}
		
		if (this.m_direction == C_DIR_DOWN)
		{
			this.m_dirX = 0; 
			this.m_dirY = C_FIRE_STEP_SIZE; 
		}
		
		if (this.m_direction == 0)
		{
			this.m_dirX = 0; 
			this.m_dirY = 0; 
		}
	}	
	
	Fire.prototype.mustBeDeleted = function()
	{
		var bResult = false;
		
		bResult = (this.m_state == C_STATE_TAGGED_TO_DELETE);
		
		return bResult;
	}	

	Fire.prototype.setRange = function(_range)
	{
		this.m_range = _range;
		this.m_disolvePower = 100 / (this.m_range / modulo(0,0, this.m_dirX, this.m_dirY));		
	}	

	Fire.prototype.setRadious = function(_radious)
	{
		this.m_rad = _radious;
	}	

	Fire.prototype.setEnergy = function(_energy)
	{
		this.m_energy = _energy;
	}	
	
	Fire.prototype.hitPower = function()
	{
		return this.m_energy;
	}	
}

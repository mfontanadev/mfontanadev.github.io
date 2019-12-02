// Class Smoke
function Smoke () 
{ 
	Smoke.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_SMOKE;
		this.m_type = _type; 
		this.m_status = C_STATUS_DESTROYED;

		this.m_x = _x; 
		this.m_y = _y; 

		this.m_px = 0;
		this.m_py = 0;
		
		this.m_smokeTimer = new ChTimer();
		this.m_smokeTimer.initWith(50);
		
		this.m_alpha = 1;
		this.m_rad2 = 10;
		this.m_offsetX = 0;
		this.m_offsetY = 0;
		
		this.reset();
	}
	
	// 
	Smoke.prototype.handleInputs = function () 
	{ 
	}  

	// 
	Smoke.prototype.implementGameLogic = function () 
	{ 
		this.updateCoordinates();
			
		if (this.m_status == C_STATUS_ALIVE)
		{
			this.m_smokeTimer.implementGameLogic();
			
			if (this.m_smokeTimer.endReached() == true)
			{
				this.m_smokeTimer.start();
				this.m_offsetY = this.m_offsetY + 1;
				this.m_rad2 = this.m_rad2 - 1;
				this.m_alpha = this.m_alpha - 0.1;
				
				if (this.m_rad2 <= 0)
				{
					this.destroyed();
				}
			}
		}
	}  

	Smoke.prototype.render = function (_canvas, _context)
	{
		if (this.m_status == C_STATUS_ALIVE)
		{
			vx = chRandom(5);
			vy = chRandom(5);
			renderCircleTransparent(_canvas, _context, this.m_px + this.m_offsetX + vx, this.m_py - this.m_offsetY + vy, this.m_rad2, "gray", this.m_alpha);
			vx = chRandom(5);
			vy = chRandom(5);
			renderCircleTransparent(_canvas, _context, this.m_px + this.m_offsetX + vx, this.m_py - this.m_offsetY + vy, this.m_rad2+2, "gray", this.m_alpha);
		}
	}

	Smoke.prototype.updateCoordinates = function ()
	{
		this.m_px = C_OFFSET_X_PLAY_AREA + this.m_x - m_maze.m_lev.m_offsetX;
		this.m_py = C_OFFSET_Y_PLAY_AREA - this.m_y - m_maze.m_lev.m_offsetY;
	}
	
	Smoke.prototype.die = function()
	{
		this.m_status = C_STATUS_DIE;
	}

	Smoke.prototype.destroyed = function()
	{
		this.m_status = C_STATUS_DESTROYED;
	}

	Smoke.prototype.reset = function()
	{
		this.m_rad2 = 10;
		this.m_offsetX = 0;
		this.m_offsetY = 0;
		this.m_alpha = 1;
		this.m_smokeTimer.reset();
	}

	Smoke.prototype.start = function()
	{
		this.m_status = C_STATUS_ALIVE;
		this.reset();
		this.m_smokeTimer.start();
	}
}

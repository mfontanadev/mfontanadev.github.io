// Class Potion
function Potion () 
{ 
	Potion.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_POTION;
		this.m_type = _type;
		this.m_status = C_STATUS_ALIVE;
		
		this.m_x = _x; 
		this.m_y = _y; 
		this.m_blinkWait = 0; 

		this.m_spriteSheetID = 0;
		this.m_x1 = 0; 
		this.m_y1 = 0; 
		this.m_w = 0; 
		this.m_h = 0; 
		// Special logic for Potion object, there are two rows normal state and bright state.
		// The second image has an offset from the normal one.
		this.m_offsetX1 = 0; 	
		this.m_offsetY1 = 0; 
		this.m_blinkRate = 0; 
		this.initData(gl_sprites_definition);
		
		this.m_rc = new chRect();
	}
	
	Potion.prototype.initData = function(_spriteDefinition)
	{
		var pObj = null; 
		var tmpAnimation = null;
		
		for (var i = 0; i < _spriteDefinition.potion_collection.length; i++) 
		{
			if (_spriteDefinition.potion_collection[i].type == this.m_type)
			{
				this.m_x1 = _spriteDefinition.potion_collection[i].x1; 
				this.m_y1 = _spriteDefinition.potion_collection[i].y1; 
				this.m_w = _spriteDefinition.potion_collection[i].x2 - this.m_x1; 
				this.m_h = _spriteDefinition.potion_collection[i].y2 - this.m_y1; 
				this.m_spriteSheetID = _spriteDefinition.potion_collection[i].spriteSheet;
				this.m_offsetX1 = _spriteDefinition.potion_collection[i].offsetX1; 
				this.m_offsetY1 = _spriteDefinition.potion_collection[i].offsetY1; 
				this.m_blinkRate = _spriteDefinition.potion_collection[i].blinkRate; 
				break;
			}
		}
	}
	
	// 
	Potion.prototype.implementGameLogic = function () 
	{
		this.m_blinkWait = this.m_blinkWait + 1;
		if (this.m_blinkWait > this.m_blinkRate )
			this.m_blinkWait = 0;
		
		this.moveLogic();
	}  

	Potion.prototype.render = function (_canvas, _context)
	{
		var px = this.m_x;
		var py = this.m_y;
		
		if (this.m_blinkWait > this.m_blinkRate >> 2)
		{
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_spriteSheetID),
			this.m_x1, this.m_y1,
			this.m_w, this.m_h, 
			px, py,
			this.m_w, this.m_h, 
			1,1);
		}
		else
		{
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(this.m_spriteSheetID),
			this.m_x1 + this.m_offsetX1, this.m_y1 + this.m_offsetY1,
			this.m_w, this.m_h, 
			px, py,
			this.m_w, this.m_h, 
			1,1);
		}
	}

	Potion.prototype.collisionRectangle = function () 
	{
		
		this.m_rc.m_x1 = this.m_x * 2;
		this.m_rc.m_y1 = this.m_y * 2;
		this.m_rc.m_x2 = this.m_x * 2 + this.m_w * 2;
		this.m_rc.m_y2 = this.m_y * 2 + this.m_h * 2;
		
		return this.m_rc;
	}

	Potion.prototype.fLog = function () 
	{ 
		var logText = "Potion: " +
		"m_id=" + this.m_id + ", " +
		"m_type=" + this.m_type + ", " + 
		"m_x=" + this.m_x + ", " + 
		"m_y=" + this.m_y + ";"; 

		return logText;
	}  

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Potion.prototype.moveLogic = function ()
	{ 
		if (m_maze.m_lev.m_scrolling == true)
		{
			this.m_x = this.m_x - 2;
		}
	}
	
	Potion.prototype.mustBeDeleted = function()
	{
		return (this.m_status == C_STATUS_DIE);
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Potion.prototype.markToDelete = function ()
	{
		this.m_status = C_STATUS_DIE;
	}
}

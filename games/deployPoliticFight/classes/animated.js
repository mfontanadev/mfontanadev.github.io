// Class Animated
function Animated () 
{ 
	Animated.prototype.initWith = function (_id, _type, _x, _y, _spritesFile, _animFile)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_ANIMATED;
		this.m_type = _type; 
		
		// Default values
		this.m_flip = 1;
		this.m_movDir = C_DIR_RIGHT;			// 1 = right, 2 = up, 3 = left, 4 = down
		this.m_rc = new chRect();
		this.m_status = C_STATUS_NOT_SET;
		this.m_currentAnimationId = C_ANIM_NONE;
		this.m_arrAnimations = new Array();
				
		this.m_spriteSheetID = 0;
		this.m_x = _x; 
		this.m_y = _y; 
		this.m_travelH = 0; 
		this.m_travelV = 0; 

		this.m_travelHCounter = 0; 
		this.m_travelVCounter = 0; 

		// Init logic.
		this.m_speed = 3;

		var staticAnimation = new Animation();
		staticAnimation.loadAnimationsFromXml(_spritesFile, _animFile ,  this.m_arrAnimations);
		
		// On the fly values.
		//this.setAnimation(C_ANIM_STAND, false);
		//this.moveLogic();
	}
	
	// 
	Animated.prototype.handleInputs = function () 
	{ 
	}
	
	// 
	Animated.prototype.implementGameLogic = function () 
	{ 
		if (this.m_status == C_STATUS_ALIVE)
		{
			this.m_arrAnimations[this.m_currentAnimationId].implementGameLogic();			
			
			if (this.m_arrAnimations[this.m_currentAnimationId].isStopped() == true)
			{
				this.m_arrAnimations[this.m_currentAnimationId].reset();
				this.m_arrAnimations[this.m_currentAnimationId].start();
			}
			
			if (this.m_travelV <= 0 && this.m_travelH <= 0) 
			{
				this.m_status = C_STATUS_NOT_SET;
			}
			
			this.moveLogic();
			this.checkCollition();
			
			this.m_arrAnimations[this.m_currentAnimationId].setPosition(this.m_x, this.m_y, this.m_flip);
		}
	}  

	Animated.prototype.render = function (_canvas, _context)
	{
		if (this.m_status == C_STATUS_ALIVE)
		{
			this.m_arrAnimations[this.m_currentAnimationId].render(_canvas, _context);
		}
	}

	Animated.prototype.collisionRectangle = function () 
	{
		console.log("collision");
					console.log(this.m_status);

		if (this.m_status == C_STATUS_ALIVE)
		{
			this.m_rc = this.m_arrAnimations[this.m_currentAnimationId].collisionRectangle();
		}
		
		return this.m_rc; 
	}

	
	Animated.prototype.fLog = function () 
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
	Animated.prototype.moveLogic = function ()
	{ 
		//if (this.m_movCounter > 0)
		{
			if (this.m_flip == 1 && this.m_travelH > 0)
			{
				this.m_x = this.m_x + this.m_speed;
				this.m_travelH = this.m_travelH - this.m_speed;
			}

			if (this.m_flip == -1 && this.m_travelH > 0)
			{
				this.m_x = this.m_x - this.m_speed;
				this.m_travelH = this.m_travelH - this.m_speed;
			}
			
			if (this.m_flip == 1 && this.m_travelV > 0)
			{
				this.m_y = this.m_y + this.m_speed;
				this.m_travelV = this.m_travelV - this.m_speed;
			}

			if (this.m_flip == -1 && this.m_travelV > 0)
			{
				this.m_y = this.m_y - this.m_speed;
				this.m_travelV = this.m_travelV - this.m_speed;
			}
		}
	}
	
	Animated.prototype.checkCollition = function()
	{
		var bResult = false;
		/*
		if (this.m_currentAnimationId == C_ANIM_HIT && this.m_arrAnimations[C_ANIM_HIT].m_currentFrame == 1)
		{
			var _rect = this.collisionRectangle();
			
			// Iterate each enemy and check hit collition.
			for (var i = m_maze.m_arrObj.length - 1; i >= 0; i--) 
			{
				pObj = m_maze.m_arrObj[i];
				if (pObj.m_class == C_CLASS_ENEMY)
				{
					pRect = pObj.collisionRectangle();;
				
					if (collisionRectRect(
							_rect.m_x1,_rect.m_y1,_rect.m_x2,_rect.m_y2, 
							pRect.m_x1,pRect.m_y1,pRect.m_x2,pRect.m_y2) == true)
					{
						if (Math.abs(pObj.m_y - this.m_y) < C_HIT_PROXIMITY && 
							Math.abs(pObj.m_x - this.m_x) < C_HIT_PROXIMITY * 4.5 )
							pObj.hitted(this.m_hitPower, this.m_type);
					}
				}
			}
		}*/
		return bResult;
	}
	

	/*
	Animated.prototype.initData = function(_gl_resources)
	{
		var pObj = null; 
		var tmpAnimation = null;
		
		for (var i = 0; i < _gl_resources.animations.length; i++) 
		{
			if (_gl_resources.animations[i].type == this.m_type)
			{
				this.m_x = this.m_x + _gl_resources.animations[i].x; 
				this.m_y = this.m_y + _gl_resources.animations[i].y; 
				this.m_spriteSheetID = _gl_resources.animations[i].spriteSheet;
				
				pObj = new Animation();
				pObj.initWith(tmpAnimation.id, 0, this.m_spriteSheetID, this.m_x, this.m_y);
				pObj.loadAnimationFrames(_gl_resources.animations[i].frames);
			}
		}
	}*/

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	/*
	Animated.prototype.setAnimation = function(_animationId, _invalidateInput)
	{
		this.m_movCounter = 0;

		for (var i = 0; i < _spriteDefinition.actor_collection.length; i++) 
		{
			if (m_arrAnimations[i].m_id != _animationId)
				this.m_arrAnimations[i].reset();
		}
		
		this.m_arrAnimations[_animationId].start();
		this.m_currentAnimationId = _animationId;
		this.m_arrAnimations[this.m_currentAnimationId].setPosition(this.m_x, this.m_y, this.m_flip);
	}*/
	
	Animated.prototype.startAnimation = function(_animId, _x, _y, _flip, _travelH, _travelV)
	{
		var animationIndex = -1;

		for (var i = 0; i < this.m_arrAnimations.length; i++) 
		{
			if (this.m_arrAnimations[i].m_id == _animId)
			{
				animationIndex = i;
				break;
			}
		}
		
		if (animationIndex != -1)
		{
			this.m_x = _x;
			this.m_y = _y;
			this.m_flip = _flip;
			this.m_travelH = _travelH;
			this.m_travelV = _travelV;
			this.m_currentAnimationId = animationIndex;
			this.m_status = C_STATUS_ALIVE;
			
			this.m_arrAnimations[this.m_currentAnimationId].setPosition(this.m_x, this.m_y, this.m_flip);
			this.m_arrAnimations[this.m_currentAnimationId].reset();
			this.m_arrAnimations[this.m_currentAnimationId].start();
		}
	}
}

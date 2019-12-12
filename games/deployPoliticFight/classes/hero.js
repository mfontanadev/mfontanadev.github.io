// Class Hero
function Hero () 
{ 
	Hero.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_PLAYER;
		this.m_type = _type; 
		
		// Default values
		this.m_flip = 1;
		this.m_movDir = C_DIR_RIGHT;			// 1 = right, 2 = up, 3 = left, 4 = down
		this.m_rc = new chRect();
		this.m_status = C_STATUS_ALIVE;
		this.m_currentAnimationId = C_ANIM_STAND;
		this.m_arrAnimations = new Array();
		this.m_hiting = false;
		this.m_invalidateInput = false;
		this.m_energy = 100;
				
		this.m_spriteSheetID = 0;
		this.m_xFace = 0;
		this.m_yFace = 0;
		this.m_name = "NN";
		this.m_hitPower = 1;
		this.m_x = _x; 
		this.m_y = _y; 
		this.m_spritesFile = "";
		this.m_animFile = "";
		
		// On the fly values.
		this.initData(gl_sprites_definition);
		
		// Init logic.
		this.m_speed = C_PLAYER_SPEED;
		this.m_process_button1_logic = false;
		this.m_LeftPositionLimit =  (m_canvas.width / 2) / 8;
		this.m_RightPositionLimit =  (m_canvas.width / 2) - this.m_LeftPositionLimit;

		this.setHeroEnergy(this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);
		Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
		this.moveLogic();
	}
	
	// 
	Hero.prototype.handleInputs = function () 
	{ 
		if (this.m_invalidateInput == false)
		{
			this.m_movCounter = 0;
			this.m_movDir = 0;
			
			if (this.m_type == C_OBJ_TYPE_PLAYER_GUY)
				this.handleInputsPlayerOne();

			if (this.m_type == C_OBJ_TYPE_PLAYER_CODY)
				this.handleInputsPlayerTwo();
		}
	}

	Hero.prototype.handleInputsPlayerOne = function () 
	{ 
		if (m_keyboardMngr.isKeyDown( C_BUTTON_B_KEY) == true)
		{
			Animation.stSetAnimation(this, C_ANIM_PROTECTING, true, this.m_x, this.m_y, this.m_flip);
		}
		else if (m_keyboardMngr.isKeyDown( C_BUTTON_C_KEY) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_BUTTON_C_KEY);
			this.m_process_button1_logic = true;
		}
		else
		{
			if (m_keyboardMngr.isKeyDown(C_BUTTON_RIGHT_KEY) == true)
			{
				this.m_movDir |= C_DIR_RIGHT;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_BUTTON_UP_KEY) == true)
			{
				this.m_movDir |= C_DIR_UP;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_BUTTON_LEFT_KEY) == true)
			{
				this.m_movDir |= C_DIR_LEFT;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_BUTTON_DOWN_KEY) == true)
			{
				this.m_movDir |= C_DIR_DOWN;
				this.m_movCounter = 1;
			}
		}
	}  

	Hero.prototype.handleInputsPlayerTwo = function () 
	{ 
		if (m_keyboardMngr.isKeyDown( C_KEY_CHAR_F) == true)
		{
			Animation.stSetAnimation(this, C_ANIM_PROTECTING, true, this.m_x, this.m_y, this.m_flip);
		}
		else if (m_keyboardMngr.isKeyDown( C_KEY_CHAR_G) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_KEY_CHAR_G);
			this.m_process_button1_logic = true;
		}
		else
		{
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_D) == true)
			{
				this.m_movDir |= C_DIR_RIGHT;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_W) == true)
			{
				this.m_movDir |= C_DIR_UP;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_A) == true)
			{
				this.m_movDir |= C_DIR_LEFT;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_S) == true)
			{
				this.m_movDir |= C_DIR_DOWN;
				this.m_movCounter = 1;
			}
		}
	}  
	
	// 
	Hero.prototype.implementGameLogic = function () 
	{ 
		if (this.m_status == C_STATUS_ALIVE)
		{
			this.m_arrAnimations[this.m_currentAnimationId].implementGameLogic();			

			if (this.m_currentAnimationId == C_ANIM_PROTECTING)
			{
				if (this.m_arrAnimations[C_ANIM_PROTECTING].isStopped() == true)
				{
					Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
				}
			}
			
			if (this.m_currentAnimationId == C_ANIM_HIT)
			{
				if (this.m_arrAnimations[C_ANIM_HIT].isStopped() == true)
				{
					Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
				}
			}
			
			if (this.m_currentAnimationId == C_ANIM_PAIN)
			{
				if (this.m_arrAnimations[C_ANIM_PAIN].isStopped() == true)
				{
					Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
				}
			}

			if (this.m_energy <= 1 && this.m_currentAnimationId != C_ANIM_DYING)
			{
				Animation.stSetAnimation(this, C_ANIM_DYING, true, this.m_x, this.m_y, this.m_flip);
			}
			
			if (this.m_currentAnimationId == C_ANIM_DYING)
			{
				if (this.m_arrAnimations[C_ANIM_DYING].isStopped() == true)
				{
					this.m_status = C_STATUS_DIE;
				}
			}
			
			if (this.m_currentAnimationId == C_ANIM_PROTECTING_HITTED)
			{
				if (this.m_arrAnimations[C_ANIM_PROTECTING_HITTED].isStopped() == true)
				{
					Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
				}
			}
			
			if (this.m_currentAnimationId == C_ANIM_TAKE)
			{
				if (this.m_arrAnimations[C_ANIM_TAKE].isStopped() == true)
				{
					Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
				}
			}
			
			this.handleInputs();
			this.moveLogic();
			this.process_button1_logic();
			this.checkCollition();
		}
		
		this.m_arrAnimations[this.m_currentAnimationId].setPosition(this.m_x, this.m_y, this.m_flip);
	}  

	Hero.prototype.render = function (_canvas, _context)
	{
		this.m_arrAnimations[this.m_currentAnimationId].render(_canvas, _context);
		
		//renderCollitionRectangle(_canvas, _context, this.collisionRectangle(), 'yellow')
	}

	Hero.prototype.collisionRectangle = function () 
	{
		this.m_rc = this.m_arrAnimations[this.m_currentAnimationId].collisionRectangle();
		return this.m_rc; 
	}

	
	Hero.prototype.fLog = function () 
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
	Hero.prototype.moveLogic = function ()
	{ 
		if (this.m_movCounter > 0)
		{
			if ((this.m_movDir & C_DIR_RIGHT) > 0)
			{
				this.m_x = this.m_x + this.m_speed;
				this.m_flip = 1;
			}

			if ((this.m_movDir & C_DIR_UP) > 0)
			{
				this.m_y = this.m_y - this.m_speed;
			}
			
			if ((this.m_movDir & C_DIR_LEFT) > 0)
			{				
				this.m_x = this.m_x - this.m_speed;
				this.m_flip = -1;
			}
			
			if ((this.m_movDir & C_DIR_DOWN) > 0)
			{
				this.m_y = this.m_y + this.m_speed;
			}

			
			if (this.m_x > m_canvas.width / 4)
			{
				// If scrolling was allowed then freeze hero x position,
				// else allow reach right side.
				if (this.allowScroll() == true)
				{
					if (m_maze.m_lev.scroll() == true) 
					{
						this.m_x = m_canvas.width / 4;
						this.scroll();
					}
				}
				else
					this.m_x = m_canvas.width / 4;
			}

			if (this.m_x < this.m_LeftPositionLimit)
				this.m_x = this.m_LeftPositionLimit;

			if (this.m_x > this.m_RightPositionLimit)
				this.m_x = this.m_RightPositionLimit;

			if (this.m_y < C_BACKGROUND_SCROLL_UP_LIMIT)
				this.m_y = C_BACKGROUND_SCROLL_UP_LIMIT;
			
			if (this.m_y > C_BACKGROUND_SCROLL_DOWN_LIMIT)
				this.m_y = C_BACKGROUND_SCROLL_DOWN_LIMIT;
			
			// Walking mode.
			this.m_arrAnimations[C_ANIM_WALKING].start();
			this.m_currentAnimationId = C_ANIM_WALKING;
		}
		else
		{
			if (this.m_currentAnimationId == C_ANIM_WALKING)
			{
				Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
			}
		}
	}

	Hero.prototype.allowScroll = function()
	{
		var result = false;
		var lookForType = 0;
			
		if (this.m_type == C_OBJ_TYPE_PLAYER_GUY)
			lookForType = C_OBJ_TYPE_PLAYER_CODY;

		if (this.m_type == C_OBJ_TYPE_PLAYER_CODY)
			lookForType = C_OBJ_TYPE_PLAYER_GUY;

		var idObj = m_maze.findIndexFromObject(C_CLASS_PLAYER, lookForType, false);

		if (idObj >= 0) 
		{
			if (m_maze.m_arrObj[idObj].m_x > this.m_LeftPositionLimit)
				result = true;
		}
		
		if (idObj == -1)
			result = true;
			
		return result;
	}
	
	Hero.prototype.scroll = function()
	{
		var lookForType = 0;
			
		if (this.m_type == C_OBJ_TYPE_PLAYER_GUY)
			lookForType = C_OBJ_TYPE_PLAYER_CODY;

		if (this.m_type == C_OBJ_TYPE_PLAYER_CODY)
			lookForType = C_OBJ_TYPE_PLAYER_GUY;

		var idObj = m_maze.findIndexFromObject(C_CLASS_PLAYER, lookForType, false);

		if (idObj >= 0) 
		{
			m_maze.m_arrObj[idObj].m_x = m_maze.m_arrObj[idObj].m_x - 2;
		}
	}
	
	Hero.prototype.process_button1_logic = function()
	{	
		if (this.m_process_button1_logic == true && this.m_arrAnimations[C_ANIM_HIT].m_currentFrame == 0)
		{
			var _rect = this.collisionRectangle();
			
			// Iterate each enemy and check hit collition.
			for (var i = m_maze.m_arrObj.length - 1; i >= 0; i--) 
			{
				pObj = m_maze.m_arrObj[i];
				if (pObj.m_class == C_CLASS_POTION)
				{
					pRect = pObj.collisionRectangle();
				
					if (collisionRectRect(
							_rect.m_x1,_rect.m_y1,_rect.m_x2,_rect.m_y2, 
							pRect.m_x1,pRect.m_y1,pRect.m_x2,pRect.m_y2) == true)
					{
						if (Math.abs(pObj.m_y - this.m_y) > pRect.height() * 1.5)
						{
							// Take ground item.
							pObj.markToDelete();
							Animation.stSetAnimation(this, C_ANIM_TAKE, true, this.m_x, this.m_y, this.m_flip);
							m_sndManager.stop(C_SND_JUMP_ID);
							m_sndManager.play(C_SND_JUMP_ID);
							this.process_potion(pObj);
							
							break;
						}
					}
				}
			}

			if (this.m_currentAnimationId == C_ANIM_STAND || this.m_currentAnimationId == C_ANIM_WALKING)
			{
				// Hit if no items to take.
				Animation.stSetAnimation(this, C_ANIM_HIT, true, this.m_x, this.m_y, this.m_flip);
				m_sndManager.stop(C_SND_BOMBO_ID);
				m_sndManager.play(C_SND_BOMBO_ID);
			}
		}
		this.m_process_button1_logic = false;
	}
	
	Hero.prototype.checkCollition = function()
	{
		var bResult = false;

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
		}
		return bResult;
	}
	
	Hero.prototype.mustBeDeleted = function()
	{
		return (this.m_status == C_STATUS_DIE);
	}
	
	Hero.prototype.initData = function(_spriteDefinition)
	{
		var pObj = null; 
		var tmpAnimation = null;
		var staticAnimation = new Animation();
		msglog('===Hero.prototype.in');
		for (var i = 0; i < _spriteDefinition.actor_collection.length; i++) 
		{
			msglog('===_spriteDefinition');
			if (_spriteDefinition.actor_collection[i].type == this.m_type)
			{
				this.m_spritesFile = _spriteDefinition.actor_collection[i].spritesFile;
				this.m_animFile = _spriteDefinition.actor_collection[i].animFile;

				this.m_x = this.m_x + _spriteDefinition.actor_collection[i].x; 
				this.m_y = this.m_y + _spriteDefinition.actor_collection[i].y; 
				this.m_maxEnergy = _spriteDefinition.actor_collection[i].maxEnergy;
				this.m_spriteSheetID = _spriteDefinition.actor_collection[i].spriteSheet;
				
				//this.m_xFace = _spriteDefinition.actor_collection[i].xFace;
				//this.m_yFace = _spriteDefinition.actor_collection[i].yFace;
				msglog('===getElementByName_withTxt');
				var spriteData = m_xmlMngr.getElementByName_withTxt(this.m_spritesFile, "spr", "C_FACE");
				if (spriteData != null)
				{
					this.m_xFace = parseInt(spriteData.attributes["x"].value);
					this.m_yFace = parseInt(spriteData.attributes["y"].value);
				}
								
				this.m_name = _spriteDefinition.actor_collection[i].name;
				this.m_hitPower = _spriteDefinition.actor_collection[i].hitPower;
				msglog('===staticAnimation');
				staticAnimation.loadAnimationsFromXml(this.m_spritesFile, this.m_animFile ,  this.m_arrAnimations);
			}
		}
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Hero.prototype.process_potion = function(_potion)
	{
		if (_potion.m_type == C_OBJ_TYPE_POTION_STAMINA) 
		{
			// Recover 100% of energy.
			this.m_energy = 100;
			
			this.setHeroEnergy(this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);
		}

		if (_potion.m_type == C_OBJ_TYPE_POTION_STRONG) 
		{
			this.m_hitPower = this.m_hitPower * 2;
		}

		if (_potion.m_type == C_OBJ_TYPE_POTION_SPEED) 
		{
			this.m_speed = this.m_speed * 2;
		}
	}
		
	Hero.prototype.hitted = function(_hitPower)
	{
		// Evitar tambien chequear impacto con el personaje si estamos haciendo la animacion de muerte.
		if (this.m_currentAnimationId != C_ANIM_PAIN && 
			this.m_currentAnimationId != C_ANIM_DYING && 
			this.m_currentAnimationId != C_ANIM_PROTECTING_HITTED)
		{	
			m_sndManager.stop(C_SND_PUNCH_ID);
			m_sndManager.play(C_SND_PUNCH_ID);

			if (this.m_currentAnimationId == C_ANIM_PROTECTING)
			{
				this.m_energy = this.m_energy - 1;

				this.setHeroEnergy(this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);
				Animation.stSetAnimation(this, C_ANIM_PROTECTING_HITTED, true, this.m_x, this.m_y, this.m_flip);
			}
			else
			{
				this.m_energy = this.m_energy - _hitPower;
				this.setHeroEnergy(this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);
				Animation.stSetAnimation(this, C_ANIM_PAIN, true, this.m_x, this.m_y, this.m_flip);
			}
		}
	}

	// This function perform hero type test before update score.
	Hero.prototype.setHeroEnergy = function(_maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name)
	{
		if (this.m_type == C_OBJ_TYPE_PLAYER_GUY)
			m_score.setHero1Energy(_maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name);

		if (this.m_type == C_OBJ_TYPE_PLAYER_CODY)
			m_score.setHero2Energy(_maxEnergy, _energy, _spriteSheet, _xFace, _yFace, _name);
	}
}

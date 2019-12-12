// Class Enemy
// This is similar to Hero but it has different movement logic.
function Enemy () 
{ 
	Enemy.prototype.initWith = function (_id, _type, _x, _y, _enemyLevel)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_ENEMY;
		this.m_type = _type; 

		// Default values
		this.m_flip = 1;
		this.m_movDir = C_DIR_LEFT;			// 1 = right, 2 = up, 3 = left, 4 = down
		this.m_rc = new chRect();
		this.m_status = C_STATUS_ALIVE;
		this.m_currentAnimationId = C_ANIM_STAND;
		this.m_arrAnimations = new Array();
		this.m_hiting = false;
		this.m_invalidateInput = false;
		this.m_energy = 100;

		this.m_controlledByUser = false;
		this.m_waitHeroRunAway = false;
				
		this.m_spriteSheetID = 0;
		this.m_xFace = 0;
		this.m_yFace = 0;
		this.m_name = "NN";		
		this.m_hitPower = 0;
		this.m_hitDamage = 0;
		this.m_x = _x; 
		this.m_y = _y; 
		this.m_hitLevel = 1;
		this.m_followLevel = 500;

		this.m_animated = new Animated();
		this.m_rnd = 0;
		
		// On the fly values.
		this.initData(gl_sprites_definition);
		this.m_animated.initWith(0, C_OBJ_TYPE_ANIMATED_SINGLE, 0, 0, this.m_spritesFile, this.m_animFile);
		
		// Init logic.
		Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
		this.moveLogic();
	}
	
	// 
	Enemy.prototype.handleInputs = function () 
	{ 
		if (this.m_invalidateInput == false && m_maze.m_player2Present == false)
		{
			this.m_movCounter = 0;
			this.m_movDir = 0;
			
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_D) == true)
			{
				this.m_controlledByUser = true;
				this.m_movDir |= C_DIR_RIGHT;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_W) == true)
			{
				this.m_controlledByUser = true;
				this.m_movDir |= C_DIR_UP;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_A) == true)
			{
				this.m_controlledByUser = true;
				this.m_movDir |= C_DIR_LEFT;
				this.m_movCounter = 1;
			}
			if (m_keyboardMngr.isKeyDown(C_KEY_CHAR_S) == true)
			{
				this.m_controlledByUser = true;
				this.m_movDir |= C_DIR_DOWN;
				this.m_movCounter = 1;
			}
			
			if (m_keyboardMngr.isKeyDown( C_KEY_CHAR_F) == true)
			{
				Animation.stSetAnimation(this, C_ANIM_PROTECTING, true, this.m_x, this.m_y, this.m_flip);
			}
			else if (m_keyboardMngr.isKeyDown( C_KEY_CHAR_G) == true)
			{
				m_keyboardMngr.disableUntilKeyUp(C_KEY_CHAR_G);
				this.actionHit1();
			}
			else if (m_keyboardMngr.isKeyDown( C_KEY_CHAR_H) == true && this.m_type == C_OBJ_TYPE_ENEMY_RYDEN)
			{
				m_keyboardMngr.disableUntilKeyUp(C_KEY_CHAR_H);
				this.actionHit2();
			}
		}
	}  
	
	// 
	Enemy.prototype.implementGameLogic = function () 
	{ 
		m_rnd = chRandom(100);
		
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

			if (this.m_currentAnimationId == C_ANIM_HIT2)
			{
				if (this.m_arrAnimations[C_ANIM_HIT2].isStopped() == true)
				{
					Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
					
					this.processHit2();
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

			this.handleInputs();
			this.hitLogic();
			this.moveLogic();
			this.checkCollition();
			this.m_animated.implementGameLogic();
		}
		
		this.m_arrAnimations[this.m_currentAnimationId].setPosition(this.m_x, this.m_y, this.m_flip);
	}  

	Enemy.prototype.render = function (_canvas, _context)
	{
		this.m_arrAnimations[this.m_currentAnimationId].render(_canvas, _context);
		this.m_animated.render(_canvas, _context);
		//renderCollitionRectangle(_canvas, _context, this.collisionRectangle(), 'red')
	}

	Enemy.prototype.collisionRectangle = function () 
	{
		this.m_rc = this.m_arrAnimations[this.m_currentAnimationId].collisionRectangle();
		return this.m_rc; 
	}

	
	Enemy.prototype.fLog = function () 
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
	Enemy.prototype.hitLogic = function ()
	{ 
	}
	
	Enemy.prototype.moveLogic = function ()
	{ 
		// Hero object
		var idObj = m_maze.findIndexFromObject(C_CLASS_PLAYER, C_OBJ_TYPE_NONE, false);
		
		// Move near hero, 50 px
		if (idObj != -1 && this.m_controlledByUser == false && 
			this.m_currentAnimationId != C_ANIM_DYING && 
			this.m_currentAnimationId != C_ANIM_HIT && 
			this.m_currentAnimationId != C_ANIM_PAIN)
		{
			var dx = m_maze.m_arrObj[idObj].collisionRectangle().getCenterX() - this.collisionRectangle().getCenterX(); 
			
			this.m_movCounter = 0;
			// Stopping distance.
			if (Math.abs(dx) > 100 && this.m_waitHeroRunAway == false)
			{
				this.m_movCounter = 1;
				if (dx < 0)
					this.m_movDir = C_DIR_LEFT;
				else
					this.m_movDir = C_DIR_RIGHT;
			}	
			else
			{
				if (this.m_waitHeroRunAway == false)
					this.m_waitHeroRunAway = true;

				if (Math.abs(dx) > 50 && this.m_waitHeroRunAway == true)
				{
					if (chRandom(1000) < this.m_followLevel)
						this.m_waitHeroRunAway = false;
				}
				
				if (this.m_waitHeroRunAway == true)
				{
					var skill = 5 * this.m_hitLevel;
					if (skill > 200)
						skill = 200;
					
					if (chRandom(1000) < skill)
					{
						if (this.m_type != C_OBJ_TYPE_ENEMY_RYDEN)
							this.actionHit1();
						else
						{
							if (chRandom(100) < 25)
								this.actionHit1();
							else
								this.actionHit2();
						}
					}
				}
			}
		}
				
		if (this.m_movCounter > 0)
		{
			if (this.m_controlledByUser == false)
			{
				var idObj = m_maze.findIndexFromObject(C_CLASS_PLAYER, C_OBJ_TYPE_NONE, false);
				if (idObj != -1)
				{
					var dy = m_maze.m_arrObj[idObj].collisionRectangle().getCenterY() - this.collisionRectangle().getCenterY(); 
					if (Math.abs(dy) != 0)
					{
						if (dy < 0)
							this.m_movDir |= C_DIR_UP;
						else
							this.m_movDir |= C_DIR_DOWN;
					}
				}
			}
			
			if ((this.m_movDir & C_DIR_RIGHT) > 0)
			{
				this.m_x = this.m_x + C_PLAYER_SPEED / 2;
				this.m_flip = 1;
			}

			if ((this.m_movDir & C_DIR_UP) > 0)
			{
				this.m_y = this.m_y - C_PLAYER_SPEED / 2;
			}
			
			if ((this.m_movDir & C_DIR_LEFT) > 0)
			{				
				this.m_x = this.m_x - C_PLAYER_SPEED / 2;
				this.m_flip = -1;
			}
			
			if ((this.m_movDir & C_DIR_DOWN) > 0)
			{
				this.m_y = this.m_y + C_PLAYER_SPEED / 2;
			}


			if (this.m_y < C_BACKGROUND_SCROLL_UP_LIMIT)
				this.m_y = C_BACKGROUND_SCROLL_UP_LIMIT;
			
			if (this.m_y > C_BACKGROUND_SCROLL_DOWN_LIMIT)
				this.m_y = C_BACKGROUND_SCROLL_DOWN_LIMIT;

			
			// modo caminata
			this.m_arrAnimations[C_ANIM_WALKING].start();
			this.m_currentAnimationId = C_ANIM_WALKING;
			
			// modo levitacion.
			//this.setAnimation(C_ANIM_WALKING, false);
	
		}
		else
		{
			if (this.m_currentAnimationId == C_ANIM_WALKING)
			{
				Animation.stSetAnimation(this, C_ANIM_STAND, false, this.m_x, this.m_y, this.m_flip);
			}
		}

		if (m_maze.m_lev.m_scrolling == true)
		{
			this.m_x = this.m_x - 2;
		}
		this.m_arrAnimations[this.m_currentAnimationId].setPosition(this.m_x, this.m_y, this.m_flip);
	}

	Enemy.prototype.checkCollition = function()
	{
		var bResult = false;

		if (this.m_currentAnimationId == C_ANIM_HIT && this.m_arrAnimations[C_ANIM_HIT].m_currentFrame == 1)
		{
			// Only move hero when it reaches cell target position.
			var idObj = m_maze.detectCollitionByClass(C_CLASS_PLAYER, this.collisionRectangle());

			if (idObj != -1 && idObj != -2 )
			{
				if (Math.abs(m_maze.m_arrObj[idObj].m_y - this.m_y) < C_HIT_PROXIMITY &&
					Math.abs(m_maze.m_arrObj[idObj].m_x - this.m_x) < C_HIT_PROXIMITY * 4.5)
					m_maze.m_arrObj[idObj].hitted(this.m_hitPower);
			}
		}
		
		if (this.m_animated.m_status == C_STATUS_ALIVE)
		{
			// Only move hero when it reaches cell target position.
			var idObj = m_maze.detectCollitionByClass(C_CLASS_PLAYER, this.m_animated.collisionRectangle());

			if (idObj != -1 && idObj != -2)
			{
				m_maze.m_arrObj[idObj].hitted(2);
			}
		}
		return bResult;
	}
	
	Enemy.prototype.mustBeDeleted = function()
	{
		return (this.m_status == C_STATUS_DIE);
	}

	Enemy.prototype.initData = function(_spriteDefinition)
	{
		var pObj = null; 
		var tmpAnimation = null;
		var staticAnimation = new Animation();
		
		for (var i = 0; i < _spriteDefinition.actor_collection.length; i++) 
		{
			if (_spriteDefinition.actor_collection[i].type == this.m_type)
			{
				this.m_spritesFile = _spriteDefinition.actor_collection[i].spritesFile;
				this.m_animFile = _spriteDefinition.actor_collection[i].animFile;

				this.m_x = this.m_x + _spriteDefinition.actor_collection[i].x; 
				this.m_y = this.m_y + _spriteDefinition.actor_collection[i].y; 
				this.m_maxEnergy = _spriteDefinition.actor_collection[i].maxEnergy;
				this.m_spriteSheetID = _spriteDefinition.actor_collection[i].spriteSheet;
				
				var spriteData = m_xmlMngr.getElementByName_withTxt(this.m_spritesFile, "spr", "C_FACE");
				if (spriteData != null)
				{
					this.m_xFace = parseInt(spriteData.attributes["x"].value);
					this.m_yFace = parseInt(spriteData.attributes["y"].value);
				}
				//this.m_xFace = _spriteDefinition.actor_collection[i].xFace;
				//this.m_yFace = _spriteDefinition.actor_collection[i].yFace;

				this.m_name = _spriteDefinition.actor_collection[i].name;
				this.m_hitPower = _spriteDefinition.actor_collection[i].hitPower;
				this.m_hitDamage = _spriteDefinition.actor_collection[i].hitDamage;
				this.m_hitLevel = _spriteDefinition.actor_collection[i].hitLevel;
				this.m_followLevel = _spriteDefinition.actor_collection[i].followLevel;
				
				staticAnimation.loadAnimationsFromXml(this.m_spritesFile, this.m_animFile ,  this.m_arrAnimations);
			}
		}
	}

	Enemy.prototype.processHit2 = function()
	{
		this.m_animated.startAnimation(C_ANIM_RAY_TRAVEL, this.m_x, this.m_y, this.m_flip, 100, 0);
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Enemy.prototype.actionHit1 = function()
	{
		Animation.stSetAnimation(this, C_ANIM_HIT, true, this.m_x, this.m_y, this.m_flip);
		m_sndManager.stop(C_SND_BOMBO_ID);
		m_sndManager.play(C_SND_BOMBO_ID);
	}

	Enemy.prototype.actionHit2 = function()
	{
		if (this.m_animated.m_status == C_STATUS_NOT_SET)
		{
			Animation.stSetAnimation(this, C_ANIM_HIT2, true, this.m_x, this.m_y, this.m_flip);
			m_sndManager.stop(C_SND_RAY_ID);
			m_sndManager.play(C_SND_RAY_ID);
		}
	}
	
	Enemy.prototype.hitted = function(_hitPower, _playerType)
	{
		// Evitar tambien chequear impacto con el personaje si estamos haciendo la animacion de muerte.
		if (this.m_currentAnimationId != C_ANIM_PAIN && 
			this.m_currentAnimationId != C_ANIM_DYING &&
			this.m_currentAnimationId != C_ANIM_PROTECTING_HITTED)
		{	
			m_sndManager.stop(C_SND_PUNCH_ID);
			m_sndManager.play(C_SND_PUNCH_ID);

			// Look at hero.
			var idObj = m_maze.findIndexFromObject(C_CLASS_PLAYER, C_OBJ_TYPE_NONE, false);
			if (idObj != -1)
			{
				var heroRect = m_maze.m_arrObj[idObj].collisionRectangle();
				
				if (heroRect.getCenterX() >= this.collisionRectangle().getCenterX())
					this.m_flip = 1;
				else
					this.m_flip = -1;
			}

			if (this.m_currentAnimationId == C_ANIM_PROTECTING)
			{
				this.m_energy = this.m_energy - 1;
				
				if (_playerType == C_OBJ_TYPE_PLAYER_GUY)
					m_score.setEnemy1Energy(this.m_id, this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);

				if (_playerType == C_OBJ_TYPE_PLAYER_CODY)
					m_score.setEnemy2Energy(this.m_id, this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);
				
				Animation.stSetAnimation(this, C_ANIM_PROTECTING_HITTED, true, this.m_x, this.m_y, this.m_flip);
			}
			else
			{
				var staminaLost = _hitPower + this.m_hitDamage;
				if (staminaLost < 0)
					staminaLost = 1;
				
				this.m_energy = this.m_energy - staminaLost;
				if (_playerType == C_OBJ_TYPE_PLAYER_GUY)
					m_score.setEnemy1Energy(this.m_id, this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);

				if (_playerType == C_OBJ_TYPE_PLAYER_CODY)
					m_score.setEnemy2Energy(this.m_id, this.m_maxEnergy, this.m_energy, this.m_spriteSheetID, this.m_xFace, this.m_yFace, this.m_name);
					
				Animation.stSetAnimation(this, C_ANIM_PAIN, true, this.m_x, this.m_y, this.m_flip);
			}

			this.m_waitHeroRunAway = true;
		}
	}
}

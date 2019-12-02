// Class Hero
function Hero () 
{ 
	Hero.prototype.initWith = function (_id, _type, _x, _y)
	{
		this.m_id = _id;
		this.m_class = C_CLASS_PLAYER;
		this.m_type = _type; 

		this.m_x = _x; 
		this.m_y = _y; 
		this.m_rotationAngle = 0;
		this.m_allowFire = false;
		this.m_tPercent = 100;

		this.m_moveTimer = new ChTimer();
		this.m_moveTimer.initWith(17);
		
		// One shot per second, 25 cycles si 1000 milisencds
		this.m_fireTimer = new ChTimer();
		this.m_fireTimer.initWith(1000);
		msglog("counter fire:");
		msglog(this.m_fireTimer.m_msTime);
		
		this.m_rotationTimer = new ChTimer();
		this.m_rotationTimer.initWith(50);
		
		// 1 = right, 2 = up, 3 = left, 4 = down
		this.m_movDir = 0;
		this.m_rotationDir = 0;

		this.m_rc = new chRect();
		this.m_rcNM = new chRect();
		
		this.m_status = C_STATUS_ALIVE;

		this.m_engine = new Engine();
		this.m_engine.initWith(-1, C_OBJ_TYPE_ENGINE_MULLER, 0,0);
		this.m_engine.linkTank(this);

		this.m_radar = new Radar();
		this.m_radar.initWith(-1, C_OBJ_TYPE_RADAR_LEVEL_1, 0,0);
		this.m_radar.linkTank(this);
		//m_sndManager.setLoop(C_SND_ENGINE_0, true);
		//m_sndManager.play(C_SND_ENGINE_0);
		this.m_shield = new Shield();
		this.m_shield.initWith(-1, C_OBJ_TYPE_SHIELD_TYPE_1 , 0,0);
		this.m_shield.modifyIndicator(25);
		this.m_shield.linkTank(this);

		this.m_px = 0;
		this.m_py = 0;

		this.m_fireRange = 70;

		m_sndManager.setVolume(C_SND_ENGINE_MOVING, C_SND_ENGINE_MOVING_VOLUME);
		m_sndManager.setVolume(C_SND_TANQUETA, C_SND_TANQUETA_VOLUME);

		this.m_energy = new Energy();
		this.m_energy.initWith(-1, C_OBJ_TYPE_ENERGY_1, 0,0);
		
		this.m_cannon = new Cannon();
		this.m_cannon.initWith(-1, C_OBJ_TYPE_CANNON_1, 0,0);
		this.m_cannon.modifyRange(100);
		this.m_cannon.modifyDiameter(4);
		
		this.m_smoke = new Smoke();
		this.m_smoke.initWith(-3, C_OBJ_TYPE_SMOKE_1, _x, _y);
	}
	
	// 
	Hero.prototype.handleInputs = function () 
	{ 
		if (this.m_engine.isOn() == true)
		{
			if (m_keyboardMngr.isKeyDown(C_BUTTON_RIGHT_KEY) == true)
			{
				if (this.m_rotationTimer.isReady() == true)
				{
					this.m_rotationTimer.start();
					this.m_rotationDir = -1;
					m_sndManager.play(C_SND_TANQUETA);
				}
			}

			if (m_keyboardMngr.isKeyDown(C_BUTTON_LEFT_KEY) == true)
			{
				if (this.m_rotationTimer.isReady() == true)
				{
					this.m_rotationTimer.start();;
					this.m_rotationDir = 1;
					m_sndManager.play(C_SND_TANQUETA);
				}
			}
			if (m_keyboardMngr.isKeyDown(C_BUTTON_UP_KEY) == true)
			{
				this.startMoving(C_DIR_UP);
			}

			if (m_keyboardMngr.isKeyDown(C_BUTTON_DOWN_KEY) == true)
			{
				this.startMoving(C_DIR_DOWN);
			}

			if (m_keyboardMngr.isKeyDown(C_BUTTON_UP_KEY) == false && m_keyboardMngr.isKeyDown(C_BUTTON_DOWN_KEY) == false)
			{
				this.stopMoving();
			}
		}
		
		if (this.m_rotationTimer.hasStarted() == false || this.m_rotationDir == 0)
		{
			if (this.m_rotationDir == 0 && 
				m_keyboardMngr.isKeyDown(C_BUTTON_RIGHT_KEY) == false && 
				m_keyboardMngr.isKeyDown(C_BUTTON_LEFT_KEY) == false)
			{
				if (m_sndManager.isPlaying(C_SND_TANQUETA) == true)
				{
					m_sndManager.stop(C_SND_TANQUETA);
				}
			}
		}
			
		if (this.m_fireTimer.isReady() && this.m_rotationTimer.isReady() == true)
		{
			if (m_keyboardMngr.isKeyDown(C_KEY_SPACE) == true)
			{
				this.fire();
			}
		}
	}  

	// 
	Hero.prototype.implementGameLogic = function () 
	{ 
		this.updateCoordinates();
				
		if (this.m_status == C_STATUS_ALIVE)
		{
			this.handleInputs();
			this.moveLogic();
			
			this.m_smoke.implementGameLogic();
			
			this.m_fireTimer.implementGameLogic();
			
			this.m_smoke.m_px = this.m_px;
			this.m_smoke.m_py = this.m_py;
		
			if (this.m_fireTimer.endReached() == true)
				this.m_fireTimer.reset()
			
			//this.checkCollition();
		}
		
		this.m_engine.implementGameLogic();

		this.m_radar.implementGameLogic();

		this.m_shield.implementGameLogic();

		this.m_energy.implementGameLogic();

		this.m_cannon.implementGameLogic();
	}  

	Hero.prototype.updateCoordinates = function ()
	{
		this.m_px = C_OFFSET_X_PLAY_AREA + this.m_x - m_maze.m_lev.m_offsetX;
		this.m_py = C_OFFSET_Y_PLAY_AREA - this.m_y - m_maze.m_lev.m_offsetY;
	}
	
	Hero.prototype.render = function (_canvas, _context)
	{
		var color = rgbaToColor(0, 255, 0 , 1);
		var aliveImg1 = C_IMG_HERO;
		
		if (this.m_status == C_STATUS_DESTROYED)
		{
			aliveImg1 = C_IMG_HERO_CRASH;
			//aliveImg2 = C_IMG_HERO_SMOG_CRASH;
		}
		
		drawImageRotation(_canvas, _context, m_resourceMngr.getImage(aliveImg1), this.m_px, this.m_py, this.m_rotationAngle);

		this.m_smoke.render(_canvas, _context);

		/*
		percent = this.m_shield.indicatorValue() / 100;
		rendeElipsisTransparent(_canvas, _context, this.m_px, this.m_py, 40 , "blue", percent);
		rendeElipsisTransparent(_canvas, _context, this.m_px, this.m_py, 42 , "blue", percent);
		*/
	}


	Hero.prototype.renderIndicators = function (_canvas, _context)
	{
		this.m_engine.render(_canvas, _context);
		this.m_shield.render(_canvas, _context);
		this.m_energy.render(_canvas, _context);
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_LEFT), C_OFFSETX_L4, C_OFFSETY_L4, 1);

		this.m_radar.render(_canvas, _context);
		this.m_cannon.render(_canvas, _context);
		//drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_RIGHT), C_OFFSETX_R2, C_OFFSETY_R2, 1);
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_RIGHT), C_OFFSETX_R3, C_OFFSETY_R3, 1);
		drawImageTransparent(_canvas, _context, m_resourceMngr.getImage(C_IMG_IND_BACKGROUND_RIGHT), C_OFFSETX_R4, C_OFFSETY_R4, 1);
	}

	Hero.prototype.collisionRectangle = function () 
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

	Hero.prototype.collisionRectanglenNextMov = function () 
	{
		var m_rcTmp = this.collisionRectangle();
		
		var offsetX = 0;
		var offsetY = 0;
		
		if (this.m_movDir == C_DIR_RIGHT)
			offsetX = C_PLAYER_SPEED;

		if (this.m_movDir == C_DIR_UP)
			offsetY = C_PLAYER_SPEED * -1;

		if (this.m_movDir == C_DIR_LEFT)
			offsetX = C_PLAYER_SPEED * -1;

		if (this.m_movDir == C_DIR_DOWN)
			offsetY = C_PLAYER_SPEED;
				
		this.m_rcNM.m_x1 = m_rcTmp.m_x1 + offsetX;
		this.m_rcNM.m_y1 = m_rcTmp.m_y1 + offsetY;
		this.m_rcNM.m_x2 = m_rcTmp.m_x2 + offsetX;
		this.m_rcNM.m_y2 = m_rcTmp.m_y2 + offsetY;
	
		return this.m_rcNM; 
	}
	
	Hero.prototype.crashRectangle = function () 
	{
		var m_rcTmp = this.collisionRectangle();
		
		var offsetX = 10;
		var offsetY = 10;
		
		this.m_rcNM.m_x1 = m_rcTmp.m_x1 + offsetX;
		this.m_rcNM.m_y1 = m_rcTmp.m_y1 + offsetY;
		this.m_rcNM.m_x2 = m_rcTmp.m_x2 - offsetX;
		this.m_rcNM.m_y2 = m_rcTmp.m_y2 - offsetY;
	
		return this.m_rcNM; 
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
		this.m_moveTimer.implementGameLogic();

		if (this.isMoving() == true && this.m_moveTimer.endReached() == true)
		{
			this.m_moveTimer.reset();
			
			if (this.m_movDir == C_DIR_UP)
			{
				dx = cosOf(C_PLAYER_SPEED, this.m_rotationAngle);
				dy = sinOf(C_PLAYER_SPEED, this.m_rotationAngle);
			}
			else
			{
				dx = cosOf(-C_PLAYER_SPEED, this.m_rotationAngle);
				dy = sinOf(-C_PLAYER_SPEED, this.m_rotationAngle);
			}
			
			this.m_x = this.m_x + dx;
			this.m_y = this.m_y + dy;

			this.updateCoordinates();
			
			lx = (m_canvas.width / 2) - 50 ;
			ly = (m_canvas.height / 2) - 50 ;

			if ((this.m_px < ((m_canvas.width / 2) - 50)) || 
				(this.m_py < ((m_canvas.height / 2) - 50)) ||
				(this.m_px > ((m_canvas.width / 2) + 50)) || 
				(this.m_py > ((m_canvas.height / 2) + 50)) )
			{
				m_maze.m_lev.scroll(dx, dy);
			}
		}
		
		this.m_rotationTimer.implementGameLogic();
		if (this.m_rotationTimer.endReached() == true)
		{
			this.m_rotationAngle += this.m_rotationDir * C_PLAYER_ROTATION_SPEED;
			this.m_rotationAngle = chNormalizeAngle(this.m_rotationAngle);
			this.m_rotationDir = 0;
			this.m_rotationTimer.reset()
		}
	}

	Hero.prototype.checkCollition = function()
	{
		var bResult = false;

		// Only move hero when it reaches cell target position.
		var idBrick = m_maze.detectCollitionByClass(C_CLASS_SMOGCAR, this.crashRectangle());

		if (idBrick != -1)
		{
			this.destroyed();
			//m_maze.m_arrObj[idBrick].die();
		}

		
		return bResult;
	}
	
	Hero.prototype.mustBeDeleted = function()
	{
		var bResult = (this.m_status == C_STATUS_DIE);
		
		return bResult;
	}
	
	Hero.prototype.isAlive = function()
	{
		var bResult = (this.m_status == C_STATUS_ALIVE);
		
		return bResult;
	}
	
	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Hero.prototype.dissolve = function(_disolvePrower)
	{ 
		this.m_tPercent = this.m_tPercent - _disolvePrower;
		
		if (this.m_tPercent <= 1)
			this.m_tPercent = 0;

		m_score.m_heroHealth = this.m_tPercent;
	}

	Hero.prototype.hitted = function(_disolvePower)
	{ 
		this.m_shield.modifyIndicator(_disolvePower*-1);

		if (this.m_shield.indicatorValue() <= 0)
		{
			m_sndManager.stop(C_SND_BULLET_IMPACT);
			m_sndManager.play(C_SND_BULLET_IMPACT);
			this.destroyed();
			
			m_keyboardMngr.reset();
			m_viewGameOver.initWith(C_STATE_VIEW_GAMEOVER_LOST);
			m_appState = C_APP_STATE_GAMEOVER;
		}
		else
		{
			m_sndManager.stop(C_SND_BULLET_NOT_IMPACT);
			m_sndManager.play(C_SND_BULLET_NOT_IMPACT);
			this.m_smoke.start();
		}

	}

	Hero.prototype.fire = function()
	{
		if (this.m_energy.getCurrentEnergy() <= 0)
			return;
		
		var pFire = new Fire();
		
		this.m_x = this.m_x + cosOf(-C_PLAYER_SPEED, this.m_rotationAngle);
		this.m_y = this.m_y + sinOf(-C_PLAYER_SPEED, this.m_rotationAngle);

		pFire.initWith
		(
			1, 
			this.m_x, 
			this.m_y, 
			cosOf(C_PLAYER_SPEED * 2, this.m_rotationAngle),
			sinOf(C_PLAYER_SPEED * 2, this.m_rotationAngle),
			this.m_class
		);
		pFire.setRange(this.m_cannon.m_currentRange);
		pFire.setRadious(this.m_cannon.m_currentRadious);
		pFire.setEnergy(this.m_cannon.energyUsed());
		pFire.color = rgbaToColor(0, 255, 0, 0.95);

				
		//msglog(this.m_cannon.energyUsed());
		m_maze.addObj(pFire);

		m_sndManager.stop(C_SND_SHOOT);
		m_sndManager.play(C_SND_SHOOT);

		this.m_fireTimer.start();
		//msglog("counter fire:");
		
		//msglog(-this.m_cannon.energyUsed());
		this.modifyEnergy(-this.m_cannon.energyUsed());
	}
	
	Hero.prototype.die = function()
	{
		this.m_status = C_STATUS_DIE;
	}

	Hero.prototype.isMoving = function()
	{
		return (this.m_movDir & 10) > 0;
	}

	Hero.prototype.startMoving = function(_moveDirection)
	{
		if (this.m_moveTimer.isReady() == true)
			this.m_moveTimer.start();

		if (this.isMoving())
			return;

		this.m_movDir = _moveDirection;

		if (m_sndManager.isPlaying(C_SND_ENGINE_MOVING) == false)
		{
			m_sndManager.stop(C_SND_ENGINE_0);

			m_sndManager.setLoop(C_SND_ENGINE_MOVING, true);
			m_sndManager.play(C_SND_ENGINE_MOVING);

			this.m_engine.setRpmHi();
		}
		
	}

	Hero.prototype.stopMoving = function()
	{
		if (this.isMoving() == false)
			return;
		
		this.m_movDir = this.m_movDir & (255-10);

		if (m_sndManager.isPlaying(C_SND_ENGINE_MOVING) == true)
		{
			m_sndManager.stop(C_SND_ENGINE_MOVING);

			m_sndManager.setLoop(C_SND_ENGINE_0, true);
			m_sndManager.play(C_SND_ENGINE_0);
			this.m_engine.setRpmLo();
		}
		
		this.m_moveTimer.reset();
	}

	Hero.prototype.modifyEnergy = function(_value)
	{
		this.m_energy.modifyIndicator(_value);
	}
	
	Hero.prototype.destroyed = function()
	{
		this.m_status = C_STATUS_DESTROYED;
	}
}
